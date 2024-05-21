import { TUser } from "../../../types/entity";
import { Header } from "../../templates/header";
import { TemplateBase } from "../../templates/templateBase";

export const WorkplaceForm = ({ user }: { user: TUser }) => {
  return (
    <TemplateBase>
      <Header user={user} />
      <main class="flex justify-center my-12">
        <div class="w-[420px] space-y-4">
          <section class="text-center">
            <h1>Submit Workplace</h1>
            <h3>Fill in the form to submit your workplace</h3>
          </section>
          <form hx-post="/workplaces/submit" hx-encoding="multipart/form-data" class="space-y-2">
            <input name="name" placeholder="Name" required />
            <input name="address" placeholder="Address" required />
            <input name="city" placeholder="City" required />
            <select name="type">
              <option value="cafe" selected>
                Cafe
              </option>
              <option value="restaurant">Restaurant</option>
              <option value="coworking">Coworking space</option>
              <option value="other">Other</option>
            </select>
            <input name="images" type="file" multiple required maxlength={6} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </TemplateBase>
  );
};
