import express from 'express';
import rootRouter from './routes/index'

const app = express();
const port = 3000;


app.use(express.json());
app.use("/api/v1",rootRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

