import { TUser } from "../../../types/entity";
import { Header } from "../../templates/header";
import { TemplateBase } from "../../templates/templateBase";

interface HomeProps extends Html.PropsWithChildren {
  user: TUser;
}

export const Workplaces = ({ user, children }: HomeProps) => {
  return (
    <TemplateBase>
      <Header user={user} />
      <main class="space-y-12">
        <section class="space-y-4 text-center ">
          <h1 class="text-5xl tracking-tight text-center">Better Workplaces</h1>
          <h3>Find betterplace for work in your cities</h3>
        </section>
        <>{children}</>
      </main>
    </TemplateBase>
  );
};
