const { generateHTML } = require("@11ty/eleventy-img"),
      Image = require("@11ty/eleventy-img");

const { IMG_DEFAULT_WIDTHS, IMG_DEFAULT_FORMATS, IMG_DEFAULT_SIZES, IMG_DEFAULT_URL_PATH, IMG_DEFAULT_OUTPUT_DIR } = require("./config/img.js");

const IMG_SHORTCODE_CONF = async (
  src,
  alt,
  className = undefined,
  widths = IMG_DEFAULT_WIDTHS,
  formats = IMG_DEFAULT_FORMATS,
  sizes = IMG_DEFAULT_SIZES
  ) => {
  let metadata = await Image(src, {
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

  // You bet we throw an error on a missing alt (alt="" works okay)
  return generateHTML(metadata, imageAttributes);
};

module.exports = eleventyConfig => {
  const markdownConf =  require('./config/markdown.js');

  eleventyConfig.addPassthroughCopy('src/assets/img/');
  eleventyConfig.addPassthroughCopy('src/assets/lib/');
  eleventyConfig.addPlugin(require('./config/html-config.js'));

  eleventyConfig.setLibrary('md', markdownConf);

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
  });

  eleventyConfig.addShortcode("image", IMG_SHORTCODE_CONF);
  
  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
};