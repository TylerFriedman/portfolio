import { useEffect, useState } from 'react';

const TIME_FORMAT = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });

function currentTime() {
  return TIME_FORMAT.format(new Date());
}

export function useClock() {
  const [time, setTime] = useState(currentTime);

  useEffect(() => {
    // ticks every second but react skips the render until the minute text changes
    const timer = setInterval(() => setTime(currentTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
}
