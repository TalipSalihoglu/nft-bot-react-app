import React,{useEffect,useState} from 'react';
import { Card,Button,Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const fetcheden = (eden_collection) => {
    return new Promise((resolve) => {
        fetch(eden_collection, {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*'
            }
          }).then((res) => {
            res.json().then((data) => {
                resolve(data.results.floorPrice);
            }).catch(() => resolve([]));
        }).catch(() => resolve([]));
    });
};
function play(){
    const audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
    audio.autoplay=true
    audio.muted=false
    audio.play();
}
const fetcheden2 = (eden_collection) => {
    return new Promise((resolve) => {
        const query = `{"$match":{"collectionSymbol":"${eden_collection}"},"$sort":{"createdAt":-1},"$skip":0,"$limit":2000}`;
        fetch(`getListedNFTsByQuery?q=${query}`,{
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*'
            }
          }).then((res) => {
            res.json().then((data) => {
                resolve(data.results);
            }).catch(() => resolve([]));
        }).catch(() => resolve([]));
    });
};

async function synchronizeSolanart(eden_collection,pc){
    const result =await fetcheden(eden_collection)
    const exponent = 9;
    const tempfloorPrice = result/Math.pow(10, exponent);
    const floorPrice=localStorage.getItem("floorPrice"+eden_collection)
    if(tempfloorPrice>0 && tempfloorPrice<(floorPrice*pc)){
        console.log("Heeeyyy! new floor price for: "+eden_collection,tempfloorPrice )
        //await localStorage.setItem("floorPrice"+eden_collection, tempfloorPrice)
        return tempfloorPrice
    }
    else{
        //console.log("tempfloorPrice: ",tempfloorPrice," floorPrice: ",floorPrice," for ",eden_collection)
        return 0
    }
   
}
async function synchronizeSolanart2(fprice,setNftModel,eden_collection){
    const data =await fetcheden2(eden_collection)
    await data.map(async item => { 
        if(item.price === fprice){
            play()
            await localStorage.setItem("floorPrice"+eden_collection, fprice)
            // console.log(`${item.id} => Insert EDEN`);
            // console.log(`${item.img} => Insert EDEN`);
            // console.log(`${item.price} => Sniped`);
            await setNftModel({id:item.id,title:item.title,img:item.img,price:item.price,mintAddress:item.mintAddress})
        }
    })
}
async function generalAsync(setNftModel,eden_collections,pc){
    //await synchronizeSolanart(floorPrice,setFloorPrice)
    
    setInterval(async() => {
        // for(let i=0;i<eden_collections.length;i++){
        //     const fprice=await synchronizeSolanart(eden_collections[i],pc)
        //     console.log("fprice:",fprice)
        //     if(fprice>0){
        //          await synchronizeSolanart2(fprice,setNftModel,eden_collections[i])
        //     }
        // }

        // for only one collection 
            const fprice=await synchronizeSolanart(eden_collections,pc)
            //console.log("fprice:",fprice)
            if(fprice>0){
                await synchronizeSolanart2(fprice,setNftModel,eden_collections)
            } 
    }
    ,10000);
}


function Nft({eden_collections,percentageChange}) {
    const [nftModel,setNftModel]=useState({id:"",title:"Sniping... It will alert when found.",price: "fetching floor price..",img:"loading",mintAddress:"loading"})
    
    useEffect(()=>{
        console.log("Bot started....")
        console.log("PercentageChange :",percentageChange)
        const pc=((100-percentageChange)/100)
        localStorage.setItem("floorPrice"+eden_collections, 100)
   
       generalAsync(setNftModel,eden_collections,pc)
    },[percentageChange,eden_collections])
    
  return( 
        <div>
            <h3><Spinner animation="border" variant="success" /> fetching floor price..</h3>
            <Card className='text-center' style={{ width: '36rem' }}>
            <Card.Img variant="top" src={nftModel.img}/>
            <Card.Body>
                <Card.Title>{nftModel.title}</Card.Title>
                <Card.Text>
                    {nftModel.price} SOL
                </Card.Text>
                <Button variant="primary" href={`https://magiceden.io/item-details/${nftModel.mintAddress}`}>Go to buy</Button>
            </Card.Body>
            </Card>
            {/* <h1>{nftModel.title}</h1>
            <h2>{nftModel.price}</h2> 
            <a href={`https://magiceden.io/item-details/${nftModel.mintAddress}`}> Go to Buy</a>
            <br/>
            <img src={nftModel.img} alt="NFT-IMG" width={500} />
            <br/>
            <br/>   */}
      </div>
    );
}

export default Nft;
