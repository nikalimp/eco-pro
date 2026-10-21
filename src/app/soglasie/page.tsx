import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container, Section } from "@/components/container";
import { Crumbs } from "@/components/crumbs";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description: `Текст согласия на обработку персональных данных, которое посетитель сайта даёт ${site.legalName} при отправке формы заявки или брифинга.`,
  alternates: { canonical: "/soglasie/" },
};

// Согласие по ст. 9 152-ФЗ. Реквизиты — из src/content/site.ts.
export default function Consent() {
  const email = site.legal.privacyEmail;
  return (
    <Section className="pt-10">
      <Container className="max-w-3xl">
        <Crumbs items={[{ name: "Главная", path: "/" }, { name: "Согласие на обработку персональных данных" }]} />
        <h1 className="text-center text-3xl font-bold tracking-tight text-balance">Согласие на обработку персональных данных</h1>
        <div className="prose-site mt-8">
          <p>
            Отправляя форму на сайте {site.url}, я свободно, своей волей и в своём интересе даю согласие {site.legalName} (ИНН {site.legal.inn}, ОГРН {site.legal.ogrn}, адрес: {site.contacts.address.city},{" "}
            {site.contacts.address.street}) на обработку моих персональных данных на условиях ниже.
          </p>
          <h2>Какие данные</h2>
          <p>Имя, номер телефона, адрес электронной почты, ответы на вопросы брифинга.</p>
          <h2>Цель</h2>
          <p>Связаться со мной, согласовать и провести встречу, подготовить предложение по услугам экосистемы ECO-PRO.</p>
          <h2>Действия с данными</h2>
          <p>Сбор, запись, систематизация, накопление, хранение, уточнение, использование, блокирование, удаление и уничтожение — с использованием средств автоматизации и без них.</p>
          <h2>Срок и отзыв</h2>
          <p>Согласие действует до достижения цели обработки или до его отзыва. Отозвать согласие можно, написав на {email}.</p>
          <p>
            Подробнее — в <a href="/politika-konfidencialnosti/">политике обработки персональных данных</a>.
          </p>
        </div>
      </Container>
    </Section>
  );
}
