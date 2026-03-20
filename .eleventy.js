const { generateHTML } = require("@11ty/eleventy-img");
const Image = require("@11ty/eleventy-img");
const { IMG_DEFAULT_WIDTHS, IMG_DEFAULT_FORMATS, IMG_DEFAULT_SIZES, IMG_DEFAULT_URL_PATH, IMG_DEFAULT_OUTPUT_DIR } = require("./config/img.js");

const PROD_SITE_URL = "https://www.vegeto-aquaponie.fr";
const BETA_SITE_URL = "https://beta.vegeto-aquaponie.fr";

const getSocialImageUrl = async (src) => {
  const source = src || "/assets/logo-og.png";

  let imageSrc = source;
  if (source.startsWith('/assets')) {
    imageSrc = 'src' + source;
  }

  try {
    const metadata = await Image(imageSrc, {
      widths: [1200],
      formats: ["jpeg"],
      urlPath: IMG_DEFAULT_URL_PATH,
      outputDir: IMG_DEFAULT_OUTPUT_DIR,
    });

    const generated = metadata && metadata.jpeg && metadata.jpeg[0] && metadata.jpeg[0].url;
    return generated || source;
  } catch (error) {
    return source;
  }
};

const imageShortcode = async (src, alt, widths = IMG_DEFAULT_WIDTHS, sizes = IMG_DEFAULT_SIZES) => {
  // Handle single width value (convert to array)
  const widthsArray = Array.isArray(widths) ? widths : [widths];
  
  let imageSrc = src;
  if (src.startsWith('/assets')) {
    imageSrc = 'src' + src;
  }

  const metadata = await Image(imageSrc, {
    widths: widthsArray,
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
  const buildTarget = (process.env.ELEVENTY_BUILD_TARGET || '').toLowerCase();
  const siteUrl = buildTarget === 'beta' ? BETA_SITE_URL : PROD_SITE_URL;

  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPlugin(require('./config/html-config.js'));

  eleventyConfig.setLibrary('md', markdownConf);

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
  });

  const noIndexFlag = (process.env.ELEVENTY_NO_INDEX || '').toLowerCase();
  const shouldNoIndex = noIndexFlag === 'true' || noIndexFlag === '1';
  eleventyConfig.addGlobalData('noIndex', shouldNoIndex);
  eleventyConfig.addGlobalData('siteUrl', siteUrl);

  // Force lowercase permalinks for all realisations
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: function(data) {
      // Only apply to realisations markdown files
      if (data.page.inputPath.includes("/src/realisations/") && data.page.inputPath.endsWith(".md")) {
        const lowerSlug = data.page.fileSlug.toLowerCase();
        return `/realisations/${lowerSlug}/index.html`;
      }
      return data.permalink; // Preserve any permalink defined elsewhere
    },
    socialImage: async function(data) {
      return getSocialImageUrl(data.mainImg);
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