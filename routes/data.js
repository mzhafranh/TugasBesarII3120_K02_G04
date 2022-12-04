var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function (db) {
    function add(id, string, integer, float, date, boolean, callback) {
        db.query('INSERT INTO data VALUES ($1, $2, $3, $4, $5, $6)', [id, string, integer, float, date, boolean], (err) => {
            callback(err);
        });
    }

    function select(id, callback) {
        db.query('SELECT * FROM data WHERE id = $1', [id], (err, data) => {
            callback(err, data);
        })
    }
    
    function update(newId, oldId, string, integer, float, date, boolean, callback) {
        db.query('UPDATE data SET id = $1, string = $2, integer = $3, float = $4, date = $5, boolean = $6 WHERE id = $7', [newId, string, integer, float, date, boolean, oldId], (err) => {
            callback(err);
        });
    }
    
    function remove(id, callback) {
        db.query('DELETE FROM data WHERE id = $1', [id], (err) => {
            callback(err);
        })
    }

    router.get('/', async function (req, res,) {
        const url = req.url == '/' ? '/?page=1' : req.url;
        const page = req.query.page || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        const wheres = []
        const values = []
        const filter = req.url
        var count = 1;
        var sortBy = req.query.sortBy == undefined ? `id` : req.query.sortBy;
        var order = req.query.order == undefined ? `asc` : req.query.order;
        

        console.log('Query: ' + req.query)
        console.log('Filter: ' + filter)

        // if (req.query.id && req.query.idCheck == 'on') {
        //     wheres.push(`id = $${count++}`);
        //     values.push(req.query.id);
        // }

        // if (req.query.string && req.query.stringCheck == 'on') {
        //     wheres.push(`string ilike '%' || $${count++} || '%'`);
        //     values.push(req.query.string);
        // }

        // if (req.query.integer && req.query.integerCheck == 'on') {
        //     wheres.push(`integer = $${count++}`);
        //     values.push(req.query.integer);
        // }

        // if (req.query.float && req.query.floatCheck == 'on') {
        //     wheres.push(`float = $${count++}`);
        //     values.push(req.query.float);
        // }

        // if (req.query.dateCheck == 'on') {
        //     if (req.query.startDate != '' && req.query.endDate != '') {
        //         wheres.push(`date BETWEEN $${count++} AND $${count++}`)
        //         values.push(req.query.startDate);
        //         values.push(req.query.endDate);
        //     }
        //     else if (req.query.startDate) {
        //         wheres.push(`date > $${count++}`)
        //         values.push(req.query.startDate);
        //     }
        //     else if (req.query.endDate) {
        //         wheres.push(`date < $${count++}`)
        //         values.push(req.query.endDate);
        //     }
        // }

        // if (req.query.boolean && req.query.booleanCheck == 'on') {
        //     wheres.push(`boolean = $${count++}`);
        //     values.push(req.query.boolean);
        // }


        let sql = 'SELECT COUNT(*) AS total FROM gudang';
        if (wheres.length > 0) {
            sql += ` WHERE ${wheres.join(' AND ')}`
        }

        console.log('SQL Count: ' + sql)

        try{
        db.query(sql, values, (err, data) => {
            if (err) {
                console.error(err);
            }
            const totalPages = Math.ceil(data.rows[0].total / limit)
            const totalData = data.rows[0].total 
            sql = 'SELECT * FROM gudang'
            if (wheres.length > 0) {
                sql += ` WHERE ${wheres.join(' AND ')}`
            }
            sql += ` ORDER BY ${sortBy} ${order} LIMIT $${count++} OFFSET $${count++}`;
            console.log('SQL: ' + sql)
            console.log([...values, limit, offset])
            db.query(sql, [...values, limit, offset], (err, data) => {
                if (err) {
                    console.error(err);
                }
                res.status(200).json({
                    data: data.rows,
                    totalData,
                    totalPages,
                    display: limit,
                    page: parseInt(page)
                  })
            })
        })
        } catch (err) {
          res.status(500).json({ message: "error ambil data" })
        }
    })


    

    router.post('/add', (req, res) => {
        add(req.body.id, req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, req.body.boolean, (err) => {
            if (err) {
                console.error(err);
            }
        })
        res.redirect('/');
    })


    router.post('/edit/:id', (req, res) => {
        update(req.body.id, req.params.id, req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, req.body.boolean, (err) => {
            if (err) {
                console.error(err)
            }
            res.redirect('/');
        })
    })

    router.get('/users', (req, res,) => {
        const page = req.query.page || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        const wheres = []
        const values = []
        const filter = req.url
        var count = 1;
        var sortBy = req.query.sortBy == '' ? `email` : req.query.sortBy;
        var order = req.query.order == '' ? `asc` : req.query.order;

        console.log(req.query)
        console.log(req.query.sortBy == '')

        if (req.query.email) {
            wheres.push(`email ilike '%' || $${count++} || '%'`);
            values.push(req.query.email);
        }

        if (req.query.username) {
            wheres.push(`username ilike '%' || $${count++} || '%'`);
            values.push(req.query.username);
        }

        if (req.query.role) {
            wheres.push(`role ilike '%' || $${count++} || '%'`);
            values.push(req.query.role);
        }

        let sql = 'SELECT COUNT(*) AS total FROM users';
        if (wheres.length > 0) {
            sql += ` WHERE ${wheres.join(' AND ')}`
        }

        try{
            db.query(sql, values, (err, data) => {
                if (err) {
                    console.error(err);
                }
                const totalPages = Math.ceil(data.rows[0].total / limit)
                const totalData = data.rows[0].total 
                sql = 'SELECT * FROM users'
                if (wheres.length > 0) {
                    sql += ` WHERE ${wheres.join(' AND ')}`
                }
                sql += ` ORDER BY ${sortBy} ${order} LIMIT $${count++} OFFSET $${count++}`;
                console.log('SQL: ' + sql)
                console.log([...values, limit, offset])
                db.query(sql, [...values, limit, offset], (err, data) => {
                    if (err) {
                        console.error(err);
                    }
                    res.status(200).json({
                        data: data.rows,
                        totalData,
                        totalPages,
                        display: limit,
                        page: parseInt(page)
                      })
                })
            })
            } catch (err) {
              res.status(500).json({ message: "error ambil data" })
            }

    })

    router.put('/users/delete/', (req, res) => {
        try {
        db.query("DELETE FROM users WHERE email = $1", [req.body.email], (err) => {
            if (err) {
                console.error(err);
            }
        })
        res.status(200).json({message: "ok"})
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "error delete data" })
        }
    })

    return router;
}
