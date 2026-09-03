import { API_URL } from '@env';
import axios from 'axios';


export const fetchProducts = async () => {
    const res = await axios.get(API_URL)
    return res.data.products
}