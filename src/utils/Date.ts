export function parseLunarDate(value: unknown): Date {
    if (typeof value !== "string" && typeof value !== "number") return new Date(0);
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? new Date(0) : date;
  }