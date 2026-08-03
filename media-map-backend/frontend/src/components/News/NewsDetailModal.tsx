import React from 'react';
import { X, ExternalLink, Calendar, Globe, Sparkles } from 'lucide-react';

export interface DetailedNewsItem {
  id: string | number;
  title: string;
  link: string;
  image?: string;
  tag?: string;
  date: string;
  source?: string;
  contentSnippet?: string;
  description?: string;
  author?: string;
}

interface Props {
  news: DetailedNewsItem | null;
  onClose: () => void;
  onRunAiCheck?: (text: string) => void;
}

const NewsDetailModal: React.FC<Props> = ({ news, onClose, onRunAiCheck }) => {
  if (!news) return null;

  const fullText = `${news.title}. ${news.description || news.contentSnippet || ''}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-black text-navy uppercase tracking-widest">
              NYT Editorial Reader • {news.source || 'MediaMap Feed'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200/80 text-slate-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Main Editorial Reader Body (NYTimes Style) */}
        <div className="p-6 md:p-10 space-y-6">
          
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-bold text-slate-700">
                <Calendar className="h-3.5 w-3.5 text-red-600" />
                {news.date}
              </span>
              <span className="flex items-center gap-1.5 font-bold text-slate-700">
                <Globe className="h-3.5 w-3.5 text-blue-600" />
                By {news.author || news.source || 'Media-Map Editorial'}
              </span>
            </div>

            {news.tag && (
              <span className="rounded-full bg-red-50 text-red-700 border border-red-100 px-3 py-1 font-bold uppercase text-[10px]">
                #{news.tag}
              </span>
            )}
          </div>

          {/* Title & Image Layout */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-navy leading-tight tracking-tight">
              {news.title}
            </h1>

            {news.image && (
              <div className="w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Main Article Snippet / Description */}
            <div className="text-base sm:text-lg leading-relaxed text-slate-700 font-serif pt-2 space-y-4 border-l-2 border-red-500/80 pl-4 bg-slate-50/50 p-4 rounded-r-2xl">
              <p>{news.description || news.contentSnippet || 'Полный текст доступен на первоисточнике.'}</p>
            </div>
          </div>

          {/* Actions & Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              {onRunAiCheck && (
                <button
                  onClick={() => {
                    onClose();
                    onRunAiCheck(fullText);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs shadow-md shadow-red-500/20 hover:scale-103 transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  Проверить через GPT-4o mini
                </button>
              )}
            </div>

            {news.link && (
              <a
                href={news.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-md"
              >
                <span>Читать на первоисточнике</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailModal;
