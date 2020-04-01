export const {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  REDISCLOUD_URL,
  SESS_NAME,
  SESS_SECRET,
} = process.env;

export const sessionConf = {
  name: process.env.SESS_NAME,
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: process.env.SESS_LIFETIME || 100 * 60 * 60 * 2,
    sameSite: true,
    secure: process.env.NODE_ENV === "production"
  }
};
