"use client";

/**
 * Standardized form validation rules and functions
 */
export const Validators = {
  required: (value: string) => {
    if (!value || value.trim() === "") {
      return "This field is required";
    }
    return "";
  },

  minLength: (min: number) => (value: string) => {
    if (!value || value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return "";
  },

  maxLength: (max: number) => (value: string) => {
    if (value && value.length > max) {
      return `Must be at most ${max} characters`;
    }
    return "";
  },

  email: (value: string) => {
    if (!value) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  },

  numberRange: (min: number, max: number) => (value: number) => {
    if (isNaN(value) || value < min || value > max) {
      return `Must be between ${min} and ${max}`;
    }
    return "";
  },

  positiveNumber: (value: number) => {
    if (isNaN(value) || value <= 0) {
      return "Must be a positive number";
    }
    return "";
  },

  url: (value: string) => {
    if (!value) return "";
    try {
      new URL(value);
      return "";
    } catch {
      return "Please enter a valid URL";
    }
  },

  minLengthDate: (minDate: string) => (value: string) => {
    if (!value) return "";
    const date = new Date(value);
    const min = new Date(minDate);
    if (date < min) {
      return "Start date must be before end date";
    }
    return "";
  },
};

/**
 * Email validation helper (kept for backward compatibility)
 */
export const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

/**
 * Common error message formats
 */
export const ErrorMessages = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_URL: "Please enter a valid URL",
  INVALID_NUMBER: "Please enter a valid number",
  NOT_POSITIVE: "Must be a positive number",
  OUT_OF_RANGE: "Value is out of valid range",
  TOO_SHORT: (min: number) => `Must be at least ${min} characters`,
  TOO_LONG: (max: number) => `Must be at most ${max} characters`,
  INVALID_DATE: "Please enter a valid date",
  DATE_RANGE: "Start date must be before end date",
};

/**
 * Debounce utility for performance
 */
export function debounce<Args extends unknown[], R>(
  func: (...args: Args) => R,
  wait: number
): (...args: Args) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Parse comma-separated values to array
 */
export const parseCommaSeparated = (value: string): string[] => {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string, format: "short" | "long" = "short"): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const options: Intl.DateTimeFormatOptions = format === "long"
    ? { year: "numeric", month: "long", day: "numeric" }
    : { year: "numeric", month: "short", day: "numeric" };

  return date.toLocaleDateString("en-US", options);
};

/**
 * Validate a form field with validation rules
 */
export const validateField = (
  value: unknown,
  rules: Array<(value: unknown) => string>
): string => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return "";
};
