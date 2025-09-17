// frontend/src/components/common/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false, 
  type = 'button' 
}) => {
  const baseClasses = 'px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary: 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white dark:bg-red-500 dark:hover:bg-red-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

export {};  // Module marker