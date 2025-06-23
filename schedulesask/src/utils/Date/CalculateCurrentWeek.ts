// src/utils/dateUtils.ts

import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

// Получение первого дня текущей недели
export function getFirstDayOfWeek(date: Date): Date {
    return startOfWeek(date, { weekStartsOn: 1 });
}

// Получение последнего дня текущей недели
export function getLastDayOfWeek(date: Date): Date {
    return endOfWeek(date, { weekStartsOn: 1 });
}

// Главная функция проверки диапазона текущей недели
export default function getWeekRange(date: Date | null): string {
    if (!date) return 'Недопустимая дата';

    const today = new Date();
    const firstDayThisWeek = getFirstDayOfWeek(today);
    const lastDayThisWeek = getLastDayOfWeek(today);

    if (isWithinInterval(date, { start: firstDayThisWeek, end: lastDayThisWeek })) {
        return 'На этой неделе есть замена';
    } else {
        return 'На этой неделе ничего не запланировано';
    }
}
