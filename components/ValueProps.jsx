import { Home, Scale, Wallet } from "lucide-react";
import { valueProps } from "@/lib/content";
import Container from "@/components/Container";
import FadeIn from "@/components/motion/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";

const icons = [Home, Scale, Wallet];

export default function ValueProps() {
  return (
    <section id="what-you-get" className="scroll-mt-24 bg-canvas-alt py-16 md:py-24 lg:py-28">
      <Container>
        <FadeIn className="max-w-2xl">
          <Eyebrow>What you get</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            Book. We collect. You get paid.
          </h2>
        </FadeIn>
        <FadeIn className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-12">
          {valueProps.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={item.title} className="group">
                <p className="text-xs font-medium tracking-[0.16em] text-brand uppercase">
                  0{index + 1}
                </p>
                <Icon
                  className="mt-5 text-ink transition-transform duration-300 group-hover:scale-110 group-hover:text-brand"
                  size={20}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xs text-base leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </FadeIn>
      </Container>
    </section>
  );
}
