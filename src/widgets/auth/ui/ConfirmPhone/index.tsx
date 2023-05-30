import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Form, InputNumber, Typography, Container, Row } from 'shared/ui';
import { RouterMode, useRouterStore } from 'shared/store';
import { authApi } from '../../api';
import { message } from 'antd';
import { useAppProcessStore } from '../../../../entities/appProcess';
import { getErrorText } from '../../../../shared/lib';

const { Title } = Typography;


type FormType = {
  code: string
}

export const ConfirmPhone = () => {
  const setRouterMode = useRouterStore(state => state.setMode);
  const [messageApi, messageContext] = message.useMessage();
  const { setIsLoading } = useAppProcessStore();
  const navigate = useNavigate();

  const onNext = async ({ code }: FormType) => {
    try {
      setIsLoading(true);

      await authApi.verifyPhone(code);
      onSkip();
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
    <Form onFinish={onNext}>
      <Container marginBottom={24}>
        <Title level={3}>Phone confirmation</Title>
      </Container>

      <Form.Item
        label="Confirmation code"
        name="code"
        rules={[{ required: true, message: 'Enter confirmation code' }]}
        colon={false}
      >
        <InputNumber
          controls={false}
          style={{ width: '100%' }}
          max={Number.MAX_SAFE_INTEGER}
          min={0}
        />
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
  );
};
