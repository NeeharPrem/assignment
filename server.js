const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mysql = require('mysql')
const fs = require('fs')
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to Database');

    db.query('CREATE DATABASE IF NOT EXISTS revenue_data', (err) => {
        if (err) {
            console.error('Error creating database: ', err);
            return;
        }
        console.log('Database created or exists already');

        db.query('USE revenue_data', (err) => {
            if (err) {
                console.error('Error selecting database: ', err);
                return;
            }
            console.log('Using database revenue_data');

            fs.readFile('db.sql','utf-8', (err, data) => {
                if (err) {
                    console.error('Error reading script file: ', err);
                    return;
                }

                const statements = data.split(';').filter(stmt => stmt.trim() !== '');

                function executeStatements(index) {
                    if (index >= statements.length) {
                        console.log('All statements executed successfully');
                        return;
                    }

                    db.query(statements[index], (err, result) => {
                        if (err) {
                            console.error('Error executing statement: ', err);
                        } else {
                            console.log('Statement executed successfully',result);
                        }
                        executeStatements(index + 1);
                    });
                }

                executeStatements(0);
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server started: http://localhost:${port}`)
});