import React, { Dispatch, SetStateAction, useState } from "react";
import BaseModal from "../base_modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupValidationSchema } from "@/app/services/validation_schemas";
import { submitSignupDetails } from "./auth.service";

type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
};

export default function SignupModal() {
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [apiError, setApiError] = useState<string[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(signupValidationSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const response = await submitSignupDetails(data);
        if (response.isSuccess) {
            setIsSignupModalOpen(false);
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
                className="border p-1 px-4 rounded"
                onClick={() => setIsSignupModalOpen(!isSignupModalOpen)}
            >
                Sign up
            </button>
            <BaseModal
                isModalOpen={isSignupModalOpen}
                setIsModalOpen={setIsSignupModalOpen}
            >
                <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                    <p className="text-small">Sign up</p>
                </div>
                <div className="m-auto">
                    <h2 className="text-2xl font-light text-center">
                        <p>Create a new Account</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="my-3 flex justify-between text-sm">
                                <TextField
                                    error={Boolean(errors?.firstName)}
                                    label="First name"
                                    variant="outlined"
                                    {...register("firstName")}
                                    style={{ marginRight: "5px" }}
                                    helperText={errors?.firstName?.message}
                                />
                                <TextField
                                    error={Boolean(errors?.lastName)}
                                    label="Last name"
                                    variant="outlined"
                                    {...register("lastName")}
                                    style={{ marginLeft: "5px" }}
                                    helperText={errors?.lastName?.message}
                                />
                            </div>
                            <div>
                                <TextField
                                    error={Boolean(errors?.email)}
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    {...register("email")}
                                    helperText={errors?.email?.message}
                                />
                            </div>
                            <div className="my-3 flex justify-between text-sm">
                                <TextField
                                    error={Boolean(errors?.phone)}
                                    label="Phone"
                                    variant="outlined"
                                    {...register("phone")}
                                    style={{ marginRight: "5px" }}
                                    helperText={errors?.phone?.message}
                                />
                                <TextField
                                    error={Boolean(errors?.city)}
                                    label="City"
                                    variant="outlined"
                                    {...register("city")}
                                    style={{ marginLeft: "5px" }}
                                    helperText={errors?.city?.message}
                                />
                            </div>
                            <div>
                                <TextField
                                    error={Boolean(errors?.password)}
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    {...register("password")}
                                    helperText={errors?.password?.message}
                                    type="password"
                                />
                            </div>
                            <ul className="text-sm text-left mt-5 text-red-700">
                                {apiError.map((error, index) => {
                                    return <li key={index}>{error}</li>;
                                })}
                            </ul>
                            <div className="my-5">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                    style={{
                                        backgroundColor: "rgb(220, 38, 38)",
                                    }}
                                >
                                    Proceed
                                </Button>
                            </div>
                        </form>
                    </h2>
                </div>
            </BaseModal>
        </div>
    );
}
