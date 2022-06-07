import client from "../client";

const fetchUsers = async (value: string) => {
    try {
        const usersRes = await client.get(`/users?$top=20&$filter=startswith(email_address,'${value}') or startswith(display_name,'${value}') or startswith(login,'${value}')`)
        if(usersRes.status === 200) {
            return usersRes.data.items
        }
    } catch (e: any) {
        // @ts-ignore
        return e.response.data.errorText
    }
}

export default fetchUsers