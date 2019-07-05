export const randomColor = (palettes, colors) => {
  const allColors = palettes.map(p => p.colors).flat();
  const random = Math.floor(Math.random() * allColors.length);
  const generated = allColors[random];
  const isDuplicateColor = colors.some(color => color.name === generated.name);

  if (isDuplicateColor) {
    return randomColor(palettes, colors);
  } else {
    return generated;
  }
};
