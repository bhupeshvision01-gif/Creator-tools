document.addEventListener('DOMContentLoaded', function() {

  // ---------------- TAB SWITCHING ----------------
  document.querySelectorAll('.tab-link').forEach(button => {
    button.addEventListener('click', () => {
      let tab = button.getAttribute('data-tab');
      document.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(tab).classList.add('active');
    });
  });

  // ---------------- CREATOR CALCULATORS ----------------
  // YouTube Income
  document.getElementById('ytCalculateBtn').addEventListener('click', function() {
    let views = parseFloat(document.getElementById('ytViews').value);
    let cpm = parseFloat(document.getElementById('ytCPM').value);
    if(isNaN(views)||isNaN(cpm)){ alert('Enter valid numbers'); return; }
    document.getElementById('ytIncomeResult').innerText = `Estimated Monthly Income: $${((views/1000)*cpm).toFixed(2)}`;
  });

  // Instagram Engagement
  document.getElementById('instaCalculateBtn').addEventListener('click', function() {
    let likes=parseFloat(document.getElementById('instaLikes').value);
    let comments=parseFloat(document.getElementById('instaComments').value);
    let followers=parseFloat(document.getElementById('instaFollowers').value);
    if(isNaN(likes)||isNaN(comments)||isNaN(followers)||followers===0){ alert('Enter valid numbers'); return; }
    document.getElementById('instaEngagementResult').innerText = `Estimated Engagement Rate: ${((likes+comments)/followers*100).toFixed(2)}%`;
  });

  // TikTok Earnings
  document.getElementById('tikCalculateBtn').addEventListener('click', function() {
    let views=parseFloat(document.getElementById('tikViews').value);
    let cpm=parseFloat(document.getElementById('tikCPM').value);
    if(isNaN(views)||isNaN(cpm)){ alert('Enter valid numbers'); return; }
    document.getElementById('tikEarningsResult').innerText = `Estimated TikTok Earnings: $${((views/1000)*cpm).toFixed(2)}`;
  });

  // CPM Calculator
  document.getElementById('cpmCalculateBtn').addEventListener('click', function() {
    let revenue=parseFloat(document.getElementById('cpmRevenue').value);
    let impressions=parseFloat(document.getElementById('cpmImpressions').value);
    if(isNaN(revenue)||isNaN(impressions)||impressions===0){ alert('Enter valid numbers'); return; }
    document.getElementById('cpmResult').innerText = `Calculated CPM: $${(revenue/(impressions/1000)).toFixed(2)}`;
  });

  // Affiliate Income
  document.getElementById('affCalculateBtn').addEventListener('click', function() {
    let clicks=parseFloat(document.getElementById('affClicks').value);
    let conv=parseFloat(document.getElementById('affConversion').value);
    let payout=parseFloat(document.getElementById('affPayout').value);
    if(isNaN(clicks)||isNaN(conv)||isNaN(payout)){ alert('Enter valid numbers'); return; }
    document.getElementById('affResult').innerText = `Estimated Affiliate Income: $${(clicks*(conv/100)*payout).toFixed(2)}`;
  });

  // Brand Deal
  document.getElementById('brandCalculateBtn').addEventListener('click', function() {
    let followers=parseFloat(document.getElementById('brandFollowers').value);
    let rate=parseFloat(document.getElementById('brandRate').value);
    if(isNaN(followers)||isNaN(rate)){ alert('Enter valid numbers'); return; }
    document.getElementById('brandResult').innerText = `Estimated Brand Deal Rate: $${(followers/1000*rate).toFixed(2)}`;
  });

  // Creator ROI
  document.getElementById('roiCalculateBtn').addEventListener('click', function() {
    let revenue=parseFloat(document.getElementById('roiRevenue').value);
    let cost=parseFloat(document.getElementById('roiCost').value);
    if(isNaN(revenue)||isNaN(cost)||cost===0){ alert('Enter valid numbers'); return; }
    document.getElementById('roiResult').innerText = `Estimated ROI: ${((revenue-cost)/cost*100).toFixed(2)}%`;
  });

  // Subscriber Growth
  document.getElementById('subsCalculateBtn').addEventListener('click', function() {
    let current=parseFloat(document.getElementById('subsCurrent').value);
    let rate=parseFloat(document.getElementById('subsRate').value);
    let months=parseFloat(document.getElementById('subsMonths').value);
    if(isNaN(current)||isNaN(rate)||isNaN(months)){ alert('Enter valid numbers'); return; }
    document.getElementById('subsResult').innerText = `Estimated Subscribers After ${months} Months: ${(current*Math.pow(1+rate/100,months)).toFixed(0)}`;
  });

  // Video Profit
  document.getElementById('vidCalculateBtn').addEventListener('click', function() {
    let revenue=parseFloat(document.getElementById('vidRevenue').value);
    let cost=parseFloat(document.getElementById('vidCost').value);
    if(isNaN(revenue)||isNaN(cost)){ alert('Enter valid numbers'); return; }
    document.getElementById('vidResult').innerText = `Estimated Video Profit: $${(revenue-cost).toFixed(2)}`;
  });

  // Influencer Rate
  document.getElementById('inflCalculateBtn').addEventListener('click', function() {
    let followers=parseFloat(document.getElementById('inflFollowers').value);
    let engagement=parseFloat(document.getElementById('inflEngagement').value);
    let base=parseFloat(document.getElementById('inflBase').value);
    if(isNaN(followers)||isNaN(engagement)||isNaN(base)){ alert('Enter valid numbers'); return; }
    document.getElementById('inflResult').innerText = `Recommended Influencer Rate: $${(followers/1000*base*(engagement/100)).toFixed(2)}`;
  });

  // ---------------- FINANCE CALCULATORS ----------------
  document.getElementById('loanCalculateBtn').addEventListener('click', function() {
    let P=parseFloat(document.getElementById('loanAmount').value);
    let rate=parseFloat(document.getElementById('loanRate').value)/12/100;
    let n=parseFloat(document.getElementById('loanTenure').value);
    if(isNaN(P)||isNaN(rate)||isNaN(n)||n===0){ alert('Enter valid numbers'); return; }
    let EMI=(P*rate*Math.pow(1+rate,n))/(Math.pow(1+rate,n)-1);
    document.getElementById('loanResult').innerText=`Estimated EMI: $${EMI.toFixed(2)}`;
  });

  document.getElementById('ciCalculateBtn').addEventListener('click', function() {
    let P=parseFloat(document.getElementById('ciPrincipal').value);
    let r=parseFloat(document.getElementById('ciRate').value)/100;
    let t=parseFloat(document.getElementById('ciTime').value);
    let n=parseFloat(document.getElementById('ciFrequency').value);
    if(isNaN(P)||isNaN(r)||isNaN(t)||isNaN(n)||n===0){ alert('Enter valid numbers'); return; }
    let A=P*Math.pow(1+r/n,n*t);
    document.getElementById('ciResult').innerText=`Estimated Amount: $${A.toFixed(2)}`;
  });

  document.getElementById('savCalculateBtn').addEventListener('click', function() {
    let P=parseFloat(document.getElementById('savMonthly').value);
    let r=parseFloat(document.getElementById('savRate').value)/100/12;
    let n=parseFloat(document.getElementById('savYears').value)*12;
    if(isNaN(P)||isNaN(r)||isNaN(n)){ alert('Enter valid numbers'); return; }
    let FV=P*((Math.pow(1+r,n)-1)/r);
    document.getElementById('savResult').innerText=`Estimated Future Value: $${FV.toFixed(2)}`;
  });

  document.getElementById('invCalculateBtn').addEventListener('click', function() {
    let P=parseFloat(document.getElementById('invPrincipal').value);
    let r=parseFloat(document.getElementById('invRate').value)/100;
    let t=parseFloat(document.getElementById('invYears').value);
    if(isNaN(P)||isNaN(r)||isNaN(t)){ alert('Enter valid numbers'); return; }
    let FV=P*Math.pow(1+r,t);
    document.getElementById('invResult').innerText=`Estimated Future Value: $${FV.toFixed(2)}`;
  });

  document.getElementById('retCalculateBtn').addEventListener('click', function() {
    let P=parseFloat(document.getElementById('retCurrent').value);
    let PMT=parseFloat(document.getElementById('retMonthly').value);
    let r=parseFloat(document.getElementById('retRate').value)/100/12;
    let n=parseFloat(document.getElementById('retYears').value)*12;
    if(isNaN(P)||isNaN(PMT)||isNaN(r)||isNaN(n)){ alert('Enter valid numbers'); return; }
    let FV=P*Math.pow(1+r,n)+PMT*((Math.pow(1+r,n)-1)/r);
    document.getElementById('retResult').innerText=`Estimated Retirement Savings: $${FV.toFixed(2)}`;
  });

  // ---------------- HEALTH CALCULATORS ----------------
  // 1️⃣ BMI
  document.getElementById('bmiCalculateBtn').addEventListener('click', function() {
    let w=parseFloat(document.getElementById('bmiWeight').value);
    let h=parseFloat(document.getElementById('bmiHeight').value)/100;
    if(isNaN(w)||isNaN(h)||h===0){ alert('Enter valid numbers'); return; }
    document.getElementById('bmiResult').innerText=`Estimated BMI: ${(w/(h*h)).toFixed(2)}`;
  });

  // 2️⃣ BMR
  document.getElementById('bmrCalculateBtn').addEventListener('click', function() {
    let w=parseFloat(document.getElementById('bmrWeight').value);
    let h=parseFloat(document.getElementById('bmrHeight').value);
    let a=parseFloat(document.getElementById('bmrAge').value);
    let g=document.getElementById('bmrGender').value;
    if(isNaN(w)||isNaN(h)||isNaN(a)){ alert('Enter valid numbers'); return; }
    let BMR = g==='male'? (10*w+6.25*h-5*a+5):(10*w+6.25*h-5*a-161);
    document.getElementById('bmrResult').innerText=`Estimated BMR: ${BMR.toFixed(2)} kcal/day`;
  });

  // 3️⃣ Body Fat %
  document.getElementById('bfCalculateBtn').addEventListener('click', function() {
    let w=parseFloat(document.getElementById('bfWeight').value);
    let waist=parseFloat(document.getElementById('bfWaist').value);
    let neck=parseFloat(document.getElementById('bfNeck').value);
    let hip=parseFloat(document.getElementById('bfHip').value);
    let g=document.getElementById('bfGender').value;
    if(isNaN(w)||isNaN(waist)||isNaN(neck)|| (g==='female' && isNaN(hip)) ){ alert('Enter valid numbers'); return; }
    let bf = g==='male'? (495/(1.0324-0.19077*Math.log10(waist-neck)+0.15456*Math.log10(h)))-450
                         : (495/(1.29579-0.35004*Math.log10(waist+hip-neck)+0.22100*Math.log10(h)))-450;
    document.getElementById('bfResult').innerText=`Estimated Body Fat: ${bf.toFixed(2)}%`;
  });

  // 4️⃣ Ideal Weight
  document.getElementById('iwCalculateBtn').addEventListener('click', function() {
    let h=parseFloat(document.getElementById('iwHeight').value);
    let g=document.getElementById('iwGender').value;
    if(isNaN(h)){ alert('Enter valid numbers'); return; }
    let iw = g==='male'? h-100 : h-100-5;
    document.getElementById('iwResult').innerText=`Estimated Ideal Weight: ${iw} kg`;
  });

  // 5️⃣ Calorie Needs
  document.getElementById('calCalculateBtn').addEventListener('click', function() {
    let w=parseFloat(document.getElementById('calWeight').value);
    let h=parseFloat(document.getElementById('calHeight').value);
    let a=parseFloat(document.getElementById('calAge').value);
    let g=document.getElementById('calGender').value;
    let activity=parseFloat(document.getElementById('calActivity').value);
    if(isNaN(w)||isNaN(h)||isNaN(a)||isNaN(activity)){ alert('Enter valid numbers'); return; }
    let BMR = g==='male'? (10*w+6.25*h-5*a+5):(10*w+6.25*h-5*a-161);
    document.getElementById('calResult').innerText=`Daily Calorie Needs: ${Math.round(BMR*activity)} kcal/day`;
  });

  // 6️⃣ Waist-to-Hip Ratio
  document.getElementById('whrCalculateBtn').addEventListener('click', function() {
    let waist=parseFloat(document.getElementById('whrWaist').value);
    let hip=parseFloat(document.getElementById('whrHip').value);
    if(isNaN(waist)||isNaN(hip)||hip===0){ alert('Enter valid numbers'); return; }
    document.getElementById('whrResult').innerText=`Waist-to-Hip Ratio: ${(waist/hip).toFixed(2)}`;
  });

  // 7️⃣ Water Intake
  document.getElementById('waterCalculateBtn').addEventListener('click', function() {
    let w=parseFloat(document.getElementById('waterWeight').value);
    if(isNaN(w)){ alert('Enter valid numbers'); return; }
    document.getElementById('waterResult').innerText=`Recommended Water Intake: ${(w*0.033).toFixed(2)} L/day`;
  });

  // 8️⃣ Heart Rate Zone
  document.getElementById('hrCalculateBtn').addEventListener('click', function() {
    let a=parseFloat(document.getElementById('hrAge').value);
    if(isNaN(a)){ alert('Enter valid numbers'); return; }
    let maxHR = 220-a;
    document.getElementById('hrResult').innerText=`Target Heart Rate Zone: ${Math.round(maxHR*0.5)}-${Math.round(maxHR*0.85)} bpm`;
  });

  // 9️⃣ Body Surface Area
  document.getElementById('bsaCalculateBtn').addEventListener('click', function() {
    let w=parseFloat(document.getElementById('bsaWeight').value);
    let h=parseFloat(document.getElementById('bsaHeight').value);
    if(isNaN(w)||isNaN(h)){ alert('Enter valid numbers'); return; }
    let BSA=Math.sqrt((h*w)/3600);
    document.getElementById('bsaResult').innerText=`Estimated Body Surface Area: ${BSA.toFixed(2)} m²`;
  });

  // 🔟 Protein Intake
  document.getElementById('protCalculateBtn').addEventListener('click', function() {
    let w=parseFloat(document.getElementById('protWeight').value);
    let act=parseFloat(document.getElementById('protActivity').value);
    if(isNaN(w)||isNaN(act)){ alert('Enter valid numbers'); return; }
    document.getElementById('protResult').innerText=`Recommended Protein Intake: ${(w*act).toFixed(2)} g/day`;
  });

});
