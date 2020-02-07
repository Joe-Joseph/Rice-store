const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: { use_env_variable: 'DATABASE_URL_DEV', dialect: 'postgres', loading: false },
  staging: { use_env_variable: 'DATABASE_URL_STAG' },
  test: { use_env_variable: 'DATABASE_URL_TEST' }
};
