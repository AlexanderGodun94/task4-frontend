import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetRequestsApiParams, RequestsTable } from 'entities/request';
import { investorApi } from '../../api';


interface RequestTableProps {
  title?: string,
  disableFilters?: boolean,
  queryParams?: GetRequestsApiParams
}

const defaultFiltersState = {
  fromDate: null,
  toDate: null,
  type: null,
  status: null
};

export const InvestorRequestsTable = ({ title, disableFilters, queryParams }: RequestTableProps) => {
  const [filters, setFilters] = useState<GetRequestsApiParams>({ ...defaultFiltersState });
  const { data, isLoading } = useQuery({
    queryKey: ['requests', queryParams, filters],
    queryFn: () => investorApi.getRequests({ ...queryParams, ...filters })
  });

  const clearFilters = () => {
    setFilters({ ...defaultFiltersState });
  };

  const dataSource = useMemo(() => {
    return data?.data ? data.data.map(item => ({
      ...item,
      type: item?.typesCheck?.name
    })) : undefined;
  }, [data]);


  return (
    <div>
      <RequestsTable
        data={dataSource}
        loading={isLoading}
        title={title}
        disableFilters={disableFilters}
        setFilters={setFilters}
        clearFilters={clearFilters}
      />
    </div>
  );
};
