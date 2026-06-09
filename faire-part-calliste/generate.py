#!/usr/bin/env python3
"""
Générateur de faire-part de naissance pour Calliste
Né le 27 janvier 2025
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import math
import random
import os
import sys

# ─────────────────────────────────────────────────────────
# Configuration
# ─────────────────────────────────────────────────────────
OUTPUT_PDF   = "/tmp/faire_part/faire_part_calliste.pdf"
BG_IMAGE     = "/tmp/faire_part/background.jpg"
BABY_IMAGE   = "/tmp/faire_part/baby.jpg"

FONT_ITALIC  = "/usr/share/fonts/opentype/ebgaramond/EBGaramond12-Italic.otf"
FONT_REGULAR = "/usr/share/fonts/opentype/ebgaramond/EBGaramond12-Regular.otf"

# A5 paysage à 300 DPI
DPI    = 300
WIDTH  = 2480   # 210mm
HEIGHT = 1748   # 148mm

# Couleurs
CREAM_BG     = (248, 243, 234)
SAGE_BRANCH  = (95, 120, 88)
GOLD_BRANCH  = (162, 128, 72)
RED_BERRY    = (185, 75, 60)
PEACH_FLOWER = (232, 196, 165)
DARK_BRANCH  = (100, 85, 65)

# Cercle teal-vert (tons des branches)
CIRCLE_COLOR = (88, 117, 105)  # vert bleuté élégant
TEXT_COLOR   = (255, 252, 245)  # blanc crème

# ─────────────────────────────────────────────────────────
# Dessin du fond botanique
# ─────────────────────────────────────────────────────────
def draw_pine_needles(draw, cx, cy, angle_deg, length, color, num_pairs=6):
    """Dessine une branche de pin avec ses aiguilles."""
    angle = math.radians(angle_deg)
    # Tige principale
    ex = cx + math.cos(angle) * length
    ey = cy + math.sin(angle) * length
    lw = max(2, int(length / 80))
    draw.line([(cx, cy), (ex, ey)], fill=color, width=lw)

    # Aiguilles le long de la tige
    for i in range(1, num_pairs + 1):
        t = i / (num_pairs + 1)
        mx = cx + math.cos(angle) * length * t
        my = cy + math.sin(angle) * length * t
        needle_len = length * 0.18 * (1 - 0.3 * abs(t - 0.5))
        for side in [+1, -1]:
            na = angle + side * math.radians(30)
            nx = mx + math.cos(na) * needle_len
            ny = my + math.sin(na) * needle_len
            draw.line([(mx, my), (nx, ny)], fill=color, width=max(1, lw - 1))


def draw_berry_cluster(draw, x, y, color, count=4, radius=14):
    """Dessine un bouquet de baies."""
    rng = random.Random(int(x * 7 + y * 3))
    for _ in range(count):
        ox = rng.randint(-radius * 2, radius * 2)
        oy = rng.randint(-radius * 2, radius * 2)
        r = rng.randint(radius - 4, radius + 4)
        draw.ellipse([x+ox-r, y+oy-r, x+ox+r, y+oy+r], fill=color)
    # Tige fine
    draw.line([(x, y + 8), (x + rng.randint(-20, 20), y + 45)],
              fill=DARK_BRANCH, width=2)


def draw_flower(draw, x, y, color, size=28):
    """Dessine une fleur simple à 6 pétales."""
    for i in range(6):
        a = math.radians(i * 60)
        px = x + math.cos(a) * size
        py = y + math.sin(a) * size
        draw.ellipse([px - size//2, py - size//2,
                      px + size//2, py + size//2], fill=color)
    # Centre
    draw.ellipse([x - size//3, y - size//3, x + size//3, y + size//3],
                 fill=(220, 170, 130))


def create_botanical_background(width, height):
    """Crée le fond botanique façon aquarelle."""
    img = Image.new("RGB", (width, height), CREAM_BG)
    draw = ImageDraw.Draw(img)

    # Ajouter quelques speckles subtils
    rng = random.Random(42)
    for _ in range(1800):
        sx = rng.randint(0, width)
        sy = rng.randint(0, height)
        c = rng.randint(190, 220)
        r = rng.randint(1, 3)
        draw.ellipse([sx-r, sy-r, sx+r, sy+r], fill=(c, c, c-5))

    # Positions des branches (grid + variation)
    branch_data = []
    cols, rows = 7, 5
    for col in range(cols):
        for row in range(rows):
            cx = int(width * (col + 0.5) / cols) + rng.randint(-80, 80)
            cy = int(height * (row + 0.5) / rows) + rng.randint(-60, 60)
            angle = rng.choice([-45, -30, -15, 0, 15, 30, 45, 135, 150, 165])
            length = rng.randint(200, 380)
            btype = rng.choice(["sage", "sage", "sage", "gold", "dark"])
            branch_data.append((cx, cy, angle, length, btype))

    # Dessiner les branches
    for cx, cy, angle, length, btype in branch_data:
        if btype == "sage":
            color = (
                SAGE_BRANCH[0] + rng.randint(-15, 15),
                SAGE_BRANCH[1] + rng.randint(-15, 15),
                SAGE_BRANCH[2] + rng.randint(-10, 10),
            )
        elif btype == "gold":
            color = (
                GOLD_BRANCH[0] + rng.randint(-20, 20),
                GOLD_BRANCH[1] + rng.randint(-15, 15),
                GOLD_BRANCH[2] + rng.randint(-15, 15),
            )
        else:
            color = DARK_BRANCH
        draw_pine_needles(draw, cx, cy, angle, length, color, num_pairs=rng.randint(5, 9))

    # Baies (clusters)
    for _ in range(55):
        bx = rng.randint(50, width - 50)
        by = rng.randint(50, height - 50)
        bc = (
            RED_BERRY[0] + rng.randint(-20, 10),
            RED_BERRY[1] + rng.randint(-10, 15),
            RED_BERRY[2] + rng.randint(-10, 15),
        )
        draw_berry_cluster(draw, bx, by, bc, count=rng.randint(3, 6))

    # Fleurs
    for _ in range(30):
        fx = rng.randint(80, width - 80)
        fy = rng.randint(80, height - 80)
        fc = (
            PEACH_FLOWER[0] + rng.randint(-20, 20),
            PEACH_FLOWER[1] + rng.randint(-20, 20),
            PEACH_FLOWER[2] + rng.randint(-10, 10),
        )
        draw_flower(draw, fx, fy, fc, size=rng.randint(22, 36))

    # Léger flou pour effet aquarelle
    img = img.filter(ImageFilter.GaussianBlur(radius=0.8))
    return img


# ─────────────────────────────────────────────────────────
# Création du RECTO
# ─────────────────────────────────────────────────────────
def create_recto():
    print("Création du recto…")

    if os.path.exists(BG_IMAGE):
        print(f"  → Utilisation du fond réel : {BG_IMAGE}")
        bg = Image.open(BG_IMAGE).convert("RGB")
        # Crop/scale pour remplir le format
        ratio = max(WIDTH / bg.width, HEIGHT / bg.height)
        nw, nh = int(bg.width * ratio), int(bg.height * ratio)
        bg = bg.resize((nw, nh), Image.LANCZOS)
        left = (nw - WIDTH) // 2
        top  = (nh - HEIGHT) // 2
        bg = bg.crop((left, top, left + WIDTH, top + HEIGHT))
    else:
        print("  → Fond botanique généré programmatiquement")
        bg = create_botanical_background(WIDTH, HEIGHT)

    # ── Cercle central ──
    draw = ImageDraw.Draw(bg, "RGBA")

    cx, cy   = WIDTH // 2, HEIGHT // 2
    radius   = int(HEIGHT * 0.38)

    # Ombre douce derrière le cercle
    shadow_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow_layer)
    for delta in range(25, 0, -1):
        alpha = int(80 * (1 - delta / 25))
        sd.ellipse([cx - radius - delta, cy - radius - delta,
                    cx + radius + delta, cy + radius + delta],
                   fill=(0, 0, 0, alpha))
    bg = Image.alpha_composite(bg.convert("RGBA"), shadow_layer).convert("RGB")
    draw = ImageDraw.Draw(bg)

    # Cercle principal (couleur vert-bleuté unie)
    draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius],
                 fill=CIRCLE_COLOR)

    # ── Texte ──
    # Prénom en grand italique
    size_name = int(HEIGHT * 0.175)
    while size_name > 40:
        try:
            font_name = ImageFont.truetype(FONT_ITALIC, size_name)
            bbox = font_name.getbbox("Calliste")
            tw = bbox[2] - bbox[0]
            if tw < radius * 1.65:
                break
            size_name -= 4
        except:
            break

    # Date en plus petit
    size_date = int(size_name * 0.35)
    font_date = ImageFont.truetype(FONT_REGULAR, size_date)

    name_text = "Calliste"
    date_text = "27 janvier 2025"

    # Mesures
    bbox_name = font_name.getbbox(name_text)
    tw_name   = bbox_name[2] - bbox_name[0]
    th_name   = bbox_name[3] - bbox_name[1]

    bbox_date = font_date.getbbox(date_text)
    tw_date   = bbox_date[2] - bbox_date[0]
    th_date   = bbox_date[3] - bbox_date[1]

    gap = int(size_name * 0.22)
    total_h = th_name + gap + th_date

    # Centrage vertical dans le cercle
    y_name = cy - total_h // 2 - bbox_name[1]
    y_date = y_name + th_name + gap

    # Trait décoratif fin
    line_y   = y_name + th_name + gap // 2
    line_len = int(radius * 0.55)
    draw.line([(cx - line_len, line_y), (cx + line_len, line_y)],
              fill=(*TEXT_COLOR, 200), width=2)

    # Ombre légère sur le texte
    shadow_offset = 3
    for dx, dy in [(shadow_offset, shadow_offset)]:
        draw.text((cx - tw_name // 2 + dx, y_name + dy),
                  name_text, font=font_name, fill=(30, 50, 40))
    draw.text((cx - tw_name // 2, y_name),
              name_text, font=font_name, fill=TEXT_COLOR)

    # Date
    draw.text((cx - tw_date // 2, y_date),
              date_text, font=font_date, fill=TEXT_COLOR)

    print("  ✓ Recto créé")
    return bg


# ─────────────────────────────────────────────────────────
# Création du VERSO
# ─────────────────────────────────────────────────────────
def create_verso():
    print("Création du verso…")

    if os.path.exists(BABY_IMAGE):
        print(f"  → Utilisation de la photo : {BABY_IMAGE}")
        photo = Image.open(BABY_IMAGE).convert("RGB")
    else:
        print("  → Photo non trouvée – création d'un placeholder")
        photo = Image.new("RGB", (1200, 1800), (230, 220, 210))
        d = ImageDraw.Draw(photo)
        d.text((50, 50), "[ Photo de Calliste ]",
               font=ImageFont.truetype(FONT_REGULAR, 80), fill=(150, 140, 130))

    # Remplir le format paysage en conservant le ratio (centré/rogné)
    ratio = max(WIDTH / photo.width, HEIGHT / photo.height)
    nw    = int(photo.width  * ratio)
    nh    = int(photo.height * ratio)
    photo = photo.resize((nw, nh), Image.LANCZOS)
    left  = (nw - WIDTH)  // 2
    top   = (nh - HEIGHT) // 2
    verso = photo.crop((left, top, left + WIDTH, top + HEIGHT))

    print("  ✓ Verso créé")
    return verso


# ─────────────────────────────────────────────────────────
# Assemblage PDF
# ─────────────────────────────────────────────────────────
def main():
    recto = create_recto()
    verso = create_verso()

    # Sauvegarde intermédiaire pour debug
    recto.save("/tmp/faire_part/recto_preview.jpg", quality=95)
    verso.save("/tmp/faire_part/verso_preview.jpg", quality=95)
    print("  Aperçus JPG sauvegardés")

    # Export PDF haute résolution
    recto_pdf = recto.convert("RGB")
    verso_pdf = verso.convert("RGB")
    recto_pdf.save(
        OUTPUT_PDF,
        save_all=True,
        append_images=[verso_pdf],
        resolution=DPI,
        quality=95,
    )
    size_kb = os.path.getsize(OUTPUT_PDF) // 1024
    print(f"\n✅ PDF généré : {OUTPUT_PDF} ({size_kb} Ko)")
    print(f"   Format : {WIDTH}×{HEIGHT}px – {WIDTH/DPI*25.4:.0f}×{HEIGHT/DPI*25.4:.0f}mm – {DPI} DPI")


if __name__ == "__main__":
    main()
