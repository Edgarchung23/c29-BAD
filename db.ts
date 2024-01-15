import Knex from 'knex'
import { env } from './env'

export function createKnex() {
  let config = require('./knexfile')
  let profile = config[env.NODE_ENV]
  console.log("createKnex")
  return  Knex(profile)
  
}
