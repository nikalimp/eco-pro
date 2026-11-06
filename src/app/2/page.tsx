import type { Metadata } from "next";
import Home from "../page";

// Версия 2 — светлая главная, которую собирали до швейцарского эксперимента (T49–T53). Для сравнения с /3/.
// Дубль «/»: canonical на главную, в sitemap и llms.txt нет.
export const metadata: Metadata = {
  title: "ECO-PRO — ситуационный центр и экосистема контроля для бизнеса",
  description: "Версия 2 главной ECO-PRO для обсуждения дизайна.",
  alternates: { canonical: "/" },
};

export default Home;
