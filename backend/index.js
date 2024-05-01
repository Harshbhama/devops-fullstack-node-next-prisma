const express = require('express')
const { PrismaClient } = require("@prisma/client")
const cors = require('cors');
const prisma = new PrismaClient();
const app = express();
// app.use(
//     cors({origin: ['http://localhost:3000', 'http://127.0.0.1:8888','http://127.0.0.1:3000', 'http://13.235.75.89:3000/', ' http://13.235.75.89:3000', 'http://13.235.75.89']})
//   );
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
    next();
})
// app.use((req, res, next) => {
//     res.setHeader(`Access-Control-Allow-Origin`, '*');
//     res.setHeader(`Access-Control-Allow-Methods`, 'GET, POST, PUT, DELETE');
//     res.setHeader(`Access-Control-Allow-Headers`, 'Content-Type');
//     next();
// })

//
console.log("set Res");
app.get('/test', (req, res) => {
    try {
        res.status(200).json({message: 'API is working'})
    }catch(err){
        res.status(500).json({message: error.message})
    }
})

app.get('/users', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
    try{
        console.log("prsima", prisma);
        await prisma.user.findMany({});
        const users = await prisma.user.findMany();
        console.log("users", users);
        res.status(200).json(users);
    }catch(err){
        console.log("err",err);
        res.status(500).json({ message: err.message})
    }
})

app.post('/addUser', async(req, res) => {
    try{
        const user = await prisma.user.create({
            data: {
              email: 'elsa@prisma.io',
              name: 'Elsa Prisma',
            },
          })
          res.status(200).json({
            message: 'Data inserted successfully'
          })
    }catch(err){
        res.status(500).json({ message: err.message})
    }
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server is listening"))

