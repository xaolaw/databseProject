const oracledb = require('oracledb');
oracledb.outFormat=oracledb.OUT_FORMAT_OBJECT;
const bp = require('body-parser')
const express = require('express');
const app = express();
const port = 5000;

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


async function getFrom(req,res,query){
  try{
    connection = await oracledb.getConnection({ 
      user: "demonode", 
      password: "OracleAdam6", 
      connectionString: "localhost/xepdb1" });
    
    result2 = await connection.execute(query);
    result=JSON.stringify(result2.rows);
  }catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
        try {
          await connection.close();
          console.log('close connection success');
        } catch (err) {
          console.error(err.message);
        }
    }
    return res.send(result);
  }  
}
async function deleteFrom(req,res,query){
  console.log('deleting')
  try {
    connection = await oracledb.getConnection({ 
      user: "demonode", 
      password: "OracleAdam6", 
      connectionString: "localhost/xepdb1" }); 
    let result = await connection.execute(query)
    console.log(result.rowsAffected, "Rows Deleted");
    connection.commit();
  }catch(err){
    console.log(err)
  }finally {
    if (connection) {
        try {
          await connection.close();
          console.log('close connection success');
        } catch (err) {
          console.error(err.message);
        }
    }
  }
}
async function addTicket(req,res){
  ticket=[req.body.availablePlaces,req.body.maxPlaces,req.body.price,req.body.date,req.body.destinationFrom,req.body.destinationTo,req.body.trainId]
  //ticket=[200,200,100,'2022-04-11','Tokio','Sapporo',21]
  try {
    connection = await oracledb.getConnection({ 
      user: "demonode", 
      password: "OracleAdam6", 
      connectionString: "localhost/xepdb1" });
    
    const sql = `insert into TICKETS (avaliblePlaces, maxPlaces, price, dateOfDeparture, destinationFrom, destinationTo, trainId) values(:1,:2,:3,TO_DATE(:4,'YYYY-MM-DD'),:5,:6,:7)`
    /*const sql2=`insert into Tickets
    (avaliblePlaces, maxPlaces, price, dateOfDeparture, destinationFrom, destinationTo, trainId)
    VALUES
    (200,200,100,TO_DATE('2022-03-01','YYYY-MM-DD'),'Tokio','Kyoto',21)`*/

    console.log(sql);
    let result = await connection.execute(sql,ticket)
    console.log(result.rowsAffected, "Rows Inserted");
    connection.commit();
  }catch(err){
    console.log(err)
  }finally {
    if (connection) {
        try {
          await connection.close();
          console.log('close connection success');
        } catch (err) {
          console.error(err.message);
        }
    }
  }
}
async function addReserveTicket(req,res){
  ticket=[req.body.ticketID,req.body.clientID,req.body.places,req.body.price,req.body.status]
  try {
    connection = await oracledb.getConnection({ 
      user: "demonode", 
      password: "OracleAdam6", 
      connectionString: "localhost/xepdb1" });
    
    const sql = `insert into reservedTickets (TicketId, CustomerID, ReservedSeats, TotalPrice, Status) values(:1,:2,:3,:4,:5)`

    console.log(sql);
    let result = await connection.execute(sql,ticket)
    console.log(result.rowsAffected, "Rows Inserted");
    connection.commit();
  }catch(err){
    console.log(err)
  }finally {
    if (connection) {
        try {
          await connection.close();
          console.log('close connection success');
        } catch (err) {
          console.error(err.message);
        }
    }
  }
}
async function chengeReservedTicket(req,res){
  console.log(req.body)
  const sql=`update reservedTickets set ReservedSeats=${req.body.RESERVEDSEATS},TotalPrice=${req.body.TOTALPRICE} where reservedID=${req.body.RESERVEDID}`
  console.log(sql)
  
  try {
    connection = await oracledb.getConnection({ 
      user: "demonode", 
      password: "OracleAdam6", 
      connectionString: "localhost/xepdb1" });
    
    
    let result = await connection.execute(sql)
    console.log(result.rowsAffected, "Rows Inserted");
    connection.commit();
  }catch(err){
    console.log(err)
  }finally {
    if (connection) {
        try {
          await connection.close();
          console.log('close connection success');
        } catch (err) {
          console.error(err.message);
        }
    }
  }
}
/*
POSTS
*/
//dodanie ticketu do bazy danych
app.post('/addTicket',(req,res)=>{
  console.log(req.body);
  addTicket(req,res)
});
app.post('/reserveTicket',(req,res)=>{
  console.log(req.body);
  addReserveTicket(req,res);
})
/*
GETS
*/ 
app.get('/tickets', function (req, res) {
  //getTickets(req, res);
  getFrom(req,res,`SELECT * FROM TicketView`);
})
app.get('/trains', function (req, res) {
  //getTrains(req, res);
  getFrom(req,res,`SELECT * FROM trainView`);
})
app.get('/tickets/:id',function(req,res){
  getFrom(req,res,`select * from TICKETVIEW
  where TicketID=${req.params.id}`);
});
app.get('/reservedTickets',function(req,res){
  getFrom(req,res,`select * from myActiceTicketsView`)
})
/*
DELETES
*/
app.delete('/tickets/:id',function(req,res){
  deleteFrom(req,res,`DELETE FROM TICKETS WHERE TICKETID=`+String(req.params.id))
})
app.delete('/reservedTicketsCancel/:id',function(req,res){
  console.log(req.params.id)
  deleteFrom(req,res,`DELETE FROM RESERVEDTICKETS WHERE RESERVEDID=`+String(req.params.id))
})
/*
PUTS
*/
app.put('/updateReservedTickets',function(req,res){
  chengeReservedTicket(req,res)
})
app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port))
//addTicket(0,0)