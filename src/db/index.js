/* eslint-disable no-undef */

require("dotenv").config();
const common = require('../common/common');

const env = process.env.NODE_ENV == "production" ? "production" : "development";

const config = require(__dirname + "/../config/config.json")[env];
const createtables = async()=>{
    const knex = require("knex")(config);
   
    const files = common.getFiles(__dirname);
    if(files && files.children){
        const array = files.children.filter(e=>e.name!='index.js');
        for(let i=0; i<array.length; i++){
            require(`./${array[i].name}`)(knex);
        }
    }
    return knex;
};
const knex = require("knex")(config);

module.exports ={createtables,knex};