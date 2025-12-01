import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'dashed';
  active?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'default',
  active = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const cls = [
    styles.button,
    active ? styles.active : '',
    variant === 'primary' ? styles.primary : '',
    variant === 'dashed' ? styles.dashed : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}