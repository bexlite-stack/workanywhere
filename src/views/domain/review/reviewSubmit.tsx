import { TUser } from "../../../types/entity";
import { RangeInput } from "../../components/rangeInput";
import { Header } from "../../templates/header";
import { TemplateBase } from "../../templates/templateBase";

export const ReviewForm = ({ user, slug }: { user: TUser; slug: string }) => {
  return (
    <TemplateBase>
      <Header user={user} />
      <main class="flex justify-center my-12">
        <div class="w-[420px] space-y-4">
          <section class="text-center">
            <h1>Submit Workplace</h1>
            <h3>Fill in the form to submit your workplace</h3>
          </section>
          <form class="space-y-4" hx-post={`/workplaces/${slug}/reviews/submit`} hx-encoding="multipart/form-data">
            <textarea
              name="review"
              placeholder="Review..."
              x-data="{ 
                resize () { 
                    $el.style.height = '0px'; 
                    $el.style.height = $el.scrollHeight + 'px' 
                } 
            }"
              x-init="resize()"
              x-on:input="resize()"
              rows="1"
            ></textarea>
            <RangeInput name="foodQuality" label="Food Quality" minLabel="bad" maxLabel="good" />
            <RangeInput name="foodPrice" label="Food Price" minLabel="expensive" maxLabel="affordable" />
            <RangeInput name="toilet" label="Toilet" minLabel="dirty" maxLabel="clean" />
            <RangeInput name="internet" label="Internet" minLabel="slow" maxLabel="fast" />
            <RangeInput name="electricity" label="Electricity" minLabel="bad" maxLabel="good" />
            <RangeInput name="comfortness" label="Comfortness" minLabel="uncomfortable" maxLabel="comfortable" />
            <RangeInput name="quiteness" label="Quiteness" minLabel="bad" maxLabel="good" />
            <button>Submit Review</button>
          </form>
        </div>
      </main>
    </TemplateBase>
  );
};
