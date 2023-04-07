import express, { response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const tweets = []
const users = []
let auth = false

app.get("/tweets", (request, response) => {
    const retornarTweets = []
    tweets.slice(-10).forEach((tw) => {
        const findUser = users.find((user) => user.username === tw.username)
        retornarTweets.push({
            username: tw.username,
            avatar: findUser.avatar,
            tweet: tw.tweet
        })
    })
    response.send(retornarTweets)
})



app.post("/sign-up", (request, response) => {
    const { username, avatar } = request.body
    const login = {
        username,
        avatar
    }
    if(!username || !avatar || typeof(username) !== "string" || typeof(avatar) !== "string"){
       return response.status(400).send("Todos os campos são obrigatórios!")
    }
    users.push(login)
    console.log(users)
    auth = true
    response.status(201).send("OK")
})

app.post("/tweets", (request, response) => {
    const { username, tweet } = request.body
    const tweetPost = { username, tweet }
    if(!username || !tweet || typeof(username) !== "string" || typeof(tweet) !== "string"){
        return response.status(400).send("Todos os campos são obrigatórios!")
     }
    if (auth) {
        tweets.push(tweetPost)
        response.status(201).send("OK")
    }
    else {
        response.status(401).send("UNAUTHORIZED")
    }

})
const port = 5000
app.listen(port, () => console.log(`servidor rodando na porta ${port}`))