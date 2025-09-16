import React from 'react';
import Link from 'next/link';

const Card = ({
  children,
  className = '',
  padding = true,
  shadow = true,
  border = false,
  hover = false,
  href,
  onClick,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-xl';
  const paddingClass = padding ? 'p-6' : '';
  const shadowClass = shadow ? 'shadow-soft' : '';
  const borderClass = border ? 'border border-secondary-200' : '';
  const hoverClass = hover ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-medium' : '';
  
  const cardClass = `${baseClasses} ${paddingClass} ${shadowClass} ${borderClass} ${hoverClass} ${className}`;
  
  // If href is provided, render a link
  if (href) {
    return (
      <Link href={href} className={cardClass} {...props}>
        {children}
      </Link>
    );
  }
  
  // If onClick is provided, make it interactive
  if (onClick) {
    return (
      <div className={`${cardClass} cursor-pointer`} onClick={onClick} {...props}>
        {children}
      </div>
    );
  }
  
  // Otherwise, render a regular div
  return (
    <div className={cardClass} {...props}>
      {children}
    </div>
  );
};

export default Card;
