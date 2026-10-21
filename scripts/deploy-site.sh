#!/bin/bash
# План 3 выкладки — вручную с Mac, когда в Actions не прошли ни SSH, ни FTP.
# Хостинг ECO-PRO — REG.RU. Три значения ниже Ник заполняет из ISPmanager (те же, что SSH_USER, SSH_HOST, SITE_DIR).
# Запуск: bash scripts/deploy-site.sh            — собрать и залить
#         bash scripts/deploy-site.sh <папка>    — залить готовую сборку (например, скачанный артефакт site-build)
set -euo pipefail
HOST="uXXXX@serverNNN.hosting.reg.ru"                     # заполнить: SSH_USER@SSH_HOST
DIR="/var/www/uXXXX/data/www/eco-pro.nikalimp.ru/"       # заполнить: SITE_DIR; после переезда — pro-nas.pro
KEY="$HOME/.ssh/eco-pro_deploy"                          # ключ деплоя проекта
APP="$(cd "$(dirname "$0")/.." && pwd)"                   # папка приложения (монорепо: …/apps/site)
OUT="${1:-}"
EXCLUDE=(--exclude '.well-known/' --exclude 'cgi-bin/' --exclude '.ftp-deploy-sync-state.json' --exclude 'api/config.php' --exclude 'api/logs/')   # config.php с токенами живёт только на хостинге

if [ -z "$OUT" ]; then
  cd "$APP"; [ -d node_modules ] || npm ci
  if npm run | grep -q "^  check$"; then npm run check; else npm run build; fi
  OUT="$APP/out"; [ -d "$OUT" ] || OUT="$APP/dist"
fi
ssh -i "$KEY" "$HOST" "mkdir -p '$DIR'"
rsync -az --delete --stats "${EXCLUDE[@]}" -e "ssh -i $KEY" "${OUT%/}/" "$HOST:$DIR"
echo "Готово: $DIR"
