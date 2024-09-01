import axios from "axios"
import https from "https"
import { API_SERVER, API_SERVER_KEY } from "settings.json"

const Agent = new https.Agent({  
    rejectUnauthorized: false
})

export async function Post(Path, Args){
    return axios.post(API_SERVER + "/" + Path, { args: Args }, { httpsAgent: Agent, headers: { "Authorization": API_SERVER_KEY } })
}