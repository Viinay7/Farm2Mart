
/**
 * Currency conversion utility functions
 */

// Conversion rate from USD to INR (example rate, this should ideally be fetched from an API)
const USD_TO_INR_RATE = 83.5;

/**
 * Formats a price in Indian Rupees with the ₹ symbol
 * @param amount - Amount in INR
 * @returns Formatted string with ₹ symbol
 */
export const formatToRupees = (amount: number): string => {
  return `₹${amount.toFixed(2)}`;
};

/**
 * Converts USD amount to INR
 * @param usdAmount - Amount in USD
 * @returns Amount converted to INR
 */
export const convertToRupees = (usdAmount: number): number => {
  return usdAmount * USD_TO_INR_RATE;
};

/**
 * Formats a USD amount to INR with the ₹ symbol
 * @param usdAmount - Amount in USD
 * @returns Formatted string with ₹ symbol
 */
export const formatUsdToRupees = (usdAmount: number): string => {
  const inrAmount = convertToRupees(usdAmount);
  return formatToRupees(inrAmount);
};
