import React from 'react';

import css from './Info.module.scss';

const devsInfo = [
  {
    name: 'Грызин Алексей',
    img: require('assets/jpg/feelsbadmans.jpeg'),
    job: 'frontend',
    github: 'https://github.com/feelsbadmans',
  },
  {
    name: 'Хижняков Вадим',
    img: require('assets/png/don.png'),
    job: 'backend',
    github: 'https://github.com/DonVadimon',
  },
  {
    name: 'Пакало Александр',
    img: require('assets/jpg/ds13.jpeg'),
    job: 'network',
    github: 'https://github.com/DeadlySquad13',
  },
];

export const Info: React.FC = () => {
  return (
    <div className={css.container}>
      <h2>Video Hosting App</h2>
      <p>Данное приложение является курсовой работой по предмету Сетевые технологии в АСОИУ</p>
      <h3>Команда разработчиков</h3>
      <div className={css.devs}>
        {devsInfo.map((dev) => (
          <div key={dev.name} className={css.dev}>
            <img src={dev.img} className={css.avatar} />
            <p>{dev.name}</p>
            <p className={css.devDesc}>{dev.job}</p>
            <a href={dev.github} className={css.link} target="_blank" rel="noreferrer">
              Ссылка на GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
