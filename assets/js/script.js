console.log("script chargé");

URL_API = "https://api.jsonbin.io/v3";
const API_KEY = '$2a$10$xKWiKj9TSsybUfnpPg87Ouv9o1lkVLt.0TBBDfOUcVCoDSPCWKQV2';
let collectionRecord="";
let binRecord="";
let data=[];
const table = document.querySelector("table");
const ligneth=document.createElement("th");

readCollection();

async function readCollection(){
    const req = await fetch(`${URL_API}/c`,{
        method:'GET',
        headers:{
            'X-Master-Key' : API_KEY,
        },
    });
     const collection = await req.json();
    //  console.log(collection);
     collectionRecord = collection.map(record=>record.record)[0];
    //  console.log(collectionRecord);
     readCollectionBins(collectionRecord)
     return collection;

}

async function readCollectionBins(collectionRecord){
   
    const req = await fetch(`${URL_API}/c/${collectionRecord}/bins`,{
        method :'GET',
        headers :{
            'X-Master-Key' : API_KEY,
        },
    });
    const collectionBins=await req.json();
    // console.log(collectionBins);
    binRecord = collectionBins.map(record=>record.record)[0];
    // console.log(binRecord);
    readBins(binRecord);
    return collectionBins;

}

async function readBins(binRecord){

    const req = await fetch(`${URL_API}/b/${binRecord}`,{
        method :'GET',
        headers :{
            'X-Master-Key' : API_KEY,
        },
    });
   const dataBins= await req.json();
   const dataBinRecord =dataBins.record;


    console.log("databins record : ",dataBinRecord[0][0]);
 
    let dynamicName = Object.keys(dataBinRecord[0][0]);
console.log("dynamicName" ,dynamicName);
dynamicName.pop();
console.log("dynamicName 2:" ,dynamicName);

for (let index = 0; index < dynamicName.length; index++) {
    
    let test = dynamicName[index];

   
        const cellule = document.createElement("td");
        cellule.innerHTML = test;
        ligneth.appendChild(cellule);
        
    
    table.appendChild(ligneth);   
}

for (let index = 0; index < dataBinRecord.length; index++) {
    const lignetr=dataBinRecord[index];
    console.log("lignete : ",lignetr);
    
    for (let index = 0; index < dataBinRecord.length; index++) {
        const cel = document.createElement("td");
        cel.innerHTML=lignetr
        ligneth.appendChild(cel)
        
    }
    
}

document.body.appendChild(table);
}

