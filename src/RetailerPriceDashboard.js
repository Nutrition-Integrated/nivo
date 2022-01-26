import React, {useEffect, useState, useRef,useMemo } from "react";
import axios from "axios";
import Histogram from "./Histogram";

export default function RetailerPriceDashboard(props){
const [flavourData,setFlavourData] = useState([])
const [packsizeData,setPacksizeData] = useState([])

useEffect(() => {
    axios.get('https://express-pg-ni.azurewebsites.net/getRetailBarFlavoursActiveWithTags')
          .then(response => setFlavourData(response?.data))
},[])

useEffect(() => {
    axios.get('https://express-pg-ni.azurewebsites.net/getRetailBarPacksizePriceLatest')
          .then(response => setPacksizeData(response?.data))
},[])

return (
    <Histogram histoData={data}/>

)
}