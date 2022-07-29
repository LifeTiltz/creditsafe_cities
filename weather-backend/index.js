'use strict';

import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 4000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use('/', express.static('frontend'));


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'weatherapp'
});

conn.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connection successful.');
    }
});

app.get(`/allcities`, (req, res) => {
    conn.query(`Select * from cities`, (err, city) => {
        if (err) {
            res.status(500)
        }
        else {
            res.status(200).json(city)
        }
    })
});

app.get(`/city/:name`, (req, res) => {
    const name = req.params.name
    conn.query(`Select * from cities where city_name = ?`, [name], (err, city) => {
        if (err) {
            res.status(500)
        }
        else {
            res.status(200).json(city)
        }
    })
});

app.post("/createCity", (req, res) => {
    let city = req.body.city
    let state = req.body.state
    let country = req.body.country
    let rating = req.body.rating
    let dateEst = req.body.dateEst
    let population = req.body.population

    conn.query(`INSERT INTO cities (city_name, state, country, tourist_rating, date_established, estimated_population) VALUES (?,?,?,?,?,?);`, [city, state, country, rating, dateEst, population], (err, city) => {
        if (err) {
            res.status(500)
        }
        else {
            let newCityId = city.insertId
            console.log(newCityId);
            conn.query(`Select * from cities where id = ?`, [newCityId], (err, cityback) => {
                if (err) {
                    res.status(500)
                }
                else {
                    console.log(cityback);
                    res.status(200)
                    res.json(cityback)
                }
            })
        }
    })
});

app.delete("/delete/:id", (req, res) => {
    let id = req.params.id
    console.log(req.params.id);
    conn.query('DELETE FROM cities WHERE id = ?', [id], (err, del) => {
        if (err) {
            res.status(500)
        }
        else {
            res.status(200)
        }
    })
})

app.put(`/city/`, (req, res) => {
    let id = req.body.id
    let rating = req.body.tourist_rating
    let dateEst = req.body.dateEst
    let estPop = req.body.estPop

    console.log(req.body);

    conn.query(`update cities set tourist_rating = ?, date_established = ?, estimated_population = ? where id = ?;`, [rating, dateEst, estPop, id], (err, update) => {
        if (err) {
            res.status(500)
        }
        else {
            res.status(200).json(update)
        }
    })
});

// app.put(`/city/:id/:dateEst`, (req, res) => {
//     let id = req.params.id
//     let dateEst = req.params.dateEst

//     conn.query(`update cities set date_established = ? where id = ?;`, [dateEst, id], (err) => {
//         if (err) {
//             res.status(500)
//         }
//         else {
//             res.status(200)
//         }
//     })
// });

// app.put(`/city/:id/:population`, (req, res) => {
//     let id = req.params.id
//     let population = req.params.population

//     conn.query(`update cities set date_established = ? where id = ?;`, [population, id], (err) => {
//         if (err) {
//             res.status(500)
//         }
//         else {
//             res.status(200)
//         }
//     })
// });

app.listen(PORT, () => console.log(`I am listening on port ${PORT}`));