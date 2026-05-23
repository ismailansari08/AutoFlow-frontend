'use client';

import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { GlassInput } from '@/components/ui/GlassField';

interface AuthFormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  autoComplete?: string;
}

export function AuthFormField({
  id,
  label,
  type = 'text',
  placeholder,
  registration,
  error,
  autoComplete,
}: AuthFormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </label>
      <GlassInput
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={error ? 'border-red-500/50' : undefined}
        {...registration}
      />
      {error && (
        <p id={`${id}-error`} className="text-[11px] text-red-400 mt-1.5" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
