import React from 'react';
import { Route, Routes } from 'react-router';
import { AuthProcess } from 'processes/auth';
import { AuthWrapper } from 'widgets/authWrapper';
import { EntryPage, MainPage, RequestDetailsPage } from 'pages';
import { RouterMode, useRouterStore } from 'shared/store';
import { MainWrapper } from 'widgets/mainWrapper';

const authRoutes = [
  { path: '/', element: <EntryPage /> },
  { path: '/auth/:type/:page', element: <AuthProcess /> },
  { path: '*', element: <div>No page</div> }
];
const investorRoutes = [
  { path: '/', element: <MainPage /> },
  { path: '/request/:id', element: <RequestDetailsPage /> },
  { path: '*', element: <div>No page</div> }
];


export const Routing = () => {
  const { mode } = useRouterStore(state => state);

  return (
    <div>
      {mode === RouterMode.auth && <AuthWrapper>
        <Routes>
          {authRoutes.map(route => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Routes>
      </AuthWrapper>}

      {mode === RouterMode.investor && <MainWrapper>
        <Routes>
          {investorRoutes.map(route => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Routes>
      </MainWrapper>}

    </div>
  );
};
