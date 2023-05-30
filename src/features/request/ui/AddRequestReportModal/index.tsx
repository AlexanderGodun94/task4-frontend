import React from 'react';
import { Radio, Form, Modal, Typography, formStyles, Container, message, Button, Upload } from 'shared/ui';
import { UploadOutlined } from 'shared/icons';
import { getErrorText } from 'shared/lib';
import { useAppProcessStore } from 'entities/appProcess';
import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { setRequestStatus, addRequestReport } from '../../api';
import { FormFile } from 'shared/types';

type PropTypes = {
  requestId: string,
  open: boolean,
  onClose: () => void
}
type FormType = {
  status: string,
  report: FormFile
}
const statusOptions = [
  { label: 'Accept', value: 'ACCEPTED' },
  { label: 'Reject', value: 'REJECTED' }
];

export const AddRequestReportModal = ({ open, onClose, requestId }: PropTypes) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { setIsLoading } = useAppProcessStore();
  const [messageApi, messageContext] = message.useMessage();
  const queryClient = useQueryClient();

  const addReport = async ({ status, report }: FormType) => {
    try {
      setIsLoading(true);

      await setRequestStatus({ status, requestId });
      messageApi.success('Request status successfully changed');

      if (report) {
        await addRequestReport({ file: report.file.originFileObj, requestId });
      }
      messageApi.success('Request report successfully attached');

      onClose();
      form.resetFields();
    } catch (e) {
      messageApi.error(getErrorText(e));
      console.error(e);
    } finally {
      queryClient.refetchQueries({ queryKey: [id, 'requestId'] }).then();
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={(
        <Typography.Title level={4} $noMargin>
          Add report
        </Typography.Title>
      )}
      open={open}
      onOk={form.submit}
      onCancel={onClose}
    >
      <Container marginTop={28}>
        <Form
          form={form}
          onFinish={addReport}
          colon={false}
          className={formStyles.form}
        >
          <Form.Item
            label=""
            name="status"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Radio.Group options={statusOptions} optionType="button" />
          </Form.Item>
          <Form.Item
            label="Report"
            name="report"
          >
            <Upload
              customRequest={({ onSuccess }) => onSuccess && onSuccess('ok')}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Container>

      {messageContext}
    </Modal>
  );
};
