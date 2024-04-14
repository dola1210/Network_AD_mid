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
const handleError = (err, res) => {
    console.error(err);
    if (!res.headersSent) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

app.post('/createuser', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    // const key = req.body.name;
    // const newData = [{ [key]: req.body.pwd }];
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
                        console.log('The file has been updated!');
                        res.send('success');
                    }
                });
            }
            
        }
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

