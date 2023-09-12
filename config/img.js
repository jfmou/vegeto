const widths = [350, 'auto']; // [250, 316, 426, 460, 580, 768, 'auto'];

exports.IMG_DEFAULT_WIDTHS = widths.concat(widths.map((w) => w * 2)) // generate 2x sizes
                                .filter((v, i, s) => s.indexOf(v) === i); // dedupe

exports.IMG_DEFAULT_FORMATS = ['webp', 'avif', 'jpeg'];

exports.IMG_DEFAULT_SIZES = '(max-width: 768px) 100vw, 768px';

exports.IMG_DEFAULT_URL_PATH = "/assets/img/generated";

exports.IMG_DEFAULT_OUTPUT_DIR = "dist/assets/img/generated";