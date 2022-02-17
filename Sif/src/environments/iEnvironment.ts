import * as authConfig from 'auth_config.json';

export const AUTH_CONFIG = authConfig;

export interface IEnvironemnt {
  auth0: {
    domain: string;
    clientId: string,
    audience: string,
    redirectUri: string
  };
  production: boolean;
  restApi: string;
}
