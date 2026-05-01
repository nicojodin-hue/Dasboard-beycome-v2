// Investor Report — Beycome Monthly Report for Investors
// ─────────────────────────────────────────────────────
// To update: edit the `DATA` object below. All sections
// pull from this single config so you only change data
// in one place each month.
// ─────────────────────────────────────────────────────

const DATA = {
    // ── Report Meta ──
    month: 'February',
    monthShort: 'Feb',
    year: 2026,
    calendarDays: 28,
    prevMonth: 'January',
    prevMonthShort: 'Jan',
    prevCalendarDays: 31,

    // ── Hero ──
    tagline: 'You + AI Guidance — Save up to 6% when selling and up to 2% when buying',

    // ── Executive Summary ──
    overview: [
        `Revenue was $155,971 in February, down 9.9% from $173,148 in January. The decline is largely attributable to the shorter month — February had 28 calendar days versus 31 in January, representing 3 fewer days of revenue generation. Comparing the first 28 days of each month, February revenue was approximately 18% higher than January over the same period, indicating that underlying demand continued to trend upward.`,
        `Platform traffic reached 96,000 engaged visitors, up 50% from 64,000 in January, driven by organic and SEO gains deployed in late 2025. New listing clients were broadly flat at 812 versus 832 in January. Revenue mix continued to shift toward higher-value products: Enhanced Listing revenue increased 32.5% MoM and Concierge was up 27.3%, reflecting improved monetization per customer.`,
        `Gross margin was 87%, in line with January. OpEx increased in the period, led by a planned ramp-up in Sales & Marketing (+28.8%) to capture the growing traffic base. Net loss was ($92,370) versus ($47,494) in January, driven by the combination of a shorter revenue month and higher marketing investment. Cash on hand was $2.03M as of February 28, representing an estimated runway of 29 months.`
    ],

    // ── Year-over-Year Highlight ──
    yoyGrowth: {
        value: '+34.5%',
        label: 'Revenue Growth',
        sub: 'Feb 2026 vs Feb 2025'
    },

    // ── Important Note ──
    importantNote: 'Important note for partners: Since January 29, 2026, new MLS and state-level regulations have prohibited the listing of wholesale and double-closing transactions on Beycome across most U.S. states. This change has generated a temporary increase in refund activity ($7,518 in February vs. $4,583 in January). Despite the fact that we did not anticipate this immediate change, we have already shifted our target to B2C.',

    // ── KPI Cards ──
    marketplace: [
        { value: '812', label: 'New Listing Clients', sub: '-2.4% vs Jan' },
        { value: '748', label: 'Basic Listings', sub: 'Feb 2026' },
        { value: '50', label: 'Enhanced Listings', sub: 'Feb 2026' },
        { value: '96K', label: 'Engaged Visitors', sub: '+50% vs Jan' },
        { value: '$7,518', label: 'Refunds (Feb)', sub: '+64% vs Jan' },
        { value: '28', label: 'Calendar Days', sub: 'vs 31 in Jan' }
    ],

    // ── Revenue Breakdown ──
    revenueBreakdown: [
        { value: '$75.6K', label: 'Basic Listing', sub: '-2.1% vs Jan', direction: 'negative' },
        { value: '$21.1K', label: 'Enhanced Listing', sub: '+32.5% vs Jan', direction: 'positive' },
        { value: '$15.3K', label: 'Concierge', sub: '+27.3% vs Jan', direction: 'positive' },
        { value: '$9.1K', label: 'Other Sell Side', sub: '-56.0% vs Jan', direction: 'negative' },
        { value: '$6.5K', label: 'Buy Side', sub: '-44.0% vs Jan', direction: 'negative' },
        { value: '$28.4K', label: 'Title', sub: '-20.6% vs Jan', direction: 'negative' }
    ],

    // ── Daily Revenue Comparison ──
    dailyRevenue: [
        { value: '$5,585', label: 'Daily Rev (Jan)', sub: '31 days' },
        { value: '$5,570', label: 'Daily Rev (Feb)', sub: '28 days' },
        { value: '+18%', label: 'Run Rate (28th)', sub: 'vs Jan daily avg' },
        { value: '$155.9K', label: 'Total Rev (Feb)', sub: '28-day month' }
    ],

    refundNote: '<strong>Note:</strong> Refund volume increased 64% MoM ($7,518 in Feb vs. $4,583 in Jan), related to the wholesale/double-closing regulatory change. Refunds are already netted against revenue figures above.',

    // ── Financial Statements ──
    financials: [
        { item: 'Revenue', jan: '$173,148', feb: '$155,971', bold: true },
        { item: 'Cost of Revenue', jan: '($21,419)', feb: '($20,830)' },
        { item: 'Sell Side COGS', jan: '($17,438)', feb: '($14,489)', indent: true },
        { item: 'Buy Side COGS', jan: '($1,237)', feb: '($690)', indent: true },
        { item: 'Title COGS', jan: '($2,744)', feb: '($5,652)', indent: true },
        { item: 'Gross Profit', jan: '$151,729', feb: '$135,141', bold: true },
        { item: '% Gross Margin', jan: '88%', feb: '87%' },
        { item: 'Sales & Marketing', jan: '($64,377)', feb: '($82,904)' },
        { item: 'People', jan: '($70,416)', feb: '($75,622)' },
        { item: 'Other G&A', jan: '($64,430)', feb: '($68,985)' },
        { item: 'Total SG&A', jan: '($199,223)', feb: '($227,511)', bold: true },
        { item: 'Other Income / Expense', jan: '$0', feb: '$0' },
        { item: 'Net Income', jan: '($47,494)', feb: '($92,370)', total: true },
        { item: '% Net Margin', jan: '-27%', feb: '-59%' }
    ],

    // ── Financial Health ──
    financialHealth: [
        { value: '$2.03M', label: 'Cash Balance', sub: '28 Feb 2026' },
        { value: '($69.9K)', label: 'Avg Monthly Burn', sub: '' },
        { value: '29 mo', label: 'Estimated Runway', sub: '' },
        { value: '87%', label: 'Gross Margin', sub: 'Stable vs Jan' }
    ],

    closingNote: 'Thank you for your continued partnership. We remain committed to building a durable business and will continue to operate with transparency and discipline. Questions or feedback are always welcome.',

    // ── Sign-off ──
    signoff: {
        text: 'As always — and more than ever — we\'re fully committed to building a best-in-class real estate platform for everyday people, operating with transparency, sharp focus, and strong financial discipline.<br><br>Questions and feedback are always welcome.',
        team: '— The Beycome Team',
        names: 'Nico & Jodin'
    }
};

// ── Render ──
export function render() {
    const d = DATA;

    return `
    <div class="ir-header">
        <div class="ir-header-left">
            <img src="/logos/logo-beycome.svg" alt="Beycome" class="ir-header-logo">
            <div class="ir-header-divider"></div>
            <span class="ir-header-title">Investor Report | ${d.monthShort} ${d.year}</span>
        </div>
        <button class="ir-header-exit" id="ir-exit-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Exit
        </button>
    </div>

    <div class="ir-page">
        <!-- HERO -->
        <div class="ir-hero">
            <div class="ir-hero-label">Investor Report</div>
            <h1 class="ir-hero-title">Beycome | ${d.month} ${d.year}</h1>
            <div class="ir-hero-subtitle">${d.tagline}</div>
        </div>

        <!-- 01 EXECUTIVE SUMMARY -->
        <div class="ir-section">
            <div class="ir-section-header">
                <span class="ir-section-number">01</span>
                <h2 class="ir-section-title">Executive Summary</h2>
            </div>

            <div class="ir-subsection-title">Overview</div>
            ${d.overview.map(p => `<p class="ir-text">${p}</p>`).join('')}

            <!-- YoY Growth Highlight -->
            <div class="ir-yoy-banner">
                <div class="ir-yoy-value">${d.yoyGrowth.value}</div>
                <div class="ir-yoy-detail">
                    <div class="ir-yoy-label">${d.yoyGrowth.label}</div>
                    <div class="ir-yoy-sub">${d.yoyGrowth.sub}</div>
                </div>
            </div>

            <!-- Important Note -->
            <div class="ir-note ir-note--warning">${d.importantNote}</div>

            <!-- KPIs -->
            <div class="ir-subsection-title">Key Performance Indicators</div>
            <div style="font-size:14px;font-weight:700;margin-bottom:12px">Marketplace</div>
            <div class="ir-kpi-grid">
                ${d.marketplace.map(k => `
                    <div class="ir-kpi-card">
                        <div class="ir-kpi-value">${k.value}</div>
                        <div class="ir-kpi-label">${k.label}</div>
                        <div class="ir-kpi-sub">${k.sub}</div>
                    </div>
                `).join('')}
            </div>

            <!-- Revenue Breakdown -->
            <div style="font-size:14px;font-weight:700;margin-bottom:12px">Revenue Breakdown</div>
            <div class="ir-revenue-grid">
                ${d.revenueBreakdown.map(r => `
                    <div class="ir-revenue-card">
                        <div class="ir-revenue-value">${r.value}</div>
                        <div class="ir-revenue-label">${r.label}</div>
                        <div class="ir-revenue-sub ${r.direction}">${r.sub}</div>
                    </div>
                `).join('')}
            </div>

            <!-- Daily Revenue -->
            <div style="font-size:14px;font-weight:700;margin-bottom:12px">Daily Revenue Comparison</div>
            <div class="ir-daily-grid">
                ${d.dailyRevenue.map(r => `
                    <div class="ir-kpi-card">
                        <div class="ir-kpi-value">${r.value}</div>
                        <div class="ir-kpi-label">${r.label}</div>
                        <div class="ir-kpi-sub">${r.sub}</div>
                    </div>
                `).join('')}
            </div>

            <div class="ir-note">${d.refundNote}</div>
        </div>

        <!-- 02 FINANCIAL STATEMENTS -->
        <div class="ir-section">
            <div class="ir-section-header">
                <span class="ir-section-number">02</span>
                <h2 class="ir-section-title">Financial Statements</h2>
            </div>

            <div class="ir-table-wrap">
                <table class="ir-table">
                    <thead>
                        <tr>
                            <th>Line Item</th>
                            <th>Jan ${d.year}</th>
                            <th>${d.monthShort} ${d.year}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${d.financials.map(row => `
                            <tr class="${row.bold ? 'bold' : ''}${row.total ? 'total' : ''}">
                                <td>${row.indent ? '&nbsp;&nbsp;&nbsp;&nbsp;' : ''}${row.item}</td>
                                <td>${row.jan}</td>
                                <td>${row.feb}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div style="font-size:14px;font-weight:700;margin-bottom:12px">Financial Health</div>
            <div class="ir-health-grid">
                ${d.financialHealth.map(h => `
                    <div class="ir-health-card">
                        <div class="ir-health-value">${h.value}</div>
                        <div class="ir-health-label">${h.label}</div>
                        <div class="ir-health-sub">${h.sub}</div>
                    </div>
                `).join('')}
            </div>

            <div class="ir-closing-note">${d.closingNote}<br><br><strong>— The Beycome Team</strong></div>
        </div>

        <!-- SIGN-OFF -->
        <div class="ir-signoff">
            <p>${d.signoff.text}</p>
            <p class="ir-signoff-team">${d.signoff.team}</p>
            <p class="ir-signoff-names">${d.signoff.names}</p>
        </div>
    </div>
    `;
}

export function init() {
    const exitBtn = document.getElementById('ir-exit-btn');
    if (exitBtn) {
        exitBtn.addEventListener('click', () => {
            window.location.hash = '/investor-reports';
        });
    }
}

export function cleanup() {
    // No persistent listeners to remove
}
