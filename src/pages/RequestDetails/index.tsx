import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { InvestorRequestsTable, RequestDetails } from 'widgets/request';
import { requestApi } from 'entities/request';
import { Container, Breadcrumb, Skeleton } from 'shared/ui';

export const RequestDetailsPage = ({ apiFunc = requestApi.getRequestDetails }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link to={'/'}>Profile</Link> },
          { title: <Link to={'/'}>Requests</Link> },
          { title: title ? title : <Skeleton.Button size={'small'} /> }
        ]}
      />

      <RequestDetails
        setTitle={setTitle}
      />


      <Container marginTop={48}>
        <InvestorRequestsTable
          title={'Previous requests'}
          queryParams={{ requestId: id }}
          disableFilters
        />
      </Container>
    </div>
  );
};

