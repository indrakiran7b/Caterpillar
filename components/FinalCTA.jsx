import BookPickupButton from "@/components/BookPickupButton";
import Container from "@/components/Container";
import FadeIn from "@/components/motion/FadeIn";
import { serviceArea } from "@/lib/content";

export default function FinalCTA() {
  return (
    <section id="book" className="scroll-mt-24 bg-brand-dark py-12 text-white md:py-16 lg:py-20">
      <Container>
        <FadeIn>
          <h2 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
            Got scrap?
            <br />
            Turn it into money.
          </h2>
          <BookPickupButton variant="light" className="mt-8">
            Book a pickup
          </BookPickupButton>
          <p className="mt-5 text-sm text-white/70">
            Currently available in {serviceArea}.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
