let mode="youtube"

function setCalc(type){
mode=type
}

function calculate(){

let a=Number(document.getElementById("input1").value)
let b=Number(document.getElementById("input2").value)

let result=0

switch(mode){

case "youtube":
result=(a/1000)*b
break

case "cpm":
result=a/b*1000
break

case "insta_eng":
result=((a+b)/10000)*100
break

case "insta_rate":
result=(a/1000)*10
break

case "tiktok":
result=(a/1000)*b*1.2
break

case "tiktok_eng":
result=((a+b)/10000)*100
break

case "brand":
result=(a/1000)*15
break

case "affiliate":
result=a*b
break

case "cpm_calc":
result=(a/b)*1000
break

case "cpc":
result=a/b
break

case "cpv":
result=a/b
break

case "monthly":
result=a*b
break

case "yearly":
result=a*b*12
break

case "subs":
result=a+b
break

case "followers":
result=a+b
break

case "audience":
result=a+b
break

case "watch":
result=a*b
break

case "retention":
result=(a/b)*100
break

case "roi":
result=((b-a)/a)*100
break

case "profit":
result=b-a
break

default:
result=a+b

}

document.getElementById("result").innerHTML="Result: "+result

}
