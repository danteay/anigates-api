export const {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  REDISCLOUD_URL
} = process.env;

export const sessionConf = {
  name: process.env.SESS_NAME,
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    mageAge: process.env.SESS_LIFETIME || 100 * 60 * 60 * 2,
    sameSite: true,
    secure: process.env.NODE_ENV === "production"
  }
};
