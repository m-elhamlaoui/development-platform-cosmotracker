import { format, parseISO, isAfter, isBefore, isToday } from 'date-fns';

export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'MMMM d, yyyy');
};

export const formatMonthYear = (dateString: string): string => {
  return format(parseISO(dateString), 'MMMM yyyy');
};

export const isPastEvent = (dateString: string): boolean => {
  return isBefore(parseISO(dateString), new Date()) && !isToday(parseISO(dateString));
};

export const isUpcomingEvent = (dateString: string): boolean => {
  return isAfter(parseISO(dateString), new Date()) || isToday(parseISO(dateString));
};

export const getEventStatus = (dateString: string): 'past' | 'today' | 'upcoming' => {
  const eventDate = parseISO(dateString);
  if (isToday(eventDate)) return 'today';
  if (isBefore(eventDate, new Date())) return 'past';
  return 'upcoming';
};

export const getCurrentMonth = (): number => {
  return new Date().getMonth();
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};