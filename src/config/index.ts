export default () => ({
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    HTTP_BASIC_USER: process.env.HTTP_BASIC_USER,
    HTTP_BASIC_PASSWORD: process.env.HTTP_BASIC_PASSWORD,
    typeorm: {
        synchronize: !!process.env.TYPEORM_SYNCHRONIZE,
    },
})
