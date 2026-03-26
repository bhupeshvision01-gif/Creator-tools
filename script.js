const DATABASE = [
    // --- CREATOR SECTION ---
    { id: 'youtubeincomecalculator', name: 'YouTube Income', cat: 'Creator', type: 'calc', inputs: ['Monthly Views', 'RPM ($)'], calc: (i) => (i[0]/1000)*i[1], seo: 'Estimate total YouTube take-home pay.' },
    { id: 'youtubecpmcalculator', name: 'YouTube CPM', cat: 'Creator', type: 'calc', inputs: ['Cost ($)', 'Views'], calc: (i) => (i[0]/i[1])*1000, seo: 'Calculate Cost Per Mille for advertisers.' },
    { id: 'youtuberpmcalculator', name: 'YouTube RPM', cat: 'Creator', type: 'calc', inputs: ['Earnings ($)', 'Views'], calc: (i) => (i[0]/i[1])*1000, seo: 'Revenue Per Mille for creators.' },
    { id: 'youtubeshortscalculator', name: 'Shorts Fund Calc', cat: 'Creator', type: 'calc', inputs: ['Shorts Views', 'RPM (0.01-0.07)'], calc: (i) => (i[0]/1000)*i[1], seo: 'Estimate YouTube Shorts revenue.' },
    { id: 'instagramengagementcalculator', name: 'IG Engagement', cat: 'Creator', type: 'calc', inputs: ['Interactions', 'Followers'], calc: (i) => (i[0]/i[1])*100, seo: 'Standard Instagram engagement rate.' },
    { id: 'tiktokearningscalculator', name: 'TikTok Rewards', cat: 'Creator', type: 'calc', inputs: ['Qualified Views', 'RPM ($)'], calc: (i) => (i[0]/1000)*i[1], seo: 'TikTok Creator Rewards Program estimator.' },
    { id: 'influencerratecalculator', name: 'Influencer Rate', cat: 'Creator', type: 'calc', inputs: ['Followers', 'Rate Per 1k'], calc: (i) => (i[0]/1000)*i[1], seo: 'Estimate what to charge for a post.' },
    { id: 'affiliateincomecalculator', name: 'Affiliate Income', cat: 'Creator', type: 'calc', inputs: ['Clicks', 'Conv %', 'Commission ($)'], calc: (i) => i[0]*(i[1]/100)*i[2], seo: 'Project affiliate marketing earnings.' },
    { id: 'creatorroicalculator', name: 'Creator ROI', cat: 'Creator', type: 'calc', inputs: ['Sponsorship ($)', 'Production Cost ($)'], calc: (i) => ((i[0]-i[1])/i[1])*100, seo: 'Net profit on content creation.' },
    { id: 'videoprofitcalculator', name: 'Video Profit', cat: 'Creator', type: 'calc', inputs: ['Total Rev ($)', 'Expenses ($)'], calc: (i) => i[0]-i[1], seo: 'Simple video production net profit.' },
    { id: 'podcastrevenuecalculator', name: 'Podcast Revenue', cat: 'Creator', type: 'calc', inputs: ['Downloads', 'Ad CPM ($)'], calc: (i) => (i[0]/1000)*i[1], seo: 'Estimate podcast sponsorship income.' },
    { id: 'newsletterrevenuecalculator', name: 'Newsletter Rev', cat: 'Creator', type: 'calc', inputs: ['Subscribers', 'Sponsorship ($)'], calc: (i) => i[0]*(i[1]/1000), seo: 'Calculate email newsletter earnings.' },
    { id: 'digitalproductrevenuecalculator', name: 'Digital Product', cat: 'Creator', type: 'calc', inputs: ['Traffic', 'Conv %', 'Price ($)'], calc: (i) => i[0]*(i[1]/100)*i[2], seo: 'Project sales for courses/ebooks.' },

    // --- FINANCE SECTION ---
    { id: 'emicalculator', name: 'EMI Calculator', cat: 'Finance', type: 'calc', inputs: ['Principal', 'Rate %', 'Years'], calc: (i) => { let r=i[1]/12/100, n=i[2]*12; return (i[0]*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1); }, seo: 'Standard monthly loan repayment.' },
    { id: 'loancalculator', name: 'Total Loan Cost', cat: 'Finance', type: 'calc', inputs: ['Principal', 'Rate %', 'Years'], calc: (i) => { let r=i[1]/12/100, n=i[2]*12; let emi=(i[0]*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1); return (emi*n)-i[0]; }, seo: 'Total interest paid over loan life.' },
    { id: 'compoundinterestcalculator', name: 'Compound Interest', cat: 'Finance', type: 'calc', inputs: ['Principal', 'Rate %', 'Years'], calc: (i) => i[0]*Math.pow((1+i[1]/100), i[2]), seo: 'Long term investment growth.' },
    { id: 'sipcalculator', name: 'SIP Calculator', cat: 'Finance', type: 'calc', inputs: ['Monthly Invest', 'Rate %', 'Years'], calc: (i) => { let r=i[1]/12/100, n=i[2]*12; return i[0]*((Math.pow(1+r,n)-1)/r)*(1+r); }, seo: 'Systematic Investment Plan growth.' },
    { id: 'retirementcalculator', name: 'Retirement Fund', cat: 'Finance', type: 'calc', inputs: ['Current Savings', 'Monthly Cont', 'Years'], calc: (i) => i[0] + (i[1]*12*i[2]), seo: 'Project future retirement savings.' },
    { id: 'creditcardinterestcalculator', name: 'CC Interest', cat: 'Finance', type: 'calc', inputs: ['Balance ($)', 'APR %'], calc: (i) => (i[0]*(i[1]/100))/12, seo: 'Monthly credit card interest cost.' },
    { id: 'debtpayoffcalculator', name: 'Debt Payoff', cat: 'Finance', type: 'calc', inputs: ['Debt Amount', 'Monthly Payment'], calc: (i) => i[0]/i[1], seo: 'Months required to be debt free.' },
    { id: 'profitmargincalculator', name: 'Profit Margin', cat: 'Finance', type: 'calc', inputs: ['Cost ($)', 'Sell Price ($)'], calc: (i) => ((i[1]-i[0])/i[1])*100, seo: 'Business net margin percentage.' },

    // --- BUSINESS SECTION ---
    { id: 'roicalculator', name: 'Marketing ROI', cat: 'Business', type: 'calc', inputs: ['Revenue ($)', 'Ad Cost ($)'], calc: (i) => ((i[0]-i[1])/i[1])*100, seo: 'Return on marketing investment.' },
    { id: 'cpmcalculator', name: 'Ad CPM', cat: 'Business', type: 'calc', inputs: ['Total Spend ($)', 'Impressions'], calc: (i) => (i[0]/i[1])*1000, seo: 'Cost per 1000 impressions.' },
    { id: 'cpccalculator', name: 'Ad CPC', cat: 'Business', type: 'calc', inputs: ['Total Spend ($)', 'Clicks'], calc: (i) => i[0]/i[1], seo: 'Cost per single click.' },
    { id: 'conversionratecalculator', name: 'Conv. Rate %', cat: 'Business', type: 'calc', inputs: ['Conversions', 'Total Visitors'], calc: (i) => (i[0]/i[1])*100, seo: 'Website conversion efficiency.' },
    { id: 'caccalculator', name: 'CAC Calculator', cat: 'Business', type: 'calc', inputs: ['Marketing Spend', 'New Customers'], calc: (i) => i[0]/i[1], seo: 'Customer Acquisition Cost.' },
    { id: 'costperleadcalculator', name: 'CPL Calculator', cat: 'Business', type: 'calc', inputs: ['Ad Spend', 'Leads Generated'], calc: (i) => i[0]/i[1], seo: 'Cost per lead generated.' },
    { id: 'marketingbudgetcalculator', name: 'Marketing Budget', cat: 'Business', type: 'calc', inputs: ['Target Revenue', 'Ideal %'], calc: (i) => i[0]*(i[1]/100), seo: 'Suggested ad spend budget.' },
    { id: 'revenuegrowthcalculator', name: 'Revenue Growth', cat: 'Business', type: 'calc', inputs: ['New Rev', 'Old Rev'], calc: (i) => ((i[0]-i[1])/i[1])*100, seo: 'Percentage growth over time.' },

    // --- HEALTH SECTION ---
    { id: 'bmicalculator', name: 'BMI Calc', cat: 'Health', type: 'calc', inputs: ['Weight (kg)', 'Height (cm)'], calc: (i) => i[0]/((i[1]/100)**2), seo: 'Body Mass Index health check.' },
    { id: 'bmrcalculator', name: 'BMR (Basal)', cat: 'Health', type: 'calc', inputs: ['Weight (kg)', 'Height (cm)', 'Age'], calc: (i) => (10*i[0]) + (6.25*i[1]) - (5*i[2]) + 5, seo: 'Basal Metabolic Rate.' },
    { id: 'caloriecalculator', name: 'Daily Calories', cat: 'Health', type: 'calc', inputs: ['BMR', 'Activity (1.2-1.9)'], calc: (i) => i[0]*i[1], seo: 'Maintenance calorie needs.' },
    { id: 'bodyfatcalculator', name: 'Body Fat %', cat: 'Health', type: 'calc', inputs: ['Waist (cm)', 'Neck (cm)', 'Height'], calc: (i) => 495/(1.03-0.19*Math.log10(i[0]-i[1]) + 0.15*Math.log10(i[2]))-450, seo: 'Estimate body fat percentage.' },
    { id: 'waterintakecalculator', name: 'Water Intake', cat: 'Health', type: 'calc', inputs: ['Weight (kg)'], calc: (i) => i[0]*0.033, seo: 'Recommended daily water (L).' },
    { id: 'proteinintakecalculator', name: 'Protein Needs', cat: 'Health', type: 'calc', inputs: ['Weight (kg)', 'Goal (1.2-2.2)'], calc: (i) => i[0]*i[1], seo: 'Daily protein grams required.' },
    { id: 'macrocalculator', name: 'Macros (Fat)', cat: 'Health', type: 'calc', inputs: ['Total Cals', '% Fat Goal'], calc: (i) => (i[0]*(i[1]/100))/9, seo: 'Grams of fat needed per day.' },
    { id: 'targetheartratecalculator', name: 'Heart Rate', cat: 'Health', type: 'calc', inputs: ['Age', 'Intensity %'], calc: (i) => (220-i[0])*(i[1]/100), seo: 'Target BPM for exercise.' },

    // --- UTILITY SECTION ---
    { id: 'percentagecalculator', name: '% Calculator', cat: 'Utility', type: 'calc', inputs: ['Is What %', 'Of This'], calc: (i) => (i[0]/i[1])*100, seo: 'General percentage solver.' },
    { id: 'agecalculator', name: 'Age in Days', cat: 'Utility', type: 'calc', inputs: ['Years Old'], calc: (i) => i[0]*365, seo: 'Convert age to days.' },
    { id: 'timedurationcalculator', name: 'Time to Min', cat: 'Utility', type: 'calc', inputs: ['Hours'], calc: (i) => i[0]*60, seo: 'Quick hour to minute converter.' },
    { id: 'discountcalculator', name: 'Discount Calc', cat: 'Utility', type: 'calc', inputs: ['Original Price', 'Off %'], calc: (i) => i[0]-(i[0]*(i[1]/100)), seo: 'Calculate sale price.' },
    { id: 'unitconverter', name: 'Km to Miles', cat: 'Utility', type: 'calc', inputs: ['Kilometers'], calc: (i) => i[0]*0.621371, seo: 'Simple distance converter.' },

    // --- BLOGS & LEGAL ---
    { id: 'youtubecpmguide', name: 'CPM Guide', cat: 'Blog', type: 'blog', content: '<h2>Understanding CPM</h2><p>CPM stands for Cost Per Mille (thousand). It represents how much an advertiser pays for 1,000 views on your video.</p>' },
    { id: 'youtubeincomeguide', name: 'Income Guide', cat: 'Blog', type: 'blog', content: '<h2>YouTube Pay Structures</h2><p>Creators earn through Adsense, sponsorships, and affiliate links.</p>' },
    { id: 'influencerpricingguide', name: 'Pricing Guide', cat: 'Blog', type: 'blog', content: '<h2>What to Charge</h2><p>Pricing depends on engagement rates and niche authority.</p>' },
    { id: 'terms-of-service', name: 'Terms of Service', cat: 'Blog', type: 'blog', content: '<h3>Accuracy</h3><p>Results are estimations only. Consult a professional for financial advice.</p>' },
    { id: 'about-us', name: 'The Lab Story', cat: 'Blog', type: 'blog', content: '<h3>The Mission</h3><p>We provide cold, hard data for the creator economy.</p>' },
    { id: 'privacy-policy', name: 'Privacy & Cookies', cat: 'Blog', type: 'blog', content: '<h3>Data Collection</h3><p>We do not store your calculation data. Processing is local.</p>' }
];

// --- NAVIGATION CORE ---
function handleRouting() {
    const hash = window.location.hash.replace('#', '');
    
    // Reset views
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('calculator-view').style.display = 'none';
    document.getElementById('blog-view').style.display = 'none';

    if (!hash || hash === "") {
        showHomeView();
    } else {
        const item = DATABASE.find(x => x.id === hash);
        if (item) {
            item.type === 'calc' ? renderCalc(item) : renderBlog(item);
        } else {
            showHomeView();
        }
    }

    // SPA AdSense Refresh
    try {
        (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) { console.info("AdSense readying..."); }
}

function showHomeView() {
    document.getElementById('home-view').style.display = 'block';
    document.title = "CreatorProfitLab | 100+ Professional Tools";
    renderGrid(DATABASE.filter(i => i.type === 'calc')); // Show all calcs on home
}

function renderGrid(data) {
    const container = document.getElementById('main-grid');
    if (data.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 50px;">No results found.</div>`;
        return;
    }
    container.innerHTML = data.map(i => `
        <a href="#${i.id}" class="card">
            <div class="card-cat">${i.cat} ${i.type === 'blog' ? '• Guide' : ''}</div>
            <h3>${i.name}</h3>
        </a>`).join('');
}

function renderCalc(item) {
    document.getElementById('calculator-view').style.display = 'block';
    document.title = `${item.name} | CreatorProfitLab`;
    
    let html = `<h1 style="font-family:'Lexend'; margin-bottom:10px;">${item.name}</h1>
                <p style="color:var(--text-light); margin-bottom: 25px;">${item.seo}</p>
                <div class="input-grid">`;
    
    item.inputs.forEach((l, idx) => {
        html += `<div class="input-group"><label>${l}</label>
                 <input type="number" id="v-${idx}" value="100" oninput="runMath('${item.id}')"></div>`;
    });
    
    html += `</div><div class="result-card"><small>Calculated Result</small><h2 id="res">--</h2></div>`;
    
 function injectAd(parentId) {
    const container = document.getElementById(parentId);
    if (!container) return;

    // 1. Create the HTML for the ad
    container.innerHTML = `
        <div class="adsbygoogle-debug-container">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
                 data-ad-slot="YOUR_SLOT_ID"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        </div>
    `;

    // 2. Try to push the ad
    try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log("AdSense: Push successful.");
    } catch (e) {
        console.error("AdSense: Push failed!", e);
    }

    // 3. The "Ghost Check" - runs 3 seconds later
    setTimeout(() => {
        const adStatus = container.querySelector('ins').getAttribute('data-ad-status');
        const adHeight = container.querySelector('ins').clientHeight;

        if (adHeight === 0) {
            console.warn("DEBUG: Ad container is 0px tall. Check parent CSS!");
        }
        
        if (adStatus === 'unfilled') {
            console.log("DEBUG: Code is perfect, but Google has no ads for you right now (Common for new sites).");
        } else if (adStatus === 'filled') {
            console.log("DEBUG: Ad should be visible now!");
        }
    }, 3000);
}
    
    document.getElementById('calc-content').innerHTML = html;
    runMath(item.id);
    window.scrollTo(0,0);
}

function renderBlog(item) {
    document.getElementById('blog-view').style.display = 'block';
    document.title = `${item.name} | CreatorProfitLab`;
    document.getElementById('blog-content').innerHTML = `
        <h1 style="font-family:'Lexend'; margin-bottom: 25px;">${item.name}</h1>
        <div class="blog-body" style="font-size: 1.1rem; line-height: 1.8;">${item.content}</div>`;
    window.scrollTo(0,0);
}

function runMath(id) {
    const item = DATABASE.find(x => x.id === id);
    if (!item) return;
    const inputs = item.inputs.map((_, idx) => parseFloat(document.getElementById(`v-${idx}`).value) || 0);
    const result = item.calc(inputs);
    const display = document.getElementById('res');
    
    const formatted = result.toLocaleString(undefined, { maximumFractionDigits: 2 });

    // Formatting Logic
    const isMoney = ['Finance', 'Creator'].includes(item.cat) && !item.id.includes('engagement') && !item.id.includes('rate');
    const isPercent = item.id.includes('engagement') || item.id.includes('roi') || item.id.includes('growth') || item.id.includes('percentage');

    if (isMoney) display.innerText = "$" + formatted;
    else if (isPercent) display.innerText = formatted + "%";
    else display.innerText = formatted;
}

function filterCat(cat) {
    window.location.hash = ""; // Return home
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if(event) event.target.classList.add('active');

    const filtered = (cat === 'All') ? DATABASE.filter(i => i.type === 'calc') : 
                     (cat === 'Blog') ? DATABASE.filter(i => i.cat === 'Blog') :
                     DATABASE.filter(i => i.cat === cat);
    renderGrid(filtered);
}

function doSearch() {
    const q = document.getElementById('searchBar').value.toLowerCase();
    const results = DATABASE.filter(i => i.name.toLowerCase().includes(q) || i.cat.toLowerCase().includes(q));
    renderGrid(results);
}

// Init
window.addEventListener('hashchange', handleRouting);
window.onload = handleRouting;
