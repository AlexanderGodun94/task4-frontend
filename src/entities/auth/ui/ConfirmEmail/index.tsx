import React from 'react';
import { Button, Container, Form, Input, Typography } from 'shared/ui';

const { Title } = Typography;


export type ConfirmEmailForm = {
  code: string
}
interface ConfirmEmailProps {
  onNext: (form: ConfirmEmailForm) => void
}

export const ConfirmEmailEntity = ({ onNext }: ConfirmEmailProps) => {

  return (
    <Form onFinish={onNext}>
      <Container marginBottom={24}>
        <Title level={3}>Email confirmation</Title>
      </Container>

      <Form.Item
        label="Confirmation code"
        name="code"
        rules={[{ required: true, message: 'Enter confirmation code' }]}
        colon={false}
      >
        <Input />
      </Form.Item>

      <Form.Item style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};
