import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'danger' | 'reward'
type Size = 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-[oklch(0.64_0.14_25)] to-accent text-white shadow-[0_6px_0_oklch(0.42_0.15_28),0_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-1 hover:shadow-[0_8px_0_oklch(0.42_0.15_28),0_15px_25px_rgba(0,0,0,0.2)] active:translate-y-[6px] active:shadow-[0_0px_0_rgba(0,0,0,0)]',
  reward:
    'bg-gradient-to-b from-[oklch(0.78_0.13_80)] to-[oklch(0.66_0.13_70)] text-[oklch(0.25_0.07_60)] shadow-[0_6px_0_oklch(0.48_0.11_70),0_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-1 hover:shadow-[0_8px_0_oklch(0.48_0.11_70),0_15px_25px_rgba(0,0,0,0.2)] active:translate-y-[6px] active:shadow-[0_0px_0_rgba(0,0,0,0)]',
  ghost: 'bg-white border-2 border-border text-text shadow-[0_4px_0_oklch(0.86_0.025_78)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_oklch(0.86_0.025_78)] active:translate-y-[4px] active:shadow-[0_0px_0_oklch(0.86_0.025_78)]',
  danger: 'bg-gradient-to-b from-[#ff7a7a] to-error text-white shadow-[0_4px_0_#9c1c1c] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#9c1c1c] active:translate-y-[4px] active:shadow-[0_0px_0_rgba(0,0,0,0)]',
}

const sizes: Record<Size, string> = {
  md: 'min-h-12 px-6 py-3 text-lg',
  lg: 'min-h-14 px-10 py-4 text-xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  success?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  success = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const state = success
    ? 'bg-gradient-to-b from-[oklch(0.78_0.13_80)] to-[oklch(0.66_0.13_70)] text-[oklch(0.25_0.07_60)] shadow-[0_0px_0_rgba(0,0,0,0)]'
    : loading
      ? 'opacity-60 cursor-wait shadow-none transform-none'
      : ''

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

    if (rest.onClick) {
      rest.onClick(e)
    }
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[1.25rem] font-display tracking-wide transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0 disabled:shadow-[0_4px_0_var(--color-border)] disabled:bg-paper-2 disabled:text-text-2 disabled:border-border disabled:border ${variants[variant]} ${sizes[size]} ${state} ${className}`}
      disabled={rest.disabled || loading}
      {...rest}
      onClick={handleClick}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current/30 border-t-current"
        />
      )}
      {children}
    </button>
  )
}