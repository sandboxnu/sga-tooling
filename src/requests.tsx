export type UserData = {};

export async function mockLoginAPI(id: Number):Promise<UserData> {
    const response = await fetch(`/persons/${id}`);
    
    return response;
}

module.exports = mockLoginAPI;