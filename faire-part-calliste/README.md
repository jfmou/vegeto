# Faire-part de naissance — Calliste, 27 janvier 2025

## Fichiers

| Fichier | Description |
|---------|-------------|
| `faire_part_calliste.pdf` | **PDF final** – A5 paysage, 300 DPI, 2 pages (recto + verso) |
| `recto_preview.jpg` | Aperçu du recto (fond botanique + cercle + texte) |
| `verso_preview.jpg` | Aperçu du verso (photo de Calliste) |
| `generate.py` | Script de génération (à relancer avec les vraies images) |

## Utiliser vos propres images

Le PDF actuel utilise un fond botanique généré et un placeholder pour le verso.
Pour obtenir la version finale avec vos images :

1. Copiez votre **image de fond botanique** dans ce dossier sous le nom `background.jpg`
2. Copiez la **photo de Calliste** dans ce dossier sous le nom `baby.jpg`
3. Relancez le script :
   ```bash
   python3 generate.py
   ```

Le script détecte automatiquement la présence des images et les utilise en priorité.

## Format de sortie

- **Dimensions** : 210 × 148 mm (A5 paysage)
- **Résolution** : 300 DPI
- **Format** : PDF 2 pages (recto + verso)
