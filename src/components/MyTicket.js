import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
export default function MyTicket({ticket,onDelete,onUpdate}) {
    const url='/ticket/'+ticket.TICKETID;
    const [places,setPlaces]=useState(1)
    const onSubmit = (e) =>{
      console.log(ticket.RESERVEDID)
      onUpdate({RESERVEDID:ticket.RESERVEDID,RESERVEDSEATS:places,TOTALPRICE:places*ticket.PRICE})
    }
  return (
    <>
    <div className='ticket-container'>
        <div className='ticket-info'>
            <h3>Godzina odjazdu: {ticket.DATEOFDEPARTURE}</h3>
            <h3>Z {ticket.DESTINATIONFROM}</h3>
            <h3>Do {ticket.DESTINATIONTO}</h3>
        </div>
        <div className='ticket-price-info'>
            <p>Cena biletu/biletów {ticket.TOTALPRICE} PLN</p>
            <p>Ilość kupionych biletów {ticket.RESERVEDSEATS}</p>
        </div>
        
        <div className='tarin-info'>
            <img width='80%' className='image' src={ticket.PHOTO}></img>
        </div>
        <p>Rodzaj pociągu {ticket.TRAINNAME}</p>
        <button className='btn' onClick={()=>onDelete(ticket.RESERVEDID)}>Zrezygnuj z biletu</button>
        
    </div>
    <form onSubmit={onSubmit} className='form-control'>
    <div className='form-control'>
            <label>Ilośc miejsc które rezerwujesz: {places} Cena: {places*ticket.PRICE} PLN</label>
            <input
            type='range'
            min='1'
            max={ticket.AVALIBLEPLACES+ticket.RESERVEDSEATS}
            placeholder='Dodaj dostępną ilośc miejsc'
            value={places}
            onChange={(e)=>setPlaces(e.target.value)}
            />
    </div>   
    <div className='form-control'>
          <input type='submit' value='Zmień' className='btn btn-block'  />
    </div>
    </form>
    </>
  )
}
