// frontend/src/components/common/Input.tsx
import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ 
  type = 'text', 
  placeholder = '', 
  value, 
  onChange, 
  className = '', 
  disabled = false, 
  required = false 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${className}`}
      disabled={disabled}
      required={required}
    />
  );
};

export default Input;

export {};  // Module marker