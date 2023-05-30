import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Input, Container, Button, Form, Row } from 'shared/ui';
import { AuthPage, AuthType } from 'shared/types';
import { RouterMode, useRouterStore } from 'shared/store';
import { authApi } from '../../api';
import { message } from 'antd';
import { useAppProcessStore } from '../../../../entities/appProcess';
import { getErrorText } from '../../../../shared/lib';

const { Title } = Typography;

type FormType = {
  phone: string
}
type EnterPhoneParams = {
  type: AuthType
}

export const EnterPhone = () => {
  let { type } = useParams<EnterPhoneParams>();
  const setRouterMode = useRouterStore(state => state.setMode);
  const [messageApi, messageContext] = message.useMessage();
  const { setIsLoading } = useAppProcessStore();
  const navigate = useNavigate();

  const onNext = async ({ phone }: FormType) => {
    try {
      setIsLoading(true);

      await authApi.setInvestorPhone(phone);
      await authApi.sendPhoneCode();

      navigate(`/auth/${type}/${AuthPage.CONFIRM_PHONE}`);
    } catch (e) {
      messageApi.error(getErrorText(e));
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onSkip = () => {
    setRouterMode(RouterMode.investor);
    navigate('/');
  };


  return (
    <div>
      {messageContext}
      <Form onFinish={onNext}>
        <Container marginBottom={24}>
          <Title level={3}>Enter phone</Title>
        </Container>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Phone number is required' }]}
          colon={false}
          initialValue={''}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Row justify={'space-between'}>
            <Button type="primary" onClick={onSkip}>
              Skip
            </Button>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};
