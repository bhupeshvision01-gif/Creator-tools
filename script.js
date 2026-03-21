document.addEventListener('DOMContentLoaded', function() {

  // ----- TAB SWITCHING -----
  document.querySelectorAll('.tab-link').forEach(button => {
    button.addEventListener('click', () => {
      let tab = button.getAttribute('data-tab');
      document.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(tab).classList.add('active');
    });
  });

  // ----- CREATOR CALCULATORS -----
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

  // ----- FINANCE CALCULATORS -----
  document.getElementById('loanCalculateBtn').addEventListener('click', function() {
    let P = parseFloat(document.getElementById('loanAmount').value);
    let annualRate = parseFloat(document.getElementById('loanRate').value);
    let N = parseFloat(document.getElementById('loanTenure').value);
    if(isNaN(P)||isNaN(annualRate)||isNaN(N)||N===0){ alert('Enter valid numbers'); return; }
    let R = annualRate/(12*100);
    let EMI = (P*R*Math.pow(1+R,N))/(Math.pow(1+R,N)-1);
    document.getElementById('loanResult').innerText = `Estimated EMI: $${EMI.toFixed(2)}`;
  });

  document.getElementById('ciCalculateBtn').addEventListener('click', function() {
    let P = parseFloat(document.getElementById('ciPrincipal').value);
    let r = parseFloat(document.getElementById('ciRate').value)/100;
    let t = parseFloat(document.getElementById('ciTime').value);
    let n = parseFloat(document.getElementById('ciFrequency').value);
    if(isNaN(P)||isNaN(r)||isNaN(t)||isNaN(n)||n===0){ alert('Enter valid numbers'); return; }
    let A = P*Math.pow(1+r/n,n*t);
    document.getElementById('ciResult').innerText = `Estimated Amount: $${A.toFixed(2)}`;
  });

  document.getElementById('savCalculateBtn').addEventListener('click', function() {
    let P = parseFloat(document.getElementById('savMonthly').value);
    let r = parseFloat(document.getElementById('savRate').value)/100/12;
    let n = parseFloat(document.getElementById('savYears').value)*12;
    if(isNaN(P)||isNaN(r)||isNaN(n)){ alert('Enter valid numbers'); return; }
    let FV = P*((Math.pow(1+r,n)-1)/r);
    document.getElementById('savResult').innerText = `Estimated Future Value: $${FV.toFixed(2)}`;
  });

  document.getElementById('invCalculateBtn').addEventListener('click', function() {
    let P = parseFloat(document.getElementById('invPrincipal').value);
    let r = parseFloat(document.getElementById('invRate').value)/100;
    let t = parseFloat(document.getElementById('invYears').value);
    if(isNaN(P)||isNaN(r)||isNaN(t)){ alert('Enter valid numbers'); return; }
    let FV = P*Math.pow(1+r,t);
    document.getElementById('invResult').innerText = `Estimated Future Value: $${FV.toFixed(2)}`;
  });

  document.getElementById('retCalculateBtn').addEventListener('click', function() {
    let P = parseFloat(document.getElementById('retCurrent').value);
    let PMT = parseFloat(document.getElementById('retMonthly').value);
    let r = parseFloat(document.getElementById('retRate').value)/100/12;
    let n = parseFloat(document.getElementById('retYears').value)*12;
    if(isNaN(P)||isNaN(PMT)||isNaN(r)||isNaN(n)){ alert('Enter valid numbers'); return; }
    let FV = P*Math.pow(1+r,n) + PMT*((Math.pow(1+r,n)-1)/r);
    document.getElementById('retResult').innerText = `Estimated Retirement Savings: $${FV.toFixed(2)}`;
  });

});
