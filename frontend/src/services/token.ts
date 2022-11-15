export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";

interface tokensType {
  accessToken: string;
  refreshToken: string;
}

/**
 * Persist token to localStorage.
 *
 * @param {{accessToken, refresToken}} params
 */
export function storeToken({ accessToken, refreshToken }: tokensType) {
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
export function setAccessToken(accessToken: string) {
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
}

/**
 * Set refesh token from storage.
 *
 * @param {string} refreshToken
 */
 export function setRefreshToken(refreshToken: string) {
  localStorage.setItem(REFRESH_TOKEN, JSON.stringify(refreshToken));
}

/**
 * Get refresh token from storage.
 *
 * @returns {string}
 */
export function getRefreshToken() {
  return JSON.parse(localStorage.getItem(REFRESH_TOKEN)!);
}

/**
 * Get access token from storage.
 *
 * @returns {string}
 */
 export function getAccessToken() {
  return JSON.parse(localStorage.getItem(ACCESS_TOKEN)!);
}

/**
 * Clear tokens.
 */
export function clear() {
  localStorage.clear();
}
