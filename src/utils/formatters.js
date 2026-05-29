import dayjs from 'dayjs';
import 'dayjs/locale/sq';
import 'dayjs/locale/en';
import { storage } from './storage';

// initialize locale from storage (default sq)
const initialLang = storage.getLanguage();
dayjs.locale(initialLang || 'sq');

export function setLocale(lang) {
  if (!lang) return;
  dayjs.locale(lang);
}

export const formatDate = (date, format = 'DD/MM/YYYY') => {
  if (!date) return '-';
  return dayjs(date).format(format);
};

export const formatDateTime = (date) => {
  if (!date) return '-';
  return dayjs(date).format('DD/MM/YYYY HH:mm');
};

export const formatGrade = (value) => {
  if (value === null || value === undefined) return '-';
  return Number(value).toFixed(2);
};
