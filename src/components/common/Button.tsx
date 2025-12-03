import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'nav';
  dashed?: boolean;
  active?: boolean;
  children?: React.ReactNode;
}

export default function Button({
  variant = 'default',
  dashed = false,
  active = false,
  className = '',
  style,
  children,
  ...props
}: ButtonProps) {
  const cls = [
    styles.button,
    active ? styles.active : '',
    dashed ? styles.dashed : '',
    variant === 'nav' ? styles.nav : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={cls}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}