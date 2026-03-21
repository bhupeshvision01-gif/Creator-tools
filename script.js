// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function(){

  // Tab navigation
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

// --- Finance ---
function calculateEMI(){
  const P = parseFloat(document.getElementById('loanAmount').value);
  const R = parseFloat(document.getElementById('interestRate').value)/12/100;
  const N = parseInt(document.getElementById('loanTenure').value);
  if(isNaN(P)||isNaN(R)||isNaN(N)){ alert('Enter valid numbers'); return; }
  const EMI = (P*R*Math.pow(1+R,N))/(Math.pow(1+R,N)-1);
  document.getElementById('emiResult').innerText = 'EMI: ₹'+EMI.toFixed(2);
}

// --- Health ---
function calculateBMI(){
  const w=parseFloat(document.getElementById('weight').value);
  const h=parseFloat(document.getElementById('height').value)/100;
  if(isNaN(w)||isNaN(h)){ alert('Enter valid numbers'); return; }
  document.getElementById('bmiResult').innerText = 'BMI: '+(w/(h*h)).toFixed(2);
}

// --- Math ---
function calculatePercentage(){
  const total=parseFloat(document.getElementById('percentTotal').value);
  const val=parseFloat(document.getElementById('percentValue').value);
  if(isNaN(total)||isNaN(val)){ alert('Enter valid numbers'); return; }
  document.getElementById('percentResult').innerText = 'Percentage: '+((val/total)*100).toFixed(2)+'%';
}

// --- Unit ---
function convertTemperature(){
  const v=parseFloat(document.getElementById('tempInput').value);
  const u=document.getElementById('tempUnit').value;
  if(isNaN(v)){ alert('Enter valid number'); return; }
  let r;
  if(u==='C') r=v+' °C';
  else if(u==='F') r=(v*9/5+32).toFixed(2)+' °F';
  else if(u==='K') r=(v+273.15).toFixed(2)+' K';
  document.getElementById('tempResult').innerText='Converted: '+r;
}

// --- Utility ---
function comparePrices(){
  const p1=parseFloat(document.getElementById('price1').value);
  const p2=parseFloat(document.getElementById('price2').value);
  const p3=parseFloat(document.getElementById('price3').value);
  if(isNaN(p1)||isNaN(p2)||isNaN(p3)){ alert('Enter valid numbers'); return; }
  const min = Math.min(p1,p2,p3);
  document.getElementById('priceResult').innerText='Cheapest Price: ₹'+min;
}
