import { h, FunctionComponent, VNode, ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';

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
    musickit: MusicKit.MusicKitInstance;
    children: ComponentChildren;
}

export const ProtectedRouter: FunctionComponent<ProtectedRouterProps> = ({
    musickit,
    children,
}: ProtectedRouterProps) => {

    const [authorized, setAuthorized] = useState(musickit.isAuthorized)


    const signInCallback = () => {
       musickit.authorize().then(() => {
           setAuthorized(true)
       })
    }

return authorized ? <div>{children}</div> : <SignIn signInCallback={signInCallback} /> 
};
