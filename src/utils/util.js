import dayjs from 'dayjs';

export function getMonth(month = dayjs().month()) {
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount))
    });
  });
  return daysMatrix;
}


export function getWeek(dateInput = dayjs()) {
  // Ensure the dateInput is a Day.js object, regardless of the input
  const date = dayjs(dateInput);
  // Verify that 'startOf' is a function for the 'date' object
  if (typeof date.startOf !== 'function') {
    console.error('Invalid date object: startOf is not a function');
    return [];
  }

  const startOfWeek = date.startOf('week');
  let currentDay = startOfWeek;

  const week = [];
  for (let i = 0; i < 7; i++) {
    // Add each day of the week to the array
    week.push(currentDay);
    currentDay = currentDay.add(1, 'day');
  }

  return week;
}