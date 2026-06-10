import type { LeadStatus } from '@/lib/painel/types';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/painel/utils';

interface Props {
    status: LeadStatus;
    size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: Props) {
    const colors = STATUS_COLORS[status];
    const label = STATUS_LABELS[status];
    const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClass} ${colors.bg} ${colors.text} border ${colors.border}`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
            {label}
        </span>
    );
}
