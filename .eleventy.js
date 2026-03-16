const { generateHTML } = require("@11ty/eleventy-img");
const Image = require("@11ty/eleventy-img");
const { IMG_DEFAULT_WIDTHS, IMG_DEFAULT_FORMATS, IMG_DEFAULT_SIZES, IMG_DEFAULT_URL_PATH, IMG_DEFAULT_OUTPUT_DIR } = require("./config/img.js");

const imageShortcode = async (src, alt, widths = IMG_DEFAULT_WIDTHS, sizes = IMG_DEFAULT_SIZES) => {
  let imageSrc = src;
  if (src.startsWith('/assets')) {
    imageSrc = 'src' + src;
  }

  const metadata = await Image(imageSrc, {
    widths: [...widths],
    formats: [...IMG_DEFAULT_FORMATS, null],
    urlPath: IMG_DEFAULT_URL_PATH,
    outputDir: IMG_DEFAULT_OUTPUT_DIR,
  });

  return generateHTML(metadata, {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  });
};

// ---
// Gestion des images (TinaCMS + Eleventy)
//
// - Toutes les images sources sont uploadées dans src/assets/img/ (TinaCMS et dev)
// - Eleventy copie tout src/assets/ dans dist/assets/ (prod et preview)
// - Les chemins dans le markdown/frontmatter sont toujours /assets/img/xxx.jpg
// - Un seul eleventyConfig.addPassthroughCopy('src/assets') suffit
//
// Ce schéma garantit que TinaCMS, le site en dev et le site en prod accèdent tous aux mêmes images sans duplication ni config complexe.
// ---
module.exports = function(eleventyConfig) {
  const markdownConf =  require('./config/markdown.js');

  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPlugin(require('./config/html-config.js'));

  eleventyConfig.setLibrary('md', markdownConf);

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
  });

  // Force lowercase permalinks for all realisations
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: function(data) {
      // Only apply to realisations markdown files
      if (data.page.inputPath.includes("/src/realisations/") && data.page.inputPath.endsWith(".md")) {
        const lowerSlug = data.page.fileSlug.toLowerCase();
        return `/realisations/${lowerSlug}/index.html`;
      }
      return undefined; // Let 11ty use its default for other files
    }
  });

  eleventyConfig.addShortcode("image", imageShortcode);
  
  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
};