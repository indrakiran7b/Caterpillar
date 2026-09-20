import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/Container";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Page not found",
  description: "This page doesn’t exist on CaterPillar.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
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
          Missing page
        </p>
        <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Page not found.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          That page doesn’t exist. Head back to CaterPillar to book a pickup.
        </p>
        <Button href="/" className="mt-8 w-full sm:w-auto">
          Back to CaterPillar
        </Button>
      </Container>
    </main>
  );
}
