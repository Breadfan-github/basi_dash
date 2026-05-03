import { cn } from '../../lib/utils'

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-brand-navy-100 text-brand-navy-800 border-brand-navy-300',
    secondary: 'bg-gray-100 text-gray-800 border-gray-300',
    destructive: 'bg-red-100 text-red-800 border-red-300',
    outline: 'bg-transparent text-gray-800 border-gray-300'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

