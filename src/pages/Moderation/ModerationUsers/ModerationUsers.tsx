import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LabeledValue } from 'antd/lib/select';
import { UserProfile } from 'api/userProfile';
import { getAllGroups } from 'api/utilsApis';
import { UserEntity } from 'api_generated';
import { usePageState } from 'hooks/usePageState';
import { getAllUsersAction } from 'redux/actions/users';
import { useAppSelector } from 'redux/hooks';

import { Button } from 'components/Button';
import { User } from 'components/NavBar/components/User';
import { Pagination } from 'components/Pagination';
import { Spinner } from 'components/Spinner';
import { UserEditModal } from 'components/UserEditModal';

import css from './ModerationUsers.module.scss';

export const ModerationUsers = () => {
  const loadingRef = useRef(false);
  const dispatch = useDispatch();

  const [userGroups, setUserGroups] = useState<LabeledValue[]>([]);

  useEffect(() => {
    const getGroups = async () => {
      loadingRef.current = true;
      const groups = await getAllGroups();
      loadingRef.current = false;
      setUserGroups(groups || []);
    };
    void getGroups();
  }, []);

  const { data: profile } = useAppSelector((store) => store.userProfile);
  const { data, fetchStatus, pageInfo } = useAppSelector((store) => store.users);

  const [fetched, setFetched] = useState(false);

  const { pageState, handleSetPage, handleSetSize } = usePageState({ page: 1, size: 7 });

  useEffect(() => {
    dispatch(getAllUsersAction({ pageInfo: { number: pageState.page - 1, size: pageState.size } }));
    setFetched(true);
  }, [pageState.page, pageState.size, dispatch]);

  const [selectedUser, setSelectedUser] = useState<UserProfile | undefined>(undefined);

  return (
    <div className={css.container}>
      {!data || loadingRef.current || !fetched || fetchStatus === 'fetching' || !profile ? (
        <div className={css.spinner}>
          <Spinner theme="light" />
        </div>
      ) : (
        <>
          <div className={css.users}>
            {data.map((user) => (
              <div className={css.userLine} key={`User${user.id}`}>
                <User
                  needAuthorities={false}
                  user={user as unknown as UserEntity}
                  className={css.user}
                  needExitButton={false}
                />
                {user.id !== profile.id && (
                  <Button view="primary" onClick={() => setSelectedUser(user)}>
                    Редактировать
                  </Button>
                )}
              </div>
            ))}
            <Pagination
              onChange={(p, s) => {
                if (p !== pageState.page) {
                  handleSetPage(p);
                }
                if (s !== pageState.size) {
                  handleSetSize(s);
                }
              }}
              current={pageState.page}
              total={pageInfo?.totalElements}
              pageSize={pageState.size}
            />
          </div>
        </>
      )}
      {selectedUser && (
        <UserEditModal user={selectedUser} onClose={() => setSelectedUser(undefined)} groups={userGroups} />
      )}
    </div>
  );
};
