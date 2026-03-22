<script>
    // [Keep the full TOOLS array from the previous response here]
    const TOOLS = [ /* ... all 50+ tools ... */ ];

    let currentCat = "Creator";
    const view = document.getElementById('view');

    function init() {
        renderTabs();
        router();
    }

    // NEW: Function to update SEO Meta Tags dynamically
    function updateMeta(title, desc) {
        document.title = title + " | CreatorProfitLab";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", desc);
        
        // Update OpenGraph for Social Media Sharing
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", title);
    }

    function renderTabs() {
        const categories = [...new Set(TOOLS.map(t => t.cat))];
        document.getElementById('tabs').innerHTML = categories.map(cat => 
            `<button class="tab-btn ${cat === currentCat ? 'active' : ''}" onclick="setCategory('${cat}')">${cat}</button>`
        ).join('');
    }

    function setCategory(cat) {
        currentCat = cat;
        renderTabs();
        document.getElementById('toolSearch').value = '';
        window.history.pushState({}, '', 'index.html');
        updateMeta("CreatorProfitLab", "50+ Free professional calculators for Creators, Finance, and Health.");
        renderHome();
    }

    function renderHome() {
        document.getElementById('tabs').style.display = 'flex';
        const filtered = TOOLS.filter(t => t.cat === currentCat);
        let html = `<div class="grid">`;
        html += filtered.map(t => `
            <a href="?id=${t.id}" class="card">
                <div>
                    <span class="badge">${t.cat}</span>
                    <h3>${t.name}</h3>
                    <p>${t.desc}</p>
                </div>
                <div style="color:var(--brand); font-weight:700; font-size:0.8rem;">USE TOOL →</div>
            </a>`).join('');
        html += `</div>`;
        view.innerHTML = html;
    }

    function renderTool(tool) {
        if(!tool) { renderHome(); return; }
        
        // SEO: Update tags for this specific tool
        updateMeta(`Free ${tool.name} Calculator`, `Calculate ${tool.name} instantly. ${tool.desc} Fast, accurate, and free online tool.`);

        document.getElementById('tabs').style.display = 'none';
        view.innerHTML = `
            <div class="calc-main">
                <button onclick="window.location.href='index.html'" class="back-btn">← Back to Explore</button>
                <h1>${tool.name}</h1>
                <p style="color:var(--text-muted); margin-bottom:30px;">${tool.desc}</p>
                ${tool.inputs.map(i => `
                    <div class="input-group">
                        <label>${i.l}</label>
                        <input type="number" id="${i.id}" value="${i.v}" oninput="calc()">
                    </div>
                `).join('')}
                <div class="result-box">
                    <p>Estimated Result</p>
                    <h2 id="res">--</h2>
                </div>
            </div>`;
        window.activeTool = tool;
        calc();
    }

    function calc() {
        const t = window.activeTool;
        if (!t) return;
        let expr = t.formula;
        t.inputs.forEach(i => {
            const val = parseFloat(document.getElementById(i.id).value) || 0;
            expr = expr.replace(new RegExp(`\\b${i.id}\\b`, 'g'), val);
        });
        try {
            const result = eval(expr);
            const formatted = result.toLocaleString(undefined, {maximumFractionDigits: 2});
            document.getElementById('res').innerText = (t.unit.includes('$') ? '$' : '') + formatted + (!t.unit.includes('$') ? t.unit : '');
        } catch (e) { document.getElementById('res').innerText = "0"; }
    }

    function router() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if(id) {
            renderTool(TOOLS.find(t => t.id === id));
        } else {
            renderHome();
        }
    }

    window.onpopstate = router;
    init();
</script>
