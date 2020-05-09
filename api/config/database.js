'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

const Url = require('url-parse')
const CLEARDB_DATABASE_URL = new Url(Env.get('CLEARDB_DATABASE_URL'))

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'sqlite'),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be a good choice for a development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(
        `${Env.get('DB_DATABASE', 'development')}.sqlite`
      ),
    },
    useNullAsDefault: true,
    debug: Env.get('DB_DEBUG', false),
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis'),
    },
    debug: Env.get('DB_DEBUG', false),
  },

  cleardb: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', CLEARDB_DATABASE_URL.host),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', CLEARDB_DATABASE_URL.username),
      password: Env.get('DB_PASSWORD', CLEARDB_DATABASE_URL.password),
      database: Env.get('DB_DATABASE', CLEARDB_DATABASE_URL.pathname.substr(1)),
    },
    debug: Env.get('DB_DEBUG', false),
  },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis'),
    },
    debug: Env.get('DB_DEBUG', false),
  },
}
