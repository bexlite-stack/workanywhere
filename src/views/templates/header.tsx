import { TUser } from "../../types/entity";

export const Header = ({ user }: { user: TUser }) => {
  return (
    <header class="grid grid-cols-2 items-center mt-12">
      <div class="space-x-6">
        <a href="/" class="font-semibold tracking-tight">
          betterwork.
        </a>
        <a href="/workplaces/" class="hidden lg:inline-block tracking-tight">
          workplaces
        </a>
        {user && (
          <a href="/workplaces/submit" class="tracking-tight">
            submit
          </a>
        )}
      </div>
      <div class="hidden lg:flex gap-2 items-center justify-end">
        {user ? (
          <div class="bg-white w-fit p-2 pl-5 border border-slate-300 rounded-full flex gap-3 items-center">
            <div class=" font-medium">{user?.name}</div>
            <button hx-post="/logout" class="w-fit">
              logout
            </button>
          </div>
        ) : (
          <div class="bg-white w-fit p-2 pl-8 border border-slate-300 rounded-full flex gap-6 items-center">
            <a href="/login" hx-boost="true">
              Login
            </a>
            <a href="/register" hx-boost="true">
              <button>Get started</button>
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
