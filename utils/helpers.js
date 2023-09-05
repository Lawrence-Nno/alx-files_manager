import redisClient from './redis';
import dbClient from './db';

async function getAuthToken(request) {
  const token = request.headers['x-token'];
  return `auth_${token}`;
}

// Checks authentication against verified information
// This returns userId of user
async function findUserIdByToken(request) {
  const key = await getAuthToken(request);
  const userId = await redisClient.get(key);
  return userId || null;
}

// This gets user by userId
// This returns exactly the first user found
async function findUserById(userId) {
  const userExistsArray = await dbClient.users.find(`ObjectId("${userId}")`).toArray();
  return userExistsArray[0] || null;
}

export {
  findUserIdByToken, findUserById,
};
