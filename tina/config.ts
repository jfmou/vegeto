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
  },
  schema: {
    collections: [
      {
        name: "realisation",
        label: "Realisations",
        path: "src/realisations",
        format: "md",
        defaultItem: () => {
          return {
            // When a new post is created the title field will be set to "New post"
            tags: ['Réalisation']
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
                value: "Réalisation",
                label: "Réalisation"
              },
              {
                value: "Conception",
                label: "Conception"
              },
              {
                value: "Installation",
                label: "Installation"
              },
              {
                value: "Transmission",
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
});
