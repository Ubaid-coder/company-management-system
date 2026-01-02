const BASE_URL = 'http://localhost:4000/api';

export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers:{
            'Content-Type': 'application/json',
            ...( {Authorization: `Bearer ${token}`}),
            ...options.headers
        }
    });

    if(res.status == 401){
        localStorage.removeItem('token');
        window.location.href = '/login';
    }else if(res.status == 403){
        window.location.href = '/'
    }

    if(!res.ok){
        const error = await res.json();
        throw new Error(error.message || "Request failed")
    }
    return res.json();
}