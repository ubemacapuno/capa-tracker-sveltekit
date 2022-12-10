import express from "express";
import cors from "cors"
import morgan from "morgan"
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Server is up")
});

// export function serverError(res: Response, code: number, message: string){
//     res.status(code).send({
//         code,
//         error: message,
//     });
// }

async function start() {

    const app = express();
    app.use(cors()) //CORS support
    app.use(morgan('tiny'));
    app.use(express.json()); // JSON body parsing
  
    // Cortex Global Error Handler:
    // TODO: see: https://scoutapm.com/blog/express-error-handling
    // app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    //   // Handle bad parse of JSON body:
    //   if (err.status === 400 && "body" in err && err instanceof SyntaxError) {
    //     console.error(err);
    //     return serverError(res, 400, err.message);
    //   }
    //   next(err);
    // });
  
    app.listen(port, () => {
        console.log("---------------------------");
        console.log("---------------------------");
        console.log("Express Server running at:");
        console.log(`http://localhost:${port}`)
        console.log("---------------------------");
        console.log("---------------------------");
    });
  }
start();

//NOTE: Configure the tsconfig.json so that the ts file compiles to js properly:
//https://stackoverflow.com/questions/72796757/ts-node-typeerror-err-unknown-file-extension-unknown-file-extension-ts