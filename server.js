const express = require('express');
const cors = require('cors')
const app = express();
const mysql = require('mysql2')
const Sequelize = require('sequelize');
const {connect} = require("rxjs");
const port = 3080;

app.use(cors());
app.use(express.json());

app.listen(port, ()=>{
  console.log('servidor escoltant al port ', port)
})

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'universitat'
});

connection.connect((err)=>{
  if (err) throw err;
  console.log('connection exitosa a la base de dades')
})


const sequelize = new Sequelize('universitat', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql'
});

const initModels = require('C:\\Users\\raull\\IdeaProjects\\ExamenUF2AAD\\src\\app\\models\\init-models.js')
const models = initModels(sequelize);

app.post('/modifDeptRaulLuna', (req) => {
  console.log('insert fet');
  console.log(req.body)
  models.departament.create(req.body)
})


app.post('/modifCorreuRaulLuna', (req, res) => {
  const colCorreu = 'ALUMN_E_MAIL';
  const tipus = 'VARCHAR(30)';
  const taula = 'alumnes';
  const email = "'otaku@institutvidreres.cat'";

  const query = `ALTER TABLE ${taula} MODIFY ${colCorreu} ${tipus} DEFAULT ${email}`;

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Ja está modificat, pelacanyes!' });
    } else {
      if (result.warningCount > 0) {
        res.status(200).json({ message: 'La columna ja és VARCHAR' });
      } else {
        res.status(200).json({ message: 'La columna s\'ha modificat a VARCHAR i s\'ha afegit un valor per defecte' });
      }
    }
  });
});




app.get('/llistaAssigRaulLuna', (req, res) => {

  const deptNom = 'INFORMATICA I MATEMATICA APLICADA';

  const query = `SELECT assig.ASSIG_NOM, assig.ASSIG_CODI
                 FROM ASSIGNATURES assig
                 INNER JOIN ASSIGNATURES_PROFESSOR assigpro ON assig.ASSIG_CODI = assigpro.ASSIGPROF_ASSIG_CODI
                 INNER JOIN PROFESSOR pro ON assigpro.ASSIGPROF_PROF_DNI = pro.PROF_DNI
                 INNER JOIN DEPARTAMENT dep ON pro.PROF_DNI = dep.DEPT_PROF_DNI
                 WHERE dep.DEPT_NOM = '${deptNom}'`;

  connection.query(query, (err, info) => {
    if (err) {
      throw err;
    } else {
      res.json(info);
      console.log(info);
    }
  });
});


app.get('/impartirAssigRaulLuna', (req, res) => {

  const profNom = 'JOSEP';

  const query = `SELECT assig.ASSIG_CODI
                 FROM ASSIGNATURES assig
                 INNER JOIN ASSIGNATURES_PROFESSOR assigpro ON assig.ASSIG_CODI = assigpro.ASSIGPROF_ASSIG_CODI
                 INNER JOIN PROFESSOR pro ON assigpro.ASSIGPROF_PROF_DNI = pro.PROF_DNI
                 WHERE pro.PROF_NOM = '${profNom}'`;

  connection.query(query, (err, info) => {
    if (err) {
      throw err;
    } else {
      res.json(info);
      console.log(info);
    }
  });
});
