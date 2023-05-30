import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthPage, AuthType } from 'shared/types';
import { authApi } from '../../api';
import {RouterMode, useInvestorStore, useRouterStore} from 'shared/store';
import { EnterEmailEntity, EnterEmailFormType } from 'entities/auth';
import { requestApi } from 'entities/request';
import { useAppProcessStore } from 'entities/appProcess';
import { message } from '../../../../shared/ui';
import { getErrorText } from '../../../../shared/lib';


type EnterEmailParams = {
    type: AuthType
}

export const EnterEmailSignUp = () => {
    let { type } = useParams<EnterEmailParams>();
    const setUser = useInvestorStore(state => state.setInvestor);
    const [messageApi, messageContext] = message.useMessage();
    const { setIsLoading } = useAppProcessStore();
    const navigate = useNavigate();
    const setRouterMode = useRouterStore(state => state.setMode);

    const onNext = async ({ email , password, lastName, firstName}: EnterEmailFormType) => {
        try {
            setIsLoading(true);
            const res = await authApi.createInvestor(email, password, lastName, firstName);

            const { accessToken, role, ...userData } = res.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('userRole', role);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            setUser({ ...userData, role });
            setRouterMode(RouterMode.investor);

            navigate(`/`);
        } catch (e) {
            messageApi.error(getErrorText(e));
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };


    return <div>
        {messageContext}
        <EnterEmailEntity onNext={onNext} />
    </div>;
};
