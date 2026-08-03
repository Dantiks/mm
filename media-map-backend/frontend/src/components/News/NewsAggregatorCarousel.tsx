import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';

export interface NewsItem {
  id: string | number;
  title: string;
  link: string;
  image: string;
  tag: string;
  date: string;
  commentsCount?: number;
  description?: string;
  onClick?: () => void;
}

interface Props {
  items: NewsItem[];
  title?: string;
  onSelectNews?: (news: NewsItem) => void;
}

const NewsAggregatorCarousel: React.FC<Props> = ({ items, title = 'Агрегатор новостей', onSelectNews }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = 260;

      if (direction === 'right') {
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 15;
        if (isAtEnd) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Автоматический скролл карусели каждые 3.2 секунды
  useEffect(() => {
    if (isHovered || items.length <= 1) return;

    const timer = setInterval(() => {
      scroll('right');
    }, 3200);

    return () => clearInterval(timer);
  }, [isHovered, items.length]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-xl border border-slate-100/80 relative"
    >
      {/* Header with Navigation Controls */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
          <h3 className="text-base font-black text-navy uppercase tracking-wider">{title}</h3>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            Live Auto-scroll
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-red-600 hover:text-white transition-all shadow-2xs active:scale-95 cursor-pointer"
            aria-label="Назад"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-red-600 hover:text-white transition-all shadow-2xs active:scale-95 cursor-pointer"
            aria-label="Вперед"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto py-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((news) => (
          <div
            key={news.id}
            onClick={() => {
              if (onSelectNews) {
                onSelectNews(news);
              } else if (news.link && news.link.startsWith('http')) {
                window.open(news.link, '_blank');
              }
            }}
            className="group flex flex-col w-[210px] sm:w-[230px] shrink-0 snap-start transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
          >
            {/* Card Image Container */}
            <div className="relative h-[250px] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-md">
              <img
                src={news.image}
                alt={news.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
              />

              {/* Top Tag Badge */}
              <span className="absolute top-3 left-3 rounded-full bg-red-600/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-sm">
                #{news.tag}
              </span>

              {/* Bottom Overlay Gradient & Floating Comment Badge */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3 pt-8 flex items-end justify-between">
                <span className="text-[10px] font-bold text-white/90">{news.date}</span>
                {news.commentsCount !== undefined && (
                  <span className="flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white border border-white/20">
                    <MessageSquare className="h-3 w-3 text-gold" />
                    {news.commentsCount}
                  </span>
                )}
              </div>
            </div>

            {/* Title & Description Below Image */}
            <div className="mt-2.5 px-0.5">
              <h4 className="text-[14px] font-extrabold leading-snug text-navy group-hover:text-red-600 transition-colors line-clamp-2">
                {news.title}
              </h4>
              {news.description && (
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500 line-clamp-2">
                  {news.description}
                </p>
              )}
              <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-red-600 group-hover:translate-x-1 transition-transform">
                <span>Читать далее</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsAggregatorCarousel;
