import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { LabeledValue } from 'antd/lib/select';
import { UserProfile } from 'api/userProfile';
import { updateUser } from 'api/users';
import { setErrorAction } from 'redux/actions/error';
import { getAllUsersAction } from 'redux/actions/users';
import { useAppSelector } from 'redux/hooks';

import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import { Select } from 'components/Select';

import { UserFormType } from './types';
import { AUTHORITIES_LABELS, getInitUserValues } from './utils';

import css from './UserEditModal.module.scss';

type UserEditModalProps = {
  user: UserProfile;
  onClose: () => void;
  groups: LabeledValue[];
};

export const UserEditModal: React.FC<UserEditModalProps> = ({ onClose, user, groups }) => {
  const dispatch = useDispatch();
  const loadingRef = useRef(false);

  const { fetchStatus } = useAppSelector((store) => store.users);

  const initialValues = useMemo<UserFormType>(() => getInitUserValues(user), [user]);

  const handleSubmit = useCallback(
    async (values: UserFormType) => {
      loadingRef.current = true;
      await updateUser(values, user.id || 1).catch((e) => {
        loadingRef.current = false;
        dispatch(setErrorAction(e.response?.data?.errorMessage ?? e.message));
      });
      loadingRef.current = false;
      dispatch(getAllUsersAction({ pageInfo: { number: 0, size: 7 } }));
    },
    [dispatch, user.id],
  );

  useEffect(() => {
    if (fetchStatus === 'fetching') {
      onClose();
    }
  }, [fetchStatus, onClose]);

  return (
    <Modal onClose={onClose}>
      <Form<UserFormType> initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <div className={css.form}>
              <Input name="username" label="Имя пользователя" placeholder="введите имя пользователя" />
              <Select name="group" label="Группа" placeholder="выберите группу" data={groups} />
              <Select
                name="authorities"
                label="Роли пользователя"
                placeholder="выберите роли"
                mode="multiple"
                data={AUTHORITIES_LABELS}
              />
              <div className={css.checkboxRow}>
                <Field
                  name="locked"
                  type="checkbox"
                  render={({ input }) => (
                    <Checkbox name="locked" checked={values.locked} onChange={input.onChange}>
                      Аккаунт заблокирован
                    </Checkbox>
                  )}
                ></Field>
              </div>
              <Button view="primary" size="m" type="submit" isLoading={loadingRef.current}>
                Изменить
              </Button>
            </div>
          </form>
        )}
      </Form>
    </Modal>
  );
};
