import React from 'react';
import { Form } from 'react-final-form';
import { Link } from 'react-router-dom';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { autnFormInitValues } from './constants';
import { AuthFormType } from './types';

import css from '../Auth.module.scss';

//TODO: перенести на страницу авторизации
export const AuthPage: React.FC = () => {
  const onSubmit = (v: AuthFormType) => {
    console.log(v);
  };

  return (
    <div className={css.container}>
      <h2>Video Hosting App</h2>
      <Form<AuthFormType> initialValues={autnFormInitValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={css.form}>
              <Input
                name="username"
                label="Имя пользователя"
                placeholder="введите имя пользователя"
                validate={(v) => (!v ? 'non-empty field' : v === 'biba' ? 'not biba' : undefined)}
              />
              <Input
                name="password"
                label="Пароль"
                placeholder="введите пароль"
                validate={(v) => (v ? undefined : 'non-empty field')}
                type="password"
              />
              <Button view="primary" size="l" type="submit">
                Войти
              </Button>
              <Link to="/register" className={css.link}>
                Регистрация
              </Link>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};
