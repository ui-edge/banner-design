/**
 * Returns true if the given size key represents a horizontal (landscape) banner.
 * @param {string} size
 * @returns {boolean}
 */
export function isHorizontal(size) {
  return size.includes("3000x340");
}

/**
 * Reads a File object and resolves with a base-64 data URL string.
 * @param {File} file
 * @returns {Promise<string>}
 */
export function fileToDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

/**
 * Clamps a value between min and max (inclusive).
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
