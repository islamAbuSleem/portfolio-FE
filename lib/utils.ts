/**
 * Utility functions for common operations
 */

/**
 * Generate unique ID using timestamp
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Generate unique ID with timestamp and random string
 */
export const generateUniqueId = (): string => {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2)}`;
};

/**
 * Deep clone an object
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map((v) => deepClone(v)) as unknown as T;
  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>).map(([key, value]) => [key, deepClone(value)])
  ) as T;
};

/**
 * Check if value is empty (null, undefined, empty string, empty array)
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};

/**
 * Sanitize string input by removing potentially dangerous characters
 */
export const sanitizeString = (value: string): string => {
  return value
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "");
};

/**
 * Sanitize HTML content
 */
export const sanitizeHTML = (html: string): string => {
  const div = document.createElement("div");
  div.textContent = html;
  return div.innerHTML;
};

/**
 * Truncate string to specified length
 */
export const truncate = (str: string, length: number, suffix = "..."): string => {
  if (!str || str.length <= length) return str;
  return str.substring(0, length) + suffix;
};

/**
 * Escape regex special characters
 */
export const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/**
 * Safe JSON parse with fallback
 */
export const safeJSONParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

/**
 * Safe JSON stringify with fallback
 */
export const safeJSONStringify = (obj: unknown, fallback: string = ""): string => {
  try {
    return JSON.stringify(obj);
  } catch {
    return fallback;
  }
};

/**
 * Sleep utility for testing and delays
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Get difference between two dates in days
 */
export const getDaysDiff = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date2.getTime() - date1.getTime()) / oneDay));
};

/**
 * Check if date is in the past
 */
export const isPastDate = (date: Date): boolean => {
  return new Date(date) < new Date();
};

/**
 * Check if date is in the future
 */
export const isFutureDate = (date: Date): boolean => {
  return new Date(date) > new Date();
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Clamp number between min and max
 */
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

/**
 * Safe math operations with error handling
 */
export const safeDivide = (dividend: number, divisor: number): number => {
  if (divisor === 0) return 0;
  return dividend / divisor;
};

/**
 * Safe multiply with error handling
 */
export const safeMultiply = (multiplier: number, multiplicand: number): number => {
  if (multiplier === 0 || multiplicand === 0) return 0;
  return multiplier * multiplicand;
};

/**
 * Rotate array elements by n positions
 */
export const rotateArray = <T>(arr: T[], n: number): T[] => {
  if (!arr || arr.length === 0) return arr;
  const length = arr.length;
  const nMod = n % length;
  if (nMod === 0) return arr;
  return arr.slice(nMod).concat(arr.slice(0, nMod));
};

/**
 * Flatten nested arrays
 */
export const flatten = <T>(arr: T[][]): T[] => {
  return arr.reduce((acc, val) => acc.concat(val), []);
};

/**
 * Check if value is within range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Check if value is between ranges (exclusive)
 */
export const isBetween = (value: number, min: number, max: number): boolean => {
  return value > min && value < max;
};

/**
 * Convert string to title case
 */
export const toTitleCase = (str: string): string => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Convert string to kebab-case
 */
export const toKebabCase = (str: string): string => {
  if (!str) return "";
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

/**
 * Convert string to camelCase
 */
export const toCamelCase = (str: string): string => {
  if (!str) return "";
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
    .replace(/^(.)/, (char) => char.toLowerCase());
};

/**
 * Capitalize first letter of string
 */
export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Remove accent characters from string
 */
export const removeAccents = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
