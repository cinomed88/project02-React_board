const express = require('express')
const router = express.Router()
const db = require("./config")


router.get("/twits", (req, res) => {
    console.log("routing to GET")
    db.getConnection((err, conn) => {
        if (err){
            throw err
        } else {
            conn.query("SELECT * FROM twits", (err, rows) => {
                if (!err) {
                    res.send(rows)
                } else {
                    console.log('query error : ${err}')
                    res.send(err)
                }
            })
        }

        conn.release(err => {
            if (err) throw err
            console.log('Closed database connection.')
        })
    })
    
})

router.post("/twits", async (req,res) => {
    console.log("routing to POST")
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        let bodyObj = JSON.parse(body)
        console.log(bodyObj)
        db.getConnection((err, conn) => {
            if (err){
                throw err
            } else {
                const postSql = `INSERT INTO twits (id, name, time, text) VALUES (?,?,?,?)`
                conn.query(postSql, [bodyObj.id, bodyObj.name, bodyObj.time, bodyObj.text], (err, rows) => {
                    if (!err) {
                        res.send(rows)
                    } else {
                        console.log(`query error : ${err}`)
                        res.send(err)
                    }
                })
            }
    
            conn.release(err => {
                if (err) throw err
                console.log('Closed database connection.')
            })
        })
    })

})

router.put("/twits", (req,res) => {
    console.log("routing to PUT")
    db.getConnection((err, conn) => {
        if (err){
            throw err
        } else {
            // conn.query("SELECT * FROM twits", (err, rows) => {
            //     if (!err) {
            //         res.send(rows)
            //     } else {
            //         console.log('query error : ${err}')
            //         res.send(err)
            //     }
            // })
        }

        conn.release(err => {
            if (err) throw err
            console.log('Closed database connection.')
        })
    })
})

router.delete("/twits", (req,res) => {
    console.log("routing to DELETE")
    db.getConnection((err, conn) => {
        if (err){
            throw err
        } else {
            // conn.query("SELECT * FROM twits", (err, rows) => {
            //     if (!err) {
            //         res.send(rows)
            //     } else {
            //         console.log('query error : ${err}')
            //         res.send(err)
            //     }
            // })
        }

        conn.release(err => {
            if (err) throw err
            console.log('Closed database connection.')
        })
    })
})
module.exports = router
