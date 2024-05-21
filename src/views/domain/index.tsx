import { TUser } from "../../types/entity";
import { Header } from "../templates/header";
import { TemplateBase } from "../templates/templateBase";

interface HomeProps {
  user: TUser;
}

export const Home = ({ user }: HomeProps) => {
  return (
    <TemplateBase>
      <Header user={user} />
      <main class="space-y-12">
        <section>
          <div
            style={{ backgroundImage: "url('/public/cafe.jpg')", backgroundPosition: "left", backgroundSize: "cover" }}
            class="space-y-6 bg-slate-900/20 text-white p-8 lg:p-20 rounded-xl"
          >
            <h1 class="w-full lg:w-[560px] rounded-xl text-3xl lg:text-7xl tracking-tighter ">Find better workplaces for better work.</h1>
            <h3 class="text-lg font-medium p-0 pb-12 lg:pb-8">
              betterwork is a place to find good place such as cafe, restaurant, hotel, coworking for better work.
            </h3>
          </div>
          <div class="max-w-4xl m-auto grid grid-cols-1 lg:grid-cols-2 gap-4 py-8 px-12 rounded-xl shadow-xl shadow-slate-200 bg-white border -mt-16">
            <div class="space-y-2">
              <h2 class="tracking-tight">Location</h2>
              <form hx-post="/workplaces/search">
                <input placeholder="Search Location" name="city" />
              </form>
            </div>
            <div class="space-y-2">
              <h2 class="tracking-tight">Types</h2>
              <form hx-post="/workplaces/search" hx-trigger="change delay:300">
                <select name="type">
                  <option value="cafe" selected>
                    Cafe
                  </option>
                  <option value="restaurant">Restaurant</option>
                  <option value="coworking">Coworking space</option>
                  <option value="other">Other</option>
                </select>
              </form>
            </div>
          </div>
        </section>
        <section class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div class="card">
            <img src="/public/icons8-cafe-80.png" width={24} height={24} class="mb-8" />
            <h2>Cafe</h2>
            <h4 hx-get="/workplaces?count=cafe" hx-trigger="load" class="bg-slate-900 text-white text-sm px-4 py-2 rounded-full w-fit">
              5 Spots
            </h4>
          </div>
          <div class="card">
            <img src="/public/icons8-restaurant-80.png" width={24} height={24} class="mb-8" />
            <h2>Restaurant</h2>
            <h4 hx-get="/workplaces?count=restaurant" hx-trigger="load" class="bg-slate-900 text-white text-sm px-4 py-2 rounded-full w-fit">
              5 Spots
            </h4>
          </div>
          <div class="card">
            <img src="/public/icons8-skyscrapers-80.png" width={24} height={24} class="mb-8" />
            <h2>Hotel</h2>
            <h4 hx-get="/workplaces?count=hotel" hx-trigger="load" class="bg-slate-900 text-white text-sm px-4 py-2 rounded-full w-fit">
              5 Spots
            </h4>
          </div>
          <div class="card">
            <img src="/public/icons8-table-80.png" width={24} height={24} class="mb-8" />
            <h2>Coworking Space</h2>
            <h4 hx-get="/workplaces?count=coworking" hx-trigger="load" class="bg-slate-900 text-white text-sm px-4 py-2 rounded-full w-fit">
              5 Spots
            </h4>
          </div>
        </section>
        <section id="workplaces" hx-get="/workplaces?limit=6" hx-trigger="load" hx-select="#workplaces">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="w-full h-[320px] bg-slate-300/30 animate-pulse rounded-xl" />
            <div class="w-full h-[320px] bg-slate-300/30 animate-pulse rounded-xl" />
            <div class="w-full h-[320px] bg-slate-300/30 animate-pulse rounded-xl" />
          </div>
        </section>
      </main>
    </TemplateBase>
  );
};
