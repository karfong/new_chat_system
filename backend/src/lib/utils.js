import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
    const { JWT_SECRET } = ENV;
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

    const token = jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, //prevent XSS attacks
        sameSite: "strict", //CSRF protection
        secure: ENV.NODE_ENV === "production" ? true : false,
    });

    return token;
}


