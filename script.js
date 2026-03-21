// YouTube
function calculateYouTubeIncome(){
  let views = parseFloat(document.getElementById('ytViews').value);
  let cpm = parseFloat(document.getElementById('ytCPM').value);
  if(isNaN(views)||isNaN(cpm)){alert('Enter valid numbers'); return;}
  document.getElementById('ytIncomeResult').innerText = `$${((views/1000)*cpm).toFixed(2)}`;
}

// Instagram
function calculateInstagramEngagement(){
  let likes = parseFloat(document.getElementById('instaLikes').value);
  let comments = parseFloat(document.getElementById('instaComments').value);
  let followers = parseFloat(document.getElementById('instaFollowers').value);
  if(isNaN(likes)||isNaN(comments)||isNaN(followers)||followers===0){alert('Enter valid numbers'); return;}
  let engagement = ((likes+comments)/followers)*100;
  document.getElementById('instaEngagementResult').innerText = `${engagement.toFixed(2)}%`;
}

// TikTok
function calculateTikTokEarnings(){
  let views = parseFloat(document.getElementById('tikViews').value);
  let cpm = parseFloat(document.getElementById('tikCPM').value);
  if(isNaN(views)||isNaN(cpm)){alert('Enter valid numbers'); return;}
  document.getElementById('tikEarningsResult').innerText = `$${((views/1000)*cpm).toFixed(2)}`;
}

// CPM
function calculateCPM(){
  let cost = parseFloat(document.getElementById('cpmTotalCost').value);
  let impressions = parseFloat(document.getElementById('cpmImpressions').value);
  if(isNaN(cost)||isNaN(impressions)||impressions===0){alert('Enter valid numbers'); return;}
  let cpm = (cost/impressions)*1000;
  document.getElementById('cpmResult').innerText = `$${cpm.toFixed(2)}`;
}

// Affiliate
function calculateAffiliateIncome(){
  let clicks = parseFloat(document.getElementById('affiliateClicks').value);
  let conv = parseFloat(document.getElementById('affiliateConversion').value)/100;
  let commission = parseFloat(document.getElementById('affiliateCommission').value);
  if(isNaN(clicks)||isNaN(conv)||isNaN(commission)){alert('Enter valid numbers'); return;}
  document.getElementById('affiliateResult').innerText = `$${(clicks*conv*commission).toFixed(2)}`;
}

// Brand Deal
function calculateBrandDeal(){
  let rate = parseFloat(document.getElementById('brandRate').value);
  if(isNaN(rate)){alert('Enter valid number'); return;}
  document.getElementById('brandDealResult').innerText = `$${rate.toFixed(2)}`;
}

// Creator ROI
function calculateCreatorROI(){
  let revenue = parseFloat(document.getElementById('roiRevenue').value);
  let cost = parseFloat(document.getElementById('roiCost').value);
  if(isNaN(revenue)||isNaN(cost)||cost===0){alert('Enter valid numbers'); return;}
  let roi = ((revenue-cost)/cost)*100;
  document.getElementById('roiResult').innerText = `${roi.toFixed(2)}%`;
}

// Subscriber Growth
function calculateSubscriberGrowth(){
  let current = parseFloat(document.getElementById('subCurrent').value);
  let monthly = parseFloat(document.getElementById('subMonthly').value);
  let months = parseFloat(document.getElementById('subMonths').value);
  if(isNaN(current)||isNaN(monthly)||isNaN(months)){alert('Enter valid numbers'); return;}
  document.getElementById('subscriberGrowthResult').innerText = `${current + (monthly*months)}`;
}

// Video Profit
function calculateVideoProfit(){
  let revenue = parseFloat(document.getElementById('videoRevenue').value);
  let cost = parseFloat(document.getElementById('videoCost').value);
  if(isNaN(revenue)||isNaN(cost)){alert('Enter valid numbers'); return;}
  document.getElementById('videoProfitResult').innerText = `$${(revenue-cost).toFixed(2)}`;
}

// Influencer Rate
function calculateInfluencerRate(){
  let followers = parseFloat(document.getElementById('influencerFollowers').value);
  let engagement = parseFloat(document.getElementById('influencerEngagement').value)/100;
  if(isNaN(followers)||isNaN(engagement)){alert('Enter valid numbers'); return;}
  let rate = followers*engagement*0.05;
  document.getElementById('influencerRateResult').innerText = `$${rate.toFixed(2)}`;
}
