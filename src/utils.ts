/**
 * Converts a hexadecimal color value to its corresponding RGB value.
 *
 * @param hex - The hexadecimal color value to convert.
 * @return  The RGB value of the color.
 */
export function hexToRgb(hex: string): string {
  const number = parseInt(hex.replace(/^#/, ""), 16);
  const r = number >> 16;
  const g = (number >> 8) & 255;
  const b = number & 255;

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Converts a hexadecimal color value to its corresponding HSL value.
 *
 * @param hex - The hexadecimal color value to convert.
 * @return The HSL value of the color.
 */
export function HexToHsl(hex: string): string {
  hex = hex.replace(/#/g, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(
    hex
  );
  if (!result) {
    return "#000000";
  }
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    if (h) h /= 6;
  }
  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  if (h) {
    h = Math.round(360 * h);
  }

  return `hsl(${h}, ${s}, ${l})`;
}

/**
 * Converts a hexadecimal color value to its corresponding hexadecimal color value compatible with Three.js.
 *
 * @param hex - The hexadecimal color value to convert.
 * @return The prefixed hexadecimal color value.
 */
export function hexToPrefixedHex(hex: string): string {
  return "0x" + hex.slice(1);
}
