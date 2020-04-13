const knex =require('knex');
const congiguration=require('../../knexfile');

connection= knex(congiguration.development)

module.exports= connection;