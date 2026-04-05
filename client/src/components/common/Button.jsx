import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

const Button = forwardRef(({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl';
  
  const variants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 focus:ring-emerald-500 shadow-sm',
    secondary: 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 hover:border-stone-300 focus:ring-emerald-500 shadow-sm',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 focus:ring-red-500 shadow-sm',
    ghost: 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900',
  };

  const sizes = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-11 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: props.disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: props.disabled || isLoading ? 1 : 0.98 }}
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : null}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;
