import React from 'react'
import Ticket from './Ticket'

function Tickets({tickets,onDelete}) {
  return (
    <>
    {tickets.map((ticket)=>(
      <Ticket
      key={ticket.TICKETID}
      ticket={ticket}
      onDelete={onDelete}
      />
    ))}
    </>
  )
}

export default Tickets