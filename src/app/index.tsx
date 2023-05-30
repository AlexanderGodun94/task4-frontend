import React from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { Routing } from 'app/routing';
import { useAppProcessStore } from 'entities/appProcess';
import { Spin } from 'shared/ui';
import 'app/index.css';


function App() {
  const { loading } = useAppProcessStore();

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Spin spinning={loading} size={'large'} tip="Processing...">
        <Routing />
      </Spin>
    </ErrorBoundary>
  );
}

export default App;
