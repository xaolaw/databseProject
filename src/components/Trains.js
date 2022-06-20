import { useEffect, useState } from 'react'
import Train from './Train'
export default function Trains() {
    const [trains,setTrains]=useState([])

    useEffect(()=>{
        const getTrains=async()=>{
            const trainsFromServer=await fetchTrains()
            setTrains(trainsFromServer)
    }
    getTrains()
    console.log(trains)
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
  return (
        <>
        {trains.map((train)=>(
        <Train
        key={train.TRAINID}
        train={train}
        />
        ))}
        </>
  )
}
