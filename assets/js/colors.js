const colorMap = {
  green: "#64d583",
  blue: "#91a8f9",
  orange: "#ee955e",
  pink: "#ee92d7",
  purple: "#aa8ef0",
  yellow: "#f5d770",
  default: "#64d583",
};

/**
 * Looks up a color name, falling back to the default green for unknown names.
 *
 * @param {string} colorName - Key in the project color map.
 * @returns {string} Hexadecimal color including #.
 */
function stringToHex(colorName) {
  const color = colorMap[colorName];

  return color || colorMap.default;
}

/**
 * Finds a color name by an exact hexadecimal match in the project color map.
 *
 * @param {string} hexValue - Hexadecimal color including #.
 * @returns {string|null} Matching color name, or null when no match exists.
 */
function hexToString(hexValue) {
  const colorString = Object.keys(colorMap).find((key) => {
    return colorMap[key] === hexValue;
  });

  return colorString || null;
}

/**
 * Removes every class containing _color_ from an element.
 *
 * @param {HTMLElement} element - Element whose color classes should be cleared.
 * @returns {void}
 */
function removeColorClasses(element) {
  [...element.classList].forEach((cls) => {
    if (cls.includes("_color_")) {
      element.classList.remove(cls);
    }
  });
}

export { stringToHex, hexToString, removeColorClasses };
