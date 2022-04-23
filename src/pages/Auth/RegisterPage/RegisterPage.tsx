import React from 'react';
import { Form } from 'react-final-form';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { registerFormInitValues } from './constants';
import { RegisterFormType } from './types';
import { validateRegisterForm } from './validate';

import css from '../Auth.module.scss';

//TODO: перенести на страницу авторизации
export const RegisterPage: React.FC = () => {
  const onSubmit = (v: RegisterFormType) => {
    console.log(v);
  };

  return (
    <div className={css.container}>
      <h2>Video Hosting App</h2>
      <Form<RegisterFormType>
        initialValues={registerFormInitValues}
        onSubmit={onSubmit}
        validate={validateRegisterForm}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={css.form}>
              <Input name="username" label="Имя пользователя" placeholder="введите имя пользователя" />
              <Input name="password" label="Пароль" placeholder="введите пароль" type="password" />
              <Input
                name="passwordReply"
                label="Повторите пароль"
                placeholder="введите пароль ещё раз"
                type="password"
              />
              <Button view="primary" size="l" type="submit">
                Регистрация
              </Button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};
