// Tabs Switching
document.addEventListener('DOMContentLoaded', function(){
  const tabs = document.querySelectorAll('.tab-link');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t=>t.classList.remove('active'));
      contents.forEach(c=>c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });
});

// ----- Creator Calculators -----
function calculateYouTubeIncome(){
  let views = parseFloat(document.getElementById('ytViews').value);
  let cpm = parseFloat(document.getElementById('ytCPM').value);
  if(isNaN(views) || isNaN(cpm)){
    alert('Enter valid numbers'); 
    return;
  }
  document.getElementById('ytIncomeResult').innerText = `Estimated Monthly Income: $${((views/1000)*cpm).toFixed(2)}`;
}

function calculateInstagramEngagement(){
  let likes=parseFloat(document.getElementById('instaLikes').value);
  let comments=parseFloat(document.getElementById('instaComments').value);
  let followers=parseFloat(document.getElementById('instaFollowers').value);
  if(isNaN(likes)||isNaN(comments)||isNaN(followers)||followers===0){alert('Enter valid numbers'); return;}
  document.getElementById('instaEngagementResult').innerText = `${((likes+comments)/followers*100).toFixed(2)}%`;
}

function calculateTikTokEarnings(){
  let views=parseFloat(document.getElementById('tikViews').value);
  let cpm=parseFloat(document.getElementById('tikCPM').value);
  if(isNaN(views)||isNaN(cpm)){alert('Enter valid numbers'); return;}
  document.getElementById('tikEarningsResult').innerText = `$${((views/1000)*cpm).toFixed(2)}`;
}

function calculateCPM(){
  let revenue=parseFloat(document.getElementById('cpmRevenue').value);
  let impressions=parseFloat(document.getElementById('cpmImpressions').value);
  if(isNaN(revenue)||isNaN(impressions)||impressions===0){alert('Enter valid numbers'); return;}
  document.getElementById('cpmResult').innerText = `$${(revenue/(impressions/1000)).toFixed(2)}`;
}

function calculateAffiliateIncome(){
  let clicks=parseFloat(document.getElementById('affClicks').value);
  let conv=parseFloat(document.getElementById('affConversion').value);
  let payout=parseFloat(document.getElementById('affPayout').value);
  if(isNaN(clicks)||isNaN(conv)||isNaN(payout)){alert('Enter valid numbers'); return;}
  document.getElementById('affResult').innerText = `$${(clicks*(conv/100)*payout).toFixed(2)}`;
}

function calculateBrandDeal(){
  let followers=parseFloat(document.getElementById('brandFollowers').value);
  let rate=parseFloat(document.getElementById('brandRate').value);
  if(isNaN(followers)||isNaN(rate)){alert('Enter valid numbers'); return;}
  document.getElementById('brandResult').innerText = `$${(followers/1000*rate).toFixed(2)}`;
}

function calculateROI(){
  let revenue=parseFloat(document.getElementById('roiRevenue').value);
  let cost=parseFloat(document.getElementById('roiCost').value);
  if(isNaN(revenue)||isNaN(cost)||cost===0){alert('Enter valid numbers'); return;}
  document.getElementById('roiResult').innerText = `${((revenue-cost)/cost*100).toFixed(2)}%`;
}

function calculateSubscriberGrowth(){
  let current=parseFloat(document.getElementById('subsCurrent').value);
  let rate=parseFloat(document.getElementById('subsRate').value);
  let months=parseFloat(document.getElementById('subsMonths').value);
  if(isNaN(current)||isNaN(rate)||isNaN(months)){alert('Enter valid numbers'); return;}
  document.getElementById('subsResult').innerText = `${(current*Math.pow(1+rate/100,months)).toFixed(0)} subscribers`;
}

function calculateVideoProfit(){
  let revenue=parseFloat(document.getElementById('vidRevenue').value);
  let cost=parseFloat(document.getElementById('vidCost').value);
  if(isNaN(revenue)||isNaN(cost)){alert('Enter valid numbers'); return;}
  document.getElementById('vidResult').innerText = `$${(revenue-cost).toFixed(2)}`;
}

function calculateInfluencerRate(){
  let followers=parseFloat(document.getElementById('inflFollowers').value);
  let engagement=parseFloat(document.getElementById('inflEngagement').value);
  let base=parseFloat(document.getElementById('inflBase').value);
  if(isNaN(followers)||isNaN(engagement)||isNaN(base)){alert('Enter valid numbers'); return;}
  document.getElementById('inflResult').innerText = `$${(followers/1000*base*(engagement/100)).toFixed(2)}`;
}

// Similarly, add functions for remaining 40 calculators in Finance, Health, Math, Unit, Utility tabs
