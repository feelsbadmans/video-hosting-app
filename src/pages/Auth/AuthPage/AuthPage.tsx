import React, { useEffect, useRef } from 'react';
import { Form } from 'react-final-form';
import { Link, useNavigate } from 'react-router-dom';
import { login } from 'api/userProfile';
import { setErrorAction } from 'redux/actions/error';
import { useAppDispatch } from 'redux/hooks';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { autnFormInitValues } from './constants';
import { AuthFormType } from './types';
import { validateAuthForm } from './validate';

import css from '../Auth.module.scss';

//TODO: перенести на страницу авторизации
export const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadingRef = useRef(false);

  const onSubmit = async (v: AuthFormType) => {
    loadingRef.current = true;
    await login(v)
      .then(() => {
        navigate('/');
      })
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
      <Form<AuthFormType> initialValues={autnFormInitValues} onSubmit={onSubmit} validate={validateAuthForm}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={css.form}>
              <Input name="username" label="Имя пользователя" placeholder="введите имя пользователя" />
              <Input name="password" label="Пароль" placeholder="введите пароль" type="password" />
              <Button view="primary" size="l" type="submit" isLoading={loadingRef.current}>
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
