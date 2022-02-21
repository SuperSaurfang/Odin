import { IEnvironemnt, AUTH_CONFIG } from './iEnvironment';

export const environment: IEnvironemnt  = {
  auth0: {
    domain: AUTH_CONFIG.domain,
    clientId: AUTH_CONFIG.clientId,
    audience: AUTH_CONFIG.audience,
    redirectUri: window.location.origin
  },
  production: true,
  restApi: '/api'
};
