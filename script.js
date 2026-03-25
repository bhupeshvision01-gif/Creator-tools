// 1. Add the SEO Content Database
const SEO_DATA = {
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
