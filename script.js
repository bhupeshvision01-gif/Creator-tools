document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('ytCalculateBtn').addEventListener('click', function() {
    let views = parseFloat(document.getElementById('ytViews').value);
    let cpm = parseFloat(document.getElementById('ytCPM').value);
    if(isNaN(views)||isNaN(cpm)){ alert('Enter valid numbers'); return; }
    document.getElementById('ytIncomeResult').innerText = `Estimated Monthly Income: $${((views/1000)*cpm).toFixed(2)}`;
  });

  document.getElementById('instaCalculateBtn').addEventListener('click', function() {
    let likes=parseFloat(document.getElementById('instaLikes').value);
    let comments=parseFloat(document.getElementById('instaComments').value);
    let followers=parseFloat(document.getElementById('instaFollowers').value);
    if(isNaN(likes)||isNaN(comments)||isNaN(followers)||followers===0){ alert('Enter valid numbers'); return; }
    document.getElementById('instaEngagementResult').innerText = `Estimated Engagement Rate: ${((likes+comments)/followers*100).toFixed(2)}%`;
  });

  document.getElementById('tikCalculateBtn').addEventListener('click', function() {
    let views=parseFloat(document.getElementById('tikViews').value);
    let cpm=parseFloat(document.getElementById('tikCPM').value);
    if(isNaN(views)||isNaN(cpm)){ alert('Enter valid numbers'); return; }
    document.getElementById('tikEarningsResult').innerText = `Estimated TikTok Earnings: $${((views/1000)*cpm).toFixed(2)}`;
  });

  document.getElementById('cpmCalculateBtn').addEventListener('click', function() {
    let revenue=parseFloat(document.getElementById('cpmRevenue').value);
    let impressions=parseFloat(document.getElementById('cpmImpressions').value);
    if(isNaN(revenue)||isNaN(impressions)||impressions===0){ alert('Enter valid numbers'); return; }
    document.getElementById('cpmResult').innerText = `Calculated CPM: $${(revenue/(impressions/1000)).toFixed(2)}`;
  });

  document.getElementById('affCalculateBtn').addEventListener('click', function() {
    let clicks=parseFloat(document.getElementById('affClicks').value);
    let conv=parseFloat(document.getElementById('affConversion').value);
    let payout=parseFloat(document.getElementById('affPayout').value);
    if(isNaN(clicks)||isNaN(conv)||isNaN(payout)){ alert('Enter valid numbers'); return; }
    document.getElementById('affResult').innerText = `Estimated Affiliate Income: $${(clicks*(conv/100)*payout).toFixed(2)}`;
  });

  document.getElementById('brandCalculateBtn').addEventListener('click', function() {
    let followers=parseFloat(document.getElementById('brandFollowers').value);
    let rate=parseFloat(document.getElementById('brandRate').value);
    if(isNaN(followers)||isNaN(rate)){ alert('Enter valid numbers'); return; }
    document.getElementById('brandResult').innerText = `Estimated Brand Deal Rate: $${(followers/1000*rate).toFixed(2)}`;
  });

  document.getElementById('roiCalculateBtn').addEventListener('click', function() {
    let revenue=parseFloat(document.getElementById('roiRevenue').value);
    let cost=parseFloat(document.getElementById('roiCost').value);
    if(isNaN(revenue)||isNaN(cost)||cost===0){ alert('Enter valid numbers'); return; }
    document.getElementById('roiResult').innerText = `Estimated ROI: ${((revenue-cost)/cost*100).toFixed(2)}%`;
  });

  document.getElementById('subsCalculateBtn').addEventListener('click', function() {
    let current=parseFloat(document.getElementById('subsCurrent').value);
    let rate=parseFloat(document.getElementById('subsRate').value);
    let months=parseFloat(document.getElementById('subsMonths').value);
    if(isNaN(current)||isNaN(rate)||isNaN(months)){ alert('Enter valid numbers'); return; }
    document.getElementById('subsResult').innerText = `Estimated Subscribers After ${months} Months: ${(current*Math.pow(1+rate/100,months)).toFixed(0)}`;
  });

  document.getElementById('vidCalculateBtn').addEventListener('click', function() {
    let revenue=parseFloat(document.getElementById('vidRevenue').value);
    let cost=parseFloat(document.getElementById('vidCost').value);
    if(isNaN(revenue)||isNaN(cost)){ alert('Enter valid numbers'); return; }
    document.getElementById('vidResult').innerText = `Estimated Video Profit: $${(revenue-cost).toFixed(2)}`;
  });

  document.getElementById('inflCalculateBtn').addEventListener('click', function() {
    let followers=parseFloat(document.getElementById('inflFollowers').value);
    let engagement=parseFloat(document.getElementById('inflEngagement').value);
    let base=parseFloat(document.getElementById('inflBase').value);
    if(isNaN(followers)||isNaN(engagement)||isNaN(base)){ alert('Enter valid numbers'); return; }
    document.getElementById('inflResult').innerText = `Recommended Influencer Rate: $${(followers/1000*base*(engagement/100)).toFixed(2)}`;
  });

});
