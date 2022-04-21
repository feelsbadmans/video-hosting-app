import React from 'react';
import { Form } from 'react-final-form';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import css from './Main.module.scss';

//TODO: перенести на страницу авторизации
export const Main: React.FC = () => {
  const onSubmit = (v: Record<string, unknown>) => alert(v);

  return (
    <div className={css.container}>
      <h2>Video Hosting App</h2>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={css.form}>
              <Input
                name="username"
                label="Username"
                placeholder="enter username"
                validate={(v) => (!v ? 'non-empty field' : v === 'biba' ? 'not biba' : undefined)}
              />
              <Input
                name="password"
                label="Password"
                placeholder="enter password"
                validate={(v) => (v ? undefined : 'non-empty field')}
                type="password"
              />
              <Button view="primary" size="l" type="submit">
                Log in
              </Button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};
