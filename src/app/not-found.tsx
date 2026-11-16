import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/container";
import { Button } from "@/components/ds";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="Страница не найдена" answer="Возможно, адрес изменился. Начните с главной или загляните в блог.">
      <div className="mt-9 flex flex-wrap gap-3">
        <Button asChild><Link href="/">На главную</Link></Button>
        <Button asChild variant="secondary"><Link href="/blog/">Блог</Link></Button>
      </div>
    </PageHero>
  );
}
