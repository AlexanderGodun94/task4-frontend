import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRouterStore, useInvestorStore, RouterMode } from 'shared/store';
import { Layout, Logo, Row, Typography, Button, Space, Drawer, Col } from 'shared/ui';
import { SettingOutlined } from 'shared/icons';
import styled from 'styled-components';

const { Header, Content } = Layout;
const { Title } = Typography;


interface PropTypes {
  children: React.ReactNode
}

export const MainWrapper = ({ children }: PropTypes) => {
  const navigate = useNavigate();
  const email = useInvestorStore(state => state.investor?.email);
  const deleteInvestor = useInvestorStore(state => state.deleteInvestor);
  const setRouterMode = useRouterStore(state => state.setMode);
  const [openDrawer, setOpenDrawer] = useState(false);

  const onLogout = () => {
    try {
      localStorage.removeItem('userRole');
      localStorage.removeItem('token');
      deleteInvestor();
      navigate('/');
      setRouterMode(RouterMode.auth);
    } catch (e) {
      alert('Something went wrong');
      console.error(e);
    }
  };


  return (
    <Wrapper>
      <HeaderWrapper>
        <HeaderRow align={'middle'} wrap={false} justify={'space-between'}>
          <Link to={'/'}>
            <Logo blocked />
          </Link>

          <Space size={'large'}>
            <Title level={4} $noMargin>{email}</Title>
            <SettingOutlined
              onClick={() => setOpenDrawer(true)}
              style={{ fontSize: '24px', display: 'block' }}
            />
          </Space>
        </HeaderRow>

        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <Button type={'link'} size={'large'} onClick={onLogout}>
            Logout
          </Button>
        </Drawer>
      </HeaderWrapper>

      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Wrapper>
  );
};


const Wrapper = styled(Layout)`
  
`;
const HeaderWrapper = styled(Header)`
  height: 78px;
`;
const HeaderRow = styled(Row)`
  height: 100%;
`;
const ContentWrapper = styled(Content)`
  padding: 40px 50px;
  max-width: 1332px;
  width: 100%;
  margin: 0 auto;
`;
