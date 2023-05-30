import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Logo, Layout } from 'shared/ui';

const { Header, Content } = Layout;

interface PropTypes {
  children: React.ReactNode
}

export const AuthWrapper = ({ children }: PropTypes) => {

  return (
    <Wrapper>
      <HeaderWrapper>
        <Link to={'/'}>
          <Logo />
        </Link>
      </HeaderWrapper>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Layout)`
  min-height: 100vh;
  align-items: center;
`;
const HeaderWrapper = styled(Header)`
  background: transparent;
  padding: 88px 24px 112px 24px;
  height: auto;
`;
const ContentWrapper = styled(Content)`
  min-width: 332px;
  padding: 0 16px;
  text-align: center;
`;

