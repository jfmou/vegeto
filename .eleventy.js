module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets")

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
    
    // Return your Object options:
    return {
      dir: {
        input: "src",
        output: "dist"
      }
    }
  };