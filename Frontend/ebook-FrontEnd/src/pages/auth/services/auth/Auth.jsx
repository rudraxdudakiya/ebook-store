import AxiosInstance from "../../../../environment/AxiosInstance";

export const signup = async(signupData) => {
    try {
        const response = await AxiosInstance.post('/api/auth/signup', signupData);
        return response;
    }
    catch(error) {
        console.error("An Error Occure during signup : ", error);
        throw error;
    }
}

export const signin = async(signinData) => {
    try {
        const response = await AxiosInstance.post('/api/auth/login', signinData);
        return response;
    }
    catch(error) {
        console.error("An Error Occure during login : ", error);
        throw error;
    }
}