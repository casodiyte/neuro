export function GooeyFilter() {
  return (
    <svg style={{ width: 0, height: 0, position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
      <defs>
        <filter id="gooey" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey" />
          <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}
