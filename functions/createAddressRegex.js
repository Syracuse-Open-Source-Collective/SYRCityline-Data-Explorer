// work in progress.... regex is hard.

function createAddressRegex(address) {
  const escapedAddress = address.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const addressParts = escapedAddress.split(/\s*,\s*/);
  const patterns = addressParts.map((part) => {
    const trimmedPart = part.trim();
    const escapedPart = trimmedPart.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = escapedPart.split("").join("\\s*");
    const letters = pattern.split("").map((char) => {
      return char === " " ? "\\s" : `[${char}]`;
    });
    const newPattern = letters.join(".*?");
    return `\\b${newPattern}\\b`;
  });
  const pattern = patterns.join("\\s*,?\\s*");

  return new RegExp(pattern, "i"); // Case insensitive match
}

module.exports = { createAddressRegex };
