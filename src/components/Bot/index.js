import React,{useEffect,useState} from 'react';
import Nft from './Nft';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Bot() {
    const [percentageChange,setPercentageChange]=useState()
    const [collectionName,setCollectionName]=useState()
    const [isStarted,setIsStarted]=useState(false)
    const onChangePercentage=(event)=>setPercentageChange(event.target.value)
    const onChangeCollection=(event)=>setCollectionName(event.target.value)

    //const eden_collections=["bobos_of_war","the_suites","botborgs","defi_pirates","monkelabs"]
    // for(let i=0;i<eden_collections.length;i++){
    //   localStorage.setItem("floorPrice"+eden_collections[i], 100)
    // 

  return (
    <div>
        {
          !isStarted && <div>
          <h1>Floor Sniper</h1> 
          <input className='mb-3'  type="number" name="percentage" placeholder='Percentage Change' value={percentageChange} onChange={onChangePercentage}/>
          <br/>
          <input className='mb-3' type="text" name="eden" placeholder='Collection Name' value={collectionName} onChange={onChangeCollection}/>
          <br/>
            <Button variant="primary" onClick={()=>setIsStarted(true)}>Snipe</Button>
          </div>
        }
       
        {
          isStarted && 
            //<Nft eden_collections={eden_collections} percentageChange={percentageChange}/>
            <Nft eden_collections={collectionName} percentageChange={percentageChange}/>
        }
        
    </div>
    );
}

export default Bot;
