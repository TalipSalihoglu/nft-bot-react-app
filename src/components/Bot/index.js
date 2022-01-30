import React,{useEffect,useState} from 'react';
import Nft from './Nft';

function Bot() {
    const [percentageChange,setPercentageChange]=useState()
    const [collectionName,setCollectionName]=useState()
    const [isStarted,setIsStarted]=useState(false)
    const onChangePercentage=(event)=>setPercentageChange(event.target.value)
    const onChangeCollection=(event)=>setCollectionName(event.target.value)


    //const eden_collections=["bobos_of_war","the_suites","botborgs","defi_pirates","monkelabs"]
    // for(let i=0;i<eden_collections.length;i++){
    //   localStorage.setItem("floorPrice"+eden_collections[i], 100)
    // }
  return (
    <div>
        <h1>--- NFT BOT ---</h1>
        {
          !isStarted && <div>
          <input type="number" name="percentage" placeholder='Percentage Change' value={percentageChange} onChange={onChangePercentage}/>
          <br/>
          <input type="text" name="eden" placeholder='collection name' value={collectionName} onChange={onChangeCollection}/>
          <br/>
          <button onClick={()=>setIsStarted(true)}>Start Bot</button>
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
