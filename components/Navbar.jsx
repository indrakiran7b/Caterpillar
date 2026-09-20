"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/content";
import { easeOut } from "@/lib/motion";
import BookPickupButton from "@/components/BookPickupButton";
import Container from "@/components/Container";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line/80 bg-canvas/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <Container>
        <motion.nav
          aria-label="Primary"
          animate={{
            height: scrolled ? 60 : 72,
          }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: easeOut }}
          className="flex items-center justify-between"
        >
          <a href="/#top" className="text-[15px] font-semibold md:text-base" aria-label="CaterPillar home">
            <Logo />
          </a>

          <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative py-1 transition-colors duration-300 hover:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex">
              <BookPickupButton size="sm">Book a pickup</BookPickupButton>
            </span>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </motion.nav>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: easeOut }}
            className="border-t border-line bg-canvas md:hidden"
          >
            <Container className="py-4">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="block py-3 text-base font-medium text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <BookPickupButton onClick={closeMenu} className="mt-2 w-full">
                Book a pickup
              </BookPickupButton>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
