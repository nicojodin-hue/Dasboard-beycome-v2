// Investor Reports — Landing page with all quarterly/monthly reports
// ────────────────────────────────────────────────────────────────

const REPORTS = [
    {
        id: 'q1-2026',
        route: '/investor-report-q1',
        title: 'Q1 2026',
        subtitle: 'January – March 2026',
        revenue: '$575,031',
        growth: '+60% YoY',
        highlight: '2,854 listing clients · 30.3mo runway',
        badge: 'Latest',
        color: '#5a6ad4'
    },
    {
        id: 'feb-2026',
        route: '/investor-report',
        title: 'February 2026',
        subtitle: 'Monthly Update',
        revenue: '$155,971',
        growth: '+34.5% YoY',
        highlight: '812 listing clients · 29mo runway',
        badge: '',
        color: '#7d8ff7'
    },
    {
        id: 'q4-jan-2026',
        route: 'https://beycome-report-hub.lovable.app/report',
        title: 'Q4 2025 & January 2026',
        subtitle: 'FY 2025 Annual + Jan Update',
        revenue: '$343,950',
        growth: '',
        highlight: 'Q4 revenue · January 2026 monthly update',
        badge: '',
        color: '#7d8ff7',
        external: true
    }
];

export function render() {
    return `
    <div class="ir-header">
        <div class="ir-header-left">
            <img src="/logos/logo-beycome.svg" alt="Beycome" class="ir-header-logo">
            <div class="ir-header-divider"></div>
            <span class="ir-header-title">Investor Reports</span>
        </div>
        <button class="ir-header-exit" id="ir-exit-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Exit
        </button>
    </div>

    <div class="ir-page">
        <div class="ir-hero" style="padding:48px 24px 40px">
            <div class="ir-hero-label">Investor Portal</div>
            <h1 class="ir-hero-title" style="font-size:48px">Beycome Reports.</h1>
            <div class="ir-hero-subtitle">Quarterly and monthly operating updates for investors.</div>
        </div>

        <div class="ir-section" style="max-width:900px;margin:0 auto">
            <div style="display:grid;grid-template-columns:1fr;gap:20px">
                ${REPORTS.map(r => `
                    <a href="${r.external ? r.route : (r.route ? '#' + r.route : 'javascript:void(0)')}" ${r.external ? 'target="_blank" rel="noopener"' : ''} class="ir-report-card" style="display:block;text-decoration:none;background:#fff;border:1px solid #e0e0e0;border-radius:16px;padding:32px;box-shadow:0 1px 3px rgba(21,35,48,0.04),0 4px 20px -4px rgba(21,35,48,0.06);transition:border-color 0.2s,box-shadow 0.2s,transform 0.15s;${!r.route ? 'opacity:0.5;pointer-events:none;' : ''}cursor:pointer">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">
                            <div>
                                <div style="font-size:24px;font-weight:700;color:#152330;margin-bottom:4px">${r.title}</div>
                                <div style="font-size:14px;color:rgba(22,36,50,0.6)">${r.subtitle}</div>
                            </div>
                            ${r.badge ? `<span style="display:inline-block;padding:4px 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;border-radius:20px;background:${r.badge === 'Latest' ? 'rgba(90,106,212,0.1)' : 'rgba(156,163,175,0.15)'};color:${r.badge === 'Latest' ? '#5a6ad4' : '#9ca3af'}">${r.badge}</span>` : ''}
                        </div>
                        <div style="display:flex;gap:32px;align-items:baseline">
                            <div>
                                <div style="font-size:32px;font-weight:700;color:${r.color}">${r.revenue}</div>
                                <div style="font-size:13px;color:rgba(22,36,50,0.5);margin-top:2px">Revenue</div>
                            </div>
                            ${r.growth ? `
                            <div>
                                <div style="font-size:20px;font-weight:700;color:#5a9e6f">${r.growth}</div>
                                <div style="font-size:13px;color:rgba(22,36,50,0.5);margin-top:2px">Growth</div>
                            </div>` : ''}
                        </div>
                        <div style="margin-top:16px;font-size:14px;color:rgba(22,36,50,0.6)">${r.highlight}</div>
                    </a>
                `).join('')}
            </div>

            <div style="text-align:center;margin-top:48px;padding:32px;font-size:14px;color:rgba(22,36,50,0.5);line-height:1.6">
                This portal is confidential and intended solely for the use of Beycome investors.<br>
                Questions or feedback are always welcome — <strong>contact@beycome.com</strong>
            </div>
        </div>
    </div>
    `;
}

export function init() {
    const exitBtn = document.getElementById('ir-exit-btn');
    if (exitBtn) {
        exitBtn.addEventListener('click', () => {
            window.location.hash = '/offers';
        });
    }

    // Add hover effects to cards
    document.querySelectorAll('.ir-report-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (card.style.pointerEvents !== 'none') {
                card.style.borderColor = 'rgba(90,106,212,0.5)';
                card.style.boxShadow = '0 4px 24px -4px rgba(21,35,48,0.12)';
                card.style.transform = 'translateY(-2px)';
            }
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '#e0e0e0';
            card.style.boxShadow = '0 1px 3px rgba(21,35,48,0.04),0 4px 20px -4px rgba(21,35,48,0.06)';
            card.style.transform = 'translateY(0)';
        });
    });
}

export function cleanup() {}
