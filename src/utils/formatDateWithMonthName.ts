import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export const formatDateWithMonthName = (
  d?: unknown,
  format = "DD/MMM/YY",
): string => {
  if (!d) return "-";

  if (typeof d === "string" || typeof d === "number" || d instanceof Date) {
    const parsed = dayjs(d);
    return parsed.isValid() ? parsed.format(format) : "-";
  }

  if (dayjs.isDayjs(d)) {
    return d.format(format);
  }

  return "-";
};
