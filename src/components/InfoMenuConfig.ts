import { MenuItem } from '@/types/MenuItem';
import { getCssVariable } from '@/lib/cssUtils';


function getFlexBasisWithGap(percentage: string): string {
  const menuGap = getCssVariable('--menu-gap');
  if (menuGap) {
    return `calc(${percentage} - ${menuGap})`;
  }
  // fallback ( on SSR, or if CSS variable is not found )
  return `calc(${percentage} - 0.75rem)`;
}

export const defaultMenuItems: MenuItem[] = [
  { key: 'calendar', label: 'カレンダー', icon: 'calendar', flex: `1 1 ${getFlexBasisWithGap('50%')}` },
  { key: 'favorites', label: 'お気に入り', icon: 'star', flex: `1 1 ${getFlexBasisWithGap('50%')}` },
  { key: 'search', label: '検索', icon: 'search', flex: `3 1` },
  { key: 'add', label: 'イベント登録', icon: 'plus', variant: 'dashed', flex: `5 1` },
  { key: 'me', label: '', icon: 'user' , flex: `2 1` }, 
];