async function initApp() {
    const response = await fetch('calculators.json');
    const calcs = await response.json();
    
    const params = new URLSearchParams(window.location.search);
    const calcId = params.get('id');

    if (calcId) {
        renderCalculator(calcs.find(c => c.id === calcId));
    } else {
        renderHome(calcs);
    }
}

function renderCalculator(data) {
    if (!data) return;
    
    // SEO Injection
    document.title = `${data.title} - CreatorProfitLab`;
    document.querySelector('meta[name="description"]').setAttribute("content", data.description);
    
    // UI Injection
    const app = document.getElementById('app');
    app.innerHTML = `
        <nav class="breadcrumb">Home > ${data.category} > ${data.title}</nav>
        <div class="calc-layout">
            <div class="main-col">
                <div class="calc-card">
                    <h1>${data.title}</h1>
                    ${data.inputs.map(i => `
                        <div class="input-group">
                            <label>${i.label}</label>
                            <input type="number" id="${i.id}" value="${i.default}" oninput="calculate()">
                        </div>
                    `).join('')}
                    <div class="result-box">
                        <p>Estimated Result</p>
                        <div class="result-val" id="total">${data.unit}0</div>
                    </div>
                </div>
                <div class="ad-slot">In-Content Ad</div>
                <article class="seo-content">${data.content}</article>
                <div class="faq-section">
                    ${data.faqs.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}
                </div>
            </div>
            <aside class="sidebar">
                <div class="affiliate-card">
                    <h3>Recommended Tool</h3>
                    <p>${data.affiliate.text}</p>
                    <a href="${data.affiliate.link}" class="btn">Get Started</a>
                </div>
                <div class="ad-slot">Sidebar Ad</div>
            </aside>
        </div>
    `;
    window.currentCalc = data;
    calculate();
}

function calculate() {
    const data = window.currentCalc;
    let formula = data.formula;
    data.inputs.forEach(i => {
        const val = document.getElementById(i.id).value;
        formula = formula.replace(new RegExp(i.id, 'g'), val);
    });
    document.getElementById('total').innerText = data.unit + eval(formula).toLocaleString();
}
