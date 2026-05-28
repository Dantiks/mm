import { BookOpen, ShieldCheck, Search, Globe, FileText, CheckSquare, GraduationCap } from "lucide-react";

export const USEFUL_RESOURCES = [
    {
        id: 1,
        link: "https://mediasabak.org/ru/education/",
        title: "Mediasabak.org",
        description: "Медиа сабаттуулук боюнча маалымат, мугалимдер үчүн окутуу модулдар, жана окутуучуларга арналган оюндар, роликтер.",
        tag: "Окутуу",
        icon: <BookOpen className="w-5 h-5" />
    },
    {
        id: 2,
        link: "https://www.article19.org/ru/resources/hate-speech-explained-a-toolkit/",
        title: "Article19.org",
        description: "Кастык тилин түшүнүү боюнча тажрыйбалык окуу китеби (кыргызча, орусча).",
        tag: "Укук",
        icon: <ShieldCheck className="w-5 h-5" />
    },
    {
        id: 3,
        link: "https://factcheck.kg/category/factcheck/",
        title: "Factcheck.kg",
        description: "Жалган маалыматты, манипуляцияларды жана пропаганданы текшерүү жана жокко чыгаруу үчүн көз карандысыз онлайн платформа.",
        tag: "Фактчек",
        icon: <Search className="w-5 h-5" />
    },
    {
        id: 4,
        link: "https://school.cabar.asia/ky/books/borborduk-azijada-internetten-zha-ylyk-materialdaryn-kerekt-izild-s-2/",
        title: "Cabar Asia",
        description: "Борбор Азияда интернеттеги жаңылыктар кандай керектелет?",
        tag: "Изилдөө",
        icon: <Globe className="w-5 h-5" />
    },
    {
        id: 5,
        link: "https://school.cabar.asia/ky/books/onlajn-okuu-kuraldary-bojuncha-chek-list/",
        title: "Cabar Asia",
        description: "Онлайн окуу куралдары боюнча чек лист",
        tag: "Чек-лист",
        icon: <CheckSquare className="w-5 h-5" />
    },
    {
        id: 6,
        link: "https://school.cabar.asia/ky/books/zha-y-medialar-bojuncha-kurstar-zhyjnagy-zhurnalistika-mugalimderi-ch-n-metodikalyk-koldonmo/",
        title: "Cabar Asia",
        description: "Жаңы медиалар боюнча курстар жыйнагы. Журналистика мугалимдери үчүн методикалык колдонмо",
        tag: "Усулдук",
        icon: <GraduationCap className="w-5 h-5" />
    },
    {
        id: 7,
        link: "https://school.cabar.asia/ky/books/mediasabattuuluk-zhana-synchyl-oj-zh-g-rt-bojuncha-kurstardyn-toptomu-zhogorku-okuu-zhajlardyn-okutuuchulary-ch-n-metodikalyk-koldonmo/",
        title: "Cabar Asia",
        description: "Медиасабаттуулук жана сынчыл ой жүгүртүү боюнча курстардын топтому. Жогорку окуу жайлардын окутуучулары үчүн методикалык колдонмо",
        tag: "Курстар",
        icon: <GraduationCap className="w-5 h-5" />
    },
    {
        id: 8,
        link: "https://drive.google.com/file/d/1wtOXU5OCFqxh5BQySLelKSTfGMNz0Ia9/view",
        title: "Экспресс-баалоо",
        description: "Борбордук Азиядагы медиакеректөө изилдөөсү (REVIVE долбоорунун алкагында).",
        tag: "Результат",
        icon: <FileText className="w-5 h-5" />
    }
];