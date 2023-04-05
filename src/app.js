import express, { response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get("/", (request, response) => {
    response.send("hello")
})
app.get("/tweets", (request, response) => {
    response.send([
        {
            username: "bobesponja",
            avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
            tweet: "Eu amo hambúrguer de siri!"
        }
    ])
})
const port = 5000
app.listen(port, ()=> console.log(`servidor rodando na porta ${port}`))