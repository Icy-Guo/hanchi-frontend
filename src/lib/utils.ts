import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化时间字符串，只显示日期部分
 * @param dateStr ISO格式的时间字符串
 * @returns 格式化后的中文日期字符串
 */
export function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) {
    return '未知时间';
  }

  try {
    const date = new Date(dateStr);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch (error) {
    console.error('时间格式化错误:', error, '原始时间字符串:', dateStr);
    return '时间格式错误';
  }
}
