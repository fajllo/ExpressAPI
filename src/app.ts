import express, { Request, Response } from 'express';
import mysql from 'mysql';

const app = express();
const port = process.env.PORT || 3000;
const connectionString = process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/test';
const connection = mysql.createConnection(connectionString);
connection.connect()
app.get('/api/characters', (req: Request, res: Response) => { 
    const query = 'SELECT * FROM Characters WHERE ' ;
    connection.query(query, (err, rows) => { 
        if (err) {
            res.status(500).send(err);
        }
        else {
            const retVal : object = {
                data : rows,
                message : rows.length === 0 ? 'No data found' : null
            }
            res.send(retVal);
        }
    })
    
})
app.get('/api/characters/:id', (req: Request, res: Response) => { 
    const {id} = req.params;
    const query = `SELECT * FROM Characters WHERE ID = ${id} `;
    connection.query(query, (err, rows) => { 
        if (err) {
            res.status(500).send(err);
        }
        else {
            const retVal : object = {
                data : rows.length > 0 ? rows[0] : null,
                message : rows.length > 0 ? 'Success' : 'No data found'
            }
            res.send(retVal);
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});