#!/usr/bin/env bash
# Genera imágenes provisorias con Flux Schnell (Hugging Face) para Doña Salta.
# Estética: cocina regional salteña, luz cálida, tonos terracota/adobe/ocre.
# Salida: public/assets/img/ai/<nombre>.png  (provisorias, reemplazar por fotos reales)
set -u

MODEL="black-forest-labs/FLUX.1-schnell"
OUT_DIR="public/assets/img/ai"
mkdir -p "$OUT_DIR"

STYLE_FOOD="professional food photography, warm natural light, rustic terracotta and adobe tones, northern Argentina regional cuisine, appetizing, shallow depth of field, high detail, photorealistic, no text, no watermark"
STYLE_AMB="professional photography, warm cozy ambiance, candlelight, rustic adobe restaurant interior, terracotta tones, photorealistic, high detail, no text, no watermark"

# name|width|height|prompt
JOBS=(
"hero|1216|832|Freshly baked Salta-style empanadas on a clay plate over a rustic wooden table, glass of red wine, warm cozy restaurant in the background, ${STYLE_AMB}"
"nosotros|832|1024|Hands making empanadas by hand on a floured rustic wooden table, traditional northern Argentine kitchen, ${STYLE_FOOD}"
"og-image|1216|640|Table spread with salteña empanadas, locro stew and red high-altitude wine, overhead, ${STYLE_FOOD}"
"plato-empanadas|1024|688|Golden baked Salta-style empanadas on a clay plate, ${STYLE_FOOD}"
"plato-locro|1024|688|Bowl of locro, thick corn squash and meat stew with red pepper oil on top, rustic clay bowl, ${STYLE_FOOD}"
"plato-humita|1024|688|Humita en chala, creamy ground corn wrapped in corn husk, traditional, ${STYLE_FOOD}"
"plato-tamales|1024|688|Argentine tamales wrapped in corn husk on a wooden board, ${STYLE_FOOD}"
"plato-asado|1024|688|Argentine asado grill with assorted meat cuts over glowing embers, parrilla close up, ${STYLE_FOOD}"
"plato-vinos|1024|688|Glass of red high-altitude Malbec wine with bottles, Cafayate Calchaqui valley vineyard mood, ${STYLE_FOOD}"
"galeria-01|1024|1024|Salta-style empanadas coming out of a wood-fired clay oven, ${STYLE_FOOD}"
"galeria-02|1024|1024|Warm restaurant dining room with set tables and soft candlelight, ${STYLE_AMB}"
"galeria-03|1024|1024|Table detail with red wine glasses and a regional appetizer board, ${STYLE_FOOD}"
"galeria-04|1024|1024|Close up of meat cuts grilling over embers on a parrilla, ${STYLE_FOOD}"
"galeria-05|1024|1024|Bowl of traditional locro stew on a rustic table, ${STYLE_FOOD}"
"galeria-06|1024|1024|Andean woven textiles and warm decorative details on an adobe wall, ${STYLE_AMB}"
)

ok=0; fail=0
for job in "${JOBS[@]}"; do
  IFS='|' read -r name w h prompt <<< "$job"
  out="$OUT_DIR/$name.jpg"
  # Escapar comillas/backslashes para JSON.
  esc=$(printf '%s' "$prompt" | sed 's/\\/\\\\/g; s/"/\\"/g')
  body="{\"inputs\": \"$esc\", \"parameters\": {\"width\": $w, \"height\": $h}}"

  attempt=1
  while [ $attempt -le 2 ]; do
    echo "[$name] generando (intento $attempt, ${w}x${h})..."
    code=$(curl -s -o "$out" -w "%{http_code}" -X POST \
      "https://router.huggingface.co/hf-inference/models/$MODEL" \
      -H "Authorization: Bearer $HF_TOKEN" \
      -H "Content-Type: application/json" \
      -d "$body")
    if [ "$code" = "200" ]; then
      echo "[$name] OK -> $out ($(wc -c < "$out") bytes)"
      ok=$((ok+1)); break
    elif [ "$code" = "503" ]; then
      echo "[$name] modelo cargando (503), espero 20s y reintento..."
      sleep 20; attempt=$((attempt+1))
    else
      echo "[$name] ERROR HTTP $code: $(head -c 300 "$out")"
      rm -f "$out"; fail=$((fail+1)); break
    fi
  done
done

echo "==== Resumen: $ok generadas, $fail con error ===="
