export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";

/**
 * Persist token to localStorage.
 *
 * @param {{accessToken, refresToken}} params
 */
export function storeToken({ accessToken, refreshToken }: any) {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
}

/**
 * Get access token from storage.
 *
 * @returns {string}
 */
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
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
