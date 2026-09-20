import Link from "next/link";
import Logo from "@/components/Logo";
import Container from "@/components/Container";

export default function BookingHeader() {
  return (
    <header className="border-b border-line/80 bg-canvas">
      <Container>
        <nav className="flex h-[72px] items-center justify-between" aria-label="Booking">
          <Link href="/" className="text-base font-semibold" aria-label="CaterPillar home">
            <Logo />
          </Link>
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            ← Home
          </Link>
        </nav>
      </Container>
    </header>
  );
}
