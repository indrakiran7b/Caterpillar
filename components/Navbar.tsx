export function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className="pointer-events-auto mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:h-[4.5rem] sm:px-8 lg:px-12"
      >
        <a
          href="#hero"
          className="font-display text-[1.05rem] font-extrabold tracking-[-0.04em] text-ink"
        >
          CATTERPILLAR
        </a>
        <a
          href="#pickup"
          className="text-[0.72rem] font-semibold tracking-[0.16em] text-ink transition-colors duration-200 hover:text-accent"
        >
          BOOK A PICKUP
        </a>
      </nav>
    </header>
  );
}
