import client from "../client";

const getNameById = async (id: number): Promise<string> => {
    try {
        const usersRes = await client.get(`/users?$filter=id eq ${id}`)
        if(usersRes.status === 200) {
            return usersRes.data.items[0].display_name
        }
    } catch (e: any) {
        // @ts-ignore
        return e.response.data.errorText
    }
    return ''
}

export default getNameById