import { IWorkplace, TUser } from "../../../types/entity";
import { ProgressBar } from "../../components/progressBar";
import { Header } from "../../templates/header";
import { TemplateBase } from "../../templates/templateBase";
import { ReviewCard } from "../review/reviewCard";

interface WorkplaceProps {
  user: TUser;
  workplace: IWorkplace;
}

export const SingleWorkplace = ({ user, workplace }: WorkplaceProps) => {
  const images = JSON.parse(workplace.images as string) as string[];

  return (
    <TemplateBase>
      <Header user={user} />
      <main class="max-w-7xl m-auto my-16 space-y-8">
        <section class="space-y-4">
          <h1 class="text-5xl tracking-tight ">{workplace.name}</h1>
          <div class="flex gap-2 items-center">
            <div class="font-medium text-sm bg-primary text-black px-3 py-1 rounded-xl w-fit">{workplace.type}</div>
            <h3 class="text-lg font-medium">{workplace.address}</h3>
          </div>
        </section>
        <div class="grid grid-cols-6 gap-8">
          <section class="col-span-4 space-y-8">
            <div id="gallery">
              <img src={`/public/images/workplaces/${workplace.id}/${images[0]}`} class="w-full object-cover h-full rounded-xl" />
            </div>
            <div class="grid grid-cols-10 gap-4">
              {images.map((image) => {
                return (
                  <img
                    hx-get={`/workplaces/${workplace.slug}/images/${image}`}
                    hx-target="#gallery"
                    hx-swap="transition:true"
                    src={`/public/images/workplaces/${workplace.id}/${image}`}
                    class="w-full grayscale hover:grayscale-0 cursor-pointer object-cover h-[60px] rounded-xl"
                  />
                );
              })}
            </div>
            <section hx-get={`/workplaces/${workplace.slug}/reviews`} hx-trigger="load" class="space-y-4">
              {/* <ReviewCard name="name" review="hello!" createdAt={new Date()} /> */}
            </section>
          </section>
          <section class="col-span-2 space-y-4 min-h-32">
            <div class="card p-8 space-y-4">
              <h3 class="pb-2">Average User Ratings</h3>
              <section id="ratings" class="space-y-3" hx-get={`/workplaces/${workplace.slug}/ratings`} hx-trigger="load">
                <ProgressBar label="Food Quality" progress={0} minLabel="bad" maxLabel="good" />
                <ProgressBar label="Food Price" progress={0} minLabel="costly" maxLabel="affordable" />
                <ProgressBar label="Toilet" progress={0} minLabel="dirty" maxLabel="clean" />
                <ProgressBar label="Internet" progress={0} minLabel="slow" maxLabel="fast" />
                <ProgressBar label="Electricity" progress={0} minLabel="bad" maxLabel="good" />
                <ProgressBar label="Comfortness" progress={0} minLabel="uncomfortable" maxLabel="comfortable" />
                <ProgressBar label="Quiteness" progress={0} minLabel="quite" maxLabel="crowded" />
              </section>
            </div>
            <div class="card p-8 space-y-4">
              <p>Have you been here ? Give review!</p>
              <a href={`/workplaces/${workplace.slug}/reviews/submit`} hx-boost="true" class="w-full">
                <button>submit review</button>
              </a>
            </div>
          </section>
        </div>
      </main>
    </TemplateBase>
  );
};
