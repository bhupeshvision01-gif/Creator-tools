/**
 * CreatorProfitLab 2026 - Master Application Script
 * Features: Deep-Linking Fix, Dynamic SEO, SPA Routing, AdSense Ready
 */

const DATABASE = [
    // --- CREATOR TOOLS ---
    { 
        id: 'youtubeincomecalculator', 
        name: 'YouTube Income Calculator', 
        cat: 'Creator', 
        type: 'calc', 
        inputs: ['Monthly Views', 'RPM ($)'], 
        calc: (i) => (i[0]/1000)*i[1], 
        seo: 'Estimate YouTube take-home pay with 2026 RPM benchmarks.' 
    },
    { 
        id: 'instagramengagementcalculator', 
        name: 'Instagram Engagement Rate', 
        cat: 'Creator', 
        type: 'calc', 
        inputs: ['Likes + Comments', 'Followers'], 
        calc: (i) => (i[0]/i[1])*100, 
        seo: 'Analyze account health using the industry-standard engagement formula.' 
    },
    { 
        id: 'tiktokearningscalculator', 
        name: 'TikTok Earnings Calculator', 
        cat: 'Creator', 
        type: 'calc', 
        inputs: ['Qualified Views'], 
        calc: (i) => (i[0]/1000)*0.90, 
        seo: 'Estimate earnings from the TikTok Creativity Program.' 
    },

    // --- BUSINESS & MARKETING ---
    { 
        id: 'roicalculator', 
        name: 'Marketing ROI Calculator', 
        cat: 'Business', 
        type: 'calc', 
        inputs: ['Total Revenue ($)', 'Marketing Cost ($)'], 
        calc: (i) => ((i[0] - i[1]) / i[1]) * 100,
        seo: 'Calculate the Return on Investment for your ad campaigns.' 
    },
    { 
        id: 'caccalculator', 
        name: 'Customer Acquisition Cost', 
        cat: 'Business', 
        type: 'calc', 
        inputs: ['Total Spend ($)', 'New Customers'], 
        calc: (i) => i[0] / i[1],
        seo: 'Measure how much it costs to acquire a single customer.' 
    },

    // --- FINANCE & HEALTH ---
    { 
        id: 'emicalculator', 
        name: 'Loan EMI Calculator', 
        cat: 'Finance', 
        type: 'calc', 
        inputs: ['Principal', 'Rate %', 'Years'], 
        calc: (i) => { 
            let r=i[1]/12/100, n=i[2]*12; 
            return (i[0]*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1); 
        }, 
        seo: 'Standard bank EMI calculator for personal and home loans.' 
    },
    { 
        id: 'bmicalculator', 
        name: 'BMI Health Calculator', 
        cat: 'Health', 
        type: 'calc', 
        inputs: ['Weight (kg)', 'Height (cm)'], 
        calc: (i) => i[0]/((i[1]/100)**2), 
        seo: 'Calculate your Body Mass Index (BMI) instantly.' 
    },

    // --- LEGAL & ABOUT (FOR ADSENSE APPROVAL) ---
    { 
        id: 'about-us', 
        name: 'About CreatorProfitLab', 
        cat: 'Blog', 
        type: 'blog', 
        content: `
            <h2>Precision Tools for the Digital Frontier</h2>
            <p>CreatorProfitLab was engineered in 2026 to provide creators and entrepreneurs with SaaS-grade financial tools.</p>
            <h3>Our Mission</h3>
            <p>We aim to simplify complex financial math—from YouTube RPM to Compound Interest—using industry-standard formulas verified by financial experts.</p>
            <ul>
                <li><strong>Algorithmic Accuracy:</strong> Updated quarterly for platform changes.</li>
                <li><strong>Zero-Data Footprint:</strong> Your data never leaves your browser.</li>
            </ul>`
    },
    { 
        id: 'contact-us', 
        name: 'Contact Support', 
        cat: 'Blog', 
        type: 'blog', 
        content: `
            <h2>Get in Touch</h2>
            <p>Have a question about a formula? We respond within 24-48 hours.</p>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; margin: 20px 0;">
                <p><strong>Email:</strong> support@creatorprofitlab.com</p>
                <p><strong>Partnerships:</strong> hello@creatorprofitlab.com</p>
            </div>`
    },
    { 
        id: 'privacy-policy', 
        name: 'Privacy Policy', 
        cat: 'Blog', 
        type: 'blog', 
        content: `
            <h2>Privacy Policy</h2>
            <p>At CreatorProfitLab, we use <strong>Google AdSense</strong> which utilizes cookies to serve relevant ads. We do not store or collect personal financial data entered into our calculators.</p>
            <h3>Google DoubleClick DART Cookie</h3>
            <p>Google uses DART cookies to serve ads to users based on their visit to this and other sites on the internet.</p>`
    },
    { 
        id: 'terms-of-service', 
        name: 'Terms of Service', 
        cat: 'Blog', 
        type: 'blog', 
        content: `
            <h2>Terms & Disclaimer</h2>
            <p>Tools are provided for <strong>informational purposes only</strong>. We do not provide professional financial, medical, or legal advice. Use at your own risk.</p>`
    }
];

// --- NAVIGATION & ROUTING ENGINE ---
function handleRouting() {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const hero = document.getElementById('hero-wrapper');
    
    if (!path || path === "" || path === "index.html") {
        showHomeView();
    } else {
        const item = DATABASE.find(x => x.id === path);
        if (item) {
            if(hero) hero.style.display = "none";
            item.type === 'calc' ? renderCalc(item) : renderBlog(item);
        } else {
            showHomeView();
        }
    }
}

function showHomeView() {
    const hero = document.getElementById('hero-wrapper');
    if(hero) hero.style.display = "block";
    document.getElementById('home-view').style.display = 'block';
    document.getElementById('calculator-view').style.display = 'none';
    document.getElementById('blog-view').style.display = 'none';
    document.title = "CreatorProfitLab | 100+ Professional Tools";
    renderGrid(DATABASE);
}

function handleItemClick(id) {
    window.history.pushState({id: id}, '', `/${id}`);
    handleRouting();
}

function renderGrid(data) {
    const filtered = data.filter(i => i.cat !== 'Blog' || i.id === 'about-us'); // Hide legal from grid except About
    document.getElementById('main-grid').innerHTML = filtered.map(i => `
        <div class="card" onclick="handleItemClick('${i.id}')">
            <div class="card-cat">${i.cat}</div>
            <h3>${i.name}</h3>
        </div>`).join('');
}

function renderCalc(item) {
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('calculator-view').style.display = 'block';
    document.title = `${item.name} | CreatorProfitLab`;
    
    let html = `<h1>${item.name}</h1><div class="input-grid">`;
    item.inputs.forEach((label, idx) => {
        html += `<div class="input-group"><label>${label}</label><input type="number" id="v-${idx}" value="100" oninput="runMath('${item.id}')"></div>`;
    });
    html += `</div><div class="result-card"><small>2026 PROJECTION</small><h2 id="res">--</h2></div>
             <div style="margin-top:30px;"><h3>Expert Insight</h3><p>${item.seo}</p></div>`;
    
    document.getElementById('calc-content').innerHTML = html;
    runMath(item.id);
    window.scrollTo(0,0);
}

function renderBlog(item) {
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('calculator-view').style.display = 'none';
    document.getElementById('blog-view').style.display = 'block';
    document.getElementById('blog-content').innerHTML = `<h1>${item.name}</h1>${item.content}`;
    window.scrollTo(0,0);
}

function runMath(id) {
    const item = DATABASE.find(x => x.id === id);
    const inputs = item.inputs.map((_, idx) => parseFloat(document.getElementById(`v-${idx}`).value) || 0);
    const result = item.calc(inputs);
    
    const display = document.getElementById('res');
    if (item.cat === 'Finance' || item.id.includes('income')) {
        display.innerText = "$" + result.toLocaleString(undefined, {maximumFractionDigits:2});
    } else if (item.id.includes('engagement') || item.id.includes('roi')) {
        display.innerText = result.toFixed(2) + "%";
    } else {
        display.innerText = result.toLocaleString(undefined, {maximumFractionDigits:2});
    }
}

// --- INITIALIZATION ---
window.onpopstate = handleRouting;
window.onload = handleRouting;

function doSearch() {
    const q = document.getElementById('searchBar').value.toLowerCase();
    const filtered = DATABASE.filter(i => i.name.toLowerCase().includes(q));
    renderGrid(filtered);
}
