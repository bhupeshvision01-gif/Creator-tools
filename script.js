let mode = "youtube";

function setCalc(type){
    mode = type;
    document.getElementById("result").innerHTML =
    "Selected calculator: " + type;
}

function calculate(){

let a = parseFloat(document.getElementById("input1").value);
let b = parseFloat(document.getElementById("input2").value);

if(isNaN(a) || isNaN(b)){
document.getElementById("result").innerHTML="Please enter numbers";
return;
}

let result = 0;

switch(mode){

case "youtube":
result = (a/1000) * b;
break;

case "cpm":
result = (a/b) * 1000;
break;

case "insta_eng":
result = ((a+b)/10000) * 100;
break;

case "tiktok":
result = (a/1000) * b * 1.2;
break;

case "brand":
result = (a/1000) * 15;
break;

case "affiliate":
result = a * b;
break;

case "roi":
result = ((b-a)/a) * 100;
break;

case "profit":
result = b - a;
break;

default:
result = a + b;

}

document.getElementById("result").innerHTML =
"Result: " + result.toFixed(2);

}
