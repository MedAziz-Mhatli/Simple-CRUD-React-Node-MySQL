const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { response } = require('express');
app.use(bodyParser.json())
const port  = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded(
  { extended: true }
  )
);
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "teeest",
});

/*app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});*/

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
              response.render('sample_data',
               { title :'Node JS MYSQL app' , 
              action:'list', sampleData:data}) ; 
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
