import React from 'react';
import { Dayjs } from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { DatePicker, Form, Popconfirm, Select } from 'shared/ui';
import { RequestActiveStatus, RequestActiveStatusesList, requestApi } from 'entities/request';
import { FilterOutlined } from 'shared/icons';

export type FormData = {
  date: [Dayjs, Dayjs],
  type: string,
  status: RequestActiveStatus
};
const defaultFormState = {
  date: null,
  type: null,
  status: null
};

interface FiltersProps {
  onConfirm: (data: FormData) => void,
  onCancel: () => void,
}

export const Filters = ({ onConfirm, onCancel }: FiltersProps) => {
  const { data: requestTypes } = useQuery({
    queryKey: ['requestTypes'],
    queryFn: requestApi.getRequestTypes,
    select: data => data.data
  });
  const [form] = Form.useForm();

  const clearFilters = () => {
    form.setFieldsValue({ ...defaultFormState });
    onCancel();
  };

  return (
    <Popconfirm
      onConfirm={form.submit}
      onCancel={clearFilters}
      title={<div style={{ marginLeft: '-8px' }}>Filter</div>}
      description={(
        <Form
          form={form}
          onFinish={onConfirm}
          style={{ marginLeft: '-22px', maxWidth: '420px'}}
        >
          <Form.Item label="Date" name="date">
            <DatePicker.RangePicker
              style={{width: '100%'}}
            />
          </Form.Item>
          {requestTypes && <Form.Item label="Request type" name="type">
            <Select
              options={requestTypes.map(item => ({ value: item.typesCheck.type, label: item.typesCheck.name }))}
            />
          </Form.Item>}

          <Form.Item label="Status" name="status">
            <Select
              options={RequestActiveStatusesList}
              fieldNames={{ label: 'title' }}
              showSearch
            />
          </Form.Item>
        </Form>
      )}
      placement={'topLeft'}
      okText="Save"
      cancelText="Clear"
      icon={<div />}
    >
      <FilterOutlined
        style={{ fontSize: '18px', color: '#08c', display: 'block' }}
      />
    </Popconfirm>
  );
};
