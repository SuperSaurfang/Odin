export const ACCESS_TOKEN_KEY = 'access_token';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}
