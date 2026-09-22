import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { footerQuickLinks } from "@/lib/content";
import Container from "@/components/Container";
import AppleAppStoreIcon from "@/components/icons/AppleAppStoreIcon";
import GooglePlayIcon from "@/components/icons/GooglePlayIcon";
import Logo from "@/components/Logo";

const downloads = [
  {
    label: "Google Play Store",
    href: siteConfig.androidAppUrl,
    icon: GooglePlayIcon,
  },
  {
    label: "Apple App Store",
    href: siteConfig.iosAppUrl,
    icon: AppleAppStoreIcon,
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink py-14 text-white md:py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          <div className="max-w-sm">
            <Link href="/#top" className="text-base font-semibold" aria-label="CaterPillar home">
              <Logo onDark />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Building a simpler and more convenient way to recycle household materials.
            </p>
          </div>

          <nav aria-label="Quick links">
            <p className="text-xs font-medium tracking-[0.18em] text-white/45 uppercase">
              Quick links
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Download">
            <p className="text-xs font-medium tracking-[0.18em] text-white/45 uppercase">
              Download
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {downloads.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <Icon className="h-[18px] w-[18px] shrink-0 text-white" />
                    {item.label}
                  </>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="inline-flex items-center gap-2.5 text-white/80 transition-colors duration-300 hover:text-white"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2.5 text-white/55">
                        {content}
                        <span className="text-xs tracking-wide text-white/40">Coming soon</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
