"use client";
import { useEffect, useState } from "react";

// Рамка первого экрана в виде видоискателя камеры (правки Ника 18.11): уголки по краям,
// слева сверху мигает REC, справа — текущее время в 24-часовом формате ЧЧ:ММ.
// Время считается в браузере: до загрузки скрипта место под него пустое, вёрстка не прыгает.
export function CameraFrame({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="cam">
      <i className="cam-c cam-tl" aria-hidden="true" /><i className="cam-c cam-tr" aria-hidden="true" />
      <i className="cam-c cam-bl" aria-hidden="true" /><i className="cam-c cam-br" aria-hidden="true" />
      <p className="cam-hud cam-rec" aria-hidden="true"><span className="cam-dot" />REC</p>
      <p className="cam-hud cam-time" aria-hidden="true">{time}</p>
      {children}
    </div>
  );
}
