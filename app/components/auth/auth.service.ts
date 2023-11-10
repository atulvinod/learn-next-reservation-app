import { AuthUser } from "@/app/context/auth_context";
import { loginRequest, signupRequest } from "@/app/services/validation_schemas";
import { default as axios } from "axios";
import { StatusCodes } from "http-status-codes";

interface AuthApiResponse {
    isSuccess: boolean;
    errors?: [] | string;
    data?: AuthUser | undefined;
}

export async function submitSignupDetails(
    signupDetails: signupRequest
): Promise<AuthApiResponse> {
    const response = await axios.post(`/api/auth/signup`, { signupDetails });
    const responseBody = response.data;
    if (response.status == StatusCodes.OK) {
        return { isSuccess: true, data: responseBody.data };
    }
    return { isSuccess: false, errors: responseBody.error };
}

export async function submitLoginDetails(
    loginDetails: loginRequest
): Promise<AuthApiResponse> {
    const response = await axios.post(`api/auth/signin`, { loginDetails });
    const responseBody = await response.data;
    if (response.status == StatusCodes.OK) {
        return { isSuccess: true, data: responseBody.data };
    }
    return { isSuccess: false, errors: responseBody.error };
}
