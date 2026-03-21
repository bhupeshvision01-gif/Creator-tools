// Tab logic
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

// --- USD Only Calculators ---
function calculateYouTubeIncome(){
  let views = parseFloat(document.getElementById('ytViews').value);
  let cpm = parseFloat(document.getElementById('ytCPM').value);
  if(isNaN(views)||isNaN(cpm)){alert('Enter valid numbers'); return;}
  document.getElementById('ytIncomeResult').innerText = `$${((views/1000)*cpm).toFixed(2)}`;
}

function calculateTikTokEarnings(){
  let views = parseFloat(document.getElementById('tikViews').value);
  let cpm = parseFloat(document.getElementById('tikCPM').value);
  if(isNaN(views)||isNaN(cpm)){alert('Enter valid numbers'); return;}
  document.getElementById('tikEarningsResult').innerText = `$${((views/1000)*cpm).toFixed(2)}`;
}

function calculateAffiliateIncome(){
  let clicks = parseFloat(document.getElementById('affiliateClicks').value);
  let conversion = parseFloat(document.getElementById('affiliateConversion').value)/100;
  let commission = parseFloat(document.getElementById('affiliateCommission').value);
  if(isNaN(clicks)||isNaN(conversion)||isNaN(commission)){alert('Enter valid numbers'); return;}
  document.getElementById('affiliateResult').innerText = `$${(clicks*conversion*commission).toFixed(2)}`;
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
  document.getElementById('videoProfitResult').innerText = `$${(revenue-cost).toFixed(2)}`;
}

function calculateInfluencerRate(){
  let followers = parseFloat(document.getElementById('infFollowers').value);
  let engagement = parseFloat(document.getElementById('infEngagement').value);
  if(isNaN(followers)||isNaN(engagement)){alert('Enter valid numbers'); return;}
  document.getElementById('influencerRateResult').innerText = `$${(followers*(engagement/100)*0.1).toFixed(2)}`;
}

function calculateInstagramEngagement(){
  let likes = parseFloat(document.getElementById('instaLikes').value);
  let comments = parseFloat(document.getElementById('instaComments').value);
  let followers = parseFloat(document.getElementById('instaFollowers').value);
  if(isNaN(likes)||isNaN(comments)||isNaN(followers)||followers===0){alert('Enter valid numbers'); return;}
  document.getElementById('instaEngagementResult').innerText = `${(((likes+comments)/followers)*100).toFixed(2)}%`;
}

function calculateCreatorROI(){
  let revenue = parseFloat(document.getElementById('creatorRevenue').value);
  let cost = parseFloat(document.getElementById('creatorCost').value);
  if(isNaN(revenue)||isNaN(cost)||cost===0){alert('Enter valid numbers'); return;}
  document.getElementById('creatorROIResult').innerText = `${(((revenue-cost)/cost)*100).toFixed(2)}%`;
}

function calculateSubscriberGrowth(){
  let current = parseFloat(document.getElementById('subCurrent').value);
  let monthly = parseFloat(document.getElementById('subMonthly').value);
  let months = parseFloat(document.getElementById('subMonths').value);
  if(isNaN(current)||isNaN(monthly)||isNaN(months)){alert('Enter valid numbers'); return;}
  document.getElementById('subscriberGrowthResult').innerText = `${current + (monthly*months)}`;
}

function calculateCPM(){
  let views = parseFloat(document.getElementById('cpmViews').value);
  let revenue = parseFloat(document.getElementById('cpmRevenue').value);
  if(isNaN(views)||isNaN(revenue)||views===0){alert('Enter valid numbers'); return;}
  document.getElementById('cpmResult').innerText = `$${((revenue/views)*1000).toFixed(2)}`;
}
