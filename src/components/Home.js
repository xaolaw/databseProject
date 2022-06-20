import React from 'react'
import '../styles/Home.css'
import {Link} from 'react-router-dom'

export function Home() {
  return (
    <div className="topnav">
      <Link to={`/`}>Start</Link>
      <Link to={`/showTickets`}>Bilety</Link>
      <Link to={`/addTicket`}>Dodaj bilet</Link>
      <Link to={`/ourTrains`}>Nasze pociągi</Link>
      <Link to={`/myTickets`}>Twoje bilety</Link>
    </div>
  )
}
