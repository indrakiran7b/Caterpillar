"use client";

import "./globals.css";

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-5 py-20">
          <p className="text-xs font-medium tracking-[0.18em] text-brand uppercase">
            Something went wrong
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">
            We couldn’t load CaterPillar.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Please try again. If it still doesn’t work, refresh the page.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-white"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-ink/70 underline decoration-line underline-offset-4"
            >
              Back to CaterPillar
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
