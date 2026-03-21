import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || "master";

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "dist",
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "src",
    },
    accept: ['image/*'],
  },
  schema: {
    collections: [
      {
        name: "homePage",
        label: "Homepage",
        path: "src/_data",
        format: "json",
        match: {
          include: "homepage",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "rich-text",
            name: "heroTagline",
            label: "[Hero] Texte d'accroche (riche)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "string",
            name: "aquaponieTitle",
            label: "[Aquaponie] Titre de section",
            required: true,
          },
          {
            type: "rich-text",
            name: "aquaponieIntro",
            label: "[Aquaponie] Introduction (riche)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "rich-text",
            name: "aquaponieSchematicIntro",
            label: "[Aquaponie] Intro du bloc schéma (riche)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "rich-text",
            name: "aquaponieSchematicLead",
            label: "[Aquaponie] Phrase d'accroche du système fermé (riche)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "image",
            name: "aquaponieSchematicImage",
            label: "[Aquaponie] Image du schéma",
            required: true,
          },
          {
            type: "string",
            name: "aquaponieSchematicImageAlt",
            label: "[Aquaponie] Texte alternatif de l'image du schéma",
            required: true,
          },
          {
            type: "object",
            name: "aquaponieSchematicItems",
            label: "[Aquaponie] Éléments du système (poissons, bactéries, plantes)",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Titre",
                required: true,
              },
              {
                type: "rich-text",
                name: "text",
                label: "Texte (riche)",
                required: true,
                parser: {
                  type: "markdown",
                },
              },
            ],
          },
          {
            type: "rich-text",
            name: "aquaponieConclusion",
            label: "[Aquaponie] Conclusion (riche)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "string",
            name: "whyTitle",
            label: "[Pourquoi] Titre de section",
            required: true,
          },
          {
            type: "rich-text",
            name: "whyIntro",
            label: "[Pourquoi] Introduction (riche)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "object",
            name: "whyCategories",
            label: "[Pourquoi] Colonnes / catégories",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Titre",
                required: true,
              },
              {
                type: "string",
                name: "items",
                label: "Points (1 ligne = 1 point)",
                list: true,
                required: true,
              },
            ],
          },
          {
            type: "rich-text",
            name: "whyFooter1",
            label: "[Pourquoi] Footer 1 (riche)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "rich-text",
            name: "whyFooter2",
            label: "[Pourquoi] Footer 2 (riche)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "string",
            name: "whySourceUrl",
            label: "[Pourquoi] Lien source limites planétaires",
            required: true,
          },
          {
            type: "string",
            name: "prestationsTitle",
            label: "[Prestations] Titre de section",
            required: true,
          },
          {
            type: "rich-text",
            name: "prestationsIntroContent",
            label: "[Prestations] Introduction (riche)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "rich-text",
            name: "prestationsFooter",
            label: "[Prestations] Footer (riche)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "object",
            name: "prestations",
            label: "[Prestations] Blocs de prestation",
            list: true,
            fields: [
              {
                type: "string",
                name: "slug",
                label: "Identifiant technique",
                required: true,
              },
              {
                type: "string",
                name: "title",
                label: "Titre",
                required: true,
              },
              {
                type: "image",
                name: "image",
                label: "Image",
                required: true,
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Alt",
                required: true,
              },
              {
                type: "rich-text",
                name: "paragraph1",
                label: "Paragraphe 1 (riche)",
                required: true,
                parser: {
                  type: "markdown",
                },
              },
              {
                type: "rich-text",
                name: "paragraph2",
                label: "Paragraphe 2 (riche)",
                required: true,
                parser: {
                  type: "markdown",
                },
              },
              {
                type: "rich-text",
                name: "paragraph3",
                label: "Paragraphe 3 optionnel (riche)",
                required: false,
                parser: {
                  type: "markdown",
                },
              },
            ],
          },
          {
            type: "string",
            name: "realisationsTitle",
            label: "[Réalisations] Titre de section",
            required: true,
          },
          {
            type: "rich-text",
            name: "realisationsIntro",
            label: "[Réalisations] Introduction (riche)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "object",
            name: "realisationsCards",
            label: "[Réalisations] Cartes",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Titre",
                required: true,
              },
              {
                type: "string",
                name: "link",
                label: "Lien",
                required: true,
              },
              {
                type: "image",
                name: "image",
                label: "Image",
                required: true,
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Alt",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "realisationsCta",
            label: "[Réalisations] Bouton CTA",
            fields: [
              {
                type: "string",
                name: "link",
                label: "Lien",
                required: true,
              },
              {
                type: "string",
                name: "topText",
                label: "Texte ligne 1",
                required: true,
              },
              {
                type: "string",
                name: "bottomText",
                label: "Texte ligne 2",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "helioCta",
            label: "[Hélio] Bloc CTA",
            fields: [
              {
                type: "image",
                name: "image",
                label: "Image de fond",
                required: true,
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Alt",
                required: true,
              },
              {
                type: "string",
                name: "leadHighlight",
                label: "Accroche (partie en gras)",
                required: true,
              },
              {
                type: "string",
                name: "leadRest",
                label: "Accroche (suite sur la ligne suivante)",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "link",
                label: "Lien",
                required: true,
              },
              {
                type: "string",
                name: "topText",
                label: "Texte ligne 1",
                required: true,
              },
              {
                type: "string",
                name: "bottomText",
                label: "Texte ligne 2",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "aboutTitle",
            label: "[Qui sommes-nous] Titre de section",
            required: true,
          },
          {
            type: "rich-text",
            name: "aboutIntro",
            label: "[Qui sommes-nous] Introduction (riche)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "object",
            name: "ourTeamImages",
            label: "[Qui sommes-nous] Galerie équipe",
            list: true,
            fields: [
              {
                type: "image",
                name: "image",
                label: "Image",
                required: true,
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Alt",
                required: true,
              },
            ],
          },
          {
            type: "rich-text",
            name: "trainingIntro",
            label: "[Qui sommes-nous] Intro galerie formations (riche)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "object",
            name: "trainingGallery",
            label: "[Qui sommes-nous] Galerie formations",
            list: true,
            fields: [
              {
                type: "string",
                name: "link",
                label: "Lien",
                required: true,
              },
              {
                type: "string",
                name: "linkTitle",
                label: "Title (infobulle)",
                required: true,
              },
              {
                type: "image",
                name: "image",
                label: "Image",
                required: true,
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Alt",
                required: true,
              },
              {
                type: "rich-text",
                name: "text",
                label: "Texte sous image (riche)",
                required: true,
                parser: {
                  type: "markdown",
                },
              },
            ],
          },
        ],
      },
      {
        name: "helioPage",
        label: "Page Serre Hélio",
        path: "src/pages",
        format: "md",
        match: {
          include: "serre-helio",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "lead",
            label: "Chapô",
            required: true,
          },
          {
            type: "string",
            name: "seoDescription",
            label: "Meta description SEO",
            required: false,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "mainImg",
            label: "Image de partage (Open Graph)",
            required: false,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Image principale de la page",
            required: false,
          },
          {
            type: "string",
            name: "heroImageAlt",
            label: "Texte alternatif image principale",
            required: false,
          },
          {
            type: "object",
            name: "characteristics",
            label: "Bloc caractéristiques",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Titre du bloc",
                required: false,
              },
              {
                type: "string",
                name: "dimensions",
                label: "Dimensions (1 ligne par entrée)",
                list: true,
                required: false,
              },
              {
                type: "string",
                name: "weight",
                label: "Poids (1 ligne par entrée)",
                list: true,
                required: false,
              },
              {
                type: "string",
                name: "fishTankVolume",
                label: "Volume bac poissons (1 ligne par entrée)",
                list: true,
                required: false,
              },
              {
                type: "string",
                name: "plantCount",
                label: "Nombre de plants (1 ligne par entrée)",
                list: true,
                required: false,
              },
            ],
          },
          {
            type: "string",
            name: "permalink",
            label: "Permalien",
            required: true,
            ui: {
              component: "hidden",
            },
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            ui: {
              component: "hidden",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenu",
            isBody: true,
          },
        ],
      },
      {
        name: "realisation",
        label: "Realisations",
        path: "src/realisations",
        format: "md",
        defaultItem: () => {
          return {
            tags: ['realisation']
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "location",
            label: "Localisation",
            required: true,
          },
          {
            type: "string",
            name: "baseline",
            label: "Sous-titre"
          },
          {
            type: "image",
            name: "mainImg",
            label: "Image principale",
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Catégories",
            list: true,
            required: true,
            options: [
              {
                value: "realisation",
                label: "Réalisation"
              },
              {
                value: "conception",
                label: "Conception"
              },
              {
                value: "installation",
                label: "Installation"
              },
              {
                value: "transmission",
                label: "Transmission"
              },
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            label: "Bouton d'action",
            name: "cta",
            type: "object",
            fields: [
              {
                label: "Texte du bouton",
                name: "text",
                type: "string"
              }, 
              {
                label: "Lien cible",
                name: "link",
                type: "string"
              }
            ],
          },
          {
            label: 'Livre d\'or',
            name: 'testimonial',
            type: 'object',
            fields: [
              {
                label: 'Citation',
                name: 'quote',
                type: 'string',
                ui: {
                  component: 'textarea',
                },
              },
              {
                label: "Image",
                type: "image",
                name: "image"
              },
              {
                label: 'Auteur',
                name: 'author',
                type: 'string',
              },
              {
                label: 'Rôle',
                name: 'role',
                type: 'string',
              }
            ],
          },
          {
            type: "datetime",
            name: "date",
            label: "Date (Utilisé pour afficher les articles par date décroissante)",
            required: true,
          },
          {
            name: 'draft',
            label: 'Brouillon',
            type: 'boolean',
            required: true,
            description: "Si coché, l'article ne sera pas publié",
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: '<Your Search Token>',
      stopwordLanguages: ['fra']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },
});
