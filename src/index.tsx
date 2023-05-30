import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from 'app/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const { darkAlgorithm } = theme;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2
    }
  }
});

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ConfigProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

