// responsive images with 11ty image
// this overrides the default image renderer
// titles are also used for size setting
// ![alt text](/assets/img/image.jpg "title text")
// title text format:
// @skip[widthxheight] ?[sizes] caption
const markdownIt = require('markdown-it')();
const fs = require('fs');
const path = require('path');

const Image = require('@11ty/eleventy-img');
const { IMG_DEFAULT_WIDTHS, IMG_DEFAULT_FORMATS, IMG_DEFAULT_SIZES, IMG_DEFAULT_URL_PATH, IMG_DEFAULT_OUTPUT_DIR } = require("./img.js");

markdownIt.renderer.rules.image = function (tokens, idx, options, env, self) {
  function figure(html, caption) {
    return `<figure>${html}<figcaption>${caption}</figcaption></figure>`
  }

  const token = tokens[idx]
  let imgSrc = token.attrGet('src')
  const imgAlt = token.content
  const imgTitle = token.attrGet('title')

  const htmlOpts = { alt: imgAlt, loading: 'lazy', decoding: 'async' }

  if (imgSrc.startsWith('/assets')) {
    imgSrc = 'src' + imgSrc // fetch source file from markdownIt public img path
  }

  const parsed = (imgTitle || '').match(
    /^(?<skip>@skip(?:\[(?<width>\d+)x(?<height>\d+)\])? ?)?(?:\?\[(?<sizes>.*?)\] ?)?(?<caption>.*)/
  ).groups

  if (parsed.skip || imgSrc.startsWith('http')) {
    const options = { ...htmlOpts }
    if (parsed.sizes) {
      options.sizes = parsed.sizes
    }

    const metadata = { jpeg: [{ url: imgSrc }] }
    if (parsed.width && parsed.height) {
      metadata.jpeg[0].width = parsed.width
      metadata.jpeg[0].height = parsed.height
    }

    const generated = Image.generateHTML(metadata, options)

    if (parsed.caption) {
      return figure(generated, parsed.caption)
    }
    return generated
  }

  const imgOpts = {
    widths: IMG_DEFAULT_WIDTHS,
    formats: IMG_DEFAULT_FORMATS,
    urlPath: IMG_DEFAULT_URL_PATH,
    outputDir: IMG_DEFAULT_OUTPUT_DIR
  }

  const metadata = Image.statsSync(imgSrc, imgOpts)

  /** Creating a flat array of all the output paths from the metadata object. */
  const outputPaths = Object.keys(metadata).reduce((acc, key) => {
    return [
    ...acc,
    ...metadata[key].map((resource) => {
        return resource.outputPath;
    }),
    ];
  }, []);
  console.log(imgSrc, outputPaths, metadata)

  let hasImageBeenOptimized = true;

  for (const outputPath of outputPaths) {
    /** Edit the output file path resolving, depending of this file */
    let fileToCheck = path.resolve(__dirname, '..', outputPath);

    if (!fs.existsSync(fileToCheck)) {
      console.log(fileToCheck, 'ko');

      hasImageBeenOptimized = false;
    }
  }
  
  if (!hasImageBeenOptimized) {
    console.log('img not optimised')
    Image(imgSrc, imgOpts);
  }

  const generated = Image.generateHTML(metadata, {
    sizes: parsed.sizes || IMG_DEFAULT_SIZES,
    ...htmlOpts
  })

  if (parsed.caption) {
    return figure(generated, parsed.caption)
  }
  return generated
}

module.exports = markdownIt;