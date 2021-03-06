import React, { useEffect, useRef } from 'react';
import { Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { register } from 'api/userProfile';
import { setErrorAction } from 'redux/actions/error';
import { useAppDispatch } from 'redux/hooks';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { registerFormInitValues } from './constants';
import { RegisterFormType } from './types';
import { validateRegisterForm } from './validate';

import css from '../Auth.module.scss';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loadingRef = useRef(false);

  const onSubmit = async (v: RegisterFormType) => {
    loadingRef.current = true;

    await register({ ...v, name: v.username, group: 'IU5' })
      .then(() => navigate('/'))
      .catch((e) => {
        loadingRef.current = false;
        dispatch(setErrorAction(e.response?.data?.errorMessage ?? e.message));
      });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

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
                name="passwordRepeat"
                label="Повторите пароль"
                placeholder="введите пароль ещё раз"
                type="password"
              />
              <Button view="primary" size="l" type="submit" isLoading={loadingRef.current}>
                Регистрация
              </Button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};
