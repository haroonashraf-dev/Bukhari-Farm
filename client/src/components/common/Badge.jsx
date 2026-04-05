import { cn } from '../../utils/cn';

export default function Badge({ children, status, className }) {
  const statusStyles = {
    active: 'bg-emerald-100/80 text-emerald-800 border-emerald-200',
    pregnant: 'bg-amber-100/80 text-amber-800 border-amber-200',
    sold: 'bg-blue-100/80 text-blue-800 border-blue-200',
    dead: 'bg-red-100/80 text-red-800 border-red-200',
    default: 'bg-stone-100 text-stone-800 border-stone-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border tracking-wide',
        statusStyles[status] || statusStyles.default,
        className
      )}
    >
      {children}
    </span>
  );
}
