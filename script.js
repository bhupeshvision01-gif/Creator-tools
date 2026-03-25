// 1. Add the SEO Content Database
const SEO_DATA = {

// --- STRONG BRAND LINES (About Page) ---
    about: `<h1>Precision Tools for the Digital Frontier</h1>
            <p class="strong-line">In 2026, data isn't just a metric; it's your primary currency. <strong>CreatorProfitLab</strong> was engineered to bridge the gap between creative intuition and financial reality.</p>
            
            <h3>Why Thousands of Creators Trust Us:</h3>
            <ul>
                <li><strong>Algorithmic Accuracy:</strong> Our formulas are updated quarterly to reflect the latest platform API changes and economic shifts.</li>
                <li><strong>Zero-Data Footprint:</strong> We believe your financial data belongs to you. No server-side storage, no tracking, just pure calculation.</li>
                <li><strong>SaaS-Grade UI:</strong> We've removed the clutter of traditional "calculator sites" to give you a distraction-free environment.</li>
            </ul>
            <div class="cta-box">"Stop guessing your growth. Start calculating your success."</div>`,

    // --- ADSENSE MANDATORY: PRIVACY POLICY ---
    privacy: `<h1>Privacy Policy</h1>
            <p>At <strong>CreatorProfitLab</strong>, accessible from creatorprofitlab.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CreatorProfitLab and how we use it.</p>
            
            <h3>Log Files & Cookies</h3>
            <p>CreatorProfitLab follows a standard procedure of using log files. These files log visitors when they visit websites. We use <strong>Google AdSense</strong> which may use cookies to serve ads based on your prior visits. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads">Google Ads Settings</a>.</p>
            
            <h3>Calculated Data</h3>
            <p><strong>Crucial:</strong> All calculations are performed client-side using JavaScript. We do not store, see, or transmit any numerical data you enter into our tools to our servers.</p>`,

    // --- ADSENSE MANDATORY: TERMS & DISCLAIMER ---
    terms: `<h1>Terms of Service & Disclaimer</h1>
            <p>By using this website, you agree to the following terms. If you do not agree, please exit the site immediately.</p>
            
            <h3>Financial & Health Disclaimer</h3>
            <div class="cta-box" style="border-left-color: #ef4444;">
                <strong>Strong Legal Notice:</strong> The calculators provided on CreatorProfitLab are for <strong>informational and educational purposes only</strong>. We do not provide professional financial, legal, or medical advice.
            </div>
            
            <h3>Accuracy of Information</h3>
            <p>While we strive for 100% mathematical precision, CreatorProfitLab is not responsible for any financial losses, health issues, or business decisions made based on the results of our tools. Always consult with a certified professional (CPA, Doctor, or Lawyer) before making significant life or business changes.</p>`,

    contact: `<h1>Direct Support</h1>
              <p>Need a custom calculator developed for your agency? Or found a bug in our system?</p>
              <div class="cta-box">
                <p><strong>General Inquiries:</strong> hello@creatorprofitlab.com</p>
                <p><strong>Technical Support:</strong> dev@creatorprofitlab.com</p>
              </div>`,
    
    
    'yt-income': `<h3>How to Increase YouTube Revenue</h3><p>To maximize your 2026 earnings, focus on <strong>High-CPM niches</strong> like Finance, Technology, and Business. Our YouTube Income Calculator uses the latest platform algorithms to estimate your take-home pay after the 45% platform cut. Adding mid-roll ads on videos over 8 minutes can increase your RPM by up to 35%.</p>`,
    'emi-calc': `<h3>Understanding Your Loan EMI</h3><p>Your Equated Monthly Installment (EMI) consists of both principal and interest. In the early years of a loan, the interest component is higher. Use our calculator to plan your prepayments—even a 10% increase in monthly payments can save you thousands in interest over a 20-year tenure.</p>`,
    'ig-eng': `<h3>What is a Good Engagement Rate?</h3><p>For influencers in 2026, an engagement rate between 2% and 5% is considered healthy. Brands now prioritize <strong>Saves</strong> and <strong>Shares</strong> over Likes. Our tool calculates engagement based on reach to give you the most accurate media kit data.</p>`,
    'bmi-calc': `<h3>BMI and Your Health Goals</h3><p>The Body Mass Index is a standard measurement used by healthcare providers to assess weight categories. While useful, it doesn't account for muscle mass. Use this in conjunction with our BMR calculator to determine your daily caloric maintenance levels.</p>`,
    'roi-calc': `<h3>Calculating Marketing ROI</h3><p>Return on Investment is the ultimate metric for business success. A "Good" ROI depends on your industry, but a 3:1 ratio (earning $3 for every $1 spent) is generally the baseline for a sustainable scaling strategy.</p>`
};

// 2. Updated renderTool Function with Ads & SEO
function renderTool(t) {
    const view = document.getElementById('view');
    const seoText = SEO_DATA[t.id] || `<h3>About the ${t.name}</h3><p>This professional tool helps you calculate ${t.desc} with high precision using verified 2026 industry formulas.</p>`;

    view.innerHTML = `
        <div class="calc-main">
            <div class="ad-placeholder" style="margin-bottom:20px;">
                <small>Sponsored Content</small>
                <div id="ad-top-slot"></div> 
                </div>

            <div class="back-link" onclick="navigate('')">← Back to ${t.cat}</div>
            <h1>${t.name}</h1>
            <div class="formula-box">📊 Formula: ${t.formula.replace(/\*/g,'×').replace(/\//g,'÷')}</div>
            
            ${t.inputs.map(i => `
                <div class="input-group">
                    <label>${i.l}</label>
                    <input type="number" id="${i.id}" value="${i.v}" oninput="calc()">
                </div>`).join('')}

            <div class="result-box">
                <small>CALCULATED RESULT</small>
                <h2 id="res">--</h2>
            </div>

            <div class="ad-placeholder" style="margin-top:25px; background:#fffbe8; border:1px dashed #eab308;">
                <div id="ad-result-slot">
                   <p style="font-size:11px; color:#854d0e;">ADSense: Below Result Placement</p>
                </div>
            </div>

            <div class="content-page" style="margin-top:40px; padding:0; border:none;">
                <hr style="border:0; border-top:1px solid var(--border); margin-bottom:30px;">
                ${seoText}
                <div class="cta-box">
                    <strong>Pro Tip:</strong> Bookmark this tool for your weekly ${t.cat} tracking.
                </div>
            </div>

            <div style="margin-top:40px;">
                <h4>Related ${t.cat}</h4>
                <div class="grid" style="grid-template-columns: 1fr 1fr; margin-top:10px;">
                    ${TOOLS.filter(item => item.cat === t.cat && item.id !== t.id).slice(0, 2).map(rt => `
                        <div class="card" style="padding:15px;" onclick="navigate('id=${rt.id}')">
                            <small>${rt.name}</small>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>`;
    
    window.activeTool = t;
    calc();
    // Initializing Ads (if using Auto-Ads or manual push)
    // (adsbygoogle = window.adsbygoogle || []).push({});
}


function updateMeta(title) {
    document.title = title + " | CreatorProfitLab";
    // This makes the browser history "clean" for Google
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?id=" + (window.activeTool ? window.activeTool.id : "");
    window.history.pushState({path:newUrl},'',newUrl);
}
