module.exports = function(eleventyConfig) {

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