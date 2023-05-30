import React from 'react';
import { RequestTypeType, SumsubRequestTypes } from 'entities/request';
import { Typography, Button, Form, Input, Select, Upload } from 'shared/ui';
import { UploadOutlined } from 'shared/icons';
import { displayConstValue } from '../../../../shared/lib';

interface PropTypes {
  requestType?: RequestTypeType
}

export const CommonFormFields = ({ requestType }: PropTypes) => {

  return (
    <div>
      <Form.Item
        label="Your comments"
        name="comment"
      >
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} style={{ resize: 'none' }} />
      </Form.Item>

      {requestType && <Form.List name="attachedFiles">
        {(fields, { add, remove }) => (
          <div>
            <Typography.Title level={5}>Attached files</Typography.Title>

            {fields.map((field, key) => (
              <div key={key}>

                {requestType && SumsubRequestTypes[requestType] && <Form.Item
                  label="File origin country"
                  name={[field.name, 'countryId']}
                  rules={[{ required: true, message: 'Required' }]}
                >

                </Form.Item>}
                <Form.Item
                  label="File"
                  name={[field.name, 'file']}
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Upload
                    customRequest={({ onSuccess }) => onSuccess && onSuccess('ok')}
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </div>
            ))}

            <Button onClick={() => add()}>Add</Button>
          </div>
        )}
      </Form.List>}
    </div>
  );
};
