import Link from "next/link";

const variants = {
  primary:
    "bg-brand text-white hover:bg-brand-dark hover:-translate-y-px hover:scale-[1.02] disabled:hover:translate-y-0 disabled:hover:scale-100",
  secondary:
    "bg-transparent text-ink/70 underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink",
  light:
    "bg-white text-brand-dark hover:-translate-y-px hover:scale-[1.02] disabled:hover:translate-y-0 disabled:hover:scale-100",
  ghost:
    "bg-transparent text-ink hover:bg-black/[0.04]",
};

const sizes = {
  sm: "px-4 py-2",
  md: "px-5 py-3",
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = variant !== "secondary" && variant !== "ghost",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) {
  const showArrow = arrow && variant !== "secondary" && variant !== "ghost";
  const classes = `group inline-flex items-center justify-center gap-1.5 rounded-full text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
      {content}
    </button>
  );
}
