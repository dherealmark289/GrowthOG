import React from 'react';
import Link from 'next/link';

const Button = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  target,
  rel,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-lg';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:bg-primary-700 border border-transparent',
    secondary: 'bg-white text-secondary-700 hover:bg-secondary-50 focus:bg-secondary-50 border border-secondary-300',
    outline: 'bg-transparent text-primary-600 hover:bg-primary-50 focus:bg-primary-50 border border-primary-600',
    ghost: 'bg-transparent text-secondary-600 hover:bg-secondary-100 focus:bg-secondary-100 border border-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 border border-transparent',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:bg-green-700 border border-transparent',
    dark: 'bg-secondary-800 text-white hover:bg-secondary-900 focus:bg-secondary-900 border border-transparent',
    light: 'bg-secondary-100 text-secondary-800 hover:bg-secondary-200 focus:bg-secondary-200 border border-transparent',
  };
  
  const sizes = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-5 py-3',
    lg: 'text-lg px-6 py-4',
  };
  
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const buttonClass = `${baseClasses} ${variantClass} ${sizeClass} ${widthClass} ${disabledClass} ${className}`;
  
  // If href is provided, render a link
  if (href) {
    return (
      <Link 
        href={href}
        className={buttonClass}
        target={target}
        rel={rel}
        {...props}
      >
        {children}
      </Link>
    );
  }
  
  // Otherwise, render a button
  return (
    <button
      className={buttonClass}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
