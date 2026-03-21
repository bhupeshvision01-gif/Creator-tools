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
// Creator Calculators USD Only
// ========================

function calculateYouTubeIncome(){
  let views = parseFloat(document.getElementById('ytViews').value);
  let cpm = parseFloat(document.getElementById('ytCPM').value);
  if(isNaN(views)||isNaN(cpm)){alert('Enter valid numbers'); return;}
  let income = (views/1000)*cpm;
  document.getElementById('ytIncomeResult').innerText = `$${income.toFixed(2)}`;
}

function calculateTikTokEarnings(){
  let views = parseFloat(document.getElementById('tikViews').value);
  let cpm = parseFloat(document.getElementById('tikCPM').value);
  if(isNaN(views)||isNaN(cpm)){alert('Enter valid numbers'); return;}
  let earnings = (views/1000)*cpm;
  document.getElementById('tikEarningsResult').innerText = `$${earnings.toFixed(2)}`;
}

function calculateAffiliateIncome(){
  let clicks = parseFloat(document.getElementById('affiliateClicks').value);
  let conversion = parseFloat(document.getElementById('affiliateConversion').value)/100;
  let commission = parseFloat(document.getElementById('affiliateCommission').value);
  if(isNaN(clicks)||isNaN(conversion)||isNaN(commission)){alert('Enter valid numbers'); return;}
  let income = clicks*conversion*commission;
  document.getElementById('affiliateResult').innerText = `$${income.toFixed(2)}`;
}

function calculateBrandDeal(){
  let rate = parseFloat(document.getElementById('brandRate').value);
  if(isNaN(rate)){alert('Enter valid number'); return;}
  document.getElementById('brandDealResult').innerText = `$${rate.toFixed(2)}`;
}

function calculateVideoProfit(){
  let revenue = parseFloat(document.getElementById('videoRevenue').value);
  let cost = parseFloat(document.getElementById('videoCost').value);
  if(isNaN(revenue)||isNaN(cost)){alert('Enter valid numbers'); return;}
  let profit = revenue - cost;
  document.getElementById('videoProfitResult').innerText = `$${profit.toFixed(2)}`;
}

function calculateInfluencerRate(){
  let followers = parseFloat(document.getElementById('infFollowers').value);
  let engagement = parseFloat(document.getElementById('infEngagement').value);
  if(isNaN(followers)||isNaN(engagement)){alert('Enter valid numbers'); return;}
  let rate = followers * (engagement/100) * 0.1;
  document.getElementById('influencerRateResult').innerText = `$${rate.toFixed(2)}`;
}

// Non-monetary calculators remain the same
function calculateInstagramEngagement(){
  const likes = parseFloat(document.getElementById('instaLikes').value);
  const comments = parseFloat(document.getElementById('instaComments').value);
  const followers = parseFloat(document.getElementById('instaFollowers').value);
  if(isNaN(likes)||isNaN(comments)||isNaN(followers)||followers===0){alert('Enter valid numbers'); return;}
  const engagement = ((likes + comments) / followers) * 100;
  document.getElementById('instaEngagementResult').innerText = `${engagement.toFixed(2)}%`;
}

function calculateCreatorROI(){
  const revenue = parseFloat(document.getElementById('creatorRevenue').value);
  const cost = parseFloat(document.getElementById('creatorCost').value);
  if(isNaN(revenue)||isNaN(cost)||cost===0){alert('Enter valid numbers'); return;}
  const roi = ((revenue - cost) / cost) * 100;
  document.getElementById('creatorROIResult').innerText = `${roi.toFixed(2)}%`;
}

function calculateSubscriberGrowth(){
  const current = parseFloat(document.getElementById('subCurrent').value);
  const monthly = parseFloat(document.getElementById('subMonthly').value);
  const months = parseFloat(document.getElementById('subMonths').value);
  if(isNaN(current)||isNaN(monthly)||isNaN(months)){alert('Enter valid numbers'); return;}
  const total = current + (monthly * months);
  document.getElementById('subscriberGrowthResult').innerText = `${total}`;
}

function calculateCPM(){
  const views = parseFloat(document.getElementById('cpmViews').value);
  const revenue = parseFloat(document.getElementById('cpmRevenue').value);
  if(isNaN(views)||isNaN(revenue)||views===0){alert('Enter valid numbers'); return;}
  const cpm = (revenue / views) * 1000;
  document.getElementById('cpmResult').innerText = `$${cpm.toFixed(2)}`;
}
