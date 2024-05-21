import { TemplateBase } from "./templateBase";

export const TemplateAuth = ({ children }: Html.PropsWithChildren) => {
  return (
    <TemplateBase>
      <main class="h-screen flex justify-center items-center">
        <a href="/" hx-boost="/" class="fixed top-10 left-10">
          Back to home
        </a>
        <div class="w-[320px] space-y-6">{children}</div>
      </main>
    </TemplateBase>
  );
};
