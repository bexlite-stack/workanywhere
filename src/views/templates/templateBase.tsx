import { Footer } from "./footer";

export const TemplateBase = ({ children }: Html.PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/public/css/globals.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Onest:wght@100..900&display=swap" rel="stylesheet" />
        <script src="https://unpkg.com/htmx.org@1.9.12"></script>
        <script src="//unpkg.com/alpinejs" defer></script>
        <title>betterwork.</title>
      </head>
      <body>
        <div class="hidden lg:block">
          <main class="max-w-7xl m-auto px-8 lg:px-0 space-y-12">{children}</main>
          <Footer />
        </div>
        <div class="h-screen flex justify-center items-center lg:hidden font-semibold tracking-tight">This site is only available on desktop</div>
      </body>
    </html>
  );
};
