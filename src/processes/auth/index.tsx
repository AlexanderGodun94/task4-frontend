import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
    EnterEmailSignUp,
    EnterEmailSignIn,
    ConfirmEmailSignUp,
    ConfirmEmailSignIn,
    EnterPhone,
    ConfirmPhone
} from 'widgets/auth';
import { AuthPage, AuthType } from 'shared/types';

type AuthParams = {
    page: AuthPage,
    type: AuthType
}

export const AuthProcess = () => {
    let { page, type } = useParams<AuthParams>();

    const RenderedPage = useMemo((): React.ReactNode => {
        switch (page) {
            case AuthPage.ENTER_EMAIL: {
                switch (type) {
                    case AuthType.SIGN_UP:
                        return <EnterEmailSignUp />;
                    case AuthType.SIGN_IN:
                        return <EnterEmailSignIn />;
                    default: return <div>No page</div>;
                }
            }
            default:
                return <div>No page</div>;
        }
    }, [type, page]);

    return (
        <div>
            {RenderedPage}
        </div>
    );
};
