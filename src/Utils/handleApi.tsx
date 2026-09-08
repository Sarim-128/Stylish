import { API_URL } from '@env';
import axios from 'axios';


export const fetchProducts = async (query: string) => {
    const res = await axios.get(`${API_URL}/search?q=${query}`)
    return res.data.products
}

export const fetchTrendProducts = async () => {
    const res = await axios.get(`${API_URL}`)
    return res.data
}