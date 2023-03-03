export const ironOptions = {
    cookieName: "SESSION",
    password: process.env.SESSION_PASS,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}