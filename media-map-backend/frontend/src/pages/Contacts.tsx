import React from 'react';
import { Mail, Phone, Send, MessageCircle, ArrowRight } from "lucide-react";

const Contacts = () => {
  return (
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
            Биз менен <span className="text-blue-600">байланышыңыз</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Суроолоруңуз же сунуштарыңыз болсо, төмөнкү каналдар аркылуу бизге жазыңыз. Биз ар дайым кызматташууга даярбыз.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <a
              href="https://t.me/+H3IwsY4KVcJjYjUy"
              target="_blank"
              rel="noreferrer"
              className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Send className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-2">Telegram</h3>
            <p className="text-slate-500 text-sm mb-6 flex-grow">
              Тез байланышуу жана топко кошулуу үчүн шилтемени басыңыз.
            </p>
            <span className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            Кошулуу <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          </a>

          <div className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-2">Электрондук почта</h3>
            <p className="text-slate-500 text-sm mb-6 flex-grow">
              Расмий суроолор жана кызматташуу боюнча кат жазыңыз.
            </p>
            <span className="text-slate-900 font-bold text-sm select-all">
            media.map.kg@gmail.com
          </span>
          </div>

          <div className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-emerald-100 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-2">Телефон</h3>
            <p className="text-slate-500 text-sm mb-6 flex-grow">
              Иш убактысында чалуулар үчүн жеткиликтүүбүз.
            </p>
            <span className="text-emerald-600 font-bold text-lg">
            +996 550 786186
          </span>
          </div>
        </div>

        <div className="mt-12 bg-slate-900 rounded-[3rem] p-8 md:p-12 overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-white text-2xl font-bold mb-2">Техникалык колдоо керекпи?</h4>
              <p className="text-slate-400">Картаны колдонууда кыйынчылыктар жаралса, бизге жазыңыз.</p>
            </div>
            <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-blue-50 transition-colors flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp аркылуу жазуу
            </button>
          </div>

          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>
  );
};

export default Contacts;