import React from 'react';
import {
  CreateRequestForm,
  RequestTypeType
} from 'entities/request';
import { Form, Input, Select } from 'shared/ui';
import { CommonFormFields } from '../commonFormFields';
import styles from '../Form.module.css';

interface Props {
  form: any,
  createRequest: (formData: CreateRequestForm) => void
  requestType: RequestTypeType
}

export const CompanyForm = ({ form, createRequest, requestType }: Props) => {

  return (
    <Form
      form={form}
      onFinish={createRequest}
      colon={false}
      className={styles.form}
    >
      <Form.Item
        label="Company name"
        name="companyName"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Registration №"
        name="registrationNumber"
        initialValue={''}
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input />
      </Form.Item>


      <CommonFormFields requestType={requestType} />
    </Form>
  );
};
