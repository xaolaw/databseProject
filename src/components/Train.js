import React from 'react'
import '../styles/Ticket.css'

export default function Train({train}) {
  return (
    <div className='ticket-container'>
        <div className='ticket-info'>
            <h3>Nazwa pociągu: {train.TRAINNAME}</h3>
            <p>Ilość biletów związanych z pociągiem: {train.NUMBER_OF_TICKETS}</p>
        </div>
        <div className='tarin-info'>
            <img width='80%' className='image' src={train.PHOTO}></img>
        </div>

    </div>
  )
}
