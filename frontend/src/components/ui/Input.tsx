import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className, ...props }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block mb-2 text-sm font-medium text-slate-200"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-200
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            placeholder:text-slate-500 disabled:opacity-50 disabled:bg-slate-900
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            ${fullWidth ? 'w-full' : ''}
            ${className || ''}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;