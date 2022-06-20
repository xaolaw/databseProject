import { useEffect, useState } from 'react';
import './App.css';
import { Home } from './components/Home';
import Tickets from './components/Tickets';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage';
import AddTicket from './components/AddTicket';
import Trains from './components/Trains';
import { AboutTicket } from './components/AboutTicket';
import MyTickets from './components/MyTickets'

function App() {
  const [tickets,setTickets]=useState([])
  
  useEffect(()=>{
    const getTickets=async()=>{
      const ticketsFromServer=await fetchTickets()
      setTickets(ticketsFromServer)
    }
    getTickets()
    //console.log(tickets)
  },[])

  //fetch tickets
  const fetchTickets = async()=>{
    const res=await fetch('/tickets')//,{mode: 'no-cors'})
    //console.log(res)
    const data=await res.json()
    //console.log("fetching tickets")
    //console.log(data)
    return data
  }
  const addTicket=async(ticket)=>{
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(ticket),
      headers: {"Content-Type": "application/json"}
    }
    
    console.log(requestOptions)
    const res=await fetch('/addTicket',requestOptions)

  }
  const deleteTicket = async (id) =>{
    setTickets(tickets.filter((ticket)=>ticket.TICKETID!==id))
    await fetch('/tickets/'+id,{method:'DELETE'})
  }
  const reserveTicket=async(ticket)=>{
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(ticket),
      headers: {"Content-Type": "application/json"}
    }
    await fetch('/reserveTicket',requestOptions)

  }
  const updateTicket=async(id)=>{
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(id),
      headers: {"Content-Type": "application/json"}
    }
    await fetch('/updateReservedTickets',requestOptions)

  }
 
  return (
    <BrowserRouter>
      <div className='app-container'>  
        <Home></Home>
        <Routes>
          <Route path='/' exact element={
            <HomePage/>
          }>
          </Route>
          <Route path='/showTickets' element={
            <Tickets onDelete={deleteTicket} tickets={tickets}></Tickets>
          }>
          </Route>
          <Route path='/addTicket' element={
            <AddTicket onAdd={addTicket}></AddTicket>
          }></Route>
          <Route path='/ourTrains' element={
            <Trains/>
          }></Route>
          <Route path='/ticket/:id' element={
            <>
            <AboutTicket onAdd={reserveTicket}></AboutTicket>
            </>
            }>
          </Route>
          <Route path='/myTickets' element={
            <>
            <MyTickets onUpdate={updateTicket}></MyTickets>
            </>
          }>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
