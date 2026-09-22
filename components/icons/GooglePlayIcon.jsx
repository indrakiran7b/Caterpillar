export default function GooglePlayIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path fill="#EA4335" d="M3.6 1.8c-.4.2-.6.6-.6 1.1v18.2c0 .5.2.9.6 1.1l.1.1 10.2-10.2v-.2L3.7 1.7z" />
      <path fill="#FBBC04" d="M16.3 12 13.7 9.4l-10 10 7.5 4.3c.5.3 1.1.3 1.6 0l3.5-2-3.5-2.1z" />
      <path fill="#4285F4" d="M16.3 12 19.8 9.9c.7-.4.7-1.4 0-1.8l-3.5-2-3.5 2.1 3.5 2.1z" />
      <path fill="#34A853" d="M13.7 9.4 3.7 1.7c.5-.3 1.1-.3 1.6 0l10 10-1.6 1.7z" />
    </svg>
  );
}
