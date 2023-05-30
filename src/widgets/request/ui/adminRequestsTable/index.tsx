import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../api';
import { Container } from 'shared/ui';
import { GetRequestsApiParams, RequestsTable } from 'entities/request';

const defaultFiltersState = {
  fromDate: null,
  toDate: null,
  type: null,
  status: null
};

export const AdminRequestsTable = () => {
  const [filters, setFilters] = useState<GetRequestsApiParams>({ ...defaultFiltersState });
  const { data, isLoading } = useQuery({
    queryKey: ['adminRequests', filters],
    queryFn: () => adminApi.getRequests({ ...filters }),
    select: data => data?.data ? data.data.map(item => ({
      ...item,
      type: item?.typesCheck?.name
    })) : undefined
  });


  return (
    <div>
      <Container marginBottom={24}>
        <RequestsTable
          data={data}
          loading={isLoading}
          setFilters={setFilters}
          clearFilters={() => setFilters({ ...defaultFiltersState })}
        />
      </Container>
    </div>
  );
};
