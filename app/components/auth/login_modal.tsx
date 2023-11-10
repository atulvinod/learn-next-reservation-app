"use client";
import { loginValidationSchema } from "@/app/services/validation_schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, TextField, Alert } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BaseModal from "../base_modal";
import { submitLoginDetails } from "./auth.service";
import { authContext } from "@/app/context/auth_context";

type Inputs = {
    email: string;
    password: string;
};

export default function LoginModal() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [apiError, setApiError] = useState<string[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Inputs>({
        mode: "all",
        resolver: yupResolver(loginValidationSchema),
    });
    const { setAuthState } = useContext(authContext);
    const [isLoadingAuth, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
        if (isLoadingAuth) {
            return;
        }
        setIsLoading(true);
        const response = await submitLoginDetails(data);
        setIsLoading(false);
        if (response.isSuccess) {
            if (response.data) {
                console.log(response.data);
                const { firstName, lastName, email, id, jwt } = response.data;
                setAuthState({
                    user: {
                        firstName,
                        lastName,
                        email,
                        id,
                        jwt,
                    },
                    isLoadingAuth: false,
                });
                setLoginModalOpen(false);
            }
        } else {
            if (response.errors) {
                const errors = [];
                if (Array.isArray(response.errors)) {
                    errors.push(...response.errors);
                } else {
                    errors.push(response.errors);
                }
                setApiError(errors);
            }
        }
    };

    return (
        <div>
            <button
                className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
                onClick={() => setLoginModalOpen(!isLoginModalOpen)}
            >
                Sign in
            </button>
            <BaseModal
                isModalOpen={isLoginModalOpen}
                setIsModalOpen={setLoginModalOpen}
            >
                <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                    <p className="text-small">Sign In</p>
                </div>
                <div className="m-auto">
                    <h2 className="text-2xl font-light text-center">
                        <p>Log Into your account</p>
                    </h2>
                    {isLoadingAuth ? (
                        <div className="flex justify-center items-center h-40">
                            <CircularProgress />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="my-3">
                                <TextField
                                    error={Boolean(errors?.email)}
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    {...register("email")}
                                    helperText={errors?.email?.message}
                                />
                            </div>
                            <TextField
                                error={Boolean(errors?.password)}
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                {...register("password")}
                                helperText={errors?.password?.message}
                            />
                            <ul className="text-sm text-left mt-5 text-red-700">
                                {apiError.map((error, index) => {
                                    return (
                                        <li key={index}>
                                            <Alert severity="error">
                                                {error}
                                            </Alert>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="my-3">
                                <Button
                                    disabled={!isValid}
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                    style={{
                                        backgroundColor: "rgb(220, 38, 38)",
                                    }}
                                >
                                    Login
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </BaseModal>
        </div>
    );
}
