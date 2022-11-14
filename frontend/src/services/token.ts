export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";

/**
 * Persist token to localStorage.
 *
 * @param {{accessToken, refresToken}} params
 */
export function storeToken({ accessToken, refreshToken }: any) {
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
  localStorage.setItem(REFRESH_TOKEN, JSON.stringify(refreshToken));
}

export function setToken(keyName: string, value: string | null) {
  if (value) localStorage.setItem(keyName, value);
}

/**
 * Get access token from storage.
 *
 * @returns {string}
 */
export function getToken(keyName: string) {
  let token = localStorage.getItem(keyName);
  if (token) {
    return JSON.parse(token)
  } else {
    return token;
  }
}

/**
 * Set access token from storage.
 *
 * @param {string} accessToken
 */
export function setAccessToken(accessToken: any) {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
}

/**
 * Get refresh token from storage.
 *
 * @returns {string}
 */
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN);
}

/**
 * Clear tokens.
 */
export function clear() {
  localStorage.clear();
}
