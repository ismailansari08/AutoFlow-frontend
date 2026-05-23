'use client';

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

const glassClass =
  'glass-field w-full rounded-xl text-sm outline-none transition-[border-color,box-shadow] duration-200';

export const GlassInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(glassClass, 'px-4 py-3', className)} {...props} />
  ),
);
GlassInput.displayName = 'GlassInput';

export const GlassTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(glassClass, 'p-3 resize-none', className)} {...props} />
));
GlassTextarea.displayName = 'GlassTextarea';
