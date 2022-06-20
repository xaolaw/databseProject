import { useState,useEffect } from "react"
import MyTicket from "./MyTicket"

export default function MyTickets({onUpdate}) {
    const [tickets,setTickets]=useState([])
    useEffect(()=>{
        const getTickets=async()=>{
          const ticketsFromServer=await fetchTickets()
          setTickets(ticketsFromServer)
        }
        getTickets()
      },[])
    
      const fetchTickets = async()=>{
        const res=await fetch('/reservedTickets')
        const data=await res.json()
        return data
      }
      const deleteReservedTicket = async (id) =>{
        setTickets(tickets.filter((ticket)=>ticket.RESERVEDID!==id))
        await fetch('/reservedTicketsCancel/'+id,{method:'DELETE'})
      }
   
  return (
    <>
    <div className="my-tickets-head">
        Zarezerwowane bilety
    </div>
    <div className="my-tickets">
            {tickets.length > 0 ? (
            tickets.map((ticket)=>
            <MyTicket
            key={ticket.RESERVEDID}
            ticket={ticket}
            onDelete={deleteReservedTicket}
            onUpdate={onUpdate}
            
            />
            )
            ) : (
                <div className="info-tickets-none">
                  Nie masz jeszcze biletów
                  </div>
            )   
            }
        </div>
    </>
  )
}
