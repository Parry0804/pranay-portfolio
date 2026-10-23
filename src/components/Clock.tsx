"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
  hour12: false,
});

// Live New Delhi time. Renders a stable placeholder on the server.
export function Clock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={className} suppressHydrationWarning>
      New Delhi {time} IST
    </span>
  );
}
