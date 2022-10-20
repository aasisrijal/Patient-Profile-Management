import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string, length = 10) => {
  const salt = await bcrypt.genSalt(length);
  return bcrypt.hash(password, salt);
};

export const comparePassword = (password, userPassword) =>
  bcrypt.compare(password, userPassword);
