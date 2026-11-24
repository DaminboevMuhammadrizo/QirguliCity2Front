#!/usr/bin/env bash
# originals/ dagi rasmlardan public/img/ ga yengil AVIF + WebP versiyalar yasaydi.
# Ishlatish: bash scripts/optimize-images.sh   (ImageMagick kerak)
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=public/img
rm -rf "$OUT"; mkdir -p "$OUT"
WIDTHS=(480 800 1200)
META=src/images.json
echo "{" > "$META"

make() { # make <src> <name>
  local src=$1 name=$2
  for w in "${WIDTHS[@]}"; do
    magick "$src" -auto-orient -resize "${w}x>" -strip -quality 52 "$OUT/$name-$w.avif"
    magick "$src" -auto-orient -resize "${w}x>" -strip -quality 70 "$OUT/$name-$w.webp"
  done
  local dims lqip
  dims=$(magick "$src" -auto-orient -resize "1200x>" -format "%w %h" info:)
  # 24px li xira placeholder (base64), rasm yuklanguncha ko'rinadi
  lqip=$(magick "$src" -auto-orient -resize 24x -strip -quality 40 webp:- | base64 -w0)
  printf '  "%s": { "w": %s, "h": %s, "lqip": "data:image/webp;base64,%s" },\n' "$name" ${dims% *} ${dims#* } "$lqip" >> "$META"
}

make originals/dom.png dom
i=1
for f in originals/photo_*.jpg; do make "$f" "g$i"; i=$((i+1)); done

# oxirgi vergulni olib tashlash
sed -i '$ s/,$//' "$META"; echo "}" >> "$META"

# logo va favicon
magick originals/image.png -crop 470x370+85+115 +repage \( +clone -colorspace gray -level 18%,75% \) \
  -alpha off -compose copy_opacity -composite -fill "#f3e6cc" -colorize 100 -resize 360x -strip "$OUT/logo-tab.png"
magick originals/image.png -resize 96x96 -strip -define png:compression-level=9 "$OUT/favicon.png"
magick originals/dom.png -resize 1200x630^ -gravity center -extent 1200x630 -strip -quality 78 "$OUT/og.jpg"
du -sh "$OUT"
