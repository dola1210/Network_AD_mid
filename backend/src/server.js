import express from "express";
import multer from "multer";
import OpenAI from "openai";
import axios from "axios";
import session from "express-session";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import fs from 'fs';
import { prisma } from "./adapters.js";
const port = process.env.PORT || 8000;
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendDir = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendDir))

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
}
app.use(
    session({
        cookie: {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: null, // session cookie
        },
        // use random secret
        name: 'user', // don't omit this option
        secret: 'rklsjdjlkewiour129bmnmbn21kjgkja09dsf',
        resave: false,
        saveUninitialized: false,
    })
);

// app.get('/', (req, res) => {
//     console.log(req.session)
//     // console.log(req.sessionID)
//     // if (req.session.user) {
//     //     return res.redirect('/home')
//     // }
//     res.sendFile(path.join(frontendDir, 'index.html'));
// });

app.get('/home', function (req, res) {
    res.sendFile(path.join(frontendDir, 'index.html'));
})

app.get('/Msgboard', function (req, res) {
    res.sendFile(path.join(frontendDir, 'index.html'));
    // console.log("into about page")
})

app.get('/GenImg', function (req, res) {
    res.sendFile(path.join(frontendDir, 'index.html'));
    // console.log("into about page")
})

app.get('/user', function (req, res) {
    res.sendFile(path.join(frontendDir, 'index.html'));
    // res.send('User page')
})

app.get('/createuser', function (req, res) {
    res.sendFile(path.join(frontendDir, 'index.html'));
    // res.send('User page')
})

app.get('/login', function (req, res) {
    res.sendFile(path.join(frontendDir, 'index.html'));
    // res.send('User page')
})

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log('session destroyed')
    })
    res.sendFile(path.join(frontendDir, 'index.html'));
})

app.get('/api/check', async function (req, res) {
    const userName = req.session.user;
    // console.log(userName);
    if (req.session.user) {
        // res.send(userName);
        const user = await prisma.user.findUnique({
            where: {
                name: userName,
            },
        });
        if(user){
            res.json(user);
        }    
        else
            res.json([]);
    }
    else
        res.json([]);
});

app.use(express.json());
// const handleError = (err, res) => {
//     console.error(err);
//     if (!res.headersSent) {
//         res.status(500).json({ status: 'error', message: 'Internal server error' });
//     }
// };

// app.post('/createuser', (req, res) => {
//     const filePath = path.join(__dirname, 'data.json');
//     const newData = req.body;

//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             if (err.code === 'ENOENT') {
//                 fs.writeFile(filePath, JSON.stringify([newData]), err => {
//                     if (err) {
//                         handleError(err, res);
//                     } else {
//                         console.log('The file has been saved with initial data!');
//                         res.send('success');
//                     }
//                 });
//             } else {
//                 handleError(err, res);
//             }
//         } else {
//             const fileData = JSON.parse(data);
//             const result = fileData.find(item => item.name === newData.name);
//             if (result) {
//                 console.log('Found:', result);  // 如果找到，输出该项
//                 res.send('same');
//             } 
//             else {
//                 fileData.push(newData);
//                 fs.writeFile(filePath, JSON.stringify(fileData), err => {
//                     if (err) {
//                         handleError(err, res);
//                     } else {
//                         console.log(`${newData.name} register`);
//                         res.send('success');
//                     }
//                 });
//             }
            
//         }
//     });
// });

// app.use(cookieParser());

// app.post('/login', (req, res) => {
    
//     const logData = req.body;
//     console.log('log:', logData)

//     const filePath = path.join(__dirname, 'data.json');
//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             res.send('loginfai');
//         }
//         else {
//             const fileData = JSON.parse(data);
//             const result = fileData.find(item => item.name === logData.name);
//             if (result) {
//                 console.log('res:', result);  // 如果找到，输出该项
//                 if(result.pwd === logData.pwd){
//                     req.session.user = logData.name;
//                     res.send('loginsus');
//                 }
//                 else
//                     res.send('loginfai');
//             } 
//             else {
//                 res.send('loginfai');
//             }
//         }
//     });
//   })

app.post('/createuser2', async (req, res) => {
    console.log('logggg:', req.body)
    
    try {
        const user = await prisma.user.create({ data: { name: req.body.name, pwd: bcrypt.hashSync(req.body.pwd, 13), photo: 'https://i.imgur.com/DCdf5yU.png'} });
        return res.send('success');
    } catch (error) {
        console.error('Error create user');
        return res.send('fail');
    }
})

app.post('/login2', async (req, res) => {
    
    const logData = req.body;
    console.log('log:', logData)
    try {
        const user = await prisma.user.findUnique({
          where: {
            name: logData.name,
          },
        });
        
        if(user){
            if(bcrypt.compareSync(logData.pwd, user.pwd)){
                req.session.user = logData.name;
                res.send('loginsus');
            }
            else
                res.send('loginfai');
        }    
        else
            res.send('loginfai');
        // return user;
    } catch (error) {
        console.error('Error login user');
    }
})

const messagesFile = path.join(__dirname, 'data.json');
app.post('/api/messages', async (req, res) => {
    const us = await prisma.user.findUnique({
        where: {
            name: req.body.name,
        },
    });
    const newMessage = {
        id: 1,
        name: req.body.name, // 使用从props或上下文获取的用户名
        text: req.body.text, 
        photo: us.photo
    };
    fs.readFile(messagesFile, (err, data) => {
        if (err && err.code === 'ENOENT') {
            // 文件不存在，创建新文件
            fs.writeFile(messagesFile, JSON.stringify([newMessage]), (err) => {
                if (err) {
                    res.status(500).send('Error writing new message');
                } else {
                    res.json([newMessage]);
                }
            });
        } else if (err) {
            res.status(500).send('Error reading messages file');
        } else {
            const messages = JSON.parse(data);
            if(messages.length > 0)
                newMessage.id = messages[messages.length - 1].id+1;
            messages.push(newMessage);
            if(messages.length > 20)
                messages.shift();
            fs.writeFile(messagesFile, JSON.stringify(messages), (err) => {
                if (err) {
                    res.status(500).send('Error updating messages file');
                } else {
                    res.json(messages);
                }
            });
        }
    });
});

app.get('/api/msgs', function (req, res) {
    res.sendFile(path.join(__dirname, 'data.json'));
});

const id = '546c25a59c58ad7'; // 填入 App 的 Client ID
const upload = multer({ storage: multer.memoryStorage() });
app.post('/api/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const imgurResponse = await axios({
            method: 'post',
            url: 'https://api.imgur.com/3/image',
            headers: {
                'Authorization': `Client-ID ${id}`, // 替换成你的Client ID
                'Content-Type': 'multipart/form-data'
            },
            data: {
                image: req.file.buffer.toString('base64')
            }
        });
        console.log(imgurResponse.data.data.link);
        
        const user = await prisma.user.update({
            where: {
              name: req.body.name,
            },
            data: {
                photo: imgurResponse.data.data.link  
            }
        });

        res.send(imgurResponse.data.data.link);
    } catch (error) {
        console.error('Failed to upload image to Imgur:', error);
        res.status(500).send('Failed to upload image to Imgur.');
    }
});


const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});
app.post('/api/GenImg', async (req, res) => {
    if (!req.session.user) {
        res.send('loginfai');
        return;
    }
    try{
        const gen = await openai.images.generate({
            prompt: req.body.des,
            n: 1,
            size: "256x256",
        });
        res.send(gen.data[0].url);
    }
    catch (error) {
        console.error('Error:', error);
        res.send('');
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

process.on("exit", async () => {
    await prisma.$disconnect();
});

