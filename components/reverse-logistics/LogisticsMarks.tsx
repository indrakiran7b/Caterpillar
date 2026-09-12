type MarkProps = {
  className?: string;
};

const ink = "#14120F";

export function HouseMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 168 148"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="84" cy="136" rx="48" ry="7" fill={ink} opacity="0.1" />
      <path d="M22 70l62-34 62 28-60 34L22 70z" fill="#E8B86D" stroke={ink} strokeWidth="2.2" />
      <path d="M22 70v46l64 22V92L22 70z" fill="#F6EFE3" stroke={ink} strokeWidth="2.2" />
      <path d="M86 92v46l60-20V64L86 92z" fill="#E7DFD2" stroke={ink} strokeWidth="2.2" />
      <path d="M22 70l28-20 40 8-6 18L22 70z" fill="#C48A3C" stroke={ink} strokeWidth="2.2" />
      <path d="M146 64l-14-18-36 6 8 16 42-4z" fill="#A56E2F" stroke={ink} strokeWidth="2.2" />
      <path d="M48 96h22v28H48z" fill="#FF3B1F" stroke={ink} strokeWidth="2.2" />
      <path d="M66 110h5" stroke="#FFB199" strokeWidth="2" strokeLinecap="round" />
      <path d="M108 88l16-6v16l-16 6v-16z" fill="#7FCFD9" stroke={ink} strokeWidth="2" />
      <path d="M118 34v18" stroke={ink} strokeWidth="2.2" />
      <rect x="112" y="26" width="12" height="10" rx="2" fill="#E8B86D" stroke={ink} strokeWidth="2" />
    </svg>
  );
}

export function WarehouseMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 200 118"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="100" cy="108" rx="70" ry="7" fill={ink} opacity="0.1" />
      <path d="M14 52l72-24 100 18-70 28L14 52z" fill="#E8B86D" stroke={ink} strokeWidth="2.2" />
      <path d="M14 52v38l72 20V74L14 52z" fill="#E7DFD2" stroke={ink} strokeWidth="2.2" />
      <path d="M86 74v36l100-16V46L86 74z" fill="#F6EFE3" stroke={ink} strokeWidth="2.2" />
      <path d="M28 68h18v22H28z" fill="#D9CFC0" stroke={ink} strokeWidth="2" />
      <path d="M52 74h18v20H52z" fill="#D9CFC0" stroke={ink} strokeWidth="2" />
      <path d="M118 70l28-6v22l-28 6V70z" fill="#C48A3C" stroke={ink} strokeWidth="2" />
      <path d="M154 64l22-4v20l-22 5V64z" fill="#FF3B1F" stroke={ink} strokeWidth="2" />
    </svg>
  );
}

export function SortBayMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 248 128"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="124" cy="116" rx="92" ry="8" fill={ink} opacity="0.08" />
      <path d="M18 78l70-16 142 8-68 20L18 78z" fill="#E4D8C4" stroke={ink} strokeWidth="2.2" />
      <path d="M88 42h86l18 20H72z" fill="#F6EFE3" stroke={ink} strokeWidth="2.2" />
      <path d="M72 62h114" stroke={ink} strokeWidth="1.6" opacity="0.22" />
      <path d="M110 42v20" stroke={ink} strokeWidth="1.6" opacity="0.18" />
      <path d="M148 42v20" stroke={ink} strokeWidth="1.6" opacity="0.18" />
    </svg>
  );
}

export function AggregatePadMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 268 132"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="134" cy="120" rx="100" ry="8" fill={ink} opacity="0.09" />
      <path d="M20 86l86-20 146 10-84 24L20 86z" fill="#C48A3C" stroke={ink} strokeWidth="2.2" />
      <path d="M20 86v16l86 18V102L20 86z" fill="#A56E2F" stroke={ink} strokeWidth="2.2" />
      <path d="M106 102v18l146-12V76L106 102z" fill="#E8B86D" stroke={ink} strokeWidth="2.2" />
    </svg>
  );
}

export function FacilityMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 176 150"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="88" cy="138" rx="54" ry="7" fill={ink} opacity="0.1" />
      <path d="M20 70l70-28 66 22-66 32L20 70z" fill="#E8B86D" stroke={ink} strokeWidth="2.2" />
      <path d="M20 70v44l70 24V96L20 70z" fill="#F6EFE3" stroke={ink} strokeWidth="2.2" />
      <path d="M90 96v42l66-20V64L90 96z" fill="#E7DFD2" stroke={ink} strokeWidth="2.2" />
      <path d="M20 70l22-16 52 8-4 16L20 70z" fill="#C48A3C" stroke={ink} strokeWidth="2.2" />
      <path d="M44 100h22v24H44z" fill="#FF3B1F" stroke={ink} strokeWidth="2.2" />
      <path d="M108 86l16-6v14l-16 6v-14z" fill="#7FCFD9" stroke={ink} strokeWidth="2" />
      <path d="M130 80l14-5v14l-14 5v-14z" fill="#7FCFD9" stroke={ink} strokeWidth="2" />
      <path d="M136 36v22" stroke={ink} strokeWidth="2.2" />
      <rect x="130" y="26" width="12" height="12" rx="2" fill="#E8B86D" stroke={ink} strokeWidth="2" />
    </svg>
  );
}

export function TruckMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 176 92"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="88" cy="84" rx="54" ry="6" fill={ink} opacity="0.1" />
      <path d="M12 28l70-16 48 12-68 20L12 28z" fill="#E8B86D" stroke={ink} strokeWidth="2.2" />
      <path d="M12 28v28l70 16V44L12 28z" fill="#C48A3C" stroke={ink} strokeWidth="2.2" />
      <path d="M82 44v28l48-12V32L82 44z" fill="#A56E2F" stroke={ink} strokeWidth="2.2" />
      <path
        d="M38 36l28 8 30-10"
        stroke="#FF3B1F"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M38 36l28 8 30-10"
        stroke={ink}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M130 36l22 6 12 12v16l-18 6-28-8V36z" fill="#F6EFE3" stroke={ink} strokeWidth="2.2" />
      <path d="M144 44l14 4v10l-14 4v-18z" fill="#7FCFD9" stroke={ink} strokeWidth="2" />
      <circle cx="46" cy="70" r="9" fill="#14120F" />
      <circle cx="46" cy="70" r="4" fill="#F3EDE3" />
      <circle cx="148" cy="72" r="9" fill="#14120F" />
      <circle cx="148" cy="72" r="4" fill="#F3EDE3" />
    </svg>
  );
}

export function LogisticsMark({
  id,
  className,
}: {
  id: JourneyMarkConfigId;
  className?: string;
}) {
  switch (id) {
    case "house":
      return <HouseMark className={className} />;
    case "warehouse":
      return <WarehouseMark className={className} />;
    case "sort-bay":
      return <SortBayMark className={className} />;
    case "aggregate-pad":
      return <AggregatePadMark className={className} />;
    case "facility":
      return <FacilityMark className={className} />;
    default:
      return null;
  }
}

type JourneyMarkConfigId =
  | "house"
  | "warehouse"
  | "sort-bay"
  | "aggregate-pad"
  | "facility";
