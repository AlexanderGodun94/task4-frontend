import React from 'react';
import {
  CreateRequestForm,
  RequestTypeType
} from 'entities/request';
import { Form, Input, DatePicker } from 'shared/ui';
import { CommonFormFields } from '../commonFormFields';
import styles from '../Form.module.css';

interface Props {
  form: any,
  createRequest: (formData: CreateRequestForm) => void
  requestType: RequestTypeType
}

const todayDate = new Date();
todayDate.setHours(0, 0, 0, 0);

export const PersonalForm = ({ form, createRequest, requestType }: Props) => {

  return (
    <Form
      form={form}
      onFinish={createRequest}
      colon={false}
      className={styles.form}
    >
      <Form.Item
        label="Name of an individual"
        name="firstName"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Middle name"
        name="middleName"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Date of birth"
        name="dob"
        rules={[{ required: true, message: 'Required' }]}
      >
        <DatePicker
          disabledDate={(currentDate) => (currentDate.toDate().getTime() >= todayDate.getTime())}
        />
      </Form.Item>

      <CommonFormFields requestType={requestType} />
    </Form>
  );
};
