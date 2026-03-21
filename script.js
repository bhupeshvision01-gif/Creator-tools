const calculators = [

{ name:"YouTube Money Calculator",inputs:["Views","CPM"],calc:(v,c)=>(v/1000)*c },

{ name:"YouTube CPM Calculator",inputs:["Revenue","Views"],calc:(r,v)=>(r/v)*1000 },

{ name:"YouTube Ad Revenue Calculator",inputs:["Views","CPM"],calc:(v,c)=>(v/1000)*c },

{ name:"YouTube Earnings Per Video",inputs:["Views","CPM"],calc:(v,c)=>(v/1000)*c },

{ name:"YouTube Channel Revenue",inputs:["Monthly Views","CPM"],calc:(v,c)=>(v/1000)*c },

{ name:"Instagram Engagement Rate",inputs:["Likes","Comments","Followers"],calc:(l,c,f)=>((l+c)/f)*100 },

{ name:"Instagram Money Calculator",inputs:["Followers","Rate"],calc:(f,r)=>f*r },

{ name:"Instagram Influencer Rate",inputs:["Followers","Engagement"],calc:(f,e)=>(f*e)/100 },

{ name:"Instagram Sponsorship",inputs:["Followers","Rate"],calc:(f,r)=>f*r },

{ name:"TikTok Money Calculator",inputs:["Views","CPM"],calc:(v,c)=>(v/1000)*c },

{ name:"TikTok Engagement",inputs:["Likes","Comments","Followers"],calc:(l,c,f)=>((l+c)/f)*100 },

{ name:"TikTok Creator Earnings",inputs:["Views","CPM"],calc:(v,c)=>(v/1000)*c },

{ name:"Affiliate Earnings",inputs:["Clicks","Conversion Rate","Commission"],calc:(c,r,cm)=>c*(r/100)*cm },

{ name:"Affiliate Conversion Rate",inputs:["Conversions","Clicks"],calc:(c,cl)=>(c/cl)*100 },

{ name:"Brand Deal Price",inputs:["Views","Rate"],calc:(v,r)=>(v/1000)*r },

{ name:"Influencer Sponsorship",inputs:["Followers","Rate"],calc:(f,r)=>f*r },

{ name:"Brand Campaign ROI",inputs:["Revenue","Cost"],calc:(r,c)=>((r-c)/c)*100 },

{ name:"CPM Calculator",inputs:["Revenue","Views"],calc:(r,v)=>(r/v)*1000 },

{ name:"CPC Calculator",inputs:["Cost","Clicks"],calc:(c,cl)=>c/cl },

{ name:"Ad Revenue Calculator",inputs:["Views","CPM"],calc:(v,c)=>(v/1000)*c },

{ name:"Creator Monthly Income",inputs:["Daily Revenue"],calc:(d)=>d*30 },

{ name:"Creator Yearly Income",inputs:["Monthly Income"],calc:(m)=>m*12 },

{ name:"Video Profit Calculator",inputs:["Revenue","Cost"],calc:(r,c)=>r-c },

{ name:"Subscriber Growth",inputs:["Start","End"],calc:(s,e)=>((e-s)/s)*100 },

{ name:"Engagement Rate",inputs:["Likes","Comments","Followers"],calc:(l,c,f)=>((l+c)/f)*100 }

]

const grid = document.getElementById("toolsGrid")

calculators.forEach((tool,i)=>{

let card = document.createElement("div")

card.className="card"

let html=`<h3>${tool.name}</h3>`

tool.inputs.forEach((input,j)=>{

html+=`<input id="${i}_${j}" placeholder="${input}">`

})

html+=`<button onclick="calculate(${i})">Calculate</button>`

html+=`<h3 id="result_${i}"></h3>`

card.innerHTML=html

grid.appendChild(card)

})

function calculate(i){

const tool = calculators[i]

let values=[]

tool.inputs.forEach((x,j)=>{

values.push(parseFloat(document.getElementById(i+"_"+j).value))

})

let result = tool.calc(...values)

document.getElementById("result_"+i).innerText = "Result: "+result.toFixed(2)

}