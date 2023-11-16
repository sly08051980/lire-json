console.log("script chargé");

URL_API = "https://api.jsonbin.io/v3";
const API_KEY = '$2a$10$xKWiKj9TSsybUfnpPg87Ouv9o1lkVLt.0TBBDfOUcVCoDSPCWKQV2';
let collectionRecord="";
let binRecord="";
let data=[];
const table = document.querySelector("table");


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

let myString
let thead =document.createElement("thead");
table.appendChild(thead);

for (let index = 0; index < dynamicName.length; index++) {
    
    let test = dynamicName[index];
   
        const cellule = document.createElement("th");
        cellule.innerHTML = test;
        thead.appendChild(cellule);
    for (let index = 0; index < dataBinRecord.length; index++) {

        const ligne = document.createElement("td");
         myString =JSON.stringify(dataBinRecord[index]);
      
        
        ligne.innerHTML=dataBinRecord[index].innerHTML;
    
        table.appendChild(ligne);

    
    
    }
}

console.log("my string =",myString);

document.body.appendChild(table);
}

