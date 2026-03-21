// Tab Switching
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

// --- Creator Calculators ---
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
  let conv = parseFloat(document.getElementById('affiliateConversion').value)/100;
  let commission = parseFloat(document.getElementById('affiliateCommission').value);
  if(isNaN(clicks)||isNaN(conv)||isNaN(commission)){alert('Enter valid numbers'); return;}
  document.getElementById('affiliateResult').innerText = `$${(clicks*conv*commission).toFixed(2)}`;
}
function calculateBrandDeal(){
  let rate = parseFloat(document.getElementById('brandRate').value);
  if(isNaN(rate)){alert('Enter valid number'); return;}
  document.getElementById('brandDealResult').innerText = `$${rate.toFixed(2)}`;
}
function calculateSubscriberGrowth(){
  let current = parseFloat(document.getElementById('subCurrent').value);
  let monthly = parseFloat(document.getElementById('subMonthly').value);
  let months = parseFloat(document.getElementById('subMonths').value);
  if(isNaN(current)||isNaN(monthly)||isNaN(months)){alert('Enter valid numbers'); return;}
  document.getElementById('subscriberGrowthResult').innerText = `${current + (monthly*months)}`;
}

// --- Finance Calculators ---
function calculateEMI(){
  let P = parseFloat(document.getElementById('loanAmount').value);
  let R = parseFloat(document.getElementById('loanRate').value)/12/100;
  let N = parseFloat(document.getElementById('loanYears').value)*12;
  if(isNaN(P)||isNaN(R)||isNaN(N)){alert('Enter valid numbers'); return;}
  let emi = P*R*Math.pow(1+R,N)/(Math.pow(1+R,N)-1);
  document.getElementById('loanEMIResult').innerText = `$${emi.toFixed(2)}/month`;
}
function calculateCompoundInterest(){
  let P = parseFloat(document.getElementById('ciPrincipal').value);
  let r = parseFloat(document.getElementById('ciRate').value)/100;
  let n = parseFloat(document.getElementById('ciTimes').value);
  let t = parseFloat(document.getElementById('ciYears').value);
  if(isNaN(P)||isNaN(r)||isNaN(n)||isNaN(t)){alert('Enter valid numbers'); return;}
  let A = P * Math.pow(1+r/n,n*t);
  document.getElementById('ciResult').innerText = `$${A.toFixed(2)}`;
}
function calculateSimpleInterest(){
  let P = parseFloat(document.getElementById('siPrincipal').value);
  let R = parseFloat(document.getElementById('siRate').value);
  let T = parseFloat(document.getElementById('siYears').value);
  if(isNaN(P)||isNaN(R)||isNaN(T)){alert('Enter valid numbers'); return;}
  let SI = P*R*T/100;
  document.getElementById('siResult').innerText = `$${SI.toFixed(2)}`;
}
