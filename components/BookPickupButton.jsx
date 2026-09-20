"use client";

import { track } from "@/lib/analytics";
import { getBookingHref } from "@/lib/config";
import Button from "@/components/ui/Button";

export default function BookPickupButton({
  className = "",
  children = "Book a pickup",
  onClick,
  variant = "primary",
  size = "md",
}) {
  return (
    <Button
      href={getBookingHref()}
      variant={variant}
      size={size}
      className={className}
      onClick={(event) => {
        track("book_pickup_click");
        onClick?.(event);
      }}
    >
      {children}
    </Button>
  );
}
