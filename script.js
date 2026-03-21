// Tab navigation
const tabs = document.querySelectorAll('.tab-link');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Finance Calculators
function calculateEMI() {
  const P = parseFloat(document.getElementById('loanAmount').value);
  const R = parseFloat(document.getElementById('interestRate').value)/12/100;
  const N = parseInt(document.getElementById('loanTenure').value);
  const EMI = (P * R * Math.pow(1+R, N))/(Math.pow(1+R, N)-1);
  document.getElementById('emiResult').innerText = 'EMI: ₹' + EMI.toFixed(2);
}
function calculateGST() {
  const amount = parseFloat(document.getElementById('gstAmount').value);
  const rate = parseFloat(document.getElementById('gstRate').value);
  const gst = (amount * rate)/100;
  document.getElementById('gstResult').innerText = 'GST: ₹'+gst.toFixed(2)+', Total: ₹'+(amount+gst).toFixed(2);
}
function calculateSIP() {
  const P = parseFloat(document.getElementById('sipAmount').value);
  const r = parseFloat(document.getElementById('sipRate').value)/100/12;
  const n = parseInt(document.getElementById('sipYears').value)*12;
  const fv = P * (Math.pow(1+r,n)-1)/r*(1+r);
  document.getElementById('sipResult').innerText = 'Future Value: ₹'+fv.toFixed(2);
}
function calculateFD() {
  const P = parseFloat(document.getElementById('fdAmount').value);
  const r = parseFloat(document.getElementById('fdRate').value)/100;
  const t = parseInt(document.getElementById('fdYears').value);
  const amount = P * Math.pow((1+r),t);
  document.getElementById('fdResult').innerText = 'Maturity Amount: ₹'+amount.toFixed(2);
}
function calculateSI() {
  const P = parseFloat(document.getElementById('siPrincipal').value);
  const R = parseFloat(document.getElementById('siRate').value);
  const T = parseFloat(document.getElementById('siTime').value);
  document.getElementById('siResult').innerText = 'Simple Interest: ₹'+((P*R*T)/100).toFixed(2);
}

// Health
function calculateBMI() {
  const w=parseFloat(document.getElementById('weight').value);
  const h=parseFloat(document.getElementById('height').value)/100;
  document.getElementById('bmiResult').innerText='BMI: '+(w/(h*h)).toFixed(2);
}
function calculateCalories() {
  const age=parseFloat(document.getElementById('age').value);
  const w=parseFloat(document.getElementById('bmrWeight').value);
  const h=parseFloat(document.getElementById('bmrHeight').value);
  const activity=parseFloat(document.getElementById('activityLevel').value);
  const bmr=10*w + 6.25*h - 5*age + 5;
  document.getElementById('calorieResult').innerText='Daily Calories: '+(bmr*activity).toFixed(0)+' kcal';
}
function calculateIdealWeight() {
  const h=parseFloat(document.getElementById('idealHeight').value);
  const gender=document.getElementById('gender').value;
  const ideal=gender==='male'?50+0.91*(h-152.4):45.5+0.91*(h-152.4);
  document.getElementById('idealResult').innerText='Ideal Weight: '+ideal.toFixed(2)+' kg';
}

// Math
function calculatePercentage(){
  const total=parseFloat(document.getElementById('percentTotal').value);
  const val=parseFloat(document.getElementById('percentValue').value);
  document.getElementById('percentResult').innerText='Percentage: '+((val/total)*100).toFixed(2)+'%';
}
function calculateAge(){
  const dob=new Date(document.getElementById('dob').value);
  const diff=Date.now()-dob.getTime();
  document.getElementById('ageResult').innerText='Age: '+(new Date(diff).getUTCFullYear()-1970)+' years';
}
function calculateCI(){
  const P=parseFloat(document.getElementById('ciPrincipal').value);
  const R=parseFloat(document.getElementById('ciRate').value)/100;
  const T=parseFloat(document.getElementById('ciTime').value);
  const n=parseFloat(document.getElementById('ciComp').value);
  document.getElementById('ciResult').innerText='Compound Interest: ₹'+(P*Math.pow(1+R/n,n*T)-P).toFixed(2);
}

// Unit
function convertLength(){
  const v=parseFloat(document.getElementById('lengthInput').value);
  const u=document.getElementById('lengthUnit').value;
  let r;
  switch(u){case 'm':r=v+' m';break;case 'cm':r=v*100+' cm';break;case 'km':r=v/1000+' km';break;case 'inch':r=v*39.3701+' inch';break;case 'ft':r=v*3.28084+' ft';}
  document.getElementById('lengthResult').innerText='Converted: '+r;
}
function convertWeight(){
  const v=parseFloat(document.getElementById('weightInput').value);
  const u=document.getElementById('weightUnit').value;
  let r;
  switch(u){case 'kg':r=v+' kg';break;case 'g':r=v*1000+' g';break;case 'lb':r=v*2.20462+' lb';break;case 'oz':r=v*35.274+' oz';}
  document.getElementById('weightResult').innerText='Converted: '+r;
}
function convertTemperature(){
  const v=parseFloat(document.getElementById('tempInput').value);
  const u=document.getElementById('tempUnit').value;
  let r;
  if(u==='C')r=v+' °C';
  else if(u==='F')r=(v*9/5+32).toFixed(2)+' °F';
  else if(u==='K')r=(v+273.15).toFixed(2)+' K';
  document.getElementById('tempResult').innerText='Converted: '+r;
}

// Utility / Original Idea
function comparePrices(){
  const p1=parseFloat(document.getElementById('price1').value);
  const p2=parseFloat(document.getElementById('price2').value);
  const p3=parseFloat(document.getElementById('price3').value);
  document.getElementById('priceResult').innerText='Cheapest Price: ₹'+Math.min(p1,p2,p3);
}
function calculateHiddenCost(){
  const base=parseFloat(document.getElementById('baseCost').value);
  const tax=parseFloat(document.getElementById('taxCost').value);
  const extra=parseFloat(document.getElementById('extraCost').value);
  document.getElementById('hiddenCostResult').innerText='Total Cost: ₹'+(base+base*tax/100+extra).toFixed(2);
}
function calculateTravelCost(){
  const d=parseFloat(document.getElementById('distance').value);
  const price=parseFloat(document.getElementById('fuelPrice').value);
  const eff=parseFloat(document.getElementById('fuelEfficiency').value);
  document.getElementById('travelCostResult').innerText='Fuel Cost: ₹'+((d/eff)*price).toFixed(2);
}
function calculateCreatorIncome(){
  const v=parseFloat(document.getElementById('views').value);
  const cpm=parseFloat(document.getElementById('cpm').value);
  document.getElementById('creatorIncomeResult').innerText='Estimated Income: ₹'+((v/1000)*cpm).toFixed(2);
}
