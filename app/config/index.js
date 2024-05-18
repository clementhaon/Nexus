const jwtKey = process.env.TOKEN;
const refreshTokenKey = process.env.REFRESH_TOKEN;

const env = process.env.CONFIG_ENV;


const index = {
    development: {
        env: "development",
        host: "localhost",
        jwtKey,
        refreshTokenKey,
        database: {
            username: "root",
            password: process.env.DB_PASS_LOCAL,
            name: "boilerplate",
            host: "localhost",
            dialect: "mysql"
        },
        notification: {
            port: 8001
        },
    },
    staging: {
        env: "staging",
        host:'',
        jwtKey,
        refreshTokenKey,
        database: {
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            name: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT
        },
        notification: {
            port: 8001
        },
    }
};

export function getConfig() {
    return index[env];
};

