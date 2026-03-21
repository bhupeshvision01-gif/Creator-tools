// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function(){
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
});

// ========================
// Creator Economy Calculators
// ========================

function calculateYouTubeIncome(){
  const views = parseFloat(document.getElementById('ytViews').value);
  const cpm = parseFloat(document.getElementById('ytCPM').value);
  if(isNaN(views) || isNaN(cpm)){ alert('Enter valid numbers'); return; }
  const revenue = (views / 1000) * cpm;
  document.getElementById('ytIncomeResult').innerText = 'Estimated Income: ₹'+revenue.toFixed(2);
}

function calculateInstagramEngagement(){
  const likes = parseFloat(document.getElementById('instaLikes').value);
  const comments = parseFloat(document.getElementById('instaComments').value);
  const followers = parseFloat(document.getElementById('instaFollowers').value);
  if(isNaN(likes)||isNaN(comments)||isNaN(followers)||followers===0){alert('Enter valid numbers'); return;}
  const engagement = ((likes + comments) / followers) * 100;
  document.getElementById('instaEngagementResult').innerText = 'Engagement Rate: '+engagement.toFixed(2)+'%';
}

function calculateTikTokEarnings(){
  const views = parseFloat(document.getElementById('tikViews').value);
  const cpm = parseFloat(document.getElementById('tikCPM').value);
  if(isNaN(views)||isNaN(cpm)){alert('Enter valid numbers'); return;}
  const revenue = (views / 1000) * cpm;
  document.getElementById('tikEarningsResult').innerText = 'Estimated Earnings: ₹'+revenue.toFixed(2);
}

function calculateCPM(){
  const views = parseFloat(document.getElementById('cpmViews').value);
  const revenue = parseFloat(document.getElementById('cpmRevenue').value);
  if(isNaN(views)||isNaN(revenue)||views===0){alert('Enter valid numbers'); return;}
  const cpm = (revenue / views) * 1000;
  document.getElementById('cpmResult').innerText = 'CPM: ₹'+cpm.toFixed(2);
}

function calculateAffiliateIncome(){
  const clicks = parseFloat(document.getElementById('affiliateClicks').value);
  const conversion = parseFloat(document.getElementById('affiliateConversion').value)/100;
  const commission = parseFloat(document.getElementById('affiliateCommission').value);
  if(isNaN(clicks)||isNaN(conversion)||isNaN(commission)){alert('Enter valid numbers'); return;}
  const income = clicks * conversion * commission;
  document.getElementById('affiliateResult').innerText = 'Affiliate Income: ₹'+income.toFixed(2);
}

function calculateBrandDeal(){
  const followers = parseFloat(document.getElementById('brandFollowers').value);
  const rate = parseFloat(document.getElementById('brandRate').value);
  if(isNaN(followers)||isNaN(rate)){alert('Enter valid numbers'); return;}
  document.getElementById('brandDealResult').innerText = 'Estimated Brand Deal: ₹'+rate.toFixed(2);
}

function calculateCreatorROI(){
  const revenue = parseFloat(document.getElementById('creatorRevenue').value);
  const cost = parseFloat(document.getElementById('creatorCost').value);
  if(isNaN(revenue)||isNaN(cost)||cost===0){alert('Enter valid numbers'); return;}
  const roi = ((revenue - cost) / cost) * 100;
  document.getElementById('creatorROIResult').innerText = 'ROI: '+roi.toFixed(2)+'%';
}

function calculateSubscriberGrowth(){
  const current = parseFloat(document.getElementById('subCurrent').value);
  const monthly = parseFloat(document.getElementById('subMonthly').value);
  const months = parseFloat(document.getElementById('subMonths').value);
  if(isNaN(current)||isNaN(monthly)||isNaN(months)){alert('Enter valid numbers'); return;}
  const total = current + (monthly * months);
  document.getElementById('subscriberGrowthResult').innerText = 'Subscribers after '+months+' months: '+total;
}

function calculateVideoProfit(){
  const revenue = parseFloat(document.getElementById('videoRevenue').value);
  const cost = parseFloat(document.getElementById('videoCost').value);
  if(isNaN(revenue)||isNaN(cost)){alert('Enter valid numbers'); return;}
  const profit = revenue - cost;
  document.getElementById('videoProfitResult').innerText = 'Video Profit: ₹'+profit.toFixed(2);
}

function calculateInfluencerRate(){
  const followers = parseFloat(document.getElementById('infFollowers').value);
  const engagement = parseFloat(document.getElementById('infEngagement').value);
  if(isNaN(followers)||isNaN(engagement)){alert('Enter valid numbers'); return;}
  const rate = followers * (engagement/100) * 0.1; // Example formula
  document.getElementById('influencerRateResult').innerText = 'Suggested Rate: ₹'+rate.toFixed(2);
}

// ========================
// Finance Calculators
// ========================

function calculateEMI(){
  const P = parseFloat(document.getElementById('loanAmount').value);
  const R = parseFloat(document.getElementById('interestRate').value)/12/100;
  const N = parseInt(document.getElementById('loanTenure').value);
  if(isNaN(P)||isNaN(R)||isNaN(N)){alert('Enter valid numbers'); return;}
  const EMI = (P*R*Math.pow(1+R,N))/(Math.pow(1+R,N)-1);
  document.getElementById('emiResult').innerText = 'EMI: ₹'+EMI.toFixed(2);
}

function calculateSIP(){
  const monthly = parseFloat(document.getElementById('sipMonthly').value);
  const rate = parseFloat(document.getElementById('sipRate').value)/12/100;
  const months = parseFloat(document.getElementById('sipMonths').value);
  if(isNaN(monthly)||isNaN(rate)||isNaN(months)){alert('Enter valid numbers'); return;}
  const total = monthly * (Math.pow(1+rate, months)-1)/rate;
  document.getElementById('sipResult').innerText = 'Maturity Value: ₹'+total.toFixed(2);
}

// ========================
// Health Calculators
// ========================

function calculateBMI(){
  const w = parseFloat(document.getElementById('weight').value);
  const h = parseFloat(document.getElementById('height').value)/100;
  if(isNaN(w)||isNaN(h)){alert('Enter valid numbers'); return;}
  const bmi = w/(h*h);
  document.getElementById('bmiResult').innerText = 'BMI: '+bmi.toFixed(2);
}

// ========================
// Math Calculators
// ========================

function calculatePercentage(){
  const total = parseFloat(document.getElementById('percentTotal').value);
  const val = parseFloat(document.getElementById('percentValue').value);
  if(isNaN(total)||isNaN(val)){alert('Enter valid numbers'); return;}
  const perc = (val/total)*100;
  document.getElementById('percentResult').innerText = 'Percentage: '+perc.toFixed(2)+'%';
}

function calculateAge(){
  const dob = new Date(document.getElementById('dob').value);
  if(isNaN(dob)){alert('Enter valid date'); return;}
  const diff = Date.now()-dob.getTime();
  const age = new Date(diff).getUTCFullYear()-1970;
  document.getElementById('ageResult').innerText = 'Age: '+age+' years';
}

// ========================
// Unit Converters
// ========================

function convertLength(){
  const v = parseFloat(document.getElementById('lengthInput').value);
  const u = document.getElementById('lengthUnit').value;
  if(isNaN(v)){alert('Enter valid number'); return;}
  let r;
  switch(u){
    case 'm': r=v+' m'; break;
    case 'cm': r=v*100+' cm'; break;
    case 'km': r=v/1000+' km'; break;
    case 'inch': r=v*39.3701+' inch'; break;
    case 'ft': r=v*3.28084+' ft'; break;
  }
  document.getElementById('lengthResult').innerText='Converted: '+r;
}

function convertWeight(){
  const v = parseFloat(document.getElementById('weightInput').value);
  const u = document.getElementById('weightUnit').value;
  if(isNaN(v)){alert('Enter valid number'); return;}
  let r;
  switch(u){
    case 'kg': r=v+' kg'; break;
    case 'g': r=v*1000+' g'; break;
    case 'lb': r=v*2.20462+' lb'; break;
    case 'oz': r=v*35.274+' oz'; break;
  }
  document.getElementById('weightResult').innerText='Converted: '+r;
}

function convertTemperature(){
  const v=parseFloat(document.getElementById('tempInput').value);
  const u=document.getElementById('tempUnit').value;
  if(isNaN(v)){alert('Enter valid number'); return;}
  let r;
  if(u==='C') r=v+' °C';
  else if(u==='F') r=(v*9/5+32).toFixed(2)+' °F';
  else if(u==='K') r=(v+273.15).toFixed(2)+' K';
  document.getElementById('tempResult').innerText='Converted: '+r;
}

// ========================
// Utility / Original Ideas
// ========================

function comparePrices(){
  const p1=parseFloat(document.getElementById('price1').value);
  const p2=parseFloat(document.getElementById('price2').value);
  const p3=parseFloat(document.getElementById('price3').value);
  if(isNaN(p1)||isNaN(p2)||isNaN(p3)){alert('Enter valid numbers'); return;}
  const min = Math.min(p1,p2,p3);
  document.getElementById('priceResult').innerText='Cheapest Price: ₹'+min;
}

function calculateHiddenCost(){
  const base=parseFloat(document.getElementById('baseCost').value);
  const tax=parseFloat(document.getElementById('taxCost').value);
  const extra=parseFloat(document.getElementById('extraCost').value);
  if(isNaN(base)||isNaN(tax)||isNaN(extra)){alert('Enter valid numbers'); return;}
  const total = base + base*tax/100 + extra;
  document.getElementById('hiddenCostResult').innerText='Total Cost: ₹'+total.toFixed(2);
}

function calculateTravelCost(){
  const d=parseFloat(document.getElementById('distance').value);
  const price=parseFloat(document.getElementById('fuelPrice').value);
  const eff=parseFloat(document.getElementById('fuelEfficiency').value);
  if(isNaN(d)||isNaN(price)||isNaN(eff)||eff===0){alert('Enter valid numbers'); return;}
  const fuelCost = (d/eff)*price;
  document.getElementById('travelCostResult').innerText='Fuel Cost: ₹'+fuelCost.toFixed(2);
}

function calculateCreatorIncome(){
  const v=parseFloat(document.getElementById('views').value);
  const cpm=parseFloat(document.getElementById('cpm').value);
  if(isNaN(v)||isNaN(cpm)){alert('Enter valid numbers'); return;}
  const income = (v/1000)*cpm;
  document.getElementById('creatorIncomeResult').innerText='Estimated Income: ₹'+income.toFixed(2);
}
