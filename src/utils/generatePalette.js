import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const generateCMYK = scale => {
  let r = scale._rgb[0] / 255;
  let g = scale._rgb[1] / 255;
  let b = scale._rgb[2] / 255;
  let k = Math.min(1 - r, 1 - g, 1 - b).toFixed(2);
  let c = Math.round(((1 - r - k) / (1 - k)) * 100);
  let y = Math.round(((1 - g - k) / (1 - k)) * 100);
  let m = Math.round(((1 - b - k) / (1 - k)) * 100);

  return `cmyk(${c}, ${m}, ${y}, ${k})`;
};

export const generatePalette = ({ colors, emoji, id, paletteName }) => {
  let palette = { colors: {}, emoji, id, paletteName };

  for (let level of levels) {
    palette.colors[level] = [];
  }

  for (let color of colors) {
    const scale = createScale(color.color, 10).reverse();

    for (let i in scale) {
      palette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, '-'),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace('rgb', 'rgba')
          .replace(')', ',1.0)'),
        cmyk: generateCMYK(chroma(scale[i]))
      });
    }
  }

  return palette;
};

const createRange = (hex, end = `#ffffff`) => [
  chroma(hex)
    .darken(1.33)
    .hex(),
  hex,
  end
];

const createScale = (hex, variants) =>
  chroma
    .scale(createRange(hex))
    .mode('lab')
    .colors(variants);
