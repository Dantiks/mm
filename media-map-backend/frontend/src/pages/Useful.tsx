import React from 'react';
import UsefulListItem from "../components/UI/List/UsefulListItem";
import { USEFUL_RESOURCES } from "../utils/usefulData"; // если вынес в отдельный файл

const Useful = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Пайдалуу <span className="text-blue-600">булактар</span>
                </h2>
                <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
                <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-500 leading-relaxed">
                    Медиа сабаттуулук, фактчекинг жана сынчыл ой жүгүртүү боюнча тандалган материалдардын жыйнагы.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {USEFUL_RESOURCES.map((resource) => (
                    <UsefulListItem
                        key={resource.id}
                        link={resource.link}
                        title={resource.title}
                        description={resource.description}
                        icon={resource.icon}
                        tag={resource.tag}
                    />
                ))}
            </div>
        </div>
    );
};

export default Useful;