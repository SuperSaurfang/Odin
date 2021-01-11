import { apiUri, appUri, audience, clientId, domain } from 'auth_config.json';

export const environment = {
  auth0: {
    domain: domain,
    clientId: clientId,
    audience: audience,
    redirectUri: window.location.origin
  },
  production: true,
  restApi: '/api'
};
