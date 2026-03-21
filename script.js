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

// Finance Calculators
function calculateEMI() {
  const P = parseFloat(document.getElementById('loanAmount').value);
  const R = parseFloat(document.getElementById('interestRate').value)/12/100;
  const N = parseInt(document.getElementById('loanTenure').value);
  const EMI = (P * R * Math.pow(1+R, N))/(Math.pow(1+R, N)-1);
  document.getElementById('emiResult').innerText = 'EMI: ₹' + EMI.toFixed(2);
}
function calculateGST() {
  const amount = parseFloat(document.getElementById('gstAmount').value);
  const rate = parseFloat(document.getElementById('gstRate').value);
  const gst = (amount * rate)/100;
  document.getElementById('gstResult').innerText = 'GST: ₹'+gst.toFixed(2)+', Total: ₹'+(amount+gst).toFixed(2);
}
function calculateSIP() {
  const P = parseFloat(document.getElementById('sipAmount').value);
  const r = parseFloat(document.getElementById('sipRate').value)/100/12;
  const n = parseInt(document.getElementById('sipYears').value)*12;
  const fv = P * (Math.pow(1+r,n)-1)/r*(1+r);
  document.getElementById('sipResult').innerText = 'Future Value: ₹'+fv.toFixed(2);
}
function calculateFD() {
  const P = parseFloat(document.getElementById('fdAmount').value);
  const r = parseFloat(document.getElementById('fdRate').value)/100;
  const t = parseInt(document.getElementById('fdYears').value);
  const amount = P * Math.pow((1+r),t);
  document.getElementById('fdResult').innerText = 'Maturity Amount: ₹'+amount.toFixed(2);
}
function calculateSI() {
  const P = parseFloat(document.getElementById('siPrincipal').value);
  const R = parseFloat(document.getElementById('siRate').value);
  const T = parseFloat(document.getElementById('siTime').value);
  document.getElementById('siResult').innerText = 'Simple Interest: ₹'+((P*R*T)/100).toFixed(2);
}

// Health
function calculateBMI() {
  const w=parseFloat(document.getElementById('weight').value);
  const h=parseFloat(document.getElementById('height').value)/100;
  document.getElementById('bmiResult').innerText='BMI: '+(w/(h*h)).toFixed(2);
}
function calculateCalories() {
  const age=parseFloat(document.getElementById('age').value);
  const w=parseFloat(document.getElementById('bmrWeight').value);
  const h=parseFloat(document.getElementById('bmrHeight').value);
  const activity=parseFloat(document.getElementById('activityLevel').value);
  const bmr=10*w + 6.25*h - 5*age + 5;
  document.getElementById('calorieResult').innerText='Daily Calories: '+(bmr*activity).toFixed(0)+' kcal';
}
function calculateIdealWeight() {
  const h=parseFloat(document.getElementById('idealHeight').value);
  const gender=document.getElementById('gender').value;
  const ideal=gender==='male'?50+0.91*(h-152.4):45.5+0.91*(h-152.4);
  document.getElementById('idealResult').innerText='Ideal Weight: '+ideal.toFixed(2)+' kg';
}

// Math
function calculatePercentage(){
  const total=parseFloat(document.getElementById('percentTotal').value);
  const val=parseFloat(document.getElementById
