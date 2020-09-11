const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.get('/', (req, res) => {
  const about = {
    avatar_url: "https://cdn-images-1.medium.com/max/184/1*TkXVfLTwsHdwpUEjGzdi9w@2x.jpeg",
    name: "Rocketseat",
    description: "Uma empresa focada em ensinar programação do zero!",
    role: "Principais Tecnologias:",
    techs: [
      {name: "NodeJs", url:"https://nodejs.org/en/"},
      {name: "Javascript", url:"https://www.javascript.com"},
      {name: "ReactNative", url:"https://reactnative.dev"}
    ],
    links: [
      {name: "Site", url:"https://rocketseat.com.br"},
      {name: "Twitter", url:"https://twitter.com/rocketseat"},
      {name: "Instagram", url:"https://www.instagram.com/rocketseat_oficial/"},
      {name: "Facebook", url:"https://www.facebook.com/rocketseat/"},
      {name: "Github", url:"https://github.com/rocketseat"}
    ]
  }

  return res.render('about', { about })
})

server.get('/portfolio', (req, res) => {
  return res.render('portfolio', { items: videos })
})

server.get('/video', (req, res) => {
  const id = req.query.id

  const video = videos.find((video) => {
    return video.id == id
  })

  if(!video) {
    return res.send("Video not Found!")
  }

  return res.render("video", { item: video })
})

server.listen(5000, () => {
  console.log("server running")
})