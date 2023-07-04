module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets")

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