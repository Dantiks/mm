import React from 'react';
import { ExternalLink } from "lucide-react";

interface Props {
    link: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
    tag?: string;
}

const UsefulListItem: React.FC<Props> = ({ link, title, description, icon, tag }) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-5 bg-white border border-slate-100 p-5 rounded-2xl transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/50"
        >
            {/* Маленькая компактная иконка */}
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {icon || <ExternalLink className="w-5 h-5" />}
            </div>

            {/* Контентная часть */}
            <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>
                    {tag && (
                        <span className="text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
              {tag}
            </span>
                    )}
                </div>

                <p className="text-slate-500 text-sm leading-snug line-clamp-2 italic md:not-italic">
                    {description}
                </p>

                <div className="mt-3 flex items-center text-[11px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Кененирээк билүү <ExternalLink className="w-3 h-3 ml-1" />
                </div>
            </div>
        </a>
    );
};

export default UsefulListItem;