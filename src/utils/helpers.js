import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

export const formatDate = (date, pattern = 'MMM dd, yyyy') => {
  if (!date) return '—';
  const d = typeof date === 'string' ? parseISO(date) : date;
  return isValid(d) ? format(d, pattern) : '—';
};

export const formatDateTime = (date) => formatDate(date, 'MMM dd, yyyy HH:mm');

export const formatTimeAgo = (date) => {
  if (!date) return '—';
  const d = typeof date === 'string' ? parseISO(date) : date;
  return isValid(d) ? formatDistanceToNow(d, { addSuffix: true }) : '—';
};

export const formatCurrency = (amount, currency = 'USD') => {
  if (amount == null) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num) => {
  if (num == null) return '—';
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatPercentage = (value, decimals = 1) => {
  if (value == null) return '—';
  return `${Number(value).toFixed(decimals)}%`;
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getAvatarColor = (name) => {
  const colors = [
    '#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#ec4899', '#f97316', '#14b8a6', '#6366f1',
  ];
  if (!name) return colors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateId = () => Math.random().toString(36).substr(2, 9);
