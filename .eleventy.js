const { eleventyImagePlugin, generateHTML } = require("@11ty/eleventy-img"),
      Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(require('./config/html-config.js'));

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
  });
  
  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
};