const express = require('express')
const router = express.Router()
const db = require("./config")


router.get("/getData", (req, res) => {
    console.log("routing to /getData")
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

module.exports = router
