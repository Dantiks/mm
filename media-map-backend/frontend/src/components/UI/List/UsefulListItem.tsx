import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Props {
    link: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
    tag?: string;
    learnMoreLabel: string;
}

const UsefulListItem: React.FC<Props> = ({ link, title, description, icon, tag, learnMoreLabel }) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-5 rounded-[16px] border border-lineLight bg-white p-5 transition-colors duration-200 hover:bg-white"
        >
            {/* Иконка */}
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 text-navy">
                {icon || <ExternalLink className="h-5 w-5" />}
            </div>

            {/* Контент */}
            <div className="min-w-0 flex-grow">
                <div className="mb-1 flex items-center gap-2">
                    <h3 className="truncate text-[16px] font-extrabold text-ink">{title}</h3>
                    {tag && (
                        <span className="rounded-md bg-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-goldDeep">
                            {tag}
                        </span>
                    )}
                </div>

                <p className="line-clamp-2 text-[14px] leading-snug text-slateBody">{description}</p>

                <div className="mt-3 flex items-center text-[11px] font-bold text-goldDeep opacity-0 transition-opacity group-hover:opacity-100">
                    {learnMoreLabel} <ExternalLink className="ml-1 h-3 w-3" />
                </div>
            </div>
        </a>
    );
};

export default UsefulListItem;
