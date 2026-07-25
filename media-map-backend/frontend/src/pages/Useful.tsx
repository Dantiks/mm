import React from 'react';
import UsefulListItem from '../components/UI/List/UsefulListItem';
import { USEFUL_RESOURCES } from '../utils/usefulData';
import { PageHero, PageSection } from '../components/UI/DesignKit';

const Useful = () => {
    return (
        <div className="bg-white">
            <PageHero
                eyebrow="ресурсы"
                title="Полезные ресурсы"
                subtitle="Подборка избранных материалов по медиаграмотности, фактчекингу и критическому мышлению."
            />

            <PageSection>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
            </PageSection>
        </div>
    );
};

export default Useful;
