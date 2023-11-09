import { loginRequest, signupRequest } from "@/app/services/validation_schemas";
import { User } from "@prisma/client";

interface AuthApiResponse {
    isSuccess: boolean;
    errors?: [] | string;
    data?: (User & { jwt: string }) | undefined;
}

export async function submitSignupDetails(
    signupDetails: signupRequest
): Promise<AuthApiResponse> {
    const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify(signupDetails),
    });
    const responseBody = await response.json();
    if (response.ok) {
        return { isSuccess: true, data: responseBody.data };
    }
    return { isSuccess: false, errors: responseBody.error };
}

export async function submitLoginDetails(
    loginDetails: loginRequest
): Promise<AuthApiResponse> {
    const response = await fetch(`api/auth/signin`, {
        method: "POST",
        body: JSON.stringify(loginDetails),
    });
    const responseBody = await response.json();
    if (response.ok) {
        return { isSuccess: true, data: responseBody.data };
    }
    return { isSuccess: false, errors: responseBody.error };
}
