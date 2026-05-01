<?php
// phpcs:ignoreFile

session_start();

if (isset($_GET['logout'])) {
    $_SESSION = [];
    session_destroy();
    header('Location: /');
    exit;
}

$error = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $submitted = $_POST['password'] ?? '';
    if (hash_equals('beycome2026', $submitted)) {
        $_SESSION['ir_auth'] = true;
    } else {
        $error = true;
    }
}

if (empty($_SESSION['ir_auth'])) {
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Beycome Investor Report</title>
  <style>
    /* Roboto — self-hosted */
    @font-face { font-family:Roboto; font-style:normal; font-weight:400; font-display:swap; src:url('/assets/roboto-400.woff2') format('woff2'); }
    @font-face { font-family:Roboto; font-style:normal; font-weight:600; font-display:swap; src:url('/assets/roboto-700.woff2') format('woff2'); }
    @font-face { font-family:Roboto; font-style:normal; font-weight:700; font-display:swap; src:url('/assets/roboto-700.woff2') format('woff2'); }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Roboto, "Segoe UI", "Helvetica Neue", sans-serif;
      background: #fefefe;
      color: #1a1f4d;
    }
    .pw-card {
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 22px 60px rgba(21, 25, 70, 0.13);
      padding: 44px 40px 36px;
      width: 100%;
      max-width: 380px;
      text-align: center;
    }
    .pw-logo {
      width: 130px;
      margin: 0 auto 28px;
      display: block;
    }
    .pw-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 6px;
      letter-spacing: -0.01em;
    }
    .pw-sub {
      font-size: var(--text-lg);
      color: #5a627a;
      margin-bottom: 28px;
    }
    .pw-input {
      width: 100%;
      padding: 11px 14px;
      border: 1.5px solid #d5d8f0;
      border-radius: 10px;
      font-size: var(--text-lg);
      font-family: inherit;
      color: #1a1f4d;
      outline: none;
      transition: border-color 0.18s;
      margin-bottom: 14px;
    }
    .pw-input:focus { border-color: #7d8ff7; }
    .pw-input.error { border-color: #b42318; }
    .pw-error {
      font-size: 13px;
      color: #b42318;
      margin-bottom: 14px;
      display: <?php echo $error ? 'block' : 'none'; ?>;
    }
    .pw-btn {
      width: 100%;
      padding: 12px;
      background: #7d8ff7;
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: var(--text-lg);
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: background 0.18s, transform 0.14s;
    }
    .pw-btn:hover { background: #6b7de6; transform: translateY(-1px); }
    .pw-btn:active { transform: translateY(0); }
  </style>
</head>
<body>
  <div class="pw-card">
    <img src="/assets/logo.svg" alt="Beycome" class="pw-logo">
    <div class="pw-title">Investor Report</div>
    <div class="pw-sub">Enter the password to continue</div>
    <form method="POST" action="" autocomplete="off">
      <input
        class="pw-input<?php echo $error ? ' error' : ''; ?>"
        type="password"
        name="password"
        placeholder="Password"
        autofocus
        required
      >
      <div class="pw-error">Incorrect password. Please try again.</div>
      <button class="pw-btn" type="submit">Continue</button>
    </form>
  </div>
</body>
</html>
<?php
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Beycome Investor Reports</title>
  <meta name="description" content="Beycome Investor Portal — Quarterly and monthly operating updates">
  <style>
    @font-face { font-family:Roboto; font-style:normal; font-weight:400; font-display:swap; src:url('/assets/roboto-400.woff2') format('woff2'); }
    @font-face { font-family:Roboto; font-style:normal; font-weight:600; font-display:swap; src:url('/assets/roboto-700.woff2') format('woff2'); }
    @font-face { font-family:Roboto; font-style:normal; font-weight:700; font-display:swap; src:url('/assets/roboto-700.woff2') format('woff2'); }

    /* Design tokens — matching www2.beycome.com/calculators */
    :root {
      --c-bg: hsla(0, 0%, 96%, 1);
      --c-bg-card: #ffffff;
      --c-primary: hsla(210, 39%, 14%, 1);                /* Gunmetal #152330 */
      --c-secondary: hsla(210, 38.9%, 14.1%, 0.7);        /* Gunmetal-70 */
      --c-tertiary: #4a5056;                              /* Subtitle grey */
      --c-accent: #5a6ad4;                                /* Beycome blue */
      --c-accent-soft: rgba(90, 106, 212, 0.1);           /* #5a6ad4 @ 10% */
      --text-lg: 1.125rem;                                /* 18px */
      --color-gray-600: #4b5563;                          /* Tailwind gray-600 */
      --c-orange: hsla(16, 100%, 73%, 1);                 /* Beycome orange #FF9B77 */
      --c-border: hsla(0, 0%, 88%, 1);                    /* #e0e0e0 */
      --c-green: hsla(137, 28%, 49%, 1);                  /* #5a9e6f */
      --c-green-bg: hsla(137, 28%, 49%, 0.1);
      --c-ink: var(--c-primary);
      --c-ink-soft: var(--c-secondary);
      --c-negative: hsla(0, 91%, 65%, 1);
      --c-positive: var(--c-green);
      --shadow-card: 0 1px 3px 0 rgba(21, 35, 48, 0.04), 0 4px 20px -4px rgba(21, 35, 48, 0.06);
      --radius-xl: 22px;
      --radius-lg: 16px;
      --radius-md: 12px;
      --radius-sm: 10px;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      font-family: Roboto, "Segoe UI", "Helvetica Neue", sans-serif;
      background: #ffffff;
      color: var(--c-primary);
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }

    /* ================= NAVBAR (calculator design) ================= */
    .bc-navbar {
      position: relative;
      background: #ffffff;
      padding: 16px 0;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    .bc-navbar-inner {
      max-width: 1152px;
      margin: 0 auto;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }
    .bc-navbar-left {
      display: flex;
      align-items: center;
    }
    .bc-navbar-center {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .bc-navbar-center a {
      display: inline-block;
      line-height: 0;
    }
    .bc-navbar-logo {
      height: 28px;
      width: auto;
      display: block;
    }
    .bc-navbar-right {
      display: flex;
      align-items: center;
    }
    .bc-navbar-link {
      color: var(--c-primary);
      font-size: var(--text-lg);
      font-weight: 500;
      font-family: inherit;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: color 0.15s;
    }
    .bc-navbar-link:hover { color: var(--c-accent); }

    /* ================= PAGE / HERO (calculator design) ================= */
    .bc-page {
      max-width: 1152px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .bc-hero {
      padding: 64px 16px 48px;
      text-align: center;
    }
    .bc-hero-label {
      display: inline-block;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
      color: var(--c-secondary);
      margin-bottom: 14px;
    }
    .bc-hero-title {
      font-family: ui-sans-serif, system-ui, sans-serif;
      font-size: 63px;
      font-weight: 700;
      color: var(--c-primary);
      line-height: 1.1;
      letter-spacing: normal;
      margin: 0 0 24px;
    }
    .bc-hero-subtitle {
      font-family: Roboto, "Segoe UI", "Helvetica Neue", sans-serif;
      font-size: 22px;
      line-height: 1.5;
      color: var(--c-tertiary);
      margin: 0 auto;
      max-width: 672px;
    }
    @media (max-width: 720px) {
      .bc-hero { padding: 40px 16px 32px; }
      .bc-hero-title { font-size: 40px; }
      .bc-hero-subtitle { font-size: 18px; }
    }

    /* ================= CARDS (calculator sidebar-card design — light grey on white) ================= */
    .bc-card {
      background: #f9fafb;
      border: none;
      border-radius: 16px;
      padding: 24px;
      box-shadow: none;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
    }
    @media (min-width: 600px) {
      .bc-card { padding: 28px 28px; }
    }

    /* 3 cards on same line at desktop, stack on mobile */
    .bc-report-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    @media (min-width: 900px) {
      .bc-report-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
      .bc-report-grid .bc-card { margin-bottom: 0; }
    }
    .bc-card-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--c-primary);
      margin: 0 0 4px;
    }
    .bc-card-sub {
      font-size: var(--text-lg);
      color: var(--c-secondary);
    }
    .bc-badge {
      display: inline-block;
      padding: 4px 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-radius: 20px;
      background: var(--c-accent-soft);
      color: var(--c-accent);
    }
    .bc-btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 20px;
      background: var(--c-accent);
      color: #fff;
      border-radius: 10px;
      font-size: var(--text-lg);
      font-weight: 600;
      text-decoration: none;
      transition: opacity 0.2s, transform 0.15s;
      border: 1px solid var(--c-accent);
      cursor: pointer;
      font-family: inherit;
    }
    .bc-btn-primary:hover { opacity: 0.92; transform: translateY(-1px); }
    .bc-btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 20px;
      background: #fff;
      color: var(--c-accent);
      border: 1px solid var(--c-border);
      border-radius: 10px;
      font-size: var(--text-lg);
      font-weight: 600;
      text-decoration: none;
      transition: border-color 0.2s;
      cursor: pointer;
      font-family: inherit;
    }
    .bc-btn-ghost:hover { border-color: var(--c-accent); }

    /* legacy aliases so existing elements still work */
    .ir-page { max-width: 1152px; margin: 0 auto; padding: 0 16px 64px; }

    .ir-section {
      background: var(--c-surface);
      border-radius: var(--radius-xl);
      padding: 42px 34px;
      box-shadow: var(--shadow-sm);
      margin-bottom: 22px;
    }

    .ir-section-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 30px;
    }

    .ir-section-number {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      display: grid;
      place-items: center;
      background: var(--c-accent-soft);
      color: var(--c-accent);
      font-weight: 700;
      font-size: var(--text-lg);
    }

    .ir-section-title {
      margin: 0;
      font-size: clamp(22px, 3vw, 30px);
      letter-spacing: -0.015em;
    }

    .ir-subsection-title {
      margin: 32px 0 12px;
      font-size: var(--text-lg);
      color: var(--c-ink-soft);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.09em;
    }

    .ir-text {
      margin: 0 0 14px;
      color: var(--color-gray-600);
      font-size: var(--text-lg);
      line-height: 1.68;
    }

    .ir-yoy-banner {
      margin: 30px 0;
      border-radius: var(--radius-lg);
      border: 1px solid #c5cbf9;
      background: linear-gradient(120deg, #e8eaff 0%, #f5f6ff 100%);
      padding: 18px;
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .ir-yoy-value {
      font-size: clamp(28px, 3vw, 40px);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.03em;
    }

    .ir-yoy-label {
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--c-ink);
    }

    .ir-yoy-sub {
      margin-top: 4px;
      color: var(--c-ink-soft);
      font-size: 13px;
    }

    .ir-note {
      border-left: none;
      background: transparent;
      border-radius: 0;
      padding: 0;
      font-size: var(--text-lg);
      color: var(--color-gray-600);
      line-height: 1.68;
      margin: 16px 0;
    }

    .ir-note--warning {
      font-size: var(--text-lg);
      line-height: 1.68;
      color: var(--color-gray-600);
    }

    .ir-grid-title {
      margin: 32px 0 12px;
      font-size: var(--text-lg);
      color: var(--c-ink-soft);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.09em;
    }

    .ir-kpi-grid,
    .ir-revenue-grid,
    .ir-daily-grid,
    .ir-health-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 22px;
      margin: 0 0 30px;
    }

    .ir-kpi-card,
    .ir-revenue-card,
    .ir-health-card {
      border: 1px solid var(--c-border);
      border-radius: var(--radius-md);
      background: #ffffff;
      padding: 15px;
      min-height: 108px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .ir-kpi-value,
    .ir-revenue-value,
    .ir-health-value {
      font-size: clamp(23px, 2.1vw, 31px);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #162432;
      line-height: 1.05;
    }

    .ir-kpi-label,
    .ir-revenue-label,
    .ir-health-label {
      margin-top: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #27274a;
      opacity: 0.6;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .ir-kpi-sub,
    .ir-revenue-sub,
    .ir-health-sub {
      margin-top: 6px;
      font-size: 12px;
      color: var(--c-ink-soft);
      font-weight: bold;
      letter-spacing: 0.02em
    }

    .positive {
      color: var(--c-positive);
    }

    .negative {
      color: var(--c-negative);
    }

    .ir-table-wrap {
      margin: 8px 0 22px;
      overflow-x: auto;
      border: 1px solid var(--c-border);
      border-radius: var(--radius-md);
    }

    .ir-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 640px;
      background: #ffffff;
    }

    .ir-table thead th {
      background: #f5f5ff;
      color: var(--color-gray-600);
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-weight: 700;
      text-align: right;
      padding: 12px 14px;
      border-bottom: 1px solid var(--c-border);
    }

    .ir-table thead th:first-child,
    .ir-table tbody td:first-child {
      text-align: left;
      width: 46%;
    }

    .ir-table tbody td {
      padding: 11px 14px;
      border-bottom: 1px solid #ededfc;
      font-size: var(--text-lg);
      text-align: right;
      color: var(--color-gray-600);
    }

    .ir-table tbody tr.bold td {
      font-weight: 700;
      background: #f9f9ff;
    }

    .ir-table tbody tr.total td {
      font-weight: 700;
      color: #7a271a;
      background: #fff6f5;
    }

    .ir-table tbody tr:last-child td {
      border-bottom: none;
    }

    .ir-closing-note {
      margin-top: 8px;
      border-radius: var(--radius-md);
      border: 1px solid #c8cbf0;
      padding: 16px;
      color: #2e2e5c;
      line-height: 1.65;
      background: #f7f7ff;
    }

    .ir-signoff {
      margin-top: 10px;
      border: 1px solid var(--c-border);
      border-radius: var(--radius-xl);
      padding: 26px;
      background: linear-gradient(180deg, #ffffff 0%, #f8f8ff 100%);
      color: var(--color-gray-600);
      font-size: var(--text-lg);
    }

    .ir-signoff p {
      margin: 0 0 12px;
      line-height: 1.65;
      font-size: var(--text-lg);
    }

    .ir-signoff-team,
    .ir-signoff-names {
      font-weight: 700;
      margin-bottom: 4px;
    }

    @media (min-width: 900px) {
      .ir-kpi-grid,
      .ir-revenue-grid,
      .ir-daily-grid,
      .ir-health-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    @media (max-width: 720px) {
      .bc-navbar { padding: 12px 0; }
      .bc-navbar-logo { height: 24px; }
      .bc-card { padding: 20px; border-radius: 14px; }
      .bc-card-title { font-size: 20px; }
      .bc-page { padding: 0 12px; }
      .ir-page { padding: 0 12px 50px; }
    }
  </style>
</head>
<body>
  <div style="min-height:100vh;background:#ffffff">
    <!-- Navbar (matches www2.beycome.com/calculators) -->
    <nav class="bc-navbar">
      <div class="bc-navbar-inner">
        <div class="bc-navbar-left"></div>
        <div class="bc-navbar-center">
          <a href="/" aria-label="Beycome">
            <img src="/assets/logo.svg" alt="Beycome" class="bc-navbar-logo">
          </a>
        </div>
        <div class="bc-navbar-right">
          <a class="bc-navbar-link" href="?logout" aria-label="Log out">
            <span>Log out</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </a>
        </div>
      </div>
    </nav>

    <!-- Hero (63px title, 22px subtitle, Gunmetal/grey — calculator style) -->
    <section class="bc-hero">
      <h1 class="bc-hero-title">Beycome<br>Investor Portal</h1>
      <p class="bc-hero-subtitle">Quarterly and monthly operating updates.</p>
    </section>

    <!-- Report Cards (page width 1152px) -->
    <div class="bc-page" style="padding-bottom:64px">
      <!-- 3 report cards side by side at desktop, stacked on mobile -->
      <div class="bc-report-grid">

        <!-- Q1 2026 -->
        <div class="bc-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;gap:12px">
            <div>
              <div class="bc-card-title">Q1 2026</div>
              <div class="bc-card-sub">January – March 2026</div>
            </div>
            <span class="bc-badge">Latest</span>
          </div>
          <div style="display:flex;gap:24px;align-items:baseline;flex-wrap:wrap">
            <div>
              <div style="font-size:28px;font-weight:700;color:var(--c-accent);line-height:1.1">$575,031</div>
              <div style="font-size:var(--text-lg);color:var(--c-secondary);margin-top:2px">Revenue</div>
            </div>
            <div>
              <div style="font-size:18px;font-weight:700;color:var(--c-green);line-height:1.1">+60% YoY</div>
              <div style="font-size:var(--text-lg);color:var(--c-secondary);margin-top:2px">Growth</div>
            </div>
          </div>
          <div style="margin-top:14px;font-size:var(--text-lg);color:var(--c-secondary);line-height:1.5">2,854 listing clients · 30.3mo runway · 86% gross margin</div>
          <div style="display:flex;gap:10px;margin-top:20px;padding-top:20px;border-top:1px solid rgba(21,35,48,0.08);flex-wrap:wrap;margin-top:auto">
            <a href="/q1-2026.php" class="bc-btn-primary" style="flex:1;justify-content:center;min-width:0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </a>
            <a href="javascript:void(0)" onclick="var w=window.open('/q1-2026.php','_blank');w.addEventListener('load',function(){w.print()})" class="bc-btn-ghost" style="flex:1;justify-content:center;min-width:0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              PDF
            </a>
          </div>
        </div>

        <!-- Feb 2026 -->
        <div class="bc-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;gap:12px">
            <div>
              <div class="bc-card-title">February 2026</div>
              <div class="bc-card-sub">Monthly Update</div>
            </div>
          </div>
          <div style="display:flex;gap:24px;align-items:baseline;flex-wrap:wrap">
            <div>
              <div style="font-size:28px;font-weight:700;color:var(--c-accent);line-height:1.1">$155,971</div>
              <div style="font-size:var(--text-lg);color:var(--c-secondary);margin-top:2px">Revenue</div>
            </div>
            <div>
              <div style="font-size:18px;font-weight:700;color:var(--c-green);line-height:1.1">+34.5% YoY</div>
              <div style="font-size:var(--text-lg);color:var(--c-secondary);margin-top:2px">Growth</div>
            </div>
          </div>
          <div style="margin-top:14px;font-size:var(--text-lg);color:var(--c-secondary);line-height:1.5">812 listing clients · 29mo runway · 87% gross margin</div>
          <div style="display:flex;gap:10px;margin-top:20px;padding-top:20px;border-top:1px solid rgba(21,35,48,0.08);flex-wrap:wrap;margin-top:auto">
            <a href="/feb-2026.php" class="bc-btn-primary" style="flex:1;justify-content:center;min-width:0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </a>
            <a href="javascript:void(0)" onclick="var w=window.open('/feb-2026.php','_blank');w.addEventListener('load',function(){w.print()})" class="bc-btn-ghost" style="flex:1;justify-content:center;min-width:0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              PDF
            </a>
          </div>
        </div>

        <!-- FY 2025 & Jan 2026 -->
        <div class="bc-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;gap:12px">
            <div>
              <div class="bc-card-title">FY 2025</div>
              <div class="bc-card-sub">Annual Review + January</div>
            </div>
          </div>
          <div style="display:flex;gap:24px;align-items:baseline;flex-wrap:wrap">
            <div>
              <div style="font-size:28px;font-weight:700;color:var(--c-accent);line-height:1.1">$173,148</div>
              <div style="font-size:var(--text-lg);color:var(--c-secondary);margin-top:2px">Jan Revenue</div>
            </div>
          </div>
          <div style="margin-top:14px;font-size:var(--text-lg);color:var(--c-secondary);line-height:1.5">832 listing clients · FY 2025 annual summary included</div>
          <div style="display:flex;gap:10px;margin-top:20px;padding-top:20px;border-top:1px solid rgba(21,35,48,0.08);flex-wrap:wrap;margin-top:auto">
            <a href="/fy-2025.php" class="bc-btn-primary" style="flex:1;justify-content:center;min-width:0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </a>
            <a href="javascript:void(0)" onclick="var w=window.open('/fy-2025.php','_blank');w.addEventListener('load',function(){w.print()})" class="bc-btn-ghost" style="flex:1;justify-content:center;min-width:0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              PDF
            </a>
          </div>
        </div>

      </div><!-- /.bc-report-grid -->

      <!-- Uploaded Documents -->
      <?php
      $docs_meta = __DIR__ . '/docs/files.json';
      $docs = file_exists($docs_meta) ? json_decode(file_get_contents($docs_meta), true) : [];
      if (!empty($docs)) :
          // Group by category
          $grouped = [];
          foreach ($docs as $d) { $grouped[$d['category']][] = $d; }
      ?>
      <div class="bc-card">
        <div style="font-size:20px;font-weight:700;color:var(--c-primary);margin-bottom:20px">Financial Documents</div>
        <?php foreach ($grouped as $cat => $cat_docs) : ?>
        <div style="margin-bottom:20px">
          <div style="font-size:var(--text-lg);font-weight:700;color:var(--c-secondary);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:10px"><?php echo htmlspecialchars($cat); ?></div>
          <?php foreach ($cat_docs as $doc) :
              $ext = strtoupper($doc['ext']);
              $size = $doc['size'] > 1048576 ? round($doc['size']/1048576, 1).'MB' : round($doc['size']/1024).'KB';
              $colors = ['PDF'=>'#b42318','XLSX'=>'#2e7d32','PPTX'=>'#e65100','DOCX'=>'#1565c0','CSV'=>'#7b1fa2','MP4'=>'#5b21b6','MOV'=>'#5b21b6','WEBM'=>'#5b21b6','M4V'=>'#5b21b6','AVI'=>'#5b21b6','MKV'=>'#5b21b6'];
              $color = $colors[$ext] ?? '#5a627a';
          ?>
          <a href="/docs/<?php echo htmlspecialchars($doc['filename']); ?>" download style="display:flex;align-items:center;gap:12px;padding:12px 16px;border:1px solid var(--c-border);border-radius:10px;text-decoration:none;margin-bottom:8px;transition:background 0.15s,border-color 0.15s">
            <div style="width:36px;height:36px;border-radius:8px;background:<?php echo $color; ?>15;display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="<?php echo $color; ?>" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-size:var(--text-lg);font-weight:600;color:var(--c-primary)"><?php echo htmlspecialchars($doc['label']); ?></div>
              <div style="font-size:12px;color:var(--c-secondary)"><?php echo $ext; ?> · <?php echo $size; ?></div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" stroke-width="2" style="flex-shrink:0"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
          <?php endforeach; ?>
        </div>
        <?php endforeach; ?>
      </div>
      <?php endif; ?>

    </div><!-- /.bc-page -->

    <!-- Small legal footer -->
    <footer class="bc-legal-footer">
      <div class="bc-legal-footer-inner">
        <div class="bc-legal-footer-title">Confidentiality &amp; Legal Notice</div>
        <p>This portal contains confidential and proprietary information of Beycome Corp. and is intended solely for the use of authorized investors and prospective investors of Beycome. Access to this portal is restricted and subject to applicable confidentiality obligations.</p>
        <p>If you have accessed this portal in error, you are not authorized to review, use, copy, disclose, or distribute any of the information contained herein. Please exit immediately and notify us at <a href="mailto:policy@beycome.com">policy@beycome.com</a> so that we can take appropriate action.</p>
        <p>All content, materials, data, financial information, projections, and communications available through this portal are provided for informational purposes only and do not constitute an offer to sell, a solicitation of an offer to buy, or a recommendation to invest in any securities. Any investment in Beycome is subject to formal documentation, applicable securities laws, and investor qualification requirements.</p>
        <p>By continuing to access this portal, you acknowledge and agree to maintain the confidentiality of all information contained herein and to use such information solely for evaluation purposes related to a potential or existing investment in Beycome.</p>
        <div class="bc-legal-footer-contact">Questions or feedback — <a href="mailto:nj@beycome.com">nj@beycome.com</a> &amp; <a href="mailto:cyril@beycome.com">cyril@beycome.com</a></div>
      </div>
    </footer>

    <style>
      .bc-legal-footer {
        margin-top: 48px;
        padding: 28px 16px;
        border-top: 1px solid hsla(0, 0%, 88%, 1);
        background: #f9fafb;
      }
      .bc-legal-footer-inner {
        max-width: 1152px;
        margin: 0 auto;
        font-family: Roboto, "Segoe UI", "Helvetica Neue", sans-serif;
        font-size: 12px;
        line-height: 1.55;
        color: hsla(210, 38.9%, 14.1%, 0.7);
      }
      .bc-legal-footer-title {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: hsla(210, 39%, 14%, 1);
        margin-bottom: 10px;
      }
      .bc-legal-footer p {
        margin: 0 0 8px;
      }
      .bc-legal-footer a {
        color: var(--c-accent);
        text-decoration: none;
      }
      .bc-legal-footer a:hover { text-decoration: underline; }
      .bc-legal-footer-contact {
        margin-top: 12px;
        padding-top: 10px;
        border-top: 1px solid hsla(0, 0%, 88%, 1);
        font-size: 12px;
      }
    </style>
  </div>

  <style>
    /* Remove legacy hover rule — .bc-btn-primary and .bc-btn-ghost manage their own hover */
  </style>
</body>
</html>
