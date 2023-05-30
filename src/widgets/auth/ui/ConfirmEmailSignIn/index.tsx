import React, { useMemo } from 'react';
import axios from 'axios';
import { authApi } from '../../api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ConfirmEmailEntity, ConfirmEmailFormType } from 'entities/auth';
import { AuthPage, AuthType } from 'shared/types';
import { RouterMode, useRouterStore } from 'shared/store';
import { message } from 'antd';
import { useAppProcessStore } from 'entities/appProcess';
import { getErrorText } from 'shared/lib';

export const ConfirmEmailSignIn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setRouterMode = useRouterStore(state => state.setMode);
  const [messageApi, messageContext] = message.useMessage();
  const { setIsLoading } = useAppProcessStore();

  const email = useMemo(() => {
    const searchEmail = searchParams.get('email');
    if (typeof searchEmail === 'string') {
      return searchEmail;
    } else {
      navigate(`/auth/${AuthType.SIGN_IN}/${AuthPage.ENTER_EMAIL}`);
      return '';
    }

  }, [searchParams, navigate]);
  const onNext = async ({ code }: ConfirmEmailFormType) => {
    try {
      setIsLoading(true);

      const res = await authApi.getLoginToken({ email: email, code: code });
      const { accessToken, userRole } = res.data;

      localStorage.setItem('token', accessToken);
      localStorage.setItem('userRole', userRole);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      setRouterMode(RouterMode.investor);
      navigate('/');
    } catch (e) {
      messageApi.error(getErrorText(e));
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {messageContext}
      <ConfirmEmailEntity onNext={onNext} />
    </div>
  );
};
