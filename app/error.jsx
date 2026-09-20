"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/Container";
import Logo from "@/components/Logo";

export default function Error({ reset }) {
  return (
    <main id="main" className="flex min-h-screen flex-col bg-canvas">
      <header className="border-b border-line/80">
        <Container>
          <nav className="flex h-[72px] items-center" aria-label="Primary">
            <Link href="/" className="text-base font-semibold" aria-label="CaterPillar home">
              <Logo />
            </Link>
          </nav>
        </Container>
      </header>
      <Container className="flex flex-1 flex-col justify-center py-20">
        <p className="text-xs font-medium tracking-[0.18em] text-brand uppercase">
          Something went wrong
        </p>
        <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          We couldn’t load this page.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          Please try again. If it still doesn’t work, head back to CaterPillar.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="button" onClick={() => reset()} className="w-full sm:w-auto">
            Try again
          </Button>
          <Button href="/" variant="secondary" className="w-full sm:w-auto">
            Back to CaterPillar
          </Button>
        </div>
      </Container>
    </main>
  );
}
