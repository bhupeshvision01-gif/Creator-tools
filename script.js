/**
 * CreatorProfitLab 2026 - Master Application Script
 * Features: Deep-Linking Fix, Dynamic SEO, SPA Routing, AdSense Ready
 */

// 1. DATABASE: Tool Definitions

const TOOLS = [
    { 
        id: 'yt-1000-views', 
        name: 'How Much YouTube Pays Per 1000 Views', 
        cat: 'Creator', 
        type: 'calc', 
        inputs: ['Total Views', 'Average RPM ($)'], 
        calc: (i) => (i[0] / 1000) * i[1],
        blog: `<h2>YouTube Pay Per 1000 Views in 2026</h2><p>YouTube earnings are measured by <strong>RPM (Revenue Per Mille)</strong>. While CPM is what advertisers pay, RPM is what you keep after YouTube's 45% cut. High-paying niches like Finance can see $15+, while gaming may see $2.</p>`
    },
    { 
        id: 'yt-cpm-rpm', 
        name: 'YouTube CPM vs RPM Explained', 
        cat: 'Creator', 
        type: 'calc', 
        inputs: ['Ad Revenue ($)', 'Views'], 
        calc: (i) => (i[0] / i[1]) * 1000,
        blog: `<h2>The Difference Between CPM and RPM</h2><p><strong>CPM</strong> is the Cost Per 1,000 ad impressions. <strong>RPM</strong> is your total revenue (including memberships and super chats) divided by total views. RPM is the only metric that truly reflects your take-home pay.</p>`
    },
    { 
        id: 'yt-shorts-mon', 
        name: 'How YouTube Shorts Monetization Works', 
        cat: 'Creator', 
        type: 'calc', 
        inputs: ['Shorts Views', 'Ad Pool Share %'], 
        calc: (i) => (i[0] * 0.00005) * (i[1]/100),
        blog: `<h2>Shorts Ad Revenue Sharing</h2><p>Shorts revenue is pooled and distributed based on your share of total views and music usage. In 2026, expect roughly $0.04 to $0.07 per 1,000 views.</p>`
    },
    { 
        id: 'brand-deal-price', 
        name: 'How Influencers Price Brand Deals', 
        cat: 'Creator', 
        type: 'calc', 
        inputs: ['Avg. Views', 'Target CPE ($)'], 
        calc: (i) => i[0] * i[1],
        blog: `<h2>Pricing Your Influence</h2><p>Most agencies use <strong>CPE (Cost Per Engagement)</strong> or a flat fee based on 20% of your average views. Don't forget to charge extra for usage rights and exclusivity!</p>`
    },
    { 
        id: 'ig-eng-rate', 
        name: 'Instagram Engagement Rate Explained', 
        cat: 'Creator', 
        type: 'calc', 
        inputs: ['Total Likes + Comments', 'Followers'], 
        calc: (i) => (i[0] / i[1]) * 100,
        blog: `<h2>What is a Good Engagement Rate?</h2><p>For accounts under 10k followers, 3% is average. For large accounts, 1% is standard. Brands value engagement over follower count because it proves your audience is real.</p>`
    },
    { 
        id: 'tk-creator-fund', 
        name: 'How TikTok Creator Fund Works', 
        cat: 'Creator', 
        type: 'calc', 
        inputs: ['Qualified Views'], 
        calc: (i) => (i[0] / 1000) * 0.03,
        blog: `<h2>TikTok Creativity Program Pay</h2><p>The "Creator Fund" has evolved. Qualified views (1-minute+ videos) now pay significantly more—up to $1.00 per 1,000 views—compared to the original pennies-per-view model.</p>`
    },
    { 
        id: 'affiliate-income', 
        name: 'Affiliate Marketing Income Guide', 
        cat: 'Creator', 
        type: 'calc', 
        inputs: ['Link Clicks', 'Conversion Rate %', 'Commission ($)'], 
        calc: (i) => i[0] * (i[1]/100) * i[2],
        blog: `<h2>Scaling Affiliate Income</h2><p>Affiliate marketing success depends on <strong>Trust</strong>. Higher conversion rates come from honest reviews and "problem-solution" content rather than spamming links.</p>`
    },
    { 
        id: 'creators-money-online', 
        name: 'How Creators Make Money Online', 
        cat: 'Creator', 
        type: 'calc', 
        inputs: ['Ad Revenue', 'Sponsorships', 'Digital Products'], 
        calc: (i) => i[0] + i[1] + i[2],
        blog: `<h2>The Multiple Streams of Income</h2><p>Top creators never rely on one source. A healthy creator business is split: 30% Ads, 40% Brand Deals, and 30% Direct-to-Consumer (Courses, Merch, Newsletters).</p>`
    },
    { 
        id: 'best-platforms', 
        name: 'Best Platforms for Creator Monetization', 
        cat: 'Creator', 
        type: 'calc', 
        inputs: ['Audience Size', 'Monetization Score (1-10)'], 
        calc: (i) => i[0] * i[1],
        blog: `<h2>Where Should You Post?</h2><p>YouTube is best for long-term passive income. TikTok is best for rapid growth. Newsletter platforms like Substack are best for direct ownership of your audience.</p>`
    },
    { 
        id: 'calc-influencer-rates', 
        name: 'How to Calculate Influencer Rates', 
        cat: 'Creator', 
        type: 'calc', 
        inputs: ['Base Fee ($)', 'Production Cost ($)', 'Platform Multiplier'], 
        calc: (i) => (i[0] + i[1]) * i[2],
        blog: `<h2>Professional Rate Calculation</h2><p>Calculate your rate by adding: <strong>Base Fee (Time) + Production Costs (Gear/Edits) + Usage Rights</strong>. Multiply by platform difficulty (YouTube = 1.5x, IG = 1.0x).</p>`
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
