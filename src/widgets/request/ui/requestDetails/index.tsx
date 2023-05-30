import React from 'react';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { IRequestDetails, REQUEST_STATUS_COLOR, REQUEST_STATUS_TITLE, requestApi } from 'entities/request';
import { Container, Typography, Button, Descriptions, Divider, Skeleton, Upload } from 'shared/ui';
import { displayConstValue, displayDate, getUrlName } from 'shared/lib';
import { API_URL } from 'shared/config';
import { DownloadOutlined } from 'shared/icons';

type PropTypes = {
  apiFunc?: (id: string) => Promise<AxiosResponse<IRequestDetails>>,
  setTitle?: (title: string) => void
}

const UNDEFINED_TITLE = 'N/A';
export const RequestDetails = ({ apiFunc = requestApi.getRequestDetails, setTitle }: PropTypes) => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
      queryKey: [id, 'requestId'],
      queryFn: () => apiFunc(`${id}`),
      select: data1 => data1.data,
      onSuccess: data1 => {
        if (setTitle) setTitle(data1?.object || UNDEFINED_TITLE);
      }
    }
  );


  return (
    <div>
      <StyledContainer marginTop={32}>
        {data && <Descriptions column={{ xs: 1, sm: 1, md: 2 }}>
          {data.companyName && <Descriptions.Item label="Company name" span={2}>
            <Typography.Title level={3} $noMargin>
              {data.companyName || UNDEFINED_TITLE}
            </Typography.Title>
          </Descriptions.Item>}
          {data.fullName && <Descriptions.Item label="Investor name" span={2}>
            <Typography.Title level={3} $noMargin>
              {data.fullName || UNDEFINED_TITLE}
            </Typography.Title>
          </Descriptions.Item>}
          {data.productCode && <Descriptions.Item label="Product code" span={2}>
            <Typography.Title level={3} $noMargin>
              {data.productCode || UNDEFINED_TITLE}
            </Typography.Title>
          </Descriptions.Item>}


          {data.registrationNumber && <Descriptions.Item label="Registration number">
            {data.registrationNumber}
          </Descriptions.Item>}
          {data.country && <Descriptions.Item label="Country">
            {data.country}
          </Descriptions.Item>}

          {data.dob && <Descriptions.Item label="Date of birth">
            {displayDate(data.dob) || UNDEFINED_TITLE}
          </Descriptions.Item>}

          {data.countryOfOrigin && <Descriptions.Item label="Country of origin">
            {data.countryOfOrigin.country || UNDEFINED_TITLE}
          </Descriptions.Item>}
          {data.deliveryCountry && <Descriptions.Item label="Delivery country">
            {data.deliveryCountry.country || UNDEFINED_TITLE}
          </Descriptions.Item>}
          {data.countryOfTheDeal && <Descriptions.Item label="Country of the deal">
            {data.countryOfTheDeal.country || UNDEFINED_TITLE}
          </Descriptions.Item>}
          {data.typeOfCheck && <Descriptions.Item label="Type of check">
            {displayConstValue(data.typeOfCheck) || data.typeOfCheck || UNDEFINED_TITLE}
          </Descriptions.Item>}
          {data.plannedDeliveryDate && <Descriptions.Item label="Planned delivery date">
            {displayDate(data.plannedDeliveryDate) || UNDEFINED_TITLE}
          </Descriptions.Item>}

          {data.comment && <Descriptions.Item label="Comment">
            {data.comment}
          </Descriptions.Item>}
        </Descriptions>}

        {isLoading && <Skeleton />}

        {data && data.investorDocuments && data.investorDocuments.length > 0 && (
          <div>
            <Divider />

            <Descriptions layout={'vertical'}>
              <Descriptions.Item label={'Attachments'}>
                <Upload
                  defaultFileList={
                    data.investorDocuments.map(item => ({
                      status: 'done',
                      uid: item.id,
                      name: getUrlName(item.documentURL),
                      url: `${API_URL}/${item.documentURL}`
                    }))
                  }
                  onRemove={() => false}
                />
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}

        {(isLoading || data) && <Divider />}

        {data && <Descriptions column={{ xs: 1, sm: 1, md: 2 }}>
          <Descriptions.Item label="Request from">
            {displayDate(data?.createdAt) || UNDEFINED_TITLE}
          </Descriptions.Item>
          <Descriptions.Item label="Request type">
            {data?.typesCheck?.name || UNDEFINED_TITLE}
          </Descriptions.Item>
        </Descriptions>}

        {isLoading && <Skeleton />}

        <div>
          {isError && <Typography.Title level={3} type={'danger'}>Something went wrong</Typography.Title>}
        </div>
      </StyledContainer>

      {(isLoading || data) && <Divider />}

      {data && <StyledContainer>
        <Typography.Title level={3}>Results</Typography.Title>
        <Descriptions>
          {data && <Descriptions.Item label={'Status'} labelStyle={{ fontWeight: '600' }}>
            <Typography.Title level={5} $noMargin type={REQUEST_STATUS_COLOR[data.status]}>
              {REQUEST_STATUS_TITLE[data.status]}
            </Typography.Title>
          </Descriptions.Item>}
        </Descriptions>


        {data.reportLink && <a href={`${API_URL}${data.reportLink}`} target={'_blank'} download>
          <Button icon={<DownloadOutlined />}>Download report</Button>
        </a>}
      </StyledContainer>}

      {isLoading && <Skeleton />}
    </div>
  );
};


const StyledContainer = styled(Container)`
  .ant-descriptions-item-container {
    align-items: center;
  }
  th.ant-descriptions-item {
    padding-bottom: 0;
  }
`;
