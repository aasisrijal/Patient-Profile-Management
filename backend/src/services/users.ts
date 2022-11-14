import knexConnection from "../db";

/**
 * Fetch all users.
 *
 * @returns {Promise>}
 */
export async function fetchAll() {
  const users = await knexConnection("users");

  return {
    count: users.length,
    data: users,
  };
}

// Creates a user

export async function createUser(user) {
  const newUser = await knexConnection("users").insert(user);
  return newUser;
}

// Get a user by email
export async function getUser(email) {
  const user = await knexConnection("users").where("email", email);
  return user;
}

// get a user by id
export async function getUserById(id) {
  const user = await knexConnection("users").where("id", id);
  return user;
}
