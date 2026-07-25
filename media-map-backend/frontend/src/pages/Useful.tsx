import React from 'react';
import UsefulListItem from '../components/UI/List/UsefulListItem';
import { USEFUL_RESOURCE_ICONS } from '../utils/usefulData';
import { PageHero, PageSection } from '../components/UI/DesignKit';
import { useLanguage } from '../i18n/LanguageContext';
import usefulContent from '../i18n/pages/useful';

const Useful = () => {
    const { language } = useLanguage();
    const c = usefulContent[language];

    return (
        <div className="bg-white">
            <PageHero
                eyebrow={c.eyebrow}
                title={c.title}
                subtitle={c.subtitle}
            />

            <PageSection>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {c.resources.map((resource) => (
                        <UsefulListItem
                            key={resource.id}
                            link={resource.link}
                            title={resource.title}
                            description={resource.description}
                            icon={USEFUL_RESOURCE_ICONS[resource.id]}
                            tag={resource.tag}
                            learnMoreLabel={c.learnMore}
                        />
                    ))}
                </div>
            </PageSection>
        </div>
    );
};

export default Useful;
