/**
 * CreatorProfitLab 2026 - Master Application Script
 * Features: Deep-Linking Fix, Dynamic SEO, SPA Routing, AdSense Ready
 */

const DATABASE = [
        // --- PREVIOUS CREATOR TOOLS ---
        { 
            id: 'yt-revenue-calculator', 
            name: 'YouTube Money Calculator', 
            cat: 'Creator', 
            type: 'calc', 
            inputs: ['Monthly Views', 'Estimated RPM ($)'], 
            calc: (i) => (i[0] / 1000) * i[1],
            content: `<h2>How to Calculate Your YouTube Earnings</h2><p>In 2026, YouTube revenue is driven by <strong>RPM (Revenue Per Mille)</strong>. This metric represents how much you earn for every 1,000 views after YouTube takes its 45% share of ad revenue.</p><h2>Factors That Influence Your Pay</h2><ul><li><strong>Niche:</strong> High-ticket niches like Finance and SaaS can see RPMs over $20.</li><li><strong>Audience Location:</strong> Views from the USA, UK, and Canada pay 5x more than Tier 3 countries.</li><li><strong>Watch Time:</strong> Longer videos allow for mid-roll ads, significantly boosting revenue.</li></ul>`
        },
        { 
            id: 'ig-engagement-calculator', 
            name: 'Instagram Engagement Rate', 
            cat: 'Creator', 
            type: 'calc', 
            inputs: ['Total Likes + Comments', 'Follower Count'], 
            calc: (i) => (i[0] / i[1]) * 100,
            content: `<h2>Why Engagement Rate Matters More Than Followers</h2><p>Brands in 2026 look for <strong>Authentic Influence</strong>. An account with 10k followers and a 5% engagement rate is more valuable than an account with 100k followers and a 0.5% rate.</p><h2>The Standard Formula</h2><p>We use the industry-standard formula: <strong>(Total Actions / Followers) x 100</strong>. A "Good" rate for influencers typically falls between 2% and 5%.</p>`
        },

        // --- NEW BUSINESS & MARKETING TOOLS ---
        { 
            id: 'marketing-roi-calculator', 
            name: 'Marketing ROI Calculator', 
            cat: 'Business', 
            type: 'calc', 
            inputs: ['Total Revenue ($)', 'Marketing Cost ($)'], 
            calc: (i) => ((i[0] - i[1]) / i[1]) * 100,
            content: `<h2>Calculating Your Marketing ROI</h2><p>Return on Investment (ROI) is the ultimate metric for business growth. It measures the profit you generate relative to the money you spend on advertising.</p><h2>What is a Good Marketing ROI?</h2><p>A 5:1 ratio is considered strong for most industries. This means for every $1 spent, you generate $5 in revenue. Understanding your ROI helps you decide whether to scale your ads or pivot your strategy.</p>`
        },
        { 
            id: 'cpc-advertising-calculator', 
            name: 'CPC (Cost Per Click) Calc', 
            cat: 'Business', 
            type: 'calc', 
            inputs: ['Total Ad Spend ($)', 'Total Clicks Received'], 
            calc: (i) => i[0] / i[1],
            content: `<h2>Optimizing Your CPC Strategy</h2><p>Cost Per Click (CPC) determines the efficiency of your paid traffic. In 2026, high competition in search ads means tracking your CPC daily is essential for maintaining a healthy margin.</p><h2>How to Lower Your CPC</h2><ul><li><strong>Improve Quality Score:</strong> Ensure your landing page matches your ad copy perfectly.</li><li><strong>A/B Testing:</strong> Test different headlines to increase your Click-Through Rate (CTR).</li><li><strong>Negative Keywords:</strong> Filter out irrelevant traffic to ensure you only pay for high-intent clicks.</li></ul>`
        },
        { 
            id: 'affiliate-income-forecaster', 
            name: 'Affiliate Income Forecaster', 
            cat: 'Business', 
            type: 'calc', 
            inputs: ['Monthly Clicks', 'Conversion Rate (%)', 'Avg. Commission ($)'], 
            calc: (i) => i[0] * (i[1] / 100) * i[2],
            content: `<h2>Forecasting Your Affiliate Profits</h2><p>Affiliate marketing is the backbone of passive income for creators. By forecasting your earnings, you can identify which products are worth your promotion time.</p><h2>The Profit Formula</h2><p>Success in affiliate marketing isn't just about traffic; it's about <strong>Conversion</strong>. If you have 1,000 clicks but a 0% conversion rate, you earn nothing. Focus on "Problem-Solution" content to drive higher conversion rates.</p>`
        },

        // --- PREVIOUS FINANCE & HEALTH TOOLS ---
        { 
            id: 'emi-calculator', 
            name: 'Loan EMI Calculator', 
            cat: 'Finance', 
            type: 'calc', 
            inputs: ['Principal Amount', 'Interest Rate (%)', 'Tenure (Years)'], 
            calc: (i) => { 
                let r = i[1]/12/100; let n = i[2]*12; 
                return (i[0] * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1); 
            },
            content: `<h2>Understanding Your Monthly Loan Payments</h2><p>EMI stands for Equated Monthly Installment. It is the fixed amount you pay back to a lender every month until the loan is fully paid off.</p>`
        },
        { 
            id: 'sip-investment-calculator', 
            name: 'SIP Return Calculator', 
            cat: 'Finance', 
            type: 'calc', 
            inputs: ['Monthly Investment', 'Expected Return (%)', 'Time Period (Years)'], 
            calc: (i) => { 
                let r = i[1]/12/100; let n = i[2]*12; 
                return i[0] * ((Math.pow(1+r, n) - 1) / r) * (1+r); 
            },
            content: `<h2>The Power of Compounding</h2><p>Systematic Investment Plans (SIP) allow you to invest small amounts regularly. Over time, the <strong>Compounding Effect</strong> turns small savings into massive wealth.</p>`
        },
        { 
            id: 'bmi-calculator', 
            name: 'BMI Health Calculator', 
            cat: 'Health', 
            type: 'calc', 
            inputs: ['Weight (kg)', 'Height (cm)'], 
            calc: (i) => i[0] / ((i[1]/100)**2),
            content: `<h2>Is Your Weight in the Healthy Range?</h2><p>Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is <strong>kg/m²</strong>.</p>`
        },
        // SEO BLOGS
        { 
            id: 'how-much-youtube-pays', 
            name: 'How Much YouTube Pays Per 1000 Views', 
            cat: 'Blog', 
            type: 'blog', 
            content: `<h2>The 2026 YouTube Economy Breakdown</h2><p>In 2026, YouTube remains the gold standard for long-form monetization. On average, creators earn $3.00 to $7.00 per 1,000 views.</p>` 
        }
    ];

// 2. DATABASE: SEO & Legal Content
const SEO_DATA = {
    about: `<h1>Precision Tools for the Digital Frontier</h1>
            <p class="strong-line">In 2026, data isn't just a metric; it's your primary currency. <strong>CreatorProfitLab</strong> was engineered to bridge the gap between creative intuition and financial reality.</p>
            <h3>Why Thousands of Creators Trust Us:</h3>
            <ul>
                <li><strong>Algorithmic Accuracy:</strong> Updated quarterly for platform API changes.</li>
                <li><strong>Zero-Data Footprint:</strong> All calculations stay in your browser.</li>
                <li><strong>SaaS-Grade UI:</strong> Distraction-free environment.</li>
            </ul>`,

    privacy: `<h1>Privacy Policy</h1>
            <p>At <strong>CreatorProfitLab</strong>, we prioritize visitor privacy. We use <strong>Google AdSense</strong> which may use cookies. All tool data is processed client-side and never stored on our servers.</p>`,

    terms: `<h1>Terms of Service & Disclaimer</h1>
            <div class="cta-box" style="border-left: 4px solid #ef4444;">
                <strong>Notice:</strong> Tools are for <strong>informational purposes only</strong>. We do not provide professional financial, legal, or medical advice.
            </div>`,

    contact: `<h1>Direct Support</h1>
              <p>Contact us for custom tools or technical support.</p>
              <div class="cta-box">
                <p><strong>General:</strong> hello@creatorprofitlab.com</p>
                <p><strong>Dev:</strong> dev@creatorprofitlab.com</p>
              </div>`,
    
    'yt-income': `<h3>How to Increase YouTube Revenue</h3><p>Focus on <strong>High-CPM niches</strong> like Finance and Tech. Adding mid-roll ads on videos over 8 minutes can increase RPM by up to 35%.</p>`,
    'emi-calc': `<h3>Understanding Your Loan EMI</h3><p>In the early years, interest is highest. A 10% increase in monthly payments can save thousands over a 20-year tenure.</p>`,
    'ig-eng': `<h3>2026 IG Benchmarks</h3><p>In 2026, 2%–5% is healthy. Brands now prioritize <strong>Saves</strong> and <strong>Shares</strong> over Likes.</p>`,
    'bmi-calc': `<h3>BMI and Your Health Goals</h3><p>BMI assesses weight categories but doesn't account for muscle mass. Use with our BMR calculator for best results.</p>`,
    'roi-calc': `<h3>Calculating Marketing ROI</h3><p>A 3:1 ratio (earning $3 for every $1 spent) is the baseline for sustainable scaling.</p>`
};

// 3. APP STATE & NAVIGATION
let currentCat = "All";
window.activeTool = null;

/**
 * FIXED INIT: Handles deep-linking and hero visibility
 */
function init() {
    const params = new URLSearchParams(window.location.search);
    const toolId = params.get('id');
    const hero = document.getElementById('hero-wrapper');
    
    if (toolId) {
        const tool = TOOLS.find(t => t.id === toolId);
        if (tool) {
            if(hero) hero.style.display = "none"; 
            renderTool(tool);
            return; 
        }
    } 
    renderGrid();
}

// 4. RENDERING LOGIC
function setCat(cat) {
    currentCat = cat;
    window.activeTool = null;
    document.getElementById('toolSearch').value = "";
    document.getElementById('hero-wrapper').style.display = "block";
    
    window.history.pushState({}, '', window.location.pathname);
    renderGrid();
}

function renderGrid() {
    const view = document.getElementById('view');
    const filtered = currentCat === "All" ? TOOLS : TOOLS.filter(t => t.cat === currentCat);
    
    view.innerHTML = `
        <div class="grid">
            ${filtered.map(t => `
                <div class="card" onclick='renderTool(${JSON.stringify(t).replace(/'/g, "&apos;")})'>
                    <div class="card-cat">${t.cat}</div>
                    <h3>${t.name}</h3>
                    <p>${t.desc}</p>
                </div>
            `).join('')}
        </div>`;
    document.title = "CreatorProfitLab | 50+ Professional SaaS Calculators";
}

function renderTool(t) {
    // SYNC URL & SEO
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?id=${t.id}`;
    window.history.pushState({path:newUrl}, '', newUrl);
    document.title = `${t.name} Calculator | CreatorProfitLab 2026`;
    
    const view = document.getElementById('view');
    const seoText = SEO_DATA[t.id] || `<h3>About ${t.name}</h3><p>Professional ${t.cat} analysis tool calibrated for 2026 benchmarks.</p>`;

    view.innerHTML = `
        <div class="calc-main">
            <div class="ad-placeholder" style="margin-bottom:20px;">
                <small>SPONSORED ANALYSIS</small>
                <div id="ad-top-slot"></div> 
            </div>

            <div class="back-link" onclick="setCat('All')">← Back to Tools</div>
            <h1>${t.name}</h1>
            <p style="color:var(--text-muted); margin-bottom:20px;">${t.desc}</p>
            
            <div class="formula-box">📊 Formula: ${t.formula.replace(/\*/g,'×').replace(/\//g,'÷')}</div>
            
            ${t.inputs.map(i => `
                <div class="input-group">
                    <label>${i.l}</label>
                    <input type="number" id="${i.id}" value="${i.v}" oninput="calc()">
                </div>`).join('')}

            <div class="result-box">
                <small>VERIFIED 2026 PROJECTION</small>
                <h2 id="res">--</h2>
            </div>

            <div class="ad-placeholder" style="margin-top:25px; background:#fffbe8; border:1px dashed #eab308;">
                <small>ADVERTISEMENT</small>
                <div id="ad-result-slot"></div>
            </div>

            <div class="content-page" style="margin-top:40px; padding:0; border:none;">
                <hr style="border:0; border-top:1px solid var(--border); margin-bottom:30px;">
                ${seoText}
                <div class="cta-box">
                    <strong>Expert Insight:</strong> This calculation is based on 2026 ${t.cat} industry standards.
                </div>
            </div>

            <div style="margin-top:40px;">
                <h4 style="margin-bottom:15px; font-size:0.9rem; text-transform:uppercase; color:var(--text-muted);">Related Tools</h4>
                <div class="grid" style="grid-template-columns: 1fr 1fr; gap:15px;">
                    ${TOOLS.filter(item => item.cat === t.cat && item.id !== t.id).slice(0, 2).map(rt => `
                        <div class="card" style="padding:15px; min-height:auto;" onclick='renderTool(${JSON.stringify(rt).replace(/'/g, "&apos;")})'>
                            <small style="font-weight:700;">${rt.name} →</small>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>`;
    
    window.activeTool = t;
    calc();
    window.scrollTo(0,0);
}

// 5. CALCULATION ENGINE
function calc() {
    if (!window.activeTool) return;
    const t = window.activeTool;
    let res = 0;

    try {
        if (t.id === 'yt-income') {
            const v = parseFloat(document.getElementById('v').value) || 0;
            const c = parseFloat(document.getElementById('cpm').value) || 0;
            res = (v * (c/1000)) * 0.55;
        } 
        else if (t.id === 'emi-calc') {
            const p = parseFloat(document.getElementById('p').value) || 0;
            const r = (parseFloat(document.getElementById('r').value) || 0) / 12 / 100;
            const n = (parseFloat(document.getElementById('n').value) || 0) * 12;
            res = n > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;
        } 
        else if (t.id === 'ig-eng') {
            const e = parseFloat(document.getElementById('e').value) || 0;
            const r = parseFloat(document.getElementById('r').value) || 1;
            res = (e / r) * 100;
        } 
        else if (t.id === 'bmi-calc') {
            const w = parseFloat(document.getElementById('w').value) || 0;
            const h = (parseFloat(document.getElementById('h').value) || 1) / 100;
            res = w / (h * h);
        } 
        else if (t.id === 'roi-calc') {
            const g = parseFloat(document.getElementById('g').value) || 0;
            const c = parseFloat(document.getElementById('c').value) || 1;
            res = ((g - c) / c) * 100;
        }

        const display = document.getElementById('res');
        if (t.cat === 'Finance' || t.id.includes('income')) {
            display.innerText = "$" + res.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        } else if (t.id.includes('eng') || t.id.includes('roi')) {
            display.innerText = res.toFixed(2) + "%";
        } else {
            display.innerText = res.toFixed(2);
        }
    } catch (err) {
        console.error("Calculation Error", err);
    }
}

// 6. UTILITIES
function doSearch() {
    const q = document.getElementById('toolSearch').value.toLowerCase();
    const hero = document.getElementById('hero-wrapper');
    const view = document.getElementById('view');
    
    if (q.length > 0) {
        if(hero) hero.style.display = "none";
        const filtered = TOOLS.filter(t => t.name.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q));
        view.innerHTML = `<div class="grid">${filtered.map(t => `
            <div class="card" onclick='renderTool(${JSON.stringify(t).replace(/'/g, "&apos;")})'>
                <div class="card-cat">${t.cat}</div>
                <h3>${t.name}</h3>
                <p>${t.desc}</p>
            </div>`).join('')}</div>`;
    } else {
        if(hero) hero.style.display = "block";
        renderGrid();
    }
}

function renderContent(type) {
    document.getElementById('hero-wrapper').style.display = "none";
    const view = document.getElementById('view');
    view.innerHTML = `<div class="content-page">${SEO_DATA[type]}</div>`;
    window.scrollTo(0,0);
    document.title = type.charAt(0).toUpperCase() + type.slice(1) + " | CreatorProfitLab";
}

// 7. INITIALIZE
window.onload = init;


// This ensures that when the page loads (or refreshes), 
// the routing engine immediately identifies the correct tool to show.
window.addEventListener('DOMContentLoaded', () => {
    handleRouting();
});

// Update the handleItemClick to ensure it pushes the state correctly
function handleItemClick(id) {
    window.history.pushState({id: id}, '', `/${id}`);
    handleRouting();
}
