import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api';
import {EnterEmailEntity, EnterEmailFormType, AuthFormType, ConfirmEmailEntity, AuthEntity} from 'entities/auth';
import { AuthPage, AuthType } from 'shared/types';
import { RouterMode, useInvestorStore, useRouterStore } from 'shared/store';
import { message } from 'antd';
import { useAppProcessStore } from '../../../../entities/appProcess';
import { getErrorText } from '../../../../shared/lib';
import axios from "axios";

export const EnterEmailSignIn = () => {
    const navigate = useNavigate();
    const setInvestor = useInvestorStore(state => state.setInvestor);
    const [messageApi, messageContext] = message.useMessage();
    const {setIsLoading} = useAppProcessStore();

    const setRouterMode = useRouterStore(state => state.setMode);

    const startLogin = async ({email, password}: AuthFormType) => {
        try {
            setIsLoading(true);

            const res = await authApi.startLogin(email, password);
            setInvestor({...res.data});


            const {accessToken, role, ...investorData} = res.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('userRole', role);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            setInvestor({...investorData, role});
            setRouterMode(RouterMode.investor);

            if (accessToken) {
                console.log(accessToken)
                navigate(`/auth/${AuthType.SIGN_IN}/${AuthPage.ENTER_EMAIL}`);
                window.location.reload();
            }


            else navigate(`/`);
        } catch (e) {
            messageApi.error(getErrorText(e));
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {messageContext}
            <AuthEntity onNext={startLogin}/>
        </div>
    );
};
