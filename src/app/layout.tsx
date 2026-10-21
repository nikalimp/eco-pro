import type { Metadata } from "next";
import "@fontsource-variable/geologica/wght.css"; // Geologica — основной шрифт по гайдлайну, локально
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { JsonLd } from "@/components/json-ld";
import { MeetingModal } from "@/components/meeting-modal";
import { Reveal } from "@/components/reveal";
import { graph, orgSchema, personSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: site.locale, siteName: site.name, title: site.title, description: site.description, url: site.url, images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }] },
  robots: site.noindex ? { index: false, follow: false } : { index: true, follow: true },
};

const metrikaScript = (id: number) =>
  `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${id}','ym');ym(${id},'init',{ssr:true,webvisor:true,clickmap:true,referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`;


// Появление блоков при прокрутке: [data-reveal] получает .in, когда попадает в экран
// Подсветка карточек .spot за курсором
const spotScript = `(function(){if(!matchMedia('(hover: hover)').matches)return;var raf=0,ev=null;document.addEventListener('pointermove',function(e){ev=e;if(raf)return;raf=requestAnimationFrame(function(){raf=0;var t=ev.target&&ev.target.closest&&ev.target.closest('.spot');if(!t)return;var r=t.getBoundingClientRect();t.style.setProperty('--mx',(ev.clientX-r.left)+'px');t.style.setProperty('--my',(ev.clientY-r.top)+'px')})},{passive:true})})();`;

// Тема до отрисовки (без мигания): выбор пользователя, иначе системная
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');var t=null;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} suppressHydrationWarning>
      <head>
        {/* Метка «JS работает» — до отрисовки, чтобы анимации появления не мигали */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {site.metrikaId > 0 && <script dangerouslySetInnerHTML={{ __html: metrikaScript(site.metrikaId) }} />}
        <JsonLd data={graph(websiteSchema, orgSchema, personSchema)} />
      </head>
      <body className="flex min-h-screen flex-col">
        {site.metrikaId > 0 && (
          <noscript><div><img src={`https://mc.yandex.ru/watch/${site.metrikaId}`} style={{ position: "absolute", left: "-9999px" }} alt="" /></div></noscript>
        )}
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2">К содержанию</a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <MeetingModal />
        <CookieBanner />
        <Reveal />
        <script dangerouslySetInnerHTML={{ __html: spotScript }} />
      </body>
    </html>
  );
}
