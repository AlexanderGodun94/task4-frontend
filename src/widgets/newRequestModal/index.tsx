import React, { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  AttachedFile,
  CreateRequestForm,
  IRequestType,
  requestApi,
  RequestTypeType,
  useRequestTypes,
  SumsubRequestTypes
} from 'entities/request';
import { Container, Form, message, Modal, Typography } from 'shared/ui';
import { CompanyForm } from './ui/companyForm';
import { PersonalForm } from './ui/personalForm';
import { GoodsForm } from './ui/goodsForm';
import { useAppProcessStore } from '../../entities/appProcess';
import { getErrorText } from '../../shared/lib';

interface PropTypes {
  isOpen: boolean,
  onClose: () => void,
  requestTypeId: string
}

interface CurrentRequest extends IRequestType {
  name: string,
  type: RequestTypeType
}

export const NewRequestModal = ({ isOpen, onClose, requestTypeId }: PropTypes) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { types, refetch: refetchRequestTypes } = useRequestTypes();
  const [messageApi, messageContext] = message.useMessage();
  const { setIsLoading } = useAppProcessStore();


  const currentRequest: CurrentRequest | null = useMemo(() => {
    const emptyRequest = null;

    try {
      if (!types) return emptyRequest;
      const request = types.filter((item) => item.id === requestTypeId)[0];
      return request ? {
        ...request,
        name: request?.typesCheck?.name,
        type: request.typesCheck.type
      } : emptyRequest;
    } catch (e) {
      return emptyRequest;
    }
  }, [types, requestTypeId]);


  const onRequestCreated = async (id: string) => {
    try {
      if (currentRequest && SumsubRequestTypes[currentRequest.type]) {
        await requestApi.initCheck(id);
      }
    } catch (e) {
      messageApi.error('Sumsub check init failed');
      console.error(e);
    } finally {
      queryClient.refetchQueries({ queryKey: ['requests'] }).then();
      queryClient.refetchQueries({ queryKey: ['requestTypes'] }).then();
      refetchRequestTypes().then();

      form.resetFields();
      onClose();

      setIsLoading(false);
    }
  };

  const createRequest = async (formData: CreateRequestForm) => {
    try {
      setIsLoading(true);

      const { attachedFiles, ...requestFields } = formData;

      const res = await requestApi.createRequest({
        ...requestFields,
        investorTypesCheckId: requestTypeId
      });
      messageApi.success('Request successfully created');

      if (attachedFiles) {
        await Promise.allSettled(attachedFiles.map(((item: AttachedFile) => (
          requestApi.attachFile({
            file: item.file.file.originFileObj,
            requestId: res.data.id,
            countryId: item.countryId,
            idDocType: item.fileType
          }).catch((e) => {
            messageApi.error('Some of the files is not attached');
            console.error(e);
          })
        ))));
      }
      onRequestCreated(res.data?.id).then();
    } catch (e) {
      messageApi.error(getErrorText(e));
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={(
        <Typography.Title level={4} $noMargin>
          {currentRequest?.name} request
        </Typography.Title>
      )}
      open={isOpen}
      onOk={form.submit}
      onCancel={onClose}
    >
      {messageContext}

      {currentRequest && <Container marginTop={24}>
        {currentRequest.type === RequestTypeType.PERSONAL && <PersonalForm
          form={form}
          requestType={currentRequest.type}
          createRequest={createRequest}
        />}

        {(currentRequest.type === RequestTypeType.COMPANY || currentRequest.type === RequestTypeType.MANUAL_KYB) && (
          <CompanyForm
            form={form}
            requestType={currentRequest.type}
            createRequest={createRequest}
          />
        )}

      </Container>}
    </Modal>
  );
};
