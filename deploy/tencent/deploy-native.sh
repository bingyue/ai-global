#!/usr/bin/env bash
set -euo pipefail

app_dir=/opt/ai-global
cd "$app_dir"
test "$PWD" = "$app_dir"

git pull --ff-only origin main
corepack enable
corepack prepare pnpm@11.15.1 --activate
pnpm install --frozen-lockfile
pnpm build

rm -rf .next/standalone/public .next/standalone/.next/static
cp -R public .next/standalone/public
mkdir -p .next/standalone/.next
cp -R .next/static .next/standalone/.next/static
mkdir -p .next/standalone/.next/cache

sudo install -m 0644 deploy/systemd/ai-global.service /etc/systemd/system/ai-global.service
sudo systemctl daemon-reload
sudo systemctl enable --now ai-global.service

if sudo test -s /etc/nginx/ssl/aigoglobal.net.pem && sudo test -s /etc/nginx/ssl/aigoglobal.net.key; then
  sudo install -m 0644 deploy/nginx/aigoglobal.net.conf /etc/nginx/sites-available/aigoglobal.net
else
  sudo install -m 0644 deploy/nginx/aigoglobal.http.conf /etc/nginx/sites-available/aigoglobal.net
fi
sudo ln -sfn /etc/nginx/sites-available/aigoglobal.net /etc/nginx/sites-enabled/aigoglobal.net
sudo nginx -t
sudo systemctl reload nginx

curl --fail --silent --show-error http://127.0.0.1:3000/api/health
