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

// Creator Calculators
function calculateYouTubeIncome(){
  let views = parseFloat(document.getElementById('ytViews').value);
  let cpm = parseFloat(document.getElementById('ytCPM').value);
  if(isNaN(views)||isNaN(cpm)){alert('Enter valid numbers'); return;}
  document.getElementById('ytIncomeResult').innerText = `$${((views/1000)*cpm).toFixed(2)}`;
}

function calculateInstagramEngagement(){
  let likes=parseFloat(document.getElementById('instaLikes').value);
  let comments=parseFloat(document.getElementById('instaComments').value);
  let followers=parseFloat(document.getElementById('instaFollowers').value);
  if(isNaN(likes)||isNaN(comments)||isNaN(followers)||followers===0){alert('Enter valid numbers');return;}
  document.getElementById('instaEngagementResult').innerText = `${((likes+comments)/followers*100).toFixed(2)}%`;
}

function calculateTikTokEarnings(){
  let views=parseFloat(document.getElementById('tikViews').value);
  let cpm=parseFloat(document.getElementById('tikCPM').value);
  if(isNaN(views)||isNaN(cpm)){alert('Enter valid numbers');return;}
  document.getElementById('tikEarningsResult').innerText = `$${((views/1000)*cpm).toFixed(2)}`;
}

// Remaining 7 creator calculators functions go here (CPM, Affiliate, Brand Deal, ROI, Subscriber, Video Profit, Influencer Rate)
