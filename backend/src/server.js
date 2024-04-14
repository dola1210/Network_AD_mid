import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from 'fs';
const port = process.env.PORT || 8000;
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendDir = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendDir))

// 主頁路由
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendDir, 'index.html'));
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(frontendDir, 'index.html'));
})

app.get('/about', function (req, res) {
    res.sendFile(path.join(frontendDir, 'index.html'));
    console.log("into about page")
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

app.use(express.json());
app.post('/createuser', (req, res) => {
    res.sendFile(path.join(frontendDir, 'index.html'));
    console.log(req.body);

    const filePath = path.join(__dirname, 'data.json');
    const key = req.body.name;  // 使用data的值作为键
    const newData = { [key]: req.body.pwd };

    // Read in Json
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code === 'ENOENT') {
            fs.writeFile(filePath, JSON.stringify([newData]), (err) => {
                if (err) throw err;
                console.log('The file has been saved with initial data!');
            });
        }
        else if (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Internal server error' });
        }
        else {
            const fileData = JSON.parse(data.toString());
            fileData.push(newData);
            fs.writeFile(filePath, JSON.stringify(fileData), (err) => {
                if (err) throw err;
                console.log('The file has been updated!');
            });
        }
    })
    res.json({ status: 'success', message: 'User created successfully' });
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

