export const generateResponse = (
  imageName: string,
  queryText: string,
): string => {
  const lowerQuery = queryText.toLowerCase();

  if (
    lowerQuery.includes("defect") ||
    lowerQuery.includes("issue") ||
    lowerQuery.includes("problem")
  ) {
    const responses = [
      "No visible defects detected. The product appears to be in excellent condition with proper lighting and clear presentation.",
      "Minor issue detected: Slight reflection on surface. Consider adjusting lighting angle for optimal product photography.",
      "Product looks good overall. Recommend ensuring background is completely clean for consistency.",
      "No defects found. Image quality is professional with good color accuracy and sharpness.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  if (
    lowerQuery.includes("new") ||
    lowerQuery.includes("used") ||
    lowerQuery.includes("condition")
  ) {
    const responses = [
      "This appears to be a new product based on pristine condition and packaging.",
      "Product shows signs of being new - no wear patterns, original packaging visible.",
      "Condition appears new. No visible signs of use or damage.",
      "Based on visual analysis, this looks like a new, unused product.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  if (
    lowerQuery.includes("count") ||
    lowerQuery.includes("how many") ||
    lowerQuery.includes("number")
  ) {
    const counts = [
      "1 item",
      "2 items",
      "3 items",
      "1 main item with accessories",
    ];
    return `I can identify ${counts[Math.floor(Math.random() * counts.length)]} in this image.`;
  }

  if (lowerQuery.includes("consistent") || lowerQuery.includes("consistency")) {
    const responses = [
      "Image follows standard product photography guidelines with consistent lighting and background.",
      "Good consistency with brand guidelines. Lighting and composition are professional.",
      "Image maintains consistency with e-commerce standards. Well-centered and properly framed.",
      "Consistent with professional product photography - good contrast and color balance.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Default response
  return `Analysis complete for ${imageName}. The image appears to meet standard e-commerce quality guidelines with good clarity and presentation.`;
};
