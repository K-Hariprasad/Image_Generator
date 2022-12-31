import axiosInstance from "../utils/axios/axiosInstance"

export const generateImage = async(data) => {
    try {
        const res = await axiosInstance.post('/openai/generateImage', data)
        return res.data
    } catch (error) {
        throw new Error(error.response.data.data)
    }
}