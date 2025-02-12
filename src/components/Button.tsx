import React, { useRef, useEffect } from 'react'
import { Loader2, ChevronDown } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'primary-dark' | 'secondary-dark'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  rounded?: 'full' | 'lg'
  tooltip?: string
  ripple?: boolean
}

// Ripple animation component
function Ripple({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <span 
      className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
      style={{
        left: x - size/2,
        top: y - size/2,
        width: size,
        height: size
      }}
    />
  )
}

export function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  rounded = 'lg',
  tooltip,
  ripple = true,
  disabled,
  className = '',
  onClick,
  ...props 
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = React.useState<Array<{ x: number, y: number, size: number, key: number }>>([])
  const rippleCount = useRef(0)

  const variants = {
    primary: `
      bg-blue-50 text-blue-600 hover:bg-blue-100/80 
      focus:ring-blue-100/50 active:bg-blue-100
      font-normal shadow-sm border border-blue-100/30
    `,
    secondary: `
      bg-white text-blue-600 hover:bg-blue-50/70 
      focus:ring-blue-100/50 active:bg-blue-50
      font-normal shadow-sm border border-blue-200/60
    `,
    outline: `
      border border-blue-200/80 text-blue-600 bg-transparent
      hover:bg-blue-50/50 focus:ring-blue-100/50 
      active:bg-blue-50/70
      font-normal
    `,
    ghost: `
      text-blue-600 hover:bg-blue-50/50 
      focus:ring-blue-100/50 active:bg-blue-50/70
      font-normal
    `,
    danger: `
      bg-red-50 text-red-600 hover:bg-red-100/80 
      focus:ring-red-100/50 active:bg-red-100
      font-normal shadow-sm border border-red-100/30
    `,
    success: `
      bg-emerald-50 text-emerald-600 hover:bg-emerald-100/80 
      focus:ring-emerald-100/50 active:bg-emerald-100
      font-normal shadow-sm border border-emerald-100/30
    `,
    warning: `
      bg-amber-50 text-amber-600 hover:bg-amber-100/80 
      focus:ring-amber-100/50 active:bg-amber-100
      font-normal shadow-sm border border-amber-100/30
    `,
    'primary-dark': `
      bg-blue-500 text-white hover:bg-blue-600 
      focus:ring-blue-400/30 active:bg-blue-700
      font-normal shadow-sm border border-blue-400/20
    `,
    'secondary-dark': `
      bg-blue-600 text-white hover:bg-blue-700 
      focus:ring-blue-500/30 active:bg-blue-800
      font-normal shadow-sm border border-blue-500/20
    `
  }

  const sizes = {
    sm: 'min-h-[30px] text-xs px-2.5 py-1',
    md: 'min-h-[36px] text-sm px-3 py-1.5',
    lg: 'min-h-[42px] text-base px-4 py-2'
  }

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const gaps = {
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-2.5'
  }

  const roundedStyles = {
    full: 'rounded-full',
    lg: 'rounded-md'
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple || disabled || loading) return
    
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const size = Math.max(button.offsetWidth, button.offsetHeight)
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rippleKey = rippleCount.current
    rippleCount.current += 1

    setRipples(prev => [...prev, { x, y, size: size * 2, key: rippleKey }])
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.key !== rippleKey))
    }, 1000)

    onClick?.(e)
  }

  return (
    <button
      ref={buttonRef}
      disabled={disabled || loading}
      onClick={handleClick}
      className={`
        relative
        inline-flex items-center justify-center
        transition-all duration-150 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:opacity-40 disabled:cursor-not-allowed
        disabled:hover:bg-opacity-100 disabled:shadow-none
        overflow-hidden
        ${variants[variant]}
        ${sizes[size]}
        ${gaps[size]}
        ${roundedStyles[rounded]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      title={tooltip}
      {...props}
    >
      {ripples.map(({ x, y, size, key }) => (
        <Ripple key={key} x={x} y={y} size={size} />
      ))}

      {loading && (
        <Loader2 className={`${iconSizes[size]} animate-spin opacity-70`} />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className={`inline-flex text-current opacity-70 ${iconSizes[size]}`}>
          {icon}
        </span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className={`inline-flex text-current opacity-70 ${iconSizes[size]}`}>
          {icon}
        </span>
      )}
    </button>
  )
}

// Button Group Component
interface ButtonGroupProps {
  children: React.ReactNode
  vertical?: boolean
  fullWidth?: boolean
}

export function ButtonGroup({ children, vertical = false, fullWidth = false }: ButtonGroupProps) {
  return (
    <div className={`
      inline-flex ${vertical ? 'flex-col' : 'flex-row'}
      ${fullWidth ? 'w-full' : ''}
      overflow-hidden rounded-md shadow-sm
    `}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null

        // Get existing className from child props
        const existingClassName = child.props.className || ''
        
        // Create new props with modified className
        const newProps = {
          ...child.props,
          className: `
            ${existingClassName}
            ${vertical ? 'first:rounded-b-none last:rounded-t-none not-last:border-b-0' : 'first:rounded-r-none last:rounded-l-none not-last:border-r-0'}
            shadow-none
          `
        }

        return React.cloneElement(child, newProps)
      })}
    </div>
  )
}

// Split Button Component
interface SplitButtonProps extends Omit<ButtonProps, 'children'> {
  mainText: string
  menuItems: Array<{
    label: string
    onClick: () => void
    icon?: React.ReactNode
  }>
}

export function SplitButton({ 
  mainText, 
  menuItems,
  variant = 'primary',
  size = 'md',
  ...props 
}: SplitButtonProps) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <div className="relative inline-flex" ref={menuRef}>
      <ButtonGroup>
        <Button variant={variant} size={size} {...props}>
          {mainText}
        </Button>
        <Button 
          variant={variant} 
          size={size}
          className="px-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          {...props}
        >
          <ChevronDown className={iconSizes[size]} />
        </Button>
      </ButtonGroup>

      {menuOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick()
                setMenuOpen(false)
              }}
              className="w-full px-3 py-1.5 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              {item.icon && (
                <span className={`opacity-70 ${iconSizes[size]}`}>
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Icon Button Component
interface IconButtonProps extends Omit<ButtonProps, 'icon' | 'iconPosition'> {
  icon: React.ReactNode
}

export function IconButton({ 
  icon, 
  size = 'md', 
  className = '', 
  tooltip,
  ...props 
}: IconButtonProps) {
  const sizes = {
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2'
  }

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <Button
      {...props}
      size={size}
      className={`${sizes[size]} ${className}`}
      tooltip={tooltip}
    >
      <span className={`opacity-80 ${iconSizes[size]}`}>
        {icon}
      </span>
    </Button>
  )
}