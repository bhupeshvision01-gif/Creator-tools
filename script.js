/**
 * CreatorProfitLab 2026 - Master Application Script
 * Features: Dynamic SEO, SPA Routing, AdSense Ready, 52+ Tool Support
 */

// 1. DATABASE: Tool Definitions
const TOOLS = [
    { id: 'yt-income', name: 'YouTube Revenue', cat: 'Creator', desc: 'Net income after 45% platform cut', formula: 'Views * (CPM/1000) * 0.55', inputs: [{l:'Monthly Views', v:100000, id:'v'}, {l:'CPM ($)', v:4, id:'cpm'}] },
    { id: 'emi-calc', name: 'Loan EMI', cat: 'Finance', desc: 'Equated Monthly Installment plan', formula: 'P * r * (1+r)^n / ((1+r)^n - 1)', inputs: [{l:'Loan Amount', v:50000, id:'p'}, {l:'Interest %', v:8.5, id:'r'}, {l:'Years', v:5, id:'n'}] },
    { id: 'ig-eng', name: 'IG Engagement', cat: 'Creator', desc: 'Engagement rate based on reach', formula: '(Engagements / Reach) * 100', inputs: [{l:'Likes + Saves', v:1200, id:'e'}, {l:'Total Reach', v:25000, id:'r'}] },
    { id: 'bmi-calc', name: 'BMI Calculator', cat: 'Health', desc: 'Body Mass Index (Metric)', formula: 'Weight / (Height/100)^2', inputs: [{l:'Weight (kg)', v:70, id:'w'}, {l:'Height (cm)', v:175, id:'h'}] },
    { id: 'roi-calc', name: 'Business ROI', cat: 'Business', desc: 'Return on Investment percentage', formula: '((Gain - Cost) / Cost) * 100', inputs: [{l:'Total Gain ($)', v:5000, id:'g'}, {l:'Total Cost ($)', v:2000, id:'c'}] }
    // Add your remaining 47 tools here following this exact structure
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

function init() {
    const params = new URLSearchParams(window.location.search);
    const toolId = params.get('id');
    
    if (toolId) {
        const tool = TOOLS.find(t => t.id === toolId);
        if (tool) renderTool(tool);
        else renderGrid();
    } else {
        renderGrid();
    }
}

// 4. RENDERING LOGIC
function setCat(cat) {
    currentCat = cat;
    window.activeTool = null;
    document.getElementById('toolSearch').value = "";
    document.getElementById('hero-wrapper').style.display = "block";
    
    // Clear URL parameter when going back to home
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
    // SYNC URL & SEO (Crucial for AdSense & Google Ranking)
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

        // Formatting results based on category
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

// 6. UTILITIES (Search, Content, etc)
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
    // Update Title for legal pages
    document.title = type.charAt(0).toUpperCase() + type.slice(1) + " | CreatorProfitLab";
}

// 7. INITIALIZE
window.onload = init;
