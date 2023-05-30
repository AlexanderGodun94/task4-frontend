import React from 'react';
import {Button, Row, Space, Table} from 'antd';
import {displayDate, getErrorText} from '../../../../shared/lib';
import { GetRequestsApiParams, IRequest, REQUEST_STATUS_COLOR, REQUEST_STATUS_TITLE, RequestStatuses } from '../..';
import { Container, Typography } from '../../../../shared/ui';
import { Filters, FormData } from '../RequestTableFilters';
import Checkbox from "antd/es/checkbox/Checkbox";
import { useEffect, useState } from 'react';
import {authApi} from "../../../../widgets/auth/api";
import { message } from '../../../../shared/ui';
import {useAppProcessStore} from "../../../appProcess";
import { Toolbar, IconButton, Grid} from '@material-ui/core';
import { Delete, Block, CheckCircle } from '@material-ui/icons';


interface PropTypes<T> {
  data: IRequest[] | undefined,
  loading: boolean,
  title?: string,
  disableFilters?: boolean,
  setFilters?: (data: GetRequestsApiParams) => void,
  clearFilters?: () => void
}

export function RequestsTable<T>({ data, loading, disableFilters = false, title = 'Users', setFilters, clearFilters }: PropTypes<T>) {

  const updateFilters = (formData: FormData) => {

    const { date, ...otherData } = formData;
    const fromDate = date && date[0].toDate() || null;
    const toDate = date && date[1].toDate() || null;
    if (fromDate) fromDate.setHours(0, 0, 0);
    if (toDate) {
      toDate.setDate(toDate.getDate() + 1);
      toDate.setHours(0, 0, 0);
    }

    setFilters && setFilters({
      type: otherData.type,
      status: otherData.status,
      fromDate: fromDate,
      toDate: toDate
    });
  };
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedRows, setCheckedRows] = useState<string[]>([]);

    const handleCheckAll = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setCheckedAll(event.target.checked);
        setCheckedRows([]);
    };

    const handleCheckRow = (id: string) => {
        const isChecked = checkedRows.includes(id);
        if (isChecked) setCheckedRows(checkedRows.filter((checkedId) => checkedId !== id));
        else setCheckedRows([...checkedRows, id]);
    };


    const { setIsLoading } = useAppProcessStore();
    const [messageApi, messageContext] = message.useMessage();

    const getUsersId = () => {
        let userIds: any = [];
        if (data) {
            const users = data;
            if (checkedAll) userIds = users.map(user => user.id);
            else userIds = checkedRows;
        }
        return userIds;
    };

    const deleteUsers = async () => {
        try {
            setIsLoading(true);
            const usersId = getUsersId();
            for (let i = 0; i < usersId.length; i++) {
                const res = await authApi.deleteUser(usersId[i]);
            }
            window.location.reload();
        } catch (e) {
            messageApi.error(getErrorText(e));
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };


    const updateStatusUsers = async (status: string) => {
        try {
            setIsLoading(true);
            const usersId = getUsersId();
            for (let i = 0; i < usersId.length; i++) {
                const res = await authApi.updateUserStatus(usersId[i], status);
            }
            window.location.reload();
        } catch (e) {
            messageApi.error(getErrorText(e));
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = (status: string) => {
        updateStatusUsers(status);
    };

    return (
    <div>
      <Container marginBottom={24}>
        <Space size={'middle'}>
          <Typography.Title level={3} $noMargin>
            {title}
          </Typography.Title>

          {!disableFilters && clearFilters && <Filters
            onConfirm={updateFilters}
            onCancel={clearFilters}
          />}
        </Space>
      </Container>
        <Grid container spacing={2}>
            <Grid item>
                <IconButton edge="start" color="inherit" aria-label="block" onClick={() => handleUpdateStatus('BLOCKED')}>
                    <Block />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton edge="start" color="inherit" aria-label="unblock" onClick={() => handleUpdateStatus('ACTIVE')}>
                    <CheckCircle />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton edge="start" color="inherit" aria-label="delete" onClick={deleteUsers}>
                    <Delete />
                </IconButton>
            </Grid>
        </Grid>


      <Table
        dataSource={data}
        loading={loading}
      >

          <Table.Column
              title={() => (
                  <Checkbox
                      onChange={handleCheckAll}
                      checked={checkedAll} />
              )}
              dataIndex="id"
              key="id"
              render={(id) => (
                  <Checkbox
                      onChange={() => handleCheckRow(id)}
                      checked={checkedAll || checkedRows.includes(id)}
                  />
              )}
          />

          <Table.Column title="id" dataIndex="id" key="id" />
        <Table.Column
          title="Date registration"
          dataIndex="createdAt"
          key="date"
          render={(date: string) => displayDate(date, true)}
        />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column title="Full Name" dataIndex="fullName" key="fullName" />
          <Table.Column
              title="Last session"
              dataIndex="lastSession"
              key="date"
              render={(date: string) => displayDate(date, true)}
          />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status: RequestStatuses) => (
            <Typography.Text type={REQUEST_STATUS_COLOR[status]}>
              {REQUEST_STATUS_TITLE[status]}
            </Typography.Text>
          )}
        />

      </Table>
    </div>
  );
};
