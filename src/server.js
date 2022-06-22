// install and import express
const express = require('express');
let app = express();

// Code here

const fs = require('fs');
const server = app.listen(8000, () => { console.log("Listening on port 8000"); });


// part 1 
app.get('/', (req, res) => {
    res.sendFile('./assets/users.html', { root: __dirname });
});

// path of file 
const path = __dirname + '/assets/user.json';
// reading data from file
const readFile = (callback, returnJson = false, filePath = path, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err;
        }
        callback(returnJson ? JSON.parse(data) : data);
    });
};
// writing data to file
const writeFile = (fileData, callback, filePath = path, encoding = 'utf8') => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err;
        }
        callback();
    });
};

//  2

app.get('/users', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
});
//  3

app.get('/users/:id', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        let query = req.params.id
        let user = {}, found = 0, users = JSON.parse(data)
        for (let i in users) {
            if (users[i].id == query) {
                user = users[i]
                found = 1
                break
            }
        }
        if (found == 0) {
            res.send(` no user found `);
        }
        else {
            res.send({ user });
        }
    });

});
//4
app.post('/users', (req, res) => {
    readFile(data => {
        const newId = data.length + 1;
        const user = req.body
        user["id"] = newId
        data.push(user)
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`new user added `);
        });
    },
        true);
});
// Note: Do not remove this export statement
module.exports = app;
