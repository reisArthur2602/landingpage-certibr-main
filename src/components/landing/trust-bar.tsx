import { ShieldCheck, Users, Headset, BadgeCheck } from 'lucide-react';

const stats = [
    { icon: Users, value: '+5.000', label: 'empresas atendidas' },
    { icon: BadgeCheck, value: '100%', label: 'parceiros autorizados' },
    { icon: Headset, value: 'Humano', label: 'atendimento real, sem robô' },
    { icon: ShieldCheck, value: 'ICP-Brasil', label: 'padrão de segurança' },
];

const TrustBar = () => {
    return (
        <section className="border-y border-slate-100 bg-white">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-5 py-10 sm:px-8 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center gap-2 px-4 text-center"
                    >
                        <stat.icon className="text-brand-600" size={26} />
                        <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                        <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrustBar;
