export const APP_NAME = "knit";

export const Routes = {
  root: "/",
  welcome: "/welcome",
  about: "/about",
  signIn: "/signin",
  signUp: "/signup",
  account: "/u/:username",
};

export interface FromLocationState {
  state: {
    from: {
      pathname: string;
    };
  };
}

export const isFromLocationState = (arg: any): arg is FromLocationState => {
  return arg.state?.from?.pathname !== undefined;
};
