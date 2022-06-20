import React, { useState,useEffect } from 'react'
import '../styles/AddTicket.css'

export default function AddTicket({onAdd}) {
    const [trains,setTrains]=useState([])

    useEffect(()=>{
        const getTrains=async()=>{
            const trainsFromServer=await fetchTrains()
            setTrains(trainsFromServer)
    }
    getTrains()
    ///console.log(trains)
    },[])

        //fetch trains
    const fetchTrains = async()=>{
        const res=await fetch('/trains')//,{mode: 'no-cors'})
        //console.log(res)
        const data=await res.json()
        //console.log("fetching trains")
        //console.log(data)
        return data
    }
    var [availablePlaces,setAvailablePlaces]=useState(50)
    var [maxPlaces,setMaxPlaces]=useState(50)
    var [price,setPrice]=useState(10)
    var [date,setDate]=useState('')
    var [destinationFrom,setDestinationFrom]=useState('')
    var [destinationTo,setDestinationTo]=useState('')
    var [trainName,setTrainName]=useState(null)
    var [trainId,setTrainId]=useState(null)
    const dateMin = new Date().toISOString().split("T")[0];
    const onSubmit = (e) =>{
        //e.preventDefault()
        if (availablePlaces==='' || price==='' || date==='' || destinationFrom==='' || destinationTo===''){
            alert("Podano nieprawdiłowe dane")
        }
        if(trainName==null){
            setTrainName(trains[0].TRAINNAME)
        }
        else{
            var trainId=0
            var maxPlaces=0
            for (var i = 0; i < trains.length; i++) {
                if(trains[i].TRAINNAME===trainName){
                    //setTrainId(trains[i].TRAINID)
                    trainId=trains[i].TRAINID
                    break
                }
            } 
            //setMaxPlaces(availablePlaces)
            maxPlaces=availablePlaces
            console.log({availablePlaces,maxPlaces,price,date,destinationFrom,destinationTo,trainId})
            onAdd({availablePlaces,maxPlaces,price,date,destinationFrom,destinationTo,trainId})
        }
        setAvailablePlaces(50)
        setMaxPlaces(0)
        setPrice(10)
        setDate('')
        setDestinationFrom('')
        setDestinationTo('')
        //onUpdate({ id,availablePlaces, price, date })  
    }
  return (
    <div>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Ilośc miejsc</label>
                    <input
                    type='number'
                    min='50'
                    max='300'
                    placeholder='Dodaj dostępną ilośc miejsc'
                    value={availablePlaces}
                    onChange={(e)=>setAvailablePlaces(e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label>Dodaj cenę biletu</label>
                    <input
                    type='number'
                    min='10'
                    max='300'
                    placeholder='Dodaj cenę tego biletu'
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label>Dodaj dzień odjazdu</label>
                    <input
                    min={dateMin}
                    type='date'
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label>Dodaj miejsce odjazdu</label>
                    <input
                    type='text'
                    value={destinationFrom}
                    placeholder='Dodaj miejsce odjazdu'
                    onChange={(e)=>setDestinationFrom(e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label>Dodaj miejsce przyjazdu</label>
                    <input
                    type='text'
                    value={destinationTo}
                    placeholder='Dodaj miejsce przyjazdu'
                    onChange={(e)=>setDestinationTo(e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label>Dodaj pociąg realizujący połączenie</label>
                    <select onChange={(e)=>setTrainName(e.target.value)}>
                        {
                        trains.map(el => <option value={el.TRAINNAME} key={el.TRAINID}> {el.TRAINNAME}</option>)
                        }
                    </select>
                </div>
                
                <input type='submit' value='Dodaj bilet' className='btn btn-block'  />
            </form>
      </div>
  )
}
