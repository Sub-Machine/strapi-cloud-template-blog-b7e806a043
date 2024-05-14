module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2eo/S71wIQQ8dS8/q05J9Q=='),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'GqNTphchGoLTIRAWD+HbmQ=='),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
