import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { authApi } from '../../api';
import { AuthPage, AuthType } from 'shared/types';
import { ConfirmEmailEntity, ConfirmEmailFormType } from 'entities/auth';
import { message } from 'antd';
import { useAppProcessStore } from '../../../../entities/appProcess';
import { getErrorText } from '../../../../shared/lib';


type ConfirmEmailParams = {
  type: AuthType
}

export const ConfirmEmailSignUp = () => {
  let { type } = useParams<ConfirmEmailParams>();
  const [messageApi, messageContext] = message.useMessage();
  const { setIsLoading } = useAppProcessStore();
  const navigate = useNavigate();

  const onNext = async ({ code }: ConfirmEmailFormType) => {
    try {
      setIsLoading(true);

      await authApi.verifyEmail(code);
      navigate(`/auth/${type}/${AuthPage.ENTER_PHONE}`);
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
