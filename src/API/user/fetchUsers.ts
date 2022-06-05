import client from "../client";

const fetchUsers = async (value: string) => {
    try {
        const usersRes = await client.get(`/users`)
        if(usersRes.status === 200) {
            return usersRes.data
        }
    } catch (e: any) {
        // @ts-ignore
        return e.response.data.errorText
    }
}

export default fetchUsers