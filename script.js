function ytIncome(){

let views=parseFloat(document.getElementById("views").value);
let cpm=parseFloat(document.getElementById("cpm").value);

let income=(views/1000)*cpm;

document.getElementById("ytResult").innerText="$"+income.toFixed(2);

}



function roiCalc(){

let gain=parseFloat(document.getElementById("gain").value);
let cost=parseFloat(document.getElementById("cost").value);

let roi=((gain-cost)/cost)*100;

document.getElementById("roiResult").innerText=roi.toFixed(2)+"%";

}



function emiCalc(){

let loan=parseFloat(document.getElementById("loan").value);
let rate=parseFloat(document.getElementById("rate").value)/1200;
let years=parseFloat(document.getElementById("years").value)*12;

let emi=loan*rate*Math.pow(1+rate,years)/(Math.pow(1+rate,years)-1);

document.getElementById("emiResult").innerText=emi.toFixed(2);

}



function bmiCalc(){

let weight=parseFloat(document.getElementById("weight").value);
let height=parseFloat(document.getElementById("height").value)/100;

let bmi=weight/(height*height);

document.getElementById("bmiResult").innerText=bmi.toFixed(2);

}
