const express = require('express')
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const app = express();
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Private-Network', true);
    next();
});

app.get('/test', (req, res) => {
    try {
        res.status(200).json({message: 'API is working'})
    }catch(err){
        res.status(500).json({message: error.message})
    }
})

app.get('/users', async (req, res) => {
    try{
        await prisma.user.findMany({});
        const users = await prisma.user.findMany();
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

