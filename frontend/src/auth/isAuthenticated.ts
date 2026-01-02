import { apiFetch } from "../lib/api"

export const isAuthenticated = async () => {
    const res = await apiFetch('/user/profile')
    console.log(res)
}