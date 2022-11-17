export type UserData = {};

export async function getUserInfo(id: Number): Promise<UserData> {
  const response = await fetch(`/persons/${id}`);

  return response;
}

module.exports = getUserInfo;
