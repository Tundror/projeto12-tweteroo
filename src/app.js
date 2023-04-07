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
    console.log(tweets)
    tweets.forEach((tw) => {
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
    users.push(login)
    console.log(users)
    auth = true
    response.send("OK")
})

app.post("/tweets", (request, response) => {
    const { username, tweet } = request.body
    const tweetPost = { username, tweet }
    if (auth) {
        tweets.push(tweetPost)
        console.log(tweets)
        response.send("OK")
    }
    else {
        response.send("UNAUTHORIZED")
    }

})
const port = 5000
app.listen(port, () => console.log(`servidor rodando na porta ${port}`))