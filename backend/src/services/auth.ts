import * as tokens from "../utils/jwt";
import * as userService from "./users";
/**
 * Refresh access token.
 *
 * @param {string} refreshToken
 * @returns {Promise}
 */
export async function refreshToken(refreshToken: string) {
  const data = await tokens.verifyRefreshToken(refreshToken);
  const user = await userService.getUserById(data.encryptedData[0].id);
  const accessTokens = await tokens.generateTokens(user[0]);
  return {
    ...accessTokens,
  };
}
