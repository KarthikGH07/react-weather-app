export const getIconId = (icon) => {
  if (!icon) return '';
  const id = icon.includes('n') && icon !== '01n' ? icon.replace('n', 'd') : icon;
  return id;
};
