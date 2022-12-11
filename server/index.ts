//NOTE: Configure the tsconfig.json so that this ts file compiles to js properly:
//Reference: https://stackoverflow.com/questions/72796757/ts-node-typeerror-err-unknown-file-extension-unknown-file-extension-ts
import express from "express";
import cors from "cors"
import morgan from "morgan"
const app = express()
const port = 3000

//middleware:
app.use(cors()) //CORS support
app.use(morgan('tiny'));
app.use(express.json()); // JSON body parsing

app.get('/', (req, res) => {
    res.send("Server is running . . . better go catch it!")
});

app.listen(port, () => {
    console.log("---------------------------");
    console.log("---------------------------");
    console.log("Express Server running at:");
    console.log(`http://localhost:${port}`)
    console.log("---------------------------");
    console.log("---------------------------");
});