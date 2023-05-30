import React from 'react';
import {
  CreateRequestForm, GoodsCheckTypes,
  RequestTypeType
} from 'entities/request';
import { CommonFormFields } from '../commonFormFields';
import { displayConstValue } from '../../../../shared/lib';
import { DatePicker } from 'antd';
import styles from '../Form.module.css';

interface Props {
  form: any,
  createRequest: (formData: CreateRequestForm) => void
  requestType: RequestTypeType
}

export const GoodsForm = ({ form, createRequest, requestType }: Props) => {

  return
};
