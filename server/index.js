const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const { response } = require('express');
app.use(bodyParser.json())
const port  = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//mysql 
const pool = mysql.createPool({ 
  connectionLimit: 10, 
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'teeest'
})

//GET all products

app.get('/products',(req,res)=> {
  pool.getConnection((err,connection)=> {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);

      //query(sqlString,callback)

      connection.query('SELECT * FROM feuil1_2',(err ,rows) => {
          connection.release(); //return the connection to pool 

          if (!err) { 
              res.send(rows)
         //     response.render('sample_data',
           //    { title :'Node JS MYSQL app' , 
            //  action:'list', sampleData:data}) ; 
          }else {
              
              console.log(err)

          }
      })    
  })
      

})

//GET a product by ROWID 

app.get('/products/:ROWID', (req,res)=> { 
  pool.getConnection((err,connection)=> {
      if (err) throw err 
      console.log(`connected as id ${connection.threadId}`)
      connection.query('SELECT * FROM feuil1_2 where ROWID = ?',[req.params.ROWID], (err,rows)=> {
          connection.release(); //return the connection to pool 
          if (!err) {
              res.send(rows)
          } else { 
              console.log(err)
          }
      })
  })
})





/*app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
*/
app.listen(port ,()=>console.log(`Listen on port ${port}`))
