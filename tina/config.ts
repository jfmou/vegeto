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
      publicFolder: "dist",
    },
  },
  schema: {
    collections: [
      {
        name: "realisation",
        label: "Realisations",
        path: "src/realisations",
        defaultItem: () => {
          return {
            // When a new post is created the title field will be set to "New post"
            tags: ['realisation'],
            layout: 'realisation_layout.html'
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            label: 'Livre d\'or',
            name: 'testimonial',
            type: 'object',
            fields: [
              {
                label: 'Author',
                name: 'author',
                type: 'string',
              },
              {
                label: 'Role',
                name: 'role',
                type: 'string',
              },
              {
                label: 'Quote',
                name: 'quote',
                type: 'string',
                ui: {
                  component: 'textarea',
                },
              },
            ],
          },
          {
            type: "string",
            name: "layout",
            label: "Layout technique",
            options: [
              {
                label: "Réalisation",
                value: "realisation_layout.html"
              }
            ]
          },
        ],
      },
    ],
  },
});
