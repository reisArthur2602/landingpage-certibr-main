import type { ReactNode } from 'react';
import { PainelProvider } from '@/lib/painel/store';

export default function PainelLayout({ children }: { children: ReactNode }) {
    return <PainelProvider>{children}</PainelProvider>;
}
