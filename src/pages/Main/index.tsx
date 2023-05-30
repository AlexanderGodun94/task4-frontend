import React from 'react';
import { InvestorRequestsTable} from 'widgets/request';
import { Container } from 'shared/ui';


export const MainPage = () => {

  return (
    <Container marginTop={24}>

      <Container marginTop={48}>
        <InvestorRequestsTable />
      </Container>
    </Container>
  );
};

