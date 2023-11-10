import {
    loginRequest,
    signupRequest,
    validateLoginBody,
    validateSignupBody,
} from "./validation_schemas";
import prisma from "./db";
import RequestError from "../models/request_error";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

async function getUser(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            password: true,
        },
    });
}

export async function attemptUserSignup(request: signupRequest) {
    await validateSignupBody(request);
    const user = await getUser(request.email);
    if (user) {
        throw new RequestError("User already exists with this email");
    }
    const { firstName, lastName, city, phone, password, email } = request;
    const hash = await generatePasswordHash(password);
    const new_user = await prisma.user.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            password: hash,
            city,
            phone,
            email,
        },
    });
    const jwt = generateJWT({
        firstName,
        lastName,
        email,
        id: new_user.id,
    });
    return { user: { firstName, lastName, city, phone, email }, jwt };
}

export async function attemptUserLogin(loginRequest: loginRequest) {
    await validateLoginBody(loginRequest);
    const { email, password } = loginRequest;
    const user = await getUser(email);
    if (!user) {
        throw new RequestError(
            "No user exists with this email",
            StatusCodes.UNAUTHORIZED
        );
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new RequestError("Incorrect password", StatusCodes.UNAUTHORIZED);
    }
    const jwt = generateJWT({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        id: user.id,
    });

    return {
        jwt,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        id: user.id,
    };
}

function generatePasswordHash(password: string) {
    const hash = bcrypt.hash(password, Number(process.env.AUTH_SALT_ROUNDS));
    return hash;
}

async function comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

function generateJWT(payload: Object) {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    const audience = process.env.JWT_AUDIENCE;
    const issuer = process.env.JWT_ISSUER;

    if (!secret) {
        throw new Error("JWT_SECRET is required");
    }

    const token = jwt.sign(payload, secret, {
        expiresIn,
        audience,
        issuer,
    });

    return token;
}

export function decryptToken(token: string) {
    try {
        const result = jwt.verify(token, process.env.JWT_SECRET!!, {
            complete: true,
        });
        return result.payload;
    } catch (error: any) {
        throw new RequestError(error.message, StatusCodes.BAD_REQUEST);
    }
}