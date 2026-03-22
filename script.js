const mainView = document.getElementById('main-view');

async function init() {
    const response = await fetch('calculators.json');
    const tools = await response.json();
    
    const urlParams = new URLSearchParams(window.location.search);
    const toolId = urlParams.get('id');
    const page = urlParams.get('page');

    if (toolId) {
        renderCalculator(tools.find(t => t.id === toolId));
    } else if (page) {
        renderStaticPage(page);
    } else {
        renderHome(tools);
    }
}

function renderHome(tools) {
    let html = `<section class="hero"><h1>Smart Tools for Smart Creators</h1><p>Maximize your revenue with our data-backed calculators.</p></section>`;
    html += `<div class="grid">`;
    tools.forEach(tool => {
        html += `
            <a href="?id=${tool.id}" class="card">
                <small>${tool.category}</small>
                <h3>${tool.name}</h3>
                <p>${tool.desc}</p>
            </a>`;
    });
    html += `</div>`;
    mainView.innerHTML = html;
}

function renderCalculator(tool) {
    if (!tool) return renderHome();
    
    // Dynamic SEO
    document.title = `${tool.name} | CreatorProfitLab`;
    
    let html = `
        <div class="calc-wrapper">
            <div class="calc-main">
                <h1>${tool.name}</h1>
                <p class="desc">${tool.desc}</p>
                <div class="ad-slot">IN-CONTENT AD</div>
                <div class="tool-ui">
                    ${tool.inputs.map(input => `
                        <div class="input-group">
                            <label>${input.label}</label>
                            <input type="number" id="${input.id}" value="${input.val}" oninput="calculate('${tool.id}')">
                        </div>
                    `).join('')}
                    <div class="result-box">
                        <label>Your Results</label>
                        <h3 id="result-val">--</h3>
                    </div>
                </div>
                <article class="seo-article">${tool.article}</article>
            </div>
            <aside class="sidebar">
                <div class="ad-slot" style="height:600px">SIDEBAR AD</div>
                <div class="affiliate-section">
                    <h4>Best Tool for Creators</h4>
                    <p>Unlock more growth with TubeBuddy.</p>
                    <a href="#" class="btn-aff">Get it Now</a>
                </div>
            </aside>
        </div>
    `;
    mainView.innerHTML = html;
    window.currentTool = tool;
    calculate(tool.id);
}

function calculate() {
    const tool = window.currentTool;
    let formula = tool.formula;
    tool.inputs.forEach(input => {
        const value = document.getElementById(input.id).value || 0;
        formula = formula.replace(new RegExp(input.id, 'g'), value);
    });
    const result = eval(formula);
    document.getElementById('result-val').innerText = tool.unit + result.toLocaleString(undefined, {maximumFractionDigits: 2});
}

// Simple search logic
function searchTools() {
    let input = document.getElementById('toolSearch').value.toLowerCase();
    let cards = document.getElementsByClassName('card');
    for (let card of cards) {
        card.style.display = card.innerText.toLowerCase().includes(input) ? "block" : "none";
    }
}

init();
