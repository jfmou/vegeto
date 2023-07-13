const { generateHTML } = require("@11ty/eleventy-img"),
      Image = require("@11ty/eleventy-img");

const IMG_SHORTCODE_CONF = async (
  src,
  alt,
  className = undefined,
  widths = [350, 640, 1280],
  formats = ['webp', 'avif', 'jpeg'],
  sizes = '100vw'

  ) => {
  let metadata = await Image(src, {
      widths: [...widths],
      formats: [...formats, null],
      urlPath: "/assets/img/",
      outputDir: "dist/assets/img",
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
  eleventyConfig.addPassthroughCopy('src/assets/img/src')
  eleventyConfig.addPlugin(require('./config/html-config.js'));

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