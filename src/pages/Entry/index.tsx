import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Space } from 'shared/ui';
import { AuthPage, AuthType } from '../../shared/types';

export const EntryPage = () => {

  return (
    <Space direction={'vertical'} size={'large'} style={{ width: '80%' }}>
      <Link to={`/auth/${AuthType.SIGN_UP}/${AuthPage.ENTER_EMAIL}`}>
        <Button size={'large'} block>
          Sign Up
        </Button>
      </Link>
      <Link to={`/auth/${AuthType.SIGN_IN}/${AuthPage.ENTER_EMAIL}`}>
        <Button size={'large'} block>
          Sign In
        </Button>
      </Link>
    </Space>
  );
};
