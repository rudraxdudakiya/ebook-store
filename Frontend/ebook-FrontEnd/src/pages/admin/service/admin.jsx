import AxiosInstance from "../../../environment/AxiosInstance";

export const postBook = async (bookData) => {
    try {
        const response = await AxiosInstance.post('/api/admin/book', bookData);
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }   
}

export const deleteBook = async (id) => {
    try {
        const response = await AxiosInstance.delete(`/api/admin/book/${id}`);
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }   
}
export const getBooks = async () => {
    try {
        const response = await AxiosInstance.get('/api/admin/book');
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }   
}

export const getBookById = async (id) => {
    try {
        const response = await AxiosInstance.get(`/api/admin/book/${id}`);
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }   
}

export const updateBook = async (id, bookData) => {
    try {
        const response = await AxiosInstance.put(`/api/admin/book/${id}`, bookData);
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }   
}


export const searchBook = async (genre) => {
    try {
        const response = await AxiosInstance.get(`/api/admin/book/search/${genre}`);
        console.log(response);
        
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }   
}