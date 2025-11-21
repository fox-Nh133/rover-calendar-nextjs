export type MenuItemVariant = 'default' | 'primary' | 'dashed';

export type MenuItem = {
  key: string;
  label: string;
  icon: string;
  variant?: MenuItemVariant;
  action?: () => void;
  disabled?: boolean;
  badge?: string | number;
  flex?: string | number; // CSS flexプロパティ
};