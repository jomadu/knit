export const APP_NAME = "knit";

export enum Routes {
  root = "/",
  welcome = "/welcome",
  about = "/about",
  signIn = "/signin",
  signUp = "/signup",
}

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
