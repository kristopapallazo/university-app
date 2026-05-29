#!/usr/bin/env bash
# Download official UAMD SVG logo to src/assets/university-official.svg
set -e
URL="https://upload.wikimedia.org/wikipedia/commons/8/86/Universiteti_%22Aleksand%C3%ABr_Moisiu%22.svg"
OUT="src/assets/university-official.svg"
mkdir -p "$(dirname "$OUT")"
if command -v curl >/dev/null 2>&1; then
  curl -L "$URL" -o "$OUT"
elif command -v wget >/dev/null 2>&1; then
  wget -O "$OUT" "$URL"
else
  echo "curl or wget required to download the logo"
  exit 1
fi

echo "Saved official logo to $OUT"
