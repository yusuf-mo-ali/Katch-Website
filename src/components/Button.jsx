import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const content = (
    <>
      <span>{children}</span>
      <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
    </>
  );
  const classes = `button button--${variant} ${className}`.trim();

  if (!external && href.startsWith('/')) {
    return <Link className={classes} to={href} {...props}>{content}</Link>;
  }

  return (
    <a
      className={classes}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {content}
    </a>
  );
}
