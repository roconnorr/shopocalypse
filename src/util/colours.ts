import { randInterval } from './numbers';

// Generate a semi random HSL colour depending on the list argument
// now = red, later = orange, checked = green
export const generateColour = (list: ProductLocationType): string => {
  const saturation = randInterval(70, 100);
  const lightness = randInterval(45, 50);

  if (list === 'now') {
    return `hsl(${randInterval(0, 10)}, ${saturation}%, ${lightness}%)`;
  } else if (list === 'later') {
    return `hsl(${randInterval(20, 30)}, ${saturation}%, ${lightness}%)`;
  } else {
    return `hsl(${randInterval(140, 150)}, ${saturation}%, ${lightness}%)`;
  }
};
