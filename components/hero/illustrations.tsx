import type { JSX } from "react";
import type { RecyclableType } from "@/data/recyclableObjects";

type IllustrationProps = {
  className?: string;
};

const ink = "#14120F";

export function BottleIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 92 168"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="48" cy="158" rx="22" ry="5" fill={ink} opacity="0.1" />
      <rect x="34" y="6" width="28" height="18" rx="5" fill="#FF3B1F" stroke={ink} strokeWidth="2.2" />
      <path d="M38 10h20" stroke="#FFB199" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M39 24h18v16H39z" fill="#7FCFD9" stroke={ink} strokeWidth="2.2" />
      <path
        d="M39 40c0 3-14 16-18 28h54c-4-12-18-25-18-28H39z"
        fill="#5FBFCC"
        stroke={ink}
        strokeWidth="2.2"
      />
      <path
        d="M21 68v58c0 16 10 24 27 24s27-8 27-24V68H21z"
        fill="#4AAFBD"
        stroke={ink}
        strokeWidth="2.2"
      />
      <path
        d="M21 96c8 6 18 8 27 8s19-2 27-8v30c0 16-10 24-27 24s-27-8-27-24V96z"
        fill="#2F8F9C"
        opacity="0.28"
      />
      <path
        d="M30 76c1 20 2 38 2 52"
        stroke="#E7F7F9"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <rect x="28" y="88" width="40" height="28" rx="4" fill="#F3EDE3" stroke={ink} strokeWidth="2.2" />
      <rect x="34" y="98" width="18" height="6" rx="2" fill="#FF3B1F" />
      <path d="M34 110h16" stroke={ink} strokeWidth="2" opacity="0.3" />
    </svg>
  );
}

export function CardboardIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 168 142"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="86" cy="130" rx="52" ry="8" fill={ink} opacity="0.1" />
      <path d="M18 52l66-26 66 24-64 28L18 52z" fill="#E8B86D" stroke={ink} strokeWidth="2.2" />
      <path d="M18 52v54l68 26V80L18 52z" fill="#A56E2F" stroke={ink} strokeWidth="2.2" />
      <path d="M86 80v52l66-24V50L86 80z" fill="#C48A3C" stroke={ink} strokeWidth="2.2" />
      <path d="M18 52l26-22 42 6-2 16L18 52z" fill="#F0C888" stroke={ink} strokeWidth="2.2" />
      <path d="M150 50l-12-20-38 6 6 16 44-2z" fill="#F6D49A" stroke={ink} strokeWidth="2.2" />
      <path
        d="M46 64l40 16 42-16"
        stroke="#FF3B1F"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M46 64l40 16 42-16"
        stroke={ink}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M36 40h16" stroke={ink} strokeWidth="2" opacity="0.35" />
    </svg>
  );
}

export function CanIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 78 128"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="39" cy="120" rx="20" ry="5" fill={ink} opacity="0.1" />
      <path
        d="M16 22v78c0 9 10 16 23 16s23-7 23-16V22"
        fill="#B7BEC8"
        stroke={ink}
        strokeWidth="2.2"
      />
      <path
        d="M20 38c3 3 11 5 19 5s16-2 19-5"
        stroke="#F4F6F8"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.55"
      />
      <rect x="16" y="58" width="46" height="20" fill="#FF3B1F" />
      <path d="M16 58h46M16 78h46" stroke={ink} strokeWidth="2.2" />
      <ellipse cx="39" cy="100" rx="23" ry="8" fill="#8E97A4" stroke={ink} strokeWidth="2.2" />
      <ellipse cx="39" cy="20" rx="23" ry="8" fill="#D5DAE1" stroke={ink} strokeWidth="2.2" />
      <ellipse cx="39" cy="18" rx="11" ry="3.8" fill="#F7F8FA" />
      <path
        d="M36 15c9-2 14 4 10 8"
        stroke={ink}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PaperIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 136 112"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M22 28c24-10 58-8 86 6l8 54c-26 12-62 12-90 2L22 28z"
        fill={ink}
        opacity="0.1"
      />
      <path
        d="M14 16c26-9 62-7 92 8l6 56c-28 13-66 11-96-1L14 16z"
        fill="#FFF8EC"
        stroke={ink}
        strokeWidth="2.2"
      />
      <path d="M90 22l22 9-10 22-24-7 12-24z" fill="#E7D3AE" stroke={ink} strokeWidth="2.2" />
      <path
        d="M30 40h46M32 52h40M34 64h30"
        stroke={ink}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.22"
      />
    </svg>
  );
}

export function DeviceIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 128 86"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="64" cy="78" rx="40" ry="6" fill={ink} opacity="0.12" />
      <rect x="8" y="18" width="112" height="54" rx="14" fill="#2C2A27" stroke={ink} strokeWidth="2.2" />
      <rect x="16" y="26" width="62" height="38" rx="8" fill="#0F0E0C" stroke={ink} strokeWidth="2.2" />
      <path d="M24 45h24" stroke="#FF3B1F" strokeWidth="3.4" strokeLinecap="round" />
      <path
        d="M24 36h14M24 54h18"
        stroke="#F3EDE3"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.32"
      />
      <circle cx="96" cy="36" r="7" fill="#FF3B1F" stroke={ink} strokeWidth="2.2" />
      <circle cx="96" cy="56" r="6" fill="#F3EDE3" stroke={ink} strokeWidth="2.2" />
      <path d="M118 34v22" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="50" y="10" width="12" height="10" rx="3" fill="#3F3B36" stroke={ink} strokeWidth="2.2" />
    </svg>
  );
}

export function ContainerIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 118 104"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="59" cy="96" rx="36" ry="6" fill={ink} opacity="0.1" />
      <path
        d="M20 28l8 50c2 12 18 16 31 16s29-4 31-16l8-50"
        fill="#E38A3C"
        stroke={ink}
        strokeWidth="2.2"
      />
      <path
        d="M28 46c7 5 20 7 31 7s24-2 31-7"
        stroke="#F8C48A"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <ellipse cx="59" cy="24" rx="42" ry="13" fill="#F0B36A" stroke={ink} strokeWidth="2.2" />
      <ellipse cx="59" cy="21" rx="38" ry="10" fill="#FFBF77" stroke={ink} strokeWidth="2.2" />
      <ellipse cx="59" cy="19" rx="16" ry="4" fill="#FFE0B0" />
    </svg>
  );
}

export function JarIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 86 128"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="43" cy="121" rx="20" ry="5" fill={ink} opacity="0.1" />
      <rect x="25" y="6" width="36" height="16" rx="4" fill="#9AA3AF" stroke={ink} strokeWidth="2.2" />
      <path d="M29 10h28" stroke="#E4E8EE" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M22 22h42l8 14v56c0 12-11 18-29 18s-29-6-29-18V36l8-14z"
        fill="#6FB59A"
        stroke={ink}
        strokeWidth="2.2"
      />
      <path
        d="M22 70c8 6 16 8 21 8s13-2 21-8v18c0 12-11 18-29 18s-29-6-29-18V70z"
        fill="#3E8B71"
        opacity="0.22"
      />
      <path
        d="M30 42c1 18 2 34 2 46"
        stroke="#E8F6F0"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <rect x="28" y="60" width="30" height="20" rx="3" fill="#F3EDE3" stroke={ink} strokeWidth="2.2" />
      <path d="M33 70h14" stroke="#FF3B1F" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

const illustrations: Record<
  RecyclableType,
  (props: IllustrationProps) => JSX.Element
> = {
  bottle: BottleIllustration,
  cardboard: CardboardIllustration,
  can: CanIllustration,
  paper: PaperIllustration,
  device: DeviceIllustration,
  container: ContainerIllustration,
  jar: JarIllustration,
};

export function RecyclableIllustration({
  type,
  className,
}: IllustrationProps & { type: RecyclableType }) {
  const Illustration = illustrations[type];
  return <Illustration className={className} />;
}
