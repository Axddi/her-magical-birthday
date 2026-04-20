import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { CustomCursor } from "@/components/CustomCursor";
import { Link } from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass-card rounded-3xl p-10">
        <h1 className="text-7xl font-script text-shimmer">404</h1>
        <h2 className="mt-4 text-2xl font-cursive" style={{ color: "var(--rose-deep)" }}>
          This page wandered off into the stars
        </h2>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-white font-cursive text-lg interactive"
          style={{ background: "var(--gradient-rose)" }}
        >
          Take me home 💕
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Happy Birthday, My Love 💕" },
      { name: "description", content: "A magical birthday surprise made just for you." },
      { name: "theme-color", content: "#FF6B9D" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Outlet />
      <MusicPlayer />
    </>
  );
}
