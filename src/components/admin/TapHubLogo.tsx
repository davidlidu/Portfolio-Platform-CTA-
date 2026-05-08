export default function TapHubLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="330 310 1050 210"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TapHub"
    >
      <defs>
        <filter id="taphub-glow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <text
        x="360"
        y="470"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="150"
        fontWeight="500"
        fill="#F5F5F5"
      >
        Tap
      </text>

      <text
        x="730"
        y="470"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="150"
        fontWeight="500"
        fill="rgb(var(--accent))"
        filter="url(#taphub-glow)"
      >
        Hub
      </text>

      <circle
        cx="1180"
        cy="410"
        r="12"
        fill="rgb(var(--accent))"
        filter="url(#taphub-glow)"
      />

      <path
        d="M1210 360 Q1270 410 1210 460"
        stroke="rgb(var(--accent))"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        filter="url(#taphub-glow)"
      />

      <path
        d="M1245 330 Q1335 410 1245 490"
        stroke="rgb(var(--accent))"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        filter="url(#taphub-glow)"
      />
    </svg>
  );
}
