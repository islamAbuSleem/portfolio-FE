"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "Asia/Riyadh";

/**
 * A live local clock in the header - a working letterhead rather than
 * decoration, and it tells a remote reader where the work happens.
 */
export function LocalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: TIME_ZONE,
    });

    const tick = () => setTime(format.format(new Date()));
    tick();

    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="text-label-md text-text-faint tnum tabular-nums"
      title={`Local time in Riyadh (GMT+3)`}
    >
      RUH&nbsp;{time ?? "--:--"}
    </span>
  );
}
