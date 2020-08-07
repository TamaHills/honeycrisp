import { h, FunctionComponent, VNode, ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import { authorize, HCDispatch } from '../state/actions/creators';
import { useDispatch } from '../state/store';

interface SignInProps {
    signInCallback: () => void;
}

export const SignIn: FunctionComponent<SignInProps> = ({
    signInCallback,
}: SignInProps) => {
    return (
        <div id="signin-container">
            <h1 id="signin-header">Sign In to Honeycrisp wtih Apple Music</h1>
            <button onClick={signInCallback} id="signin-button">
                Sign In
            </button>
        </div>
    );
};

interface ProtectedRouterProps {
    isAuthorized: boolean;
    children: ComponentChildren;
}

export const ProtectedRouter: FunctionComponent<ProtectedRouterProps> = ({
    isAuthorized,
    children,
}: ProtectedRouterProps) => {
    const dispatch: HCDispatch = useDispatch()

    return isAuthorized ? (
        <div>{children}</div>
    ) : (
        <SignIn signInCallback={() => dispatch(authorize())} />
    );
};
