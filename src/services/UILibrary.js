// src/components/ui/Button.jsx

const joinClasses = (...classes) => classes.filter(Boolean).join(' ');

export function Button({
  variant = 'primary',
  loading = false,
  children,
  className,
  disabled,
  ...props
}) {
  return (
    <button
      className={joinClasses('btn', `btn-${variant}`, loading && 'btn-loading', className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
