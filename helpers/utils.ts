export function getTextColor(hexColor: string) {
  if (!hexColor) return;
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate relative luminance (L) using sRGB gamma correction
  const L = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

  // Determine contrast ratio with white (L = 1)
  const contrastWithWhite = (L + 0.05) / 1.05;

  // Decide text color based on contrast ratio
  return contrastWithWhite >= 4.5 ? "#ffffff" : "#000000";
}

export function convertTimeStringToDate(timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}
export function getDateInTime(date: Date | string, timeString: string): Date {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const [hours, minutes] = timeString.split(":").map(Number);
  dateObj.setHours(hours, minutes, 0, 0);
  return dateObj;
}
