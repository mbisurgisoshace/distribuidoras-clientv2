import React from 'react';
import AuthService from '../../services/auth';

interface AuthContextType {
  user: any;
  signin: (
    username: string,
    password: string,
    callback: (err?: any) => void
  ) => void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(
    localStorage.getItem('__USERNAME__')
  );

  let signin = (
    username: string,
    password: string,
    callback: (err?: any) => void
  ) => {
    return AuthService.login(username, password).then((response) => {
      if (response.error) {
        return callback(response.error);
      }

      setUser(username);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    //   return fakeAuthProvider.signout(() => {
    //     setUser(null);
    //     callback();
    //   });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
