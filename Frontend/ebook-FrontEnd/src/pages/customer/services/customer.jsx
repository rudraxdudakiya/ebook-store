import AxiosInstance from "../../../environment/AxiosInstance";

export const getBooks = async () => {
    try {
        const response = await AxiosInstance.get('/api/customer/book');
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }   
}

export const searchBook = async (genre) => {
    try {
        const response = await AxiosInstance.get(`/api/customer/book/search/${genre}`);
        console.log(response);
        
        return response;
    } catch(error) {
        console.log(error);
    }   
}

export const addBookOtCart = async (bookId) => {
    try {
        const response = await AxiosInstance.post(`/api/customer/cart/${bookId}`);
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }   
}

export const getBooksOfCart = async () => {
    try {
        const response = await AxiosInstance.get(`/api/customer/cart`);
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }   
}

export const placeTheOrder = async (data) => {
    try {
        const response = await AxiosInstance.post(`/api/customer/order`, data);
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }   
}