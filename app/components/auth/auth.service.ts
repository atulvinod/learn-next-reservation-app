import { AuthUser } from "@/app/context/auth_context";
import { loginRequest, signupRequest } from "@/app/services/validation_schemas";
import { AxiosError, default as axios } from "axios";
import { StatusCodes } from "http-status-codes";

interface AuthApiResponse {
    isSuccess: boolean;
    errors?: [] | string;
    data?: AuthUser | undefined;
}

export async function submitSignupDetails(
    signupDetails: signupRequest
): Promise<AuthApiResponse> {
    try {
        const response = await axios.post(`/api/auth/signup`, signupDetails);
        const responseBody = response.data;
        if (response.status == StatusCodes.OK) {
            return { isSuccess: true, data: responseBody.data };
        }
    } catch (error: any) {
        if (error instanceof AxiosError) {
            return {
                isSuccess: false,
                errors: error?.response?.data?.error ?? "Unexpected error!",
            };
        }
    }
    return { isSuccess: false, errors: "Unexpected error!" };
}

export async function submitLoginDetails(
    loginDetails: loginRequest
): Promise<AuthApiResponse> {
    try {
        const response = await axios.post(`/api/auth/signin`, loginDetails);
        const responseBody = await response.data;
        if (response.status == StatusCodes.OK) {
            return { isSuccess: true, data: responseBody.data };
        }
    } catch (error: any) {
        if (error instanceof AxiosError) {
            return {
                isSuccess: false,
                errors: error?.response?.data?.error ?? "Unexpected error!",
            };
        }
    }
    return { isSuccess: false, errors: "Unexpected error!" };
}
