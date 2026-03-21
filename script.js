document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('ytCalculateBtn').addEventListener('click', function() {
    let views = parseFloat(document.getElementById('ytViews').value);
    let cpm = parseFloat(document.getElementById('ytCPM').value);
    if (isNaN(views) || isNaN(cpm)) { alert('Enter valid numbers'); return; }
    document.getElementById('ytIncomeResult').innerText = `Estimated Monthly Income: $${((views/1000)*cpm).toFixed(2)}`;
  });

  document.getElementById('instaCalculateBtn').addEventListener('click', function() {
    let likes = parseFloat(document.getElementById('instaLikes').value);
    let comments = parseFloat(document.getElementById('instaComments').value);
    let followers = parseFloat(document.getElementById('instaFollowers').value);
    if (isNaN(likes)||isNaN(comments)||isNaN(followers)||followers===0){ alert('Enter valid numbers'); return; }
    document.getElementById('instaEngagementResult').innerText = `Estimated Engagement Rate: ${((likes+comments)/followers*100).toFixed(2)}%`;
  });

  document.getElementById('tikCalculateBtn').addEventListener('click', function() {
    let views = parseFloat(document.getElementById('tikViews').value);
    let cpm = parseFloat(document.getElementById('tikCPM').value);
    if (isNaN(views) || isNaN(cpm)) { alert('Enter valid numbers'); return; }
    document.getElementById('tikEarningsResult').innerText = `Estimated TikTok Earnings: $${((views/1000)*cpm).toFixed(2)}`;
  });

});
