/**
 * Format number as Indian Rupee currency
 */
export const formatCurrency = (value = 0) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Format number with commas
 */
export const formatNumber = (value = 0) => {
  return new Intl.NumberFormat("en-IN").format(value);
};

/**
 * Format percentage
 */
export const formatPercentage = (value = 0) => {
  return `${value}%`;
};

/**
 * Capitalize first letter
 */
export const capitalize = (text = "") => {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Format date
 */
export const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/**
 * Format phone number
 */
export const formatPhone = (phone = "") => {
  return phone.trim();
};