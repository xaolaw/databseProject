import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'

export const AboutTicket = ({onAdd}) => {
  
  const [ticket,setTicket]=useState({})
  const [places,setPlaces]=useState(1)
  const params = useParams()
  var ticketID=ticket.TICKETID
  var price=places*ticket.PRICE
  var clientID=1
  var status='Active'
  
  useEffect(()=>{
    const getTicket=async()=>{
      const ticketFromServer=await fetchTicket()
      console.log(ticketFromServer[0]);
      setTicket(ticketFromServer[0])
    }
    getTicket()
    //console.log(tickets)
  },[])

  //fetch tickets
  const fetchTicket = async()=>{
    const res=await fetch('/tickets/'+params.id)//,{mode: 'no-cors'})
    const data=await res.json()
    
    return data
  }
  const onSubmit = (e) =>{
    
    //customer id is one because login is not defined 
    ticket.AVALIBLEPLACES=ticket.AVALIBLEPLACES-places
    setTicket(ticket)
    onAdd({ticketID,clientID,places,price,status})
    
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
              <p>Cena biletu {ticket.PRICE} PLN</p>
              <p>Ilość wolnych miejsc {ticket.AVALIBLEPLACES}</p>
          </div>
          <p>Rodzaj pociągu {ticket.TRAINNAME}</p>
      </div>
      <div className='tarin-info-About'>
          <img width='80%' className='image' src={ticket.PHOTO}></img>
      </div>
      <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Ilośc miejsc które rezerwujesz: {places} Cena: {places*ticket.PRICE} PLN</label>
            <input
            type='range'
            min='1'
            max={ticket.AVALIBLEPLACES}
            placeholder='Dodaj dostępną ilośc miejsc'
            value={places}
            onChange={(e)=>setPlaces(e.target.value)}
            />
        </div>   
        <div className='form-control'>
          <input type='submit' value='Kup' className='btn btn-block'/>
        </div>
      </form>
    </>
  )
}
