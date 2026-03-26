const DATABASE = [
    // TOOLS
    { id: 'youtubeincomecalculator', name: 'YouTube Income Calculator', cat: 'Creator', type: 'calc', inputs: ['Monthly Views', 'RPM ($)'], calc: (i) => (i[0]/1000)*i[1], seo: 'Estimate YouTube take-home pay with 2026 benchmarks.' },
    { id: 'instagramengagementcalculator', name: 'Instagram Engagement Rate', cat: 'Creator', type: 'calc', inputs: ['Likes + Comments', 'Followers'], calc: (i) => (i[0]/i[1])*100, seo: 'Analyze account health for brand sponsorships.' },
    { id: 'emicalculator', name: 'Loan EMI Calculator', cat: 'Finance', type: 'calc', inputs: ['Principal', 'Rate %', 'Years'], calc: (i) => { let r=i[1]/12/100, n=i[2]*12; return (i[0]*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1); }, seo: 'Standard loan repayment math.' },
    { id: 'roicalculator', name: 'Marketing ROI Calculator', cat: 'Business', type: 'calc', inputs: ['Revenue ($)', 'Cost ($)'], calc: (i) => ((i[0]-i[1])/i[1])*100, seo: 'Calculate campaign profitability.' },
    { id: 'bmicalculator', name: 'BMI Health Calculator', cat: 'Health', type: 'calc', inputs: ['Weight (kg)', 'Height (cm)'], calc: (i) => i[0]/((i[1]/100)**2), seo: 'Standard Body Mass Index.' },

    // PAGES (Ensure IDs match the footer exactly)
    { 
        id: 'about-us', 
        name: 'About CreatorProfitLab', 
        cat: 'Blog', 
        type: 'blog', 
        content: `<h2>Precision Tools</h2><p>Founded in 2026, we provide high-precision SaaS tools for creators and digital entrepreneurs.</p>` 
    },
    { 
        id: 'contact-us', 
        name: 'Contact Support', 
        cat: 'Blog', 
        type: 'blog', 
        content: `<h2>Contact Our Team</h2><p>Need help with a formula or want to report a bug? Reach out to us below:</p>
                  <div style="background:#f1f5f9; padding:20px; border-radius:12px; margin-top:20px;">
                    <p><strong>Email:</strong> support@creatorprofitlab.com</p>
                    <p><strong>Response Time:</strong> 24-48 Hours</p>
                  </div>` 
    },
    { 
        id: 'privacy-policy', 
        name: 'Privacy Policy', 
        cat: 'Blog', 
        type: 'blog', 
        content: `<h2>Privacy Policy</h2><p>We use Google AdSense cookies to serve ads. We do not store or collect any data entered into our calculators.</p>` 
    },
    { 
        id: 'terms-of-service', 
        name: 'Terms of Service', 
        cat: 'Blog', 
        type: 'blog', 
        content: `<h2>Terms of Service</h2><p>Calculators are provided "as-is" for informational purposes only. Always consult a professional for financial or medical decisions.</p>` 
    }
];

function handleRouting() {
    const params = new URLSearchParams(window.location.search);
    const toolId = params.get('id');
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const targetId = toolId || path;

    if (!targetId || targetId === "" || targetId === "index.html") {
        showHomeView();
    } else {
        const item = DATABASE.find(x => x.id === targetId);
        if (item) {
            // Hide everything else first
            document.getElementById('home-view').style.display = 'none';
            document.getElementById('calculator-view').style.display = 'none';
            document.getElementById('blog-view').style.display = 'none';
            
            // Render the correct item
            item.type === 'calc' ? renderCalc(item) : renderBlog(item);
        } else { 
            showHomeView(); 
        }
    }
}

function showHomeView() {
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

function navigateToHome(e) {
    if(e) e.preventDefault();
    window.history.pushState({}, '', '/');
    showHomeView();
}

function renderGrid(data) {
    const filtered = data.filter(i => i.cat !== 'Blog' || i.id === 'about-us');
    document.getElementById('main-grid').innerHTML = filtered.map(i => `
        <div class="card" onclick="handleItemClick('${i.id}')">
            <div class="card-cat">${i.cat}</div>
            <h3>${i.name}</h3>
        </div>`).join('');
}

function renderCalc(item) {
    document.getElementById('calculator-view').style.display = 'block';
    document.title = `${item.name} | CreatorProfitLab`;
    let html = `<h1 style="font-family:'Lexend'; margin-bottom:10px;">${item.name}</h1><p style="color:var(--text-light);">${item.seo}</p><div class="input-grid">`;
    item.inputs.forEach((l, idx) => html += `<div class="input-group"><label>${l}</label><input type="number" id="v-${idx}" value="100" oninput="runMath('${item.id}')"></div>`);
    html += `</div><div class="result-card"><small>Calculated Result</small><h2 id="res">--</h2></div>`;
    document.getElementById('calc-content').innerHTML = html;
    runMath(item.id);
    window.scrollTo(0,0);
}

function renderBlog(item) {
    document.getElementById('blog-view').style.display = 'block';
    document.title = `${item.name} | CreatorProfitLab`;
    document.getElementById('blog-content').innerHTML = `<h1 style="font-family:'Lexend';">${item.name}</h1><div style="margin-top:20px;">${item.content}</div>`;
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

function filterCat(cat) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if(event) event.target.classList.add('active');
    renderGrid(cat === 'All' ? DATABASE : DATABASE.filter(i => i.cat === cat));
}

function doSearch() {
    const q = document.getElementById('searchBar').value.toLowerCase();
    renderGrid(DATABASE.filter(i => i.name.toLowerCase().includes(q)));
}

window.onpopstate = handleRouting;
window.onload = handleRouting;
