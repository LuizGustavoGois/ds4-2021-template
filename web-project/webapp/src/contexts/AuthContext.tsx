import { createContext, ReactNode, useEffect, useState } from "react";
import { CredentialType, User } from "../@types";
import serverAPI from "../services/serverAPI";

type AuthContextType = {
    user: User | undefined;
    signed: boolean;
    token: string;
    signIn(credential: CredentialType): Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);


type AuthContextProviderProp = {
    children: ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProp) {
    const [token, setToken] = useState('');
    const [user, setUser] = useState<User>();

    const keyUser = '@DS4Auth:user';
    const keyToken = '@DS4Auth:token';


    useEffect(() => {
        function loadDataFromLocalStorage() {
            //Leio o usuário e o token do localStorage
            const storageUser = localStorage.getItem(keyUser);
            console.log('heeeere', storageUser)

            const storageToken = localStorage.getItem(keyToken);
            console.log('heeeere', storageToken)

            if (storageUser && storageToken) {
                //Determino o valores dos states
                setUser(JSON.parse(storageUser));
                setToken(storageToken); 
            }
        }

        loadDataFromLocalStorage();
    }, []);
    
    async function signIn(credential: CredentialType) {

        //Faz, de forma sincrona, a validação da credencial
        const result = await serverAPI.post('/auth/signin', credential);

        if (result.data) {
            //Gravo o usuário e o token no localStorage
            localStorage.setItem(keyUser, JSON.stringify(result.data.user));
            localStorage.setItem(keyToken, result.data.token);

            //Determino o valores dos states
            setUser(result.data.user);
            setToken(result.data.token);            
        }
        
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, token, signIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}
