// import { start_mongo } from "./lib/db";
import { start_mongo } from "$db";

start_mongo().then(() => {
    console.log("Mongo DB Started!")
}).catch(e => {console.error(e)})