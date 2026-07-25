import { BookOpen, ShieldCheck, Search, Globe, FileText, CheckSquare, GraduationCap } from "lucide-react";

export const USEFUL_RESOURCES = [
    {
        id: 1,
        link: "https://mediasabak.org/ru/education/",
        title: "Mediasabak.org",
        description: "Информация о медиаграмотности, обучающие модули для учителей, а также игры и ролики для преподавателей.",
        tag: "Обучение",
        icon: <BookOpen className="w-5 h-5" />
    },
    {
        id: 2,
        link: "https://www.article19.org/ru/resources/hate-speech-explained-a-toolkit/",
        title: "Article19.org",
        description: "Практическое учебное пособие по пониманию языка вражды (на кыргызском и русском языках).",
        tag: "Право",
        icon: <ShieldCheck className="w-5 h-5" />
    },
    {
        id: 3,
        link: "https://factcheck.kg/category/factcheck/",
        title: "Factcheck.kg",
        description: "Независимая онлайн-платформа для проверки и опровержения дезинформации, манипуляций и пропаганды.",
        tag: "Фактчек",
        icon: <Search className="w-5 h-5" />
    },
    {
        id: 4,
        link: "https://school.cabar.asia/ky/books/borborduk-azijada-internetten-zha-ylyk-materialdaryn-kerekt-izild-s-2/",
        title: "Cabar Asia",
        description: "Как потребляются новости в интернете в Центральной Азии?",
        tag: "Исследование",
        icon: <Globe className="w-5 h-5" />
    },
    {
        id: 5,
        link: "https://school.cabar.asia/ky/books/onlajn-okuu-kuraldary-bojuncha-chek-list/",
        title: "Cabar Asia",
        description: "Чек-лист по инструментам онлайн-обучения",
        tag: "Чек-лист",
        icon: <CheckSquare className="w-5 h-5" />
    },
    {
        id: 6,
        link: "https://school.cabar.asia/ky/books/zha-y-medialar-bojuncha-kurstar-zhyjnagy-zhurnalistika-mugalimderi-ch-n-metodikalyk-koldonmo/",
        title: "Cabar Asia",
        description: "Сборник курсов по новым медиа. Методическое пособие для преподавателей журналистики",
        tag: "Методический",
        icon: <GraduationCap className="w-5 h-5" />
    },
    {
        id: 7,
        link: "https://school.cabar.asia/ky/books/mediasabattuuluk-zhana-synchyl-oj-zh-g-rt-bojuncha-kurstardyn-toptomu-zhogorku-okuu-zhajlardyn-okutuuchulary-ch-n-metodikalyk-koldonmo/",
        title: "Cabar Asia",
        description: "Подборка курсов по медиаграмотности и критическому мышлению. Методическое пособие для преподавателей высших учебных заведений",
        tag: "Курсы",
        icon: <GraduationCap className="w-5 h-5" />
    },
    {
        id: 8,
        link: "https://drive.google.com/file/d/1wtOXU5OCFqxh5BQySLelKSTfGMNz0Ia9/view",
        title: "Экспресс-оценка",
        description: "Исследование медиапотребления в Центральной Азии (в рамках проекта REVIVE).",
        tag: "Результат",
        icon: <FileText className="w-5 h-5" />
    }
];