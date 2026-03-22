async function start() {
    const res = await fetch('calculators.json');
    const tools = await res.json();
    const id = new URLSearchParams(window.location.search).get('id');

    if (id) {
        const tool = tools.find(t => t.id === id);
        renderTool(tool);
    } else {
        renderHome(tools);
    }
}

function renderHome(tools) {
    let html = `<h1>All Calculators</h1><div class="grid">`;
    tools.forEach(t => {
        html += `<a href="?id=${t.id}" class="card"><span>${t.cat}</span><h3>${t.name}</h3><p>${t.desc || 'Professional precision tool.'}</p></a>`;
    });
    document.getElementById('main-view').innerHTML = html + `</div>`;
}

function renderTool(tool) {
    if(!tool) return;
    window.currentTool = tool;
    document.getElementById('main-view').innerHTML = `
        <div class="calc-wrapper">
            <div class="calc-main">
                <h1>${tool.name}</h1>
                ${tool.inputs.map(i => `
                    <div class="input-group">
                        <label>${i.label}</label>
                        <input type="number" id="${i.id}" value="${i.val}" oninput="runMath()">
                    </div>
                `).join('')}
                <div class="result-box"><h3>Result: <span id="res">--</span></h3></div>
                <div class="seo-article">${tool.article}</div>
            </div>
            <aside><div class="ad-slot">Sidebar Ad</div></aside>
        </div>`;
    runMath();
}

function runMath() {
    const t = window.currentTool;
    let expression = t.formula;
    t.inputs.forEach(i => {
        const val = document.getElementById(i.id).value || 0;
        expression = expression.replace(new RegExp(i.id, 'g'), val);
    });
    // Safe evaluation of the math formula
    try {
        const result = Function('"use strict";return (' + expression + ')')();
        document.getElementById('res').innerText = t.unit + result.toLocaleString(undefined, {maximumFractionDigits: 2});
    } catch(e) { console.error("Math Error"); }
}
start();
