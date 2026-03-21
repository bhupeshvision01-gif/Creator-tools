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

// Set USD conversion rate
const USD_RATE = 83; // 1 USD = 83 INR

// Convert INR to USD
function inrToUsd(inr){
  return (inr / USD_RATE).toFixed(2);
}

// =========================
// Creator Economy Calculators
// =========================

function calculateYouTubeIncome(){
  let views = parseFloat(document.getElementById('ytViews').value);
  let cpm = parseFloat(document.getElementById('ytCPM').value);
  if(isNaN(views) || isNaN(cpm)){ alert('Enter valid numbers'); return; }

  let incomeINR = (views / 1000) * cpm;
  let incomeUSD = inrToUsd(incomeINR);

  document.getElementById('ytIncomeResult').innerText =
    `Estimated Income: ₹${incomeINR.toFixed(2)} | $${incomeUSD}`;
}

function calculateTikTokEarnings(){
  let views = parseFloat(document.getElementById('tikViews').value);
  let cpm = parseFloat(document.getElementById('tikCPM').value);
  if(isNaN(views)||isNaN(cpm)){alert('Enter valid numbers'); return;}
  
  let earningsINR = (views / 1000) * cpm;
  let earningsUSD = inrToUsd(earningsINR);

  document.getElementById('tikEarningsResult').innerText =
    `Estimated Earnings: ₹${earningsINR.toFixed(2)} | $${earningsUSD}`;
}

function calculateAffiliateIncome(){
  let clicks = parseFloat(document.getElementById('affiliateClicks').value);
  let conversion = parseFloat(document.getElementById('affiliateConversion').value)/100;
  let commission = parseFloat(document.getElementById('affiliateCommission').value);
  if(isNaN(clicks)||isNaN(conversion)||isNaN(commission)){alert('Enter valid numbers'); return;}

  let incomeINR = clicks * conversion * commission;
  let incomeUSD = inrToUsd(incomeINR);

  document.getElementById('affiliateResult').innerText =
    `Affiliate Income: ₹${incomeINR.toFixed(2)} | $${incomeUSD}`;
}

function calculateBrandDeal(){
  let rate = parseFloat(document.getElementById('brandRate').value);
  if(isNaN(rate)){alert('Enter valid number'); return;}
  
  let rateUSD = inrToUsd(rate);
  document.getElementById('brandDealResult').innerText =
    `Estimated Brand Deal: ₹${rate.toFixed(2)} | $${rateUSD}`;
}

function calculateVideoProfit(){
  let revenue = parseFloat(document.getElementById('videoRevenue').value);
  let cost = parseFloat(document.getElementById('videoCost').value);
  if(isNaN(revenue)||isNaN(cost)){alert('Enter valid numbers'); return;}

  let profitINR = revenue - cost;
  let profitUSD = inrToUsd(profitINR);

  document.getElementById('videoProfitResult').innerText =
    `Video Profit: ₹${profitINR.toFixed(2)} | $${profitUSD}`;
}

function calculateInfluencerRate(){
  let followers = parseFloat(document.getElementById('infFollowers').value);
  let engagement = parseFloat(document.getElementById('infEngagement').value);
  if(isNaN(followers)||isNaN(engagement)){alert('Enter valid numbers'); return;}

  let rateINR = followers * (engagement/100) * 0.1; // Example formula
  let rateUSD = inrToUsd(rateINR);

  document.getElementById('influencerRateResult').innerText =
    `Suggested Rate: ₹${rateINR.toFixed(2)} | $${rateUSD}`;
}

// =========================
// Non-monetary calculators
// =========================

function calculateInstagramEngagement(){
  const likes = parseFloat(document.getElementById('instaLikes').value);
  const comments = parseFloat(document.getElementById('instaComments').value);
  const followers = parseFloat(document.getElementById('instaFollowers').value);
  if(isNaN(likes)||isNaN(comments)||isNaN(followers)||followers===0){alert('Enter valid numbers'); return;}
  
  const engagement = ((likes + comments) / followers) * 100;
  document.getElementById('instaEngagementResult').innerText =
    `Engagement Rate: ${engagement.toFixed(2)}%`;
}

function calculateCreatorROI(){
  const revenue = parseFloat(document.getElementById('creatorRevenue').value);
  const cost = parseFloat(document.getElementById('creatorCost').value);
  if(isNaN(revenue)||isNaN(cost)||cost===0){alert('Enter valid numbers'); return;}
  
  const roi = ((revenue - cost) / cost) * 100;
  document.getElementById('creatorROIResult').innerText =
    `ROI: ${roi.toFixed(2)}%`;
}

function calculateSubscriberGrowth(){
  const current = parseFloat(document.getElementById('subCurrent').value);
  const monthly = parseFloat(document.getElementById('subMonthly').value);
  const months = parseFloat(document.getElementById('subMonths').value);
  if(isNaN(current)||isNaN(monthly)||isNaN(months)){alert('Enter valid numbers'); return;}
  
  const total = current + (monthly * months);
  document.getElementById('subscriberGrowthResult').innerText =
    `Subscribers after ${months} months: ${total}`;
}

function calculateCPM(){
  const views = parseFloat(document.getElementById('cpmViews').value);
  const revenue = parseFloat(document.getElementById('cpmRevenue').value);
  if(isNaN(views)||isNaN(revenue)||views===0){alert('Enter valid numbers'); return;}
  
  const cpmINR = (revenue / views) * 1000;
  const cpmUSD = inrToUsd(cpmINR);
  
  document.getElementById('cpmResult').innerText =
    `CPM: ₹${cpmINR.toFixed(2)} | $${cpmUSD}`;
}
