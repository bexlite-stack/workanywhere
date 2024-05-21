import { Context } from "elysia";
import { workplaceService } from "../services/workplaceService";
import { ContextWithUser } from "../types/app";
import { Home } from "../views/domain";
import { WorkplaceForm } from "../views/domain/workplace/workplaceSubmit";
import { IReview, IWorkplace } from "../types/entity";
import { fileService } from "../services/fileService";
import { SingleWorkplace } from "../views/domain/workplace/workplaceSingle";
import { WorkplaceCard } from "../views/domain/workplace/workplaceCard";
import { ReviewForm } from "../views/domain/review/reviewSubmit";
import { reviewService } from "../services/reviewService";
import { ProgressBar } from "../views/components/progressBar";
import { ReviewCard } from "../views/domain/review/reviewCard";
import { Workplaces } from "../views/domain/workplace";

export const platformController = {
  fetchAllWorkplaces: async ({ query, user }: ContextWithUser) => {
    const { type, limit, city, count } = query;

    if (count) {
      const workplacesCount = await workplaceService.getWorkplaceCount(count);

      return (
        <>
          {workplacesCount} {workplacesCount >= 1 ? "Spots" : "Spot"}
        </>
      );
    }

    if (type) {
      const workplaces = await workplaceService.getAllWorkplaces(type, "", Number(limit));

      return (
        <Workplaces user={user}>
          <section id="workplaces" hx-select-oob="true" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {workplaces.map((workplace) => {
              return <WorkplaceCard workplace={workplace} />;
            })}
          </section>
        </Workplaces>
      );
    }

    const workplaces = await workplaceService.getAllWorkplaces("", city as string, Number(limit));

    return (
      <Workplaces user={user}>
        <section id="workplaces" hx-select-oob="true" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {workplaces.map((workplace) => {
            return <WorkplaceCard workplace={workplace} />;
          })}
        </section>
      </Workplaces>
    );
  },

  createWorkplace: async ({ body, user }: ContextWithUser) => {
    const { name, address, city, type, images } = body as IWorkplace;
    const imagesName = fileService.extractNames(images as Blob | Blob[]);

    const { id } = await workplaceService.createWorkplace({ name, address, city, type, images: JSON.stringify(imagesName), userId: user.id as string });
    await fileService.save(id as string, "workplaces", images as Blob | Blob[]);

    return new Response(null, {
      headers: { "HX-Redirect": "/" },
    });
  },

  createReview: async ({ body, params, user }: ContextWithUser) => {
    const { slug } = params;
    const { foodQuality, foodPrice, toilet, internet, electricity, comfortness, quiteness, review } = body as IReview;

    const workplace = await workplaceService.getWorkplace(slug as string);

    await reviewService.createReview({
      userId: user.id as string,
      workplaceId: workplace?.id as string,
      foodQuality,
      foodPrice,
      toilet,
      internet,
      electricity,
      comfortness,
      quiteness,
      review,
    });

    return new Response(null, {
      headers: {
        "HX-Redirect": `/workplaces/${slug}`,
      },
    });
  },

  fetchWorkplaceRatings: async ({ params }: Context) => {
    const { slug } = params;

    const workplace = await workplaceService.getWorkplace(slug as string);
    const ratings = await reviewService.getReviewRatings(workplace?.id as string);

    return (
      <section id="ratings" class="space-y-3" hx-swap-oob="true">
        <ProgressBar label="Food Quality" progress={ratings?.foodQuality} minLabel="bad" maxLabel="good" />
        <ProgressBar label="Food Price" progress={ratings?.foodPrice} minLabel="costly" maxLabel="affordable" />
        <ProgressBar label="Toilet" progress={ratings?.toilet} minLabel="dirty" maxLabel="clean" />
        <ProgressBar label="Internet" progress={ratings?.internet} minLabel="slow" maxLabel="fast" />
        <ProgressBar label="Electricity" progress={ratings?.electricity} minLabel="bad" maxLabel="good" />
        <ProgressBar label="Comfortness" progress={ratings?.comfortness} minLabel="uncomfortable" maxLabel="comfortable" />
        <ProgressBar label="Quiteness" progress={ratings?.quiteness} minLabel="quite" maxLabel="crowded" />
      </section>
    );
  },

  fetchAllReviews: async ({ params }: Context) => {
    const { slug } = params;

    const workplace = await workplaceService.getWorkplace(slug as string);
    const reviews = await reviewService.getReviews(workplace?.id as string);

    return (
      <>
        {reviews.map((review) => {
          return <ReviewCard review={review.review} name={review.userName} createdAt={review.createdAt} />;
        })}
      </>
    );
  },

  searchWorkplaces: async ({ body, user }: ContextWithUser) => {
    const { city, type } = body as any;

    if (type) {
      return new Response(null, {
        headers: { "HX-Redirect": `/workplaces?type=${type}` },
      });
    }

    return new Response(null, {
      headers: { "HX-Redirect": `/workplaces?city=${city}` },
    });
  },

  renderHomeUI: ({ user }: ContextWithUser) => {
    return <Home user={user} />;
  },

  renderSingleWorkplaceUI: async ({ params, user }: ContextWithUser) => {
    const { slug } = params;
    const workplace = await workplaceService.getWorkplace(slug as string);
    return <SingleWorkplace user={user} workplace={workplace as IWorkplace} />;
  },

  renderWorkplaceSubmitFormUI: ({ user }: ContextWithUser) => {
    return <WorkplaceForm user={user} />;
  },

  renderWorkplaceReviewSubmitFormUI: ({ params, user }: ContextWithUser) => {
    const { slug } = params;

    return <ReviewForm user={user} slug={slug} />;
  },

  renderSlideImage: async ({ set, params }: Context) => {
    const { slug, fileName } = params;

    const workplace = await workplaceService.getWorkplace(slug as string);

    set.headers = {
      "Cache-Control": "public, max-age=31536000",
      Expires: "Thu, 31 Dec 2037 23:55:55 GMT",
    };

    return (
      <div id="gallery" hx-swap-oob="true">
        <img src={`/public/images/workplaces/${workplace?.id}/${fileName}`} class="w-full object-cover h-full rounded-xl" />
      </div>
    );
  },
};
