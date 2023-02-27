export const ironOptions = {
    cookieName: "SESSION",
    password: process.env.SESSION_PASS,
    // secure: true, // should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false,
    },
}