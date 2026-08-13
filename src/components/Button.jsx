import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
  icon = 'down',
  ...props
}) {
  const Icon = icon === 'up' ? ArrowUpRight : ArrowDownRight;
  return (
    <a
      className={`button button--${variant} ${className}`.trim()}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      <span>{children}</span>
      <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
    </a>
  );
}
