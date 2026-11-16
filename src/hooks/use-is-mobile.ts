import { useSyncExternalStore } from 'react';

// tailwind's md breakpoint, so the code agrees with the max-md classes
const MOBILE_QUERY = '(width < 48rem)';

function subscribe(onChange: () => void) {
  const media = window.matchMedia(MOBILE_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

export function useIsMobile() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(MOBILE_QUERY).matches);
}
