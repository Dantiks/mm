import React from 'react';

const About = () => {
  return (
    <div className="max-w-7xl w-full mx-auto px-10 my-5 flex flex-col md:flex-row items-center">
      <div className="lg:w-1/2 p-10">
        <div className="image object-center text-center">
          <img src="https://i.imgur.com/WbQnbas.png" alt="*"/>
        </div>
      </div>
      <div className="lg:w-1/2">
        <div className="text">
          <h2 className="my-4 font-bold text-3xl  sm:text-4xl "><span
            className=" text-darkBlue">Долбоор жөнүндө</span>
          </h2>
          <div className="text-gray-700 space-y-2">
            <p className="">
              <a href="/" className="text-blue-500 hover:text-blue-300">mediamap.kg</a> – бул Кыргызстандын интернет
              мейкиндигинде кастык тили, санариптик алдамчылык жана жалган маалыматтардын таралышы фактыларын
              чагылдырган интерактивдүү карта.
            </p>
            <p className="">
              Кыргызстандык интернет колдонуучулар санариптик мейкиндикте туш болгон жалган маалымат, жек көрүүчүлүк
              сөздөр же санариптик алдамчылык учурлары жөнүндө билдирүү жөнөтө алышат. Долбоордун командасы бул
              маалыматтарды карап чыгып, баа берип, колдонуучуларга тиешелүү түшүндүрмөлөрдү жана мыйзам бузууларга
              каршы чара көрүү боюнча кеңештерди берет.
            </p>
            <p className="">
              Интерактивдүү онлайн карта <a href="https://leafletjs.com/" target="_blank"
                                            className="text-blue-500 hover:text-blue-300"
                                            rel="noreferrer">Leaflet</a> | © <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank" rel="noreferrer"
              className="text-blue-500 hover:text-blue-300">OpenStreetMap</a> негизделди.
            </p>
            <p className="">
              Карта реалдуу убакытта жаңыланып турат, колдонуучулар мыйзам бузуулар орун алган конкреттүү учурларды жана
              географиялык аймактарды көрсөтө алышат. Ошондой эле, колдонуучулар өз билдирүүлөрүн бөлүшүү аркылуу жалган
              маалыматка, жек көрүүчүлүк сөздөргө жана санариптик алдамчылыкка каршы күрөшкө салым кошо алышат.
            </p>
            <p className="">
              Укук бузуулар тууралуу маалыматтар колдонуучуларга укук бузуулардын түрлөрү, алардын кесепеттери жана
              аларга каршы күрөшүү ыкмалары жөнүндө маалымдуулугун жогорулатууга мүмкүнчүлүк берет. Бул жарандардын
              медиа, маалыматтык жана санариптик сабаттуулук деңгээлин көтөрүүгө да жардам берет.
            </p>
            <p className="">
              Бул карта <a href="https://internews.kg/ru/proekt-caravan/"
                           target="_blank" rel="noreferrer"
                           className="text-blue-500 hover:text-blue-300">Борбордук Азиядагы «Анык окуялар аркылуу
              аудиториянын туруктуулугун жогорулатуу (CARAVAN)»</a> аттуу аймактык долбоордун алкагында түзүлдү.
              Долбоорду <a href="https://internews.kg/"
                           target="_blank" rel="noreferrer"
                           className="text-blue-500 hover:text-blue-300">Internews</a> уюму Европалык Союздун каржылоосу
              менен ишке ашырууда. Кыргызстанда долбоордун өнөктөшү - Кыргызстандын Жамааттык ЖМКлар Ассоциациясы
              (ЖММК), <a href="https://mediaconsult.kg" target="_blank" rel="noreferrer"
                         className="text-blue-500 hover:text-blue-300">МедиаКонсалт фонду</a> жана <a
              href="https://www.facebook.com/Checkitkg" target="_blank" rel="noreferrer"
              className="text-blue-500 hover:text-blue-300">СheckIt.kg</a> долбоору менен кызматташтыкта иш алып
              барууда.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;