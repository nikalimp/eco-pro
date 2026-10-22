# ECO-PRO — статус

Обновлено: 21.10.2026 · `website:update`, отчёты — [update-2026-10-21](reports/update-2026-10-21.md), [повторная сверка](reports/update-2026-10-21-recheck.md)

## Где сейчас
- **Этап:** сайт v0.10 живёт на тестовом адресе. Следующие шаги — выкладка через Actions, затем переезд на домен клиента и контент-завод.
- **Тест:** https://eco-pro.nikalimp.ru
- **Боевой домен:** pro-nas.pro — пока там старый сайт на Tilda. 301 со старых адресов лежат в `public/.htaccess`.
- **Репозиторий:** nikalimp/eco-pro — источник правды. Папка `~/Desktop/ECO-PRO` приводится к `main` (решение Ника 21.10); `materials/` и `deploy/` остаются только локально.

## Хостинг и выкладка
- **Хостинг:** REG.RU (Apache за nginx, ISPmanager). SSH из GitHub Actions закрыт, поэтому выкладка идёт по FTP.
- **HTTPS:** редирект включается галочкой в ISPmanager. В `.htaccess` только www → без www и слеш на конце.
- **Выкладка:** `.github/workflows/deploy.yml` → `nikalimp/deploy-kit` (SSH → FTP). План 3 — `scripts/deploy-site.sh` с Mac.
- **Автовыкладка кода (с 22.10):** PR из веток `claude/*` проверяет `.github/workflows/pr.yml` (deploy-kit): зелёный `npm run check` — PR сливается сам и выкладывается тем же запуском. Ника ждут только PR с меткой `needs-nik`: `.github/`, `publish.json`, секреты, удаление страниц без 301, юридические тексты. Статьи контент-завода — сразу в `main`.
- **Паспорт:** `publish.json`, адаптер `ssh-ftp`, режим `auto`.
- **Секреты Actions:** `FTP_HOST`, `FTP_USER`, `FTP_PASS`, `FTP_DIR=www/eco-pro.nikalimp.ru/`.
- **Не в git:** `public/api/config.php` с токеном бота и почтой лежит только на хостинге. Выкладка его не трогает.
- **Заявки:** `public/api/lead.php` → почта и Telegram (без персональных данных). Журнал — `api/logs/tg.log`.

## Открытые вопросы
| Что | Кто | Статус |
|---|---|---|
| Секреты FTP в репозитории | Ник | готово 21.10 |
| Номер счётчика Метрики (`site.metrikaId`) | Ник | до переезда |
| Видео `video/pro-test.mp4` | клиент | ждём |
| 3 расхождения в цифрах кейсов | Сергей | ждём подтверждения |
| Актуальные сертификаты Parsec, Smartec, ITK, TRASSIR (у текущих истёк срок) | клиент | ждём |
| Telegram-уведомления о заявках | — | проверено 21.10, tg-check.php удалён |
| Хабы `/services/`, `/industries/`, `/blog/` короче 250 слов: дописать или оставить в исключениях | Ник | вопрос |
| Перенос контент-завода в `content/factory/` | `/content-factory:update` | следующий шаг |
| Редизайн 22.10 (тёмная тема, капс, видоискатель) — показать Сергею, «да» по моно-шрифту | Ник | ждём |
| Бот-админ в @vynosim_za, секреты `TELEGRAM_*`, `TELEGRAPH_TOKEN` (T35) | Ник | ждём |

## Переезд на pro-nas.pro
1. A-запись домена на REG.RU, сайт в ISPmanager, SSL, галочка HTTPS.
2. `FTP_DIR` → `www/pro-nas.pro/`, `url` в `publish.json`, `deploy.yml` и `content/content.config.json`, `site.url`.
3. Подключить Метрику, Вебмастер и Search Console, проверить 301 со старых адресов.
