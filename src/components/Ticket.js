import React from 'react'
import '../styles/Ticket.css'
import '../App.css'
import { Link } from 'react-router-dom'

export default function Ticket({ticket,onDelete}) {
  const url='/ticket/'+ticket.TICKETID;
  return (
    <div className='ticket-container'>
        <div className='ticket-info'>
            <h3>Godzina odjazdu: {ticket.DATEOFDEPARTURE}</h3>
            <h3>Z {ticket.DESTINATIONFROM}</h3>
            <h3>Do {ticket.DESTINATIONTO}</h3>
        </div>
        <div className='ticket-price-info'>
            <p>Cena biletu {ticket.PRICE} PLN</p>
            <p>Ilość wolnych miejsc {ticket.AVALIBLEPLACES}</p>
        </div>
        
        <div className='tarin-info'>
          <Link to={url}>
            <img width='80%' className='image' src={ticket.PHOTO}></img>
          </Link> 
        </div>
        <p>Rodzaj pociągu {ticket.TRAINNAME}</p>
        <button className='btn'  onClick={()=>onDelete(ticket.TICKETID)}>Usuń bilet</button>
        
        
    </div>
  )
}
