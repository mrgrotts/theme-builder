import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

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
          .replace(')', ',1.0)')
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
