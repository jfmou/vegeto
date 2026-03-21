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
            label: "Texte intro hero (riche, retours ligne conservés, images ignorées)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "string",
            name: "aquaponieTitle",
            label: "Titre section Aquaponie",
            required: true,
          },
          {
            type: "rich-text",
            name: "aquaponieIntro",
            label: "Intro section Aquaponie (riche, retours ligne conservés, images ignorées)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "rich-text",
            name: "aquaponieSchematicIntro",
            label: "Texte schéma aquaponie (riche, retours ligne conservés, images ignorées)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "rich-text",
            name: "aquaponieSchematicLead",
            label: "Phrase d'introduction du système fermé (riche, retours ligne conservés, images ignorées)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "object",
            name: "aquaponieSchematicItems",
            label: "Éléments du système (poissons, bactéries, plantes)",
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
                label: "Description (riche, retours ligne conservés, images ignorées)",
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
            label: "Conclusion section Aquaponie (riche, retours ligne conservés, images ignorées)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "string",
            name: "whyTitle",
            label: "Titre section Pourquoi",
            required: true,
          },
          {
            type: "rich-text",
            name: "whyIntro",
            label: "Introduction section Pourquoi (riche, retours ligne conservés, images ignorées)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "object",
            name: "whyCategories",
            label: "Colonnes Pourquoi",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Titre colonne",
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
            label: "Footer 1 section Pourquoi (riche, retours ligne conservés, images ignorées)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "rich-text",
            name: "whyFooter2",
            label: "Footer 2 section Pourquoi (riche, retours ligne conservés, images ignorées)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "string",
            name: "whySourceUrl",
            label: "Lien source limites planétaires",
            required: true,
          },
          {
            type: "string",
            name: "prestationsTitle",
            label: "Titre section Prestations",
            required: true,
          },
          {
            type: "rich-text",
            name: "prestationsIntroContent",
            label: "Introduction Prestations (champ unique riche, images ignorées)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "rich-text",
            name: "prestationsFooter",
            label: "Footer section Prestations (riche, retours ligne conservés, images ignorées)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "object",
            name: "prestations",
            label: "Blocs prestations",
            list: true,
            fields: [
              {
                type: "string",
                name: "slug",
                label: "Identifiant CSS (conception, installation, transmission)",
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
                label: "Texte alternatif image",
                required: true,
              },
              {
                type: "rich-text",
                name: "paragraph1",
                label: "Paragraphe 1 (riche, retours ligne conservés, images ignorées)",
                required: true,
                parser: {
                  type: "markdown",
                },
              },
              {
                type: "rich-text",
                name: "paragraph2",
                label: "Paragraphe 2 (riche, retours ligne conservés, images ignorées)",
                required: true,
                parser: {
                  type: "markdown",
                },
              },
              {
                type: "rich-text",
                name: "paragraph3",
                label: "Paragraphe 3 optionnel (riche, retours ligne conservés, images ignorées)",
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
            label: "Titre section Réalisations",
            required: true,
          },
          {
            type: "rich-text",
            name: "realisationsIntro",
            label: "Intro section Réalisations (riche, retours ligne conservés, images ignorées)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "object",
            name: "realisationsCards",
            label: "Cartes réalisations",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Titre de la réalisation",
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
                label: "Texte alternatif image",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "realisationsCta",
            label: "CTA Réalisations",
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
            label: "CTA Serre Hélio",
            fields: [
              {
                type: "image",
                name: "image",
                label: "Image de fond section Hélio",
                required: true,
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Texte alternatif image section Hélio",
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
            label: "Titre section Qui sommes-nous",
            required: true,
          },
          {
            type: "rich-text",
            name: "aboutIntro",
            label: "Texte section Qui sommes-nous (riche, retours ligne conservés, images ignorées)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "object",
            name: "ourTeamImages",
            label: "Galerie équipe",
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
                label: "Texte alternatif image",
                required: true,
              },
            ],
          },
          {
            type: "rich-text",
            name: "trainingIntro",
            label: "Texte d'introduction galerie formations (riche, retours ligne conservés, images ignorées)",
            required: true,
            parser: {
              type: "markdown",
            },
          },
          {
            type: "object",
            name: "trainingGallery",
            label: "Galerie formations",
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
                label: "Title du lien",
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
                label: "Texte alternatif image",
                required: true,
              },
              {
                type: "rich-text",
                name: "text",
                label: "Texte sous image (riche, retours ligne conservés, images ignorées)",
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
