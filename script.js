function youtubeIncome(){

let views=parseFloat(document.getElementById("views").value);
let cpm=parseFloat(document.getElementById("cpm").value);

let income=(views/1000)*cpm;

document.getElementById("result").innerText="$"+income.toFixed(2);

}


function roiCalculator(){

let gain=parseFloat(document.getElementById("gain").value);
let cost=parseFloat(document.getElementById("cost").value);

let roi=((gain-cost)/cost)*100;

document.getElementById("result").innerText=roi.toFixed(2)+"%";

}


function emiCalculator(){

let loan=parseFloat(document.getElementById("loan").value);
let rate=parseFloat(document.getElementById("rate").value)/1200;
let months=parseFloat(document.getElementById("months").value);

let emi=loan*rate*Math.pow(1+rate,months)/(Math.pow(1+rate,months)-1);

document.getElementById("result").innerText=emi.toFixed(2);

}


function bmiCalculator(){

let weight=parseFloat(document.getElementById("weight").value);
let height=parseFloat(document.getElementById("height").value)/100;

let bmi=weight/(height*height);

document.getElementById("result").innerText=bmi.toFixed(2);

}
