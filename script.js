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

// Set USD conversion rate (example: 1 USD = 83 ₹)
const USD_RATE = 83;

// ========================
// Creator Economy Calculators
// ========================

function convertToDollar(inr){
  return (inr / USD_RATE).toFixed(2);
}

function calculateYouTubeIncome(){
  const views = parseFloat(document.getElementById('ytViews').value);
  const cpm = parseFloat(document.getElementById('ytCPM').value);
  if(isNaN(views) || isNaN(cpm)){ alert('Enter valid numbers'); return; }
  const revenueINR = (views / 1000) * cpm;
  const revenueUSD = convertToDollar(revenueINR);
  document.getElementById('ytIncomeResult').innerText = 
    `Estimated Income: ₹${revenueINR.toFixed(2)} | $${revenueUSD}`;
}

function calculateInstagramEngagement(){
  const likes = parseFloat(document.getElementById('instaLikes').value);
  const comments = parseFloat(document.getElementById('instaComments').value);
  const followers = parseFloat(document.getElementById('instaFollowers').value);
  if(isNaN(likes)||isNaN(comments)||isNaN(followers)||followers===0){alert('Enter valid numbers'); return;}
  const engagement = ((likes + comments) / followers) * 100;
  document.getElementById('instaEngagementResult').innerText = 
    `Engagement Rate: ${engagement.toFixed(2)}%`;
}

function calculateTikTokEarnings(){
  const views = parseFloat(document.getElementById('tikViews').value);
  const cpm = parseFloat(document.getElementById('tikCPM').value);
  if(isNaN(views)||isNaN(cpm)){alert('Enter valid numbers'); return;}
  const revenueINR = (views / 1000) * cpm;
  const revenueUSD = convertToDollar(revenueINR);
  document.getElementById('tikEarningsResult').innerText = 
    `Estimated Earnings: ₹${revenueINR.toFixed(2)} | $${revenueUSD}`;
}

function calculateCPM(){
  const views = parseFloat(document.getElementById('cpmViews').value);
  const revenue = parseFloat(document.getElementById('cpmRevenue').value);
  if(isNaN(views)||isNaN(revenue)||views===0){alert('Enter valid numbers'); return;}
  const cpm = (revenue / views) * 1000;
  document.getElementById('cpmResult').innerText = `CPM: ₹${cpm.toFixed(2)} | $${convertToDollar(cpm)}`;
}

function calculateAffiliateIncome(){
  const clicks = parseFloat(document.getElementById('affiliateClicks').value);
  const conversion = parseFloat(document.getElementById('affiliateConversion').value)/100;
  const commission = parseFloat(document.getElementById('affiliateCommission').value);
  if(isNaN(clicks)||isNaN(conversion)||isNaN(commission)){alert('Enter valid numbers'); return;}
  const incomeINR = clicks * conversion * commission;
  const incomeUSD = convertToDollar(incomeINR);
  document.getElementById('affiliateResult').innerText = `Affiliate Income: ₹${incomeINR.toFixed(2)} | $${incomeUSD}`;
}

function calculateBrandDeal(){
  const followers = parseFloat(document.getElementById('brandFollowers').value);
  const rate = parseFloat(document.getElementById('brandRate').value);
  if(isNaN(followers)||isNaN(rate)){alert('Enter valid numbers'); return;}
  const rateUSD = convertToDollar(rate);
  document.getElementById('brandDealResult').innerText = `Estimated Brand Deal: ₹${rate.toFixed(2)} | $${rateUSD}`;
}

function calculateCreatorROI(){
  const revenue = parseFloat(document.getElementById('creatorRevenue').value);
  const cost = parseFloat(document.getElementById('creatorCost').value);
  if(isNaN(revenue)||isNaN(cost)||cost===0){alert('Enter valid numbers'); return;}
  const roi = ((revenue - cost) / cost) * 100;
  document.getElementById('creatorROIResult').innerText = `ROI: ${roi.toFixed(2)}%`;
}

function calculateSubscriberGrowth(){
  const current = parseFloat(document.getElementById('subCurrent').value);
  const monthly = parseFloat(document.getElementById('subMonthly').value);
  const months = parseFloat(document.getElementById('subMonths').value);
  if(isNaN(current)||isNaN(monthly)||isNaN(months)){alert('Enter valid numbers'); return;}
  const total = current + (monthly * months);
  document.getElementById('subscriberGrowthResult').innerText = `Subscribers after ${months} months: ${total}`;
}

function calculateVideoProfit(){
  const revenue = parseFloat(document.getElementById('videoRevenue').value);
  const cost = parseFloat(document.getElementById('videoCost').value);
  if(isNaN(revenue)||isNaN(cost)){alert('Enter valid numbers'); return;}
  const profitINR = revenue - cost;
  const profitUSD = convertToDollar(profitINR);
  document.getElementById('videoProfitResult').innerText = `Video Profit: ₹${profitINR.toFixed(2)} | $${profitUSD}`;
}

function calculateInfluencerRate(){
  const followers = parseFloat(document.getElementById('infFollowers').value);
  const engagement = parseFloat(document.getElementById('infEngagement').value);
  if(isNaN(followers)||isNaN(engagement)){alert('Enter valid numbers'); return;}
  const rateINR = followers * (engagement/100) * 0.1; // Example formula
  const rateUSD = convertToDollar(rateINR);
  document.getElementById('influencerRateResult').innerText = `Suggested Rate: ₹${rateINR.toFixed(2)} | $${rateUSD}`;
}
