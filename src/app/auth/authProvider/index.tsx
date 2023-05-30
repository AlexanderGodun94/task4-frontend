import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { authApi } from 'widgets/auth/api';
import { RouterMode, useRouterStore, useInvestorStore } from 'shared/store';
import { AccountRole } from 'shared/types';

type PropTypes = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: PropTypes) => {
  const setRouterMode = useRouterStore(state => state.setMode);
  const setInvestor = useInvestorStore(state => state.setInvestor);
  const [userRole, setUserRole] = useState('');

  const setAuthMode = () => {
    delete axios.defaults.headers.common['Authorization'];
    setRouterMode(RouterMode.auth);
  };

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const token = localStorage.getItem('token');

    if (userRole && token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUserRole(userRole);
    } else {
      setAuthMode();
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (userRole) {
        switch (userRole) {
          case RouterMode.investor: {
            try {
              const res = await authApi.getInvestor();
              setInvestor(res.data);
              setRouterMode(RouterMode.investor);
            } catch (e) {
              setAuthMode();
            }

            break;
          }
          case RouterMode.admin: {
            setRouterMode(RouterMode.admin);
            break;
          }
          default: {
            setAuthMode();
          }
        }
      }
    })();
  }, [userRole]);


  return (
    <div>
      {children}
    </div>
  );
};
