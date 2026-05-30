import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground border-primary hover:bg-primary/90',
        secondary:
          'bg-foreground text-background border-foreground hover:bg-foreground/90',
        destructive:
          'bg-destructive text-white border-destructive hover:bg-destructive/90 focus-visible:ring-destructive/40',
        outline:
          'bg-transparent text-foreground border-foreground/25 hover:border-foreground/50 hover:bg-foreground/5',
        ghost: 'border-transparent text-foreground hover:bg-foreground/8',
        link: 'border-transparent text-foreground font-medium underline-offset-4 decoration-accent hover:underline',
      },
      size: {
        default: 'h-11 px-8 has-[>svg]:px-6',
        sm: 'h-9 px-5 has-[>svg]:px-4',
        lg: 'h-12 px-10 has-[>svg]:px-8',
        icon: 'size-11',
        'icon-sm': 'size-9',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
