import {
    eachMonthOfInterval,
    startOfYear,
    endOfYear,
    format,
} from "date-fns";

export function generateMonths(year: Date) {
    const startOfCurrentYear = startOfYear(year);
    const endOfCurrentYear = endOfYear(year);
    return eachMonthOfInterval({
        start: startOfCurrentYear,
        end: endOfCurrentYear,
    });
}

export function formatMonth(date: Date) {
    return format(date, "MMM.yyyy");
}

export function formatYear(date: Date) {
    return format(date, "yyyy");
}