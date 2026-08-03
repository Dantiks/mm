import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch} from "../app/hooks/useAppDispatch";
import {fetchViolationTypes} from "../features/violationTypes/violationTypesThunks";
import ViolationForm from "../components/Forms/ViolationForm";
import {useLanguage} from "../i18n/LanguageContext";
import newReportContent from "../i18n/pages/newReport";
import EditableText from "../components/CMS/EditableText";

interface ExpandedState {
  [key: string]: boolean;
}

const NewReport: React.FC = () => {
  const [expanded, setExpanded] = useState<ExpandedState>({
    block1: false,
    block2: false,
    block3: false,
  });
  const dispatch = useAppDispatch();
  const sectionRef = useRef<HTMLDivElement>(null);
  const {language} = useLanguage();
  const c = newReportContent[language];

  useEffect(() => {
    dispatch(fetchViolationTypes());
  }, [dispatch]);

  const toggleContent = (blockId: string): void => {
    setExpanded((prev) => ({
      ...prev,
      [blockId]: !prev[blockId],
    }));
  };

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <div
      className="flex flex-col-reverse lg:flex-row gap-8 max-w-[1792px] w-full mx-auto px-6 lg:px-16 py-12 font-inter"
    >
      <ViolationForm />

      <div className="flex-1 mb-10 lg:mb-0 text-[15px] leading-[24px] text-slateBody space-y-3">
        <h2 className="text-[24px] font-extrabold text-navy mb-5"><EditableText textKey="report.howToFillTitle" value={c.howToFillTitle} /></h2>
        <p className="">
          <EditableText textKey="report.intro1_before" value={c.intro1_before} />
          <span className="font-bold text-goldDeep hover:underline cursor-pointer"
                onClick={scrollToSection}><EditableText textKey="report.intro1_link" value={c.intro1_link} /></span>
          <EditableText textKey="report.intro1_after" value={c.intro1_after} />
          <span className="text-red-500 font-bold">*</span>
          <EditableText textKey="report.requiredNote" value={c.requiredNote} />
        </p>
        <p className="">
          <EditableText textKey="report.intro2" value={c.intro2} />
        </p>
        <p className="">
          <EditableText textKey="report.intro3" value={c.intro3} />
        </p>
        <p className="">
          <EditableText textKey="report.intro4" value={c.intro4} />
        </p>
        <p className="font-bold mt-4">
          <EditableText textKey="report.thanks" value={c.thanks} />
        </p>
        <p className="font-bold mt-2">
          <EditableText textKey="report.beMediaLiterate" value={c.beMediaLiterate} />
        </p>

        <h1 className="text-[22px] font-extrabold text-navy mt-8" ref={sectionRef}><EditableText textKey="report.violationTypesTitle" value={c.violationTypesTitle} /></h1>

        <h2 className="text-[19px] font-bold text-ink mt-6"><EditableText textKey="report.disinfo.title" value={c.disinfo.sectionTitle} /></h2>
        <div>
          {expanded.block1 && (<div>
            <p className="my-2"><span className="font-semibold">{c.disinfo.introTerm}</span>{c.disinfo.introRest}
            </p>
            <h3 className="font-semibold mt-4 mb-2">{c.disinfo.typesTitle}</h3>
            <ul className="list-disc pl-5 space-y-2">
              {c.disinfo.types.map((item, idx) => (
                <li key={idx}><span className="font-semibold">{item.term}</span> {item.description}
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mt-4 mb-2">{c.disinfo.methodsTitle}</h3>
            <ul className="list-disc pl-5 space-y-2">
              {c.disinfo.methods.map((method, idx) => (
                <li key={idx}><span className="font-semibold">{method.term}</span> {method.description}
                  {method.subItems && (
                    <>
                      <p className="indent-5 font-bold my-2">{method.subItemsLabel}</p>
                      <ul className="list-disc pl-10 space-y-2">
                        {method.subItems.map((sub, subIdx) => (
                          <li key={subIdx}>
                            {sub.term && <span className="font-semibold">{sub.term}</span>}
                            {sub.term ? ' ' : ''}{sub.description}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              ))}
            </ul>

            <p className="text-red-500 mt-4 mb-2">
              <strong>
                {c.disinfo.warningTitle}
                <ul>
                  {c.disinfo.warningList.map((item, idx) => (
                    <li key={idx}>
                      {item}
                    </li>
                  ))}
                </ul>
                {c.disinfo.warningFooter}
              </strong>
            </p>
          </div>)}
          <button
            className="mt-2 text-[14px] font-semibold text-goldDeep hover:underline"
            onClick={() => toggleContent('block1')}
          >
            <EditableText textKey="report.block1.btn" value={expanded.block1 ? c.hide : c.readMore} />
          </button>
        </div>

        <h2 className="text-[19px] font-bold text-ink mt-6"><EditableText textKey="report.hateSpeech.title" value={c.hateSpeech.sectionTitle} /></h2>
        <div>
          {expanded.block2 && (<div>
            <p className="my-2"><span className="font-semibold">{c.hateSpeech.introTerm}</span>{c.hateSpeech.introRest}
            </p>
            <p className="my-2">
              {c.hateSpeech.intro2}
            </p>

            <h3 className="font-semibold mt-4 mb-2">{c.hateSpeech.typesTitle}</h3>
            <ul className="list-disc pl-5 space-y-2">
              {c.hateSpeech.types.map((item, idx) => (
                <li key={idx}><span className="font-semibold">{item.term}</span> {item.description}
                </li>
              ))}
            </ul>
            <div className="text-red-500 font-bold mt-4 mb-2">
              <p><strong>{c.hateSpeech.warningTitle}</strong></p>
              <ul className="list-disc pl-5 space-y-2">
                {c.hateSpeech.warningList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>)}
          <button
            className="mt-2 text-[14px] font-semibold text-goldDeep hover:underline"
            onClick={() => toggleContent('block2')}
          >
            <EditableText textKey="report.block2.btn" value={expanded.block2 ? c.hide : c.readMore} />
          </button>
        </div>

        <h2 className="text-[19px] font-bold text-ink mt-6"><EditableText textKey="report.fraud.title" value={c.fraud.sectionTitle} /></h2>
        <div>
          {expanded.block3 && (<div>


            <p className="my-2"><span className="font-semibold">{c.fraud.introTerm}</span>{c.fraud.introRest}</p>

            <h3 className="font-semibold mt-4 mb-2">{c.fraud.typesTitle}</h3>
            <ul className="list-disc pl-5 space-y-2">
              {c.fraud.types.map((item, idx) => (
                <li key={idx}><span className="font-semibold">{item.term}</span> {item.description}
                </li>
              ))}
            </ul>

            <p className="text-red-500 mt-4 mb-2">
              <strong>{c.fraud.warning}</strong>
            </p>
          </div>)}
          <button
            className="mt-2 text-[14px] font-semibold text-goldDeep hover:underline"
            onClick={() => toggleContent('block3')}
          >
            <EditableText textKey="report.block3.btn" value={expanded.block3 ? c.hide : c.readMore} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewReport;
