import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from 'fs';
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

// 主頁路由
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

app.get('/about', function (req, res) {
    res.sendFile(path.join(frontendDir, 'index.html'));
    // console.log("into about page")
})

app.get('/users', function (req, res) {
    res.sendFile(path.join(frontendDir, 'index.html'));
    // res.send('User page')
})

app.get('/api/users', function (req, res) {
    res.sendFile(path.join(__dirname, 'data.json'));
});

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

app.get('/api/check', function (req, res) {
    const userName = req.session.user;
    console.log(userName);
    if (req.session.user) {
        res.send(userName);
    }
    else
        res.send('');
});

app.use(express.json());
const handleError = (err, res) => {
    console.error(err);
    if (!res.headersSent) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

app.post('/createuser', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    const newData = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.writeFile(filePath, JSON.stringify([newData]), err => {
                    if (err) {
                        handleError(err, res);
                    } else {
                        console.log('The file has been saved with initial data!');
                        res.send('success');
                    }
                });
            } else {
                handleError(err, res);
            }
        } else {
            const fileData = JSON.parse(data);
            const result = fileData.find(item => item.name === newData.name);
            if (result) {
                console.log('Found:', result);  // 如果找到，输出该项
                res.send('same');
            } 
            else {
                fileData.push(newData);
                fs.writeFile(filePath, JSON.stringify(fileData), err => {
                    if (err) {
                        handleError(err, res);
                    } else {
                        console.log(`${newData.name} register`);
                        res.send('success');
                    }
                });
            }
            
        }
    });
});

// app.use(cookieParser());

app.post('/login', (req, res) => {
    
    const logData = req.body;
    console.log('log:', logData)

    const filePath = path.join(__dirname, 'data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.send('loginfai');
        }
        else {
            const fileData = JSON.parse(data);
            const result = fileData.find(item => item.name === logData.name);
            if (result) {
                console.log('res:', result);  // 如果找到，输出该项
                if(result.pwd === logData.pwd){
                    req.session.user = logData.name;
                    res.send('loginsus');
                }
                else
                    res.send('loginfai');
            } 
            else {
                res.send('loginfai');
            }
        }
    });
  
  })



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

