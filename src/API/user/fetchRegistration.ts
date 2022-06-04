import client from "../client";
import {IRegister} from "../../components/Auth/register.interface";


const fetchRegistration = async (form: IRegister): Promise<string | boolean> => {
    try {
        let res = await client.post('/registrations', form)
        if(res.status === 200) {
            return true
        } else if(res.status === 409) {
            return 'Такой пользователь уже существует'
        }
    } catch (e: any) {
        if(e.response.status === 409) {
            return 'Такой логин уже существует'
        } else {
            return 'Неизвестная ошибка во время запроса'
        }
    }
    return 'Неизвестная ошибка'
}

export default fetchRegistration