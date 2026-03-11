const { eleventyImagePlugin, generateHTML } = require("@11ty/eleventy-img"),
      Image = require("@11ty/eleventy-img");

const { IMG_DEFAULT_WIDTHS, IMG_DEFAULT_FORMATS, IMG_DEFAULT_SIZES, IMG_DEFAULT_URL_PATH, IMG_DEFAULT_OUTPUT_DIR } = require("./config/img.js");

const generateImageHTML = async (
  src,
  alt,
  widths = IMG_DEFAULT_WIDTHS,
  formats = IMG_DEFAULT_FORMATS,
  sizes = IMG_DEFAULT_SIZES
) => {
  // Convert absolute asset paths to source paths
  let imageSrc = src;
  if (src.startsWith('/assets')) {
    imageSrc = 'src' + src;
  }

  let metadata = await Image(imageSrc, {
      widths: [...widths],
      formats: [...formats, null],
      urlPath: IMG_DEFAULT_URL_PATH,
      outputDir: IMG_DEFAULT_OUTPUT_DIR,
  });

  let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
  };

  return generateHTML(metadata, imageAttributes);
};

const IMG_SHORTCODE_CONF = async (
  src,
  alt,
  className = undefined,
  widths = IMG_DEFAULT_WIDTHS,
  formats = IMG_DEFAULT_FORMATS,
  sizes = IMG_DEFAULT_SIZES
  ) => {
  return generateImageHTML(src, alt, widths, formats, sizes);
};

const IMG_TESTIMONIAL_SHORTCODE_CONF = async (
  src,
  alt
  ) => {
  return generateImageHTML(src, alt, [200], IMG_DEFAULT_FORMATS, "200px");
};

module.exports = function(eleventyConfig) {
  const markdownConf =  require('./config/markdown.js');

  eleventyConfig.addPassthroughCopy('src/assets/img/');
  eleventyConfig.addPassthroughCopy('src/assets/lib/');
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
  eleventyConfig.addShortcode("image", IMG_SHORTCODE_CONF);
  eleventyConfig.addShortcode("image_testimonial", IMG_TESTIMONIAL_SHORTCODE_CONF);
  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
};