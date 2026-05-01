<?php
// phpcs:ignoreFile
session_start();
if (empty($_SESSION['ir_auth'])) { header('Location: /'); exit; }

if (false) {
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
  <title>Beycome Investor Report | Q1 2026</title>
  <meta name="description" content="Beycome Investor Report - Q1 2026 (January - March)">
  <style>
    @font-face { font-family:Roboto; font-style:normal; font-weight:400; font-display:swap; src:url('/assets/roboto-400.woff2') format('woff2'); }
    @font-face { font-family:Roboto; font-style:normal; font-weight:600; font-display:swap; src:url('/assets/roboto-700.woff2') format('woff2'); }
    @font-face { font-family:Roboto; font-style:normal; font-weight:700; font-display:swap; src:url('/assets/roboto-700.woff2') format('woff2'); }

    :root {
      /* calculator design tokens */
      --c-bg: #ffffff;
      --c-surface: #f9fafb;
      --c-primary: hsla(210, 39%, 14%, 1);
      --c-secondary: hsla(210, 38.9%, 14.1%, 0.7);
      --c-tertiary: #4a5056;
      --c-ink: var(--c-primary);
      --c-ink-soft: var(--c-secondary);
      --c-border: hsla(0, 0%, 88%, 1);
      --c-accent: #5a6ad4;
      --c-accent-soft: rgba(90, 106, 212, 0.1);
      --text-lg: 1.125rem;                        /* 18px */
      --color-gray-600: #4b5563;                  /* Tailwind gray-600 */
      --c-negative: #bb4b43;
      --c-positive: hsla(137, 28%, 49%, 1);
      --shadow-lg: 0 1px 3px 0 rgba(21, 35, 48, 0.04), 0 4px 20px -4px rgba(21, 35, 48, 0.06);
      --shadow-sm: 0 1px 3px 0 rgba(21, 35, 48, 0.04), 0 4px 20px -4px rgba(21, 35, 48, 0.06);
      --radius-xl: 22px;
      --radius-lg: 16px;
      --radius-md: 12px;
      --radius-sm: 10px;
    }

    * { box-sizing: border-box; }

    html, body {
      margin: 0;
      padding: 0;
      font-family: Roboto, "Segoe UI", "Helvetica Neue", sans-serif;
      background: #ffffff;
      color: var(--c-ink);
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }

    /* Calculator-style navbar */
    .ir-header {
      position: relative;
      background: #ffffff;
      padding: 16px 24px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .ir-header-left { display: flex; align-items: center; }
    .ir-header-center { display: flex; align-items: center; justify-content: center; }
    .ir-header-right { display: flex; align-items: center; gap: 10px; }

    .ir-header-logo {
      height: 28px;
      width: auto;
      display: block;
    }

    .ir-header-divider, .ir-header-title { display: none; }

    .ir-header-exit {
      border: none;
      background: transparent;
      color: var(--c-primary);
      padding: 6px 10px;
      font-weight: 500;
      font-size: var(--text-lg);
      font-family: inherit;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      transition: color 0.15s;
      flex-shrink: 0;
    }
    .ir-header-exit:hover { color: var(--c-accent); }
    .ir-print-btn { color: var(--c-accent); }

    .ir-page {
      max-width: 1152px;
      margin: 0 auto;
      padding: 0 16px 64px;
    }

    /* Calculator-style hero */
    .ir-hero {
      padding: 64px 16px 48px;
      background: #ffffff;
      box-shadow: none;
      color: var(--c-primary);
      margin: 0 auto 24px;
      text-align: center;
    }
    .ir-hero-label {
      display: inline-block;
      padding: 0;
      background: transparent;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: none;
      color: var(--c-secondary);
      margin-bottom: 14px;
    }
    .ir-hero-title {
      margin: 0 0 24px;
      font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-size: 63px;
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: normal;
      color: var(--c-primary);
    }
    .ir-hero-subtitle {
      margin: 0 auto;
      font-family: Roboto, "Segoe UI", "Helvetica Neue", sans-serif;
      font-size: 22px;
      line-height: 1.5;
      color: var(--c-tertiary);
      max-width: 672px;
    }
    @media (max-width: 720px) {
      .ir-hero { padding: 40px 16px 32px; }
      .ir-hero-title { font-size: 40px; }
      .ir-hero-subtitle { font-size: 18px; }
    }

    /* Calculator-style section cards */
    .ir-section {
      background: var(--c-surface);
      border-radius: 16px;
      padding: 28px 28px;
      box-shadow: none;
      margin-bottom: 22px;
    }
    @media (min-width: 600px) {
      .ir-section { padding: 32px 36px; }
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
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    @media (min-width: 700px) {
      .ir-yoy-banner { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    .ir-yoy-card {
      border-radius: var(--radius-lg);
      border: 1px solid var(--c-border);
      background: #ffffff;
      padding: 20px;
      display: flex;
      gap: 14px;
      align-items: center;
      color: var(--c-accent);
    }

    .ir-yoy-value {
      font-size: clamp(28px, 3vw, 40px);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.03em;
      color: var(--c-accent);
    }

    .ir-yoy-label {
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--c-accent);
    }

    .ir-yoy-sub {
      margin-top: 4px;
      color: var(--c-accent);
      font-size: 13px;
      opacity: 0.75;
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

    /* Org chart modal */
    .ir-org-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(20, 22, 60, 0.55);
      backdrop-filter: blur(6px);
      align-items: flex-start;
      justify-content: center;
      padding: 40px 16px;
      overflow-y: auto;
    }
    .ir-org-overlay.active { display: flex; }

    .ir-org-modal {
      background: #fff;
      border-radius: var(--radius-xl);
      box-shadow: 0 32px 80px rgba(20, 22, 60, 0.22);
      max-width: 1100px;
      width: 100%;
      padding: 36px 32px 32px;
      position: relative;
      animation: orgFadeIn 0.25s ease;
    }
    @keyframes orgFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

    .ir-org-close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid var(--c-border);
      background: #fff;
      cursor: pointer;
      display: grid;
      place-items: center;
      transition: background 0.15s;
    }
    .ir-org-close:hover { background: #f3f3ff; }

    .ir-org-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .ir-org-subtitle {
      font-size: var(--text-lg);
      color: var(--c-ink-soft);
      margin-bottom: 28px;
    }

    /* Org tree */
    .org-tree { display: flex; flex-direction: column; align-items: center; gap: 0; }

    .org-person {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      min-width: 120px;
    }
    .org-card {
      border: 1.5px solid var(--c-border);
      border-radius: 14px;
      padding: 14px 18px;
      background: #fff;
      min-width: 150px;
      text-align: center;
      transition: box-shadow 0.15s, border-color 0.15s;
    }
    .org-card:hover { box-shadow: 0 4px 16px rgba(90, 106, 212, 0.12); border-color: #b0b8f0; }
    .org-card.ceo { border-color: var(--c-accent); background: linear-gradient(160deg, #f0f1ff, #fff); }
    .org-card.vp { border-color: #a5aef9; background: #f8f8ff; min-height: 100px; min-width: 140px; max-width: 180px; flex: 1 1 140px; display: flex; flex-direction: column; align-items: center; justify-content: center; }

    .org-name { font-size: var(--text-lg); font-weight: 700; color: var(--c-ink); }
    .org-role { font-size: 12px; color: var(--c-ink-soft); margin-top: 2px; }
    .org-badge {
      display: inline-block;
      margin-top: 6px;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .org-badge.fte { background: #e8f5ec; color: #2e7d32; }
    .org-badge.contractor { background: #fff3e0; color: #e65100; }
    .org-badge.pt { background: #f3e5f5; color: #7b1fa2; }

    /* Connector lines */
    .org-connector {
      width: 2px;
      height: 24px;
      background: var(--c-border);
      margin: 0 auto;
    }
    .org-h-line {
      height: 2px;
      background: var(--c-border);
    }

    .org-branch {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      position: relative;
    }
    .org-branch-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }

    .org-dept {
      margin-top: 32px;
      width: 100%;
    }
    .org-dept-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--c-accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 16px;
      text-align: center;
    }

    .org-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .org-card-sm {
      border: 1px solid var(--c-border);
      border-radius: 10px;
      padding: 10px 14px;
      background: #fff;
      text-align: center;
      min-width: 140px;
      flex: 1 1 140px;
      max-width: 180px;
    }
    .org-card-sm .org-name { font-size: 13px; }
    .org-card-sm .org-role { font-size: 11px; }

    .org-ghost {
      border: 1.5px dashed #d5d8f0;
      border-radius: 10px;
      padding: 10px 14px;
      background: #fafaff;
      text-align: center;
      min-width: 140px;
      flex: 1 1 140px;
      max-width: 180px;
    }
    .org-ghost .org-name { font-size: 13px; color: var(--c-ink-soft); }
    .org-ghost .org-role { font-size: 11px; }

    /* Top-level departments grid */
    .org-departments {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-top: 28px;
    }
    .org-dept-box {
      border: 1px solid #e8eaff;
      border-radius: 16px;
      padding: 20px 16px 16px;
      background: #fafaff;
    }

    .ir-kpi-card.clickable {
      cursor: pointer;
      transition: box-shadow 0.15s, border-color 0.15s;
    }
    .ir-kpi-card.clickable:hover {
      border-color: var(--c-accent);
      box-shadow: 0 4px 16px rgba(90, 106, 212, 0.15);
    }

    @media (max-width: 900px) {
      .org-departments { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 600px) {
      .org-departments { grid-template-columns: 1fr; }
      .ir-org-modal { padding: 24px 16px 20px; }
      .org-branch { gap: 10px; }
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
      .ir-header { padding: 12px 14px; }
      .ir-header-logo { height: 24px; }
      .ir-header-exit { padding: 6px 8px; font-size: 13px; }
      .ir-page { padding: 0 12px 50px; }
      .ir-section { border-radius: 14px; padding: 20px; }
      .ir-signoff { border-radius: 14px; padding: 18px; }
    }

    @media print {
      html, body { background: #fff !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      #investor-report-container { position: static !important; overflow: visible !important; }
      .ir-header { position: static !important; box-shadow: none !important; backdrop-filter: none !important; background: #fff !important; padding: 10px 20px !important; }
      .ir-header-exit, .ir-print-btn { display: none !important; }
      .ir-page { padding: 0 10px !important; max-width: 100% !important; }
      .ir-hero { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; padding: 24px 28px !important; margin-bottom: 12px !important; }
      .ir-section { box-shadow: none !important; border: 1px solid #e0e0e0; padding: 20px 24px !important; margin-bottom: 10px !important; }
      .ir-section-header { margin-bottom: 14px !important; }
      .ir-signoff { box-shadow: none !important; padding: 16px 20px !important; margin-top: 6px !important; }
      .ir-kpi-grid, .ir-revenue-grid, .ir-health-grid { gap: 10px !important; margin-bottom: 14px !important; grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
      .ir-kpi-card, .ir-revenue-card, .ir-health-card { min-height: auto !important; padding: 10px 12px !important; }
      .ir-kpi-value, .ir-revenue-value, .ir-health-value { font-size: 20px !important; }
      .ir-table { min-width: auto !important; font-size: 12px !important; }
      .ir-table thead th { padding: 8px 10px !important; font-size: 11px !important; }
      .ir-table tbody td { padding: 7px 10px !important; font-size: 12px !important; }
      .ir-table-wrap { margin: 6px 0 12px !important; }
      .ir-text { font-size: var(--text-lg) !important; margin-bottom: 8px !important; line-height: 1.5 !important; }
      .ir-note { padding: 10px 12px !important; margin: 8px 0 !important; font-size: 12px !important; }
      .ir-subsection-title { margin: 16px 0 8px !important; font-size: 13px !important; }
      .ir-grid-title { margin: 10px 0 !important; font-size: 13px !important; }
      .ir-yoy-banner { margin: 14px 0 !important; gap: 10px !important; }
      .ir-yoy-card { padding: 12px !important; }
      .ir-org-overlay { display: none !important; }
      .ir-section-title { font-size: 22px !important; }
      .ir-hero-title { font-size: 32px !important; }
      a { color: inherit !important; text-decoration: none !important; }
      /* Allow sections to break across pages to avoid gaps */
      .ir-section, .ir-hero, .ir-signoff, .ir-note, .ir-table-wrap { break-inside: auto; }
      .ir-section-header, .ir-kpi-card, .ir-revenue-card, .ir-health-card { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div id="investor-report-container" style="display: block; position: fixed; inset: 0px; z-index: 2000; background: #ffffff; overflow-y: auto;">
    <div class="ir-header">
      <div class="ir-header-left" style="flex:1;min-width:0"></div>
      <div class="ir-header-center">
        <a href="/" aria-label="Beycome" style="display:inline-block;line-height:0">
          <img src="/assets/logo.svg" alt="Beycome" class="ir-header-logo">
        </a>
      </div>
      <div class="ir-header-right" style="flex:1;display:flex;align-items:center;justify-content:flex-end;gap:10px">
        <button onclick="window.print()" class="ir-header-exit ir-print-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print / PDF
        </button>
        <a class="ir-header-exit" href="/" aria-label="Back to reports">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Back
        </a>
      </div>
    </div>

    <div class="ir-page">
      <div class="ir-hero">
        <h1 class="ir-hero-title">Beycome Investor Report<br>Q1 2026</h1>
        <div class="ir-hero-subtitle">AI-first real estate platform | Quarterly operating update</div>
      </div>

      <!-- 01 EXECUTIVE SUMMARY -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">01</span>
          <h2 class="ir-section-title">Executive Summary</h2>
        </div>
        <div class="ir-subsection-title">Overview</div>
        <p class="ir-text">Q1 2026 consolidated revenue was $575,031 (QuickBooks, accrual basis), up 60% from $359,661 in Q1 2025 and up 67% from $343,950 in Q4 2025. The quarter had 2,854 listing clients — up 38.3% versus 2,064 in Q4 2025. Gross margin was 86% for the quarter. Net loss was ($191,694), representing a -33% net margin. A notable highlight: Concierge saw a significant ramp following a pricing and model change — 49 concierge clients in Q1 2026 versus 11 in Q4 2025 and 11 in Q1 2025, generating $51.7K in revenue.</p>
        <p class="ir-text">Platform traffic continued to compound. Active users grew from 64K in January to 134K in March (+109%). Google Search Console impressions reached 4.04M in Q1 (+136% vs. prior period), with 41,503 clicks (+116%). Beycome launched in Virginia in March and expanded Title operations into Texas, with an 18.4% attach rate in the first month. Florida Title attach rate crossed 30% for the first time in March.</p>
        <p class="ir-text">Headcount was 11 FTE plus 16 contractors across CS/MLS, Sales, and Tech. Cash on hand was $1.94M with an estimated runway of 30 months. Q2 2026 revenue targets are $700K listings, $200K title, and $80K buyer.</p>

        <div class="ir-yoy-banner">
          <div class="ir-yoy-card">
            <div class="ir-yoy-value">+60%</div>
            <div class="ir-yoy-detail">
              <div class="ir-yoy-label">Revenue Growth</div>
              <div class="ir-yoy-sub">Q1 2026 vs Q1 2025</div>
            </div>
          </div>
          <div class="ir-yoy-card">
            <div class="ir-yoy-value">$220.3M</div>
            <div class="ir-yoy-detail">
              <div class="ir-yoy-label">Com. Saved</div>
              <div class="ir-yoy-sub">All-time total</div>
            </div>
          </div>
          <div class="ir-yoy-card">
            <div class="ir-yoy-value">19,384</div>
            <div class="ir-yoy-detail">
              <div class="ir-yoy-label">Properties Closed</div>
              <div class="ir-yoy-sub">All-time total</div>
            </div>
          </div>
        </div>

        <div class="ir-note ir-note--warning"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--c-negative);flex-shrink:0;vertical-align:-4px;margin-right:8px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><strong>Note:</strong> Since January 29, new MLS and state-level regulations prohibited wholesale and double-closing listings on Beycome across most U.S. states. This generated a temporary spike in refund activity during Q1 (198 transactions, -$25,360). Management is evaluating alternative listing structures.</div>

        <div class="ir-note ir-note--warning"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--c-negative);flex-shrink:0;vertical-align:-4px;margin-right:8px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><strong>Market headwinds:</strong> The broader real estate market has taken a hit, driven by geopolitical uncertainty following the Iran conflict. Traditional home sales dropped to a nine-month low, down 3.6% month-over-month, while interest rates jumped another 0.4% in just one month.<br><br>We're not avoiding it. And it shows — March, typically slower than April, is set to outperform, with April expected to come in as the lowest month for listing volume.</div>
      </div>

      <!-- 02 KPIs -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">02</span>
          <h2 class="ir-section-title">Key Performance Indicators</h2>
        </div>
        <div class="ir-grid-title">Marketplace</div>
        <div class="ir-kpi-grid">
          <div class="ir-kpi-card"><div class="ir-kpi-value">2,854</div><div class="ir-kpi-label">New Listing Clients</div><div class="ir-kpi-sub positive">+38.3% QoQ · +22.4% YoY</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">$201</div><div class="ir-kpi-label">Avg Rev / Client</div><div class="ir-kpi-sub positive">+20.9% QoQ · +35.2% YoY</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">$2.30M</div><div class="ir-kpi-label">Current ARR</div><div class="ir-kpi-sub">Q1 avg × 12</div></div>
          <div class="ir-kpi-card clickable" onclick="document.getElementById('orgModal').classList.add('active')" title="View org chart"><div style="display:flex;align-items:baseline;gap:12px;justify-content:center"><div style="text-align:center"><div class="ir-kpi-value">11</div><div class="ir-kpi-label">FTE</div></div><div style="text-align:center"><div class="ir-kpi-value">16</div><div class="ir-kpi-label">Contractors</div></div></div><div class="ir-kpi-sub" style="color:var(--c-accent);margin-top:8px">View org chart →</div></div>

          <div class="ir-kpi-card"><div class="ir-kpi-value">4</div><div class="ir-kpi-label">Brokers</div><div class="ir-kpi-sub">Contractors</div></div>
        </div>
        <div class="ir-note"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--c-negative);flex-shrink:0;vertical-align:-4px;margin-right:8px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Despite losing the wholesaler business in Q1, the number of unique owners grew from 1,233 in Q1 2025 to 2,069 in Q1 2026 (+67.8%). Recurring listings dropped from 1,102 to 785 (-28.8%) due to the wholesaler exit.</div>

        <div class="ir-grid-title">Revenue Breakdown</div>
        <div class="ir-revenue-grid">
          <div class="ir-revenue-card"><div class="ir-revenue-value">$259K</div><div class="ir-revenue-label">Basic Listing</div><div class="ir-revenue-sub positive">+32% QoQ · +17% YoY</div></div>
          <div class="ir-revenue-card"><div class="ir-revenue-value">$83K</div><div class="ir-revenue-label">Enhanced Listing</div><div class="ir-revenue-sub positive">+95% QoQ · +115% YoY</div></div>
          <div class="ir-revenue-card"><div class="ir-revenue-value">$52K</div><div class="ir-revenue-label">Concierge</div><div class="ir-revenue-sub positive">+158% QoQ · +156% YoY</div></div>
          <div class="ir-revenue-card"><div class="ir-revenue-value">$28K</div><div class="ir-revenue-label">Buyer Program</div><div class="ir-revenue-sub negative">-19% QoQ · +26% YoY</div></div>
          <div class="ir-revenue-card"><div class="ir-revenue-value">$102K</div><div class="ir-revenue-label">Title</div><div class="ir-revenue-sub positive">+319% QoQ · +204% YoY</div></div>
          <div class="ir-revenue-card"><div class="ir-revenue-value">$51K</div><div class="ir-revenue-label">Other Sell Side</div><div class="ir-revenue-sub positive">+96% QoQ · +118% YoY</div></div>
        </div>

        <div class="ir-grid-title">Financial Health</div>
        <div class="ir-health-grid">
          <div class="ir-health-card"><div class="ir-health-value">$1.94M</div><div class="ir-health-label">Cash Balance*</div><div class="ir-health-sub">Early April 2026</div></div>
          <div class="ir-health-card"><div class="ir-health-value" style="color:var(--c-negative)">($63.9K)</div><div class="ir-health-label">Avg Monthly Burn</div><div class="ir-health-sub">Q1 average</div></div>
          <div class="ir-health-card"><div class="ir-health-value">30.3 mo</div><div class="ir-health-label">Runway</div><div class="ir-health-sub"></div></div>
          <div class="ir-health-card"><div class="ir-health-value">86%</div><div class="ir-health-label">Gross Margin</div><div class="ir-health-sub">Q1 2026</div></div>
        </div>
        <div class="ir-note"><small>* Cash as of early April 2026 (proxy for EoQ1). ARR = Q1 avg monthly rev ($191,677) × 12. Burn = Q1 avg net loss ($63,898/mo).</small></div>
      </div>

      <!-- 03 FINANCIAL STATEMENTS -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">03</span>
          <h2 class="ir-section-title">Financial Statements</h2>
        </div>
        <div style="font-size:var(--text-lg);font-weight:700;margin:16px 0 8px">Commentary</div>
        <ul style="margin:0 0 20px 20px;font-size:var(--text-lg);line-height:1.8;color:var(--c-ink-soft)">
          <li>Listing fees (basic + enhanced) represented 60% of total revenue at $342,314.</li>
          <li>Gross margin was 86% for the quarter. COGS remained low relative to revenue.</li>
          <li>SG&A totaled $688,577 (120% of revenue), driven by people costs and marketing ramp-up.</li>
          <li>Of the $250.3K in S&M, $160.4K was direct traffic investment (advertising + acquisition), up 329% YoY. Non-traffic S&M (broker fees, MLS) was $89.9K, up 91% YoY.</li>
          <li>Net loss of ($191,694), representing a -33% net margin versus -16% in Q1 2025.</li>
        </ul>

        <div class="ir-grid-title">Consolidated P&amp;L — Q1 2025, Q4 2025 &amp; Q1 2026</div>
        <div class="ir-table-wrap">
          <table class="ir-table" style="min-width:700px">
            <thead>
              <tr>
                <th style="text-align:left;width:30%">Line Item</th>
                <th>Q1 2025</th>
                <th>Q4 2025</th>
                <th style="background:#eceeff">Q1 2026</th>
                <th>∆ QoQ</th>
                <th>∆ YoY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Revenue</strong></td>
                <td>$359,661</td>
                <td>$343,950</td>
                <td style="background:#f5f5ff"><strong>$575,031</strong></td>
                <td class="positive">+67%</td>
                <td class="positive">+60%</td>
              </tr>
              <tr>
                <td>Cost of Revenue</td>
                <td>($39,951)</td>
                <td>($68,352)</td>
                <td style="background:#f5f5ff">($78,057)</td>
                <td>+14%</td>
                <td>+95%</td>
              </tr>
              <tr class="bold">
                <td><strong>Gross Profit</strong></td>
                <td>$319,710</td>
                <td>$275,598</td>
                <td style="background:#f5f5ff"><strong>$496,974</strong></td>
                <td class="positive">+80%</td>
                <td class="positive">+55%</td>
              </tr>
              <tr>
                <td><em>% Gross Margin</em></td>
                <td>89%</td>
                <td>80%</td>
                <td style="background:#f5f5ff"><strong>86%</strong></td>
                <td class="positive">+6pp</td>
                <td class="negative">-3pp</td>
              </tr>
              <tr>
                <td>Sales &amp; Marketing</td>
                <td>($84,496)</td>
                <td>($201,077)</td>
                <td style="background:#f5f5ff">($250,337)</td>
                <td>+24%</td>
                <td>+196%</td>
              </tr>
              <tr>
                <td>People</td>
                <td>($144,841)</td>
                <td>($170,802)</td>
                <td style="background:#f5f5ff">($226,828)</td>
                <td>+33%</td>
                <td>+57%</td>
              </tr>
              <tr>
                <td>Other G&amp;A</td>
                <td>($140,391)</td>
                <td>($167,264)</td>
                <td style="background:#f5f5ff">($211,411)</td>
                <td>+26%</td>
                <td>+51%</td>
              </tr>
              <tr class="bold">
                <td><strong>Total SG&amp;A</strong></td>
                <td>($369,728)</td>
                <td>($539,143)</td>
                <td style="background:#f5f5ff"><strong>($688,577)</strong></td>
                <td>+28%</td>
                <td>+86%</td>
              </tr>
              <tr>
                <td>Other Income / Expense</td>
                <td>($7,976)</td>
                <td>($959)</td>
                <td style="background:#f5f5ff">($91)</td>
                <td></td>
                <td></td>
              </tr>
              <tr class="total">
                <td><strong>Net Income</strong></td>
                <td>($57,993)</td>
                <td>($264,504)</td>
                <td style="background:#fff0ef"><strong>($191,694)</strong></td>
                <td class="positive">+44pp</td>
                <td class="negative">-17pp</td>
              </tr>
              <tr>
                <td><em>% Net Margin</em></td>
                <td>-16%</td>
                <td>-77%</td>
                <td style="background:#f5f5ff"><strong>-33%</strong></td>
                <td class="positive">+44pp</td>
                <td class="negative">-17pp</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="ir-grid-title">Revenue by Product</div>
        <div class="ir-table-wrap">
          <table class="ir-table" style="min-width:540px">
            <thead>
              <tr>
                <th style="text-align:left;width:46%">Product</th>
                <th>Q4 2025</th>
                <th style="background:#eceeff">Q1 2026</th>
                <th>∆ QoQ</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bold">
                <td><strong>Sell Side</strong></td>
                <td>$285,035</td>
                <td style="background:#f5f5ff"><strong>$445,051</strong></td>
                <td class="positive">+56%</td>
              </tr>
              <tr>
                <td>&nbsp;&nbsp;&nbsp;Basic Listing</td>
                <td>$196,328</td>
                <td style="background:#f5f5ff">$258,974</td>
                <td class="positive">+32%</td>
              </tr>
              <tr>
                <td>&nbsp;&nbsp;&nbsp;Enhanced Listing</td>
                <td>$42,693</td>
                <td style="background:#f5f5ff">$83,340</td>
                <td class="positive">+95%</td>
              </tr>
              <tr>
                <td>&nbsp;&nbsp;&nbsp;Concierge</td>
                <td>$19,996</td>
                <td style="background:#f5f5ff">$51,674</td>
                <td class="positive">+158%</td>
              </tr>
              <tr>
                <td>&nbsp;&nbsp;&nbsp;Other Sell Side</td>
                <td>$26,018</td>
                <td style="background:#f5f5ff">$51,062</td>
                <td class="positive">+96%</td>
              </tr>
              <tr>
                <td><strong>Buy Side</strong></td>
                <td>$34,613</td>
                <td style="background:#f5f5ff">$28,099</td>
                <td class="negative">-19%</td>
              </tr>
              <tr>
                <td><strong>Title</strong></td>
                <td>$24,303</td>
                <td style="background:#f5f5ff"><strong>$101,881</strong></td>
                <td class="positive">+319%</td>
              </tr>
              <tr class="bold">
                <td><strong>Total Revenue</strong></td>
                <td>$343,950</td>
                <td style="background:#f5f5ff"><strong>$575,031</strong></td>
                <td class="positive">+67%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="ir-note"><small>Revenue figures may differ from product-level totals — see Revenue by Product table.</small></div>
      </div>

      <!-- 04 BEYCOME TITLE -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">04</span>
          <h2 class="ir-section-title">Beycome Title</h2>
        </div>
        <div class="ir-kpi-grid">
          <div class="ir-kpi-card"><div class="ir-kpi-value">30.4%</div><div class="ir-kpi-label">FL Attach Rate (Mar)</div><div class="ir-kpi-sub"></div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">18.4%</div><div class="ir-kpi-label">TX Attach Rate (Mar)</div><div class="ir-kpi-sub" style="color:var(--c-accent)">First month live</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">193</div><div class="ir-kpi-label">Title Prepaids (Q1 2026)</div><div class="ir-kpi-sub positive">+93% vs Q4 (100) · +972% vs Q1 2025 (18)</div></div>
        </div>

        <div class="ir-grid-title">Title Monthly Breakdown — Q1 2026</div>
        <div class="ir-table-wrap">
          <table class="ir-table" style="min-width:480px">
            <thead>
              <tr>
                <th style="text-align:left;width:40%">Metric</th>
                <th>Jan</th>
                <th>Feb</th>
                <th>Mar</th>
                <th style="background:#eceeff">Q1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Prepaid</td>
                <td>46</td>
                <td>57</td>
                <td>90</td>
                <td style="background:#f5f5ff"><strong>193</strong></td>
              </tr>
              <tr>
                <td>Under Contract</td>
                <td>25</td>
                <td>17</td>
                <td>42</td>
                <td style="background:#f5f5ff"><strong>84</strong></td>
              </tr>
              <tr>
                <td>Funded</td>
                <td>13</td>
                <td>13</td>
                <td>12</td>
                <td style="background:#f5f5ff"><strong>38</strong></td>
              </tr>
              <tr>
                <td>Avg Rev / Deal</td>
                <td>$2,908</td>
                <td>$2,347</td>
                <td>$3,021</td>
                <td style="background:#f5f5ff"><strong>$2,759</strong></td>
              </tr>
              <tr class="bold">
                <td><strong>Closed Revenue</strong></td>
                <td>$35,740</td>
                <td>$28,361</td>
                <td>$37,780</td>
                <td style="background:#f5f5ff"><strong>$101,881</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 05 BUYER PROGRAM -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">05</span>
          <h2 class="ir-section-title">Buyer Program</h2>
        </div>
        <div class="ir-table-wrap">
          <table class="ir-table" style="min-width:480px">
            <thead>
              <tr>
                <th style="text-align:left;width:40%">Metric</th>
                <th>Jan</th>
                <th>Feb</th>
                <th>Mar</th>
                <th style="background:#eceeff">Q1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Broker Agreements</td>
                <td>5</td>
                <td>8</td>
                <td>14</td>
                <td style="background:#f5f5ff"><strong>27</strong></td>
              </tr>
              <tr>
                <td>Visits Scheduled</td>
                <td>21</td>
                <td>4</td>
                <td>15</td>
                <td style="background:#f5f5ff"><strong>40</strong></td>
              </tr>
              <tr>
                <td>Offers Submitted</td>
                <td>8</td>
                <td>12</td>
                <td>22</td>
                <td style="background:#f5f5ff"><strong>42</strong></td>
              </tr>
              <tr>
                <td>Under Contract</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td style="background:#f5f5ff"><strong>9</strong></td>
              </tr>
              <tr>
                <td>Closed</td>
                <td>2</td>
                <td>1</td>
                <td>1</td>
                <td style="background:#f5f5ff"><strong>4</strong></td>
              </tr>
              <tr class="bold">
                <td><strong>Revenue</strong></td>
                <td>$11,600</td>
                <td>$6,499</td>
                <td>$10,000</td>
                <td style="background:#f5f5ff"><strong>$28,099</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 06 SEO & MARKETING -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">06</span>
          <h2 class="ir-section-title">SEO &amp; Marketing</h2>
        </div>
        <div class="ir-grid-title">Google Search Console — Q1 2026</div>
        <div class="ir-kpi-grid">
          <div class="ir-kpi-card"><div class="ir-kpi-value">4.04M</div><div class="ir-kpi-label">Impressions</div><div class="ir-kpi-sub positive">+136%</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">41,503</div><div class="ir-kpi-label">Clicks</div><div class="ir-kpi-sub positive">+116%</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">64K</div><div class="ir-kpi-label">Active Users (Jan)</div><div class="ir-kpi-sub positive">+190% vs Dec</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">96K</div><div class="ir-kpi-label">Active Users (Feb)</div><div class="ir-kpi-sub positive">+50% vs Jan</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">134K</div><div class="ir-kpi-label">Active Users (Mar)</div><div class="ir-kpi-sub positive">+109% vs Jan</div></div>
        </div>
        <div class="ir-note"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--c-negative);flex-shrink:0;vertical-align:-4px;margin-right:8px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Q1 total: 289K active users, 285K new users. March active users up 109% versus January, reflecting organic and SEO momentum.</div>
        <div class="ir-grid-title">Listing Acquisition by Channel — Q1 2026</div>
        <div class="ir-kpi-grid">
          <div class="ir-kpi-card"><div class="ir-kpi-value">861</div><div class="ir-kpi-label">Organic</div><div class="ir-kpi-sub positive">+80% YoY (478)</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">843</div><div class="ir-kpi-label">PPC Direct</div><div class="ir-kpi-sub positive">+169% YoY (313)</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">365</div><div class="ir-kpi-label">PPC + Organic w/ Sales Team</div><div class="ir-kpi-sub"></div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">785</div><div class="ir-kpi-label">Recurring</div><div class="ir-kpi-sub negative">-28.8% YoY (1,102)</div></div>
        </div>
        <div class="ir-grid-title">PPC Direct Acquisition — Q1 2026</div>
        <div class="ir-kpi-grid">
          <div class="ir-kpi-card"><div class="ir-kpi-value">843</div><div class="ir-kpi-label">Listings</div><div class="ir-kpi-sub positive">+4.5% QoQ · +111% YoY</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">$152.52</div><div class="ir-kpi-label">Avg Rev / Listing</div><div class="ir-kpi-sub"><span class="positive">+12.6% QoQ</span> · <span class="negative">-10.7% YoY</span></div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">$87.21</div><div class="ir-kpi-label">CPL</div><div class="ir-kpi-sub positive">-14.5% QoQ · -1.8% YoY · 3.5× ROI</div></div>
        </div>
        <div class="ir-grid-title">Paid Acquisition — Q1 2025</div>
        <div class="ir-kpi-grid">
          <div class="ir-kpi-card"><div class="ir-kpi-value">399</div><div class="ir-kpi-label">Listings</div><div class="ir-kpi-sub"></div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">$170.78</div><div class="ir-kpi-label">Avg Rev / Listing</div><div class="ir-kpi-sub"></div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">$88.83</div><div class="ir-kpi-label">CPL</div><div class="ir-kpi-sub"></div></div>
        </div>
      </div>

      <!-- 06 PRODUCT & TECHNOLOGY -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">07</span>
          <h2 class="ir-section-title">Product &amp; Technology</h2>
        </div>
        <div style="margin-bottom:28px">
          <div style="font-size:var(--text-lg);font-weight:700;margin-bottom:10px;color:var(--c-accent)">January 2026</div>
          <p class="ir-text">We onboarded three new teammates and significantly improved our development workflow by adopting Linear for project management and implementing a full CI/CD pipeline. On the marketplace side, we opened four new MLS boards — West Alabama, Western Upstate, Aiken, and Montgomery (MAAR) — expanding our geographic reach. We also created the Beycome design system, establishing a consistent visual language across all products and pages.</p>
        </div>
        <div style="margin-bottom:28px">
          <div style="font-size:var(--text-lg);font-weight:700;margin-bottom:10px;color:var(--c-accent)">February 2026</div>
          <p class="ir-text">The biggest milestone this month was the launch of Beycome Title of Texas, our first expansion of title services outside Florida. Alongside this, we built a Title CRM with automated quote generation to streamline the closing process. We launched the staging website at www2.beycome.com, updated Artur AI with new capabilities, and resolved a critical token leak. We also opened four new MLS boards for Virginia — Roanoke Valley, SWVAR, Lynchburg, and CVRMLS — preparing the ground for the full Virginia launch.</p>
        </div>
        <div style="margin-bottom:28px">
          <div style="font-size:var(--text-lg);font-weight:700;margin-bottom:10px;color:var(--c-accent)">March 2026</div>
          <p class="ir-text">Virginia officially launched as a new state on the platform. We centralized all AI calls across multiple models with retry and fallback logic, making our AI infrastructure more resilient. Artur AI gained new features including property estimates with Zillow cross-checking, and the new website received interior redesign capabilities and translation support.</p>
          <p class="ir-text">We automated yard sign printing through Openclaw and enabled open house scheduling on 10+ MLS boards. Two more Virginia MLS were added — Bright MLS and Charlottesville (CAAR). We cleaned up legacy cronjobs to reduce tech debt, launched client invoices directly on the seller dashboard, integrated real title quotes on beycometitle.com, and published a comprehensive SEO glossary with 137 terms.</p>
        </div>

        <div style="margin-top:32px;padding-top:28px;border-top:1px solid var(--c-border);display:grid;grid-template-columns:1fr 1fr;gap:32px">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
              <span style="color:#43bb4d;font-size:18px">✓</span>
              <span style="font-size:var(--text-lg);font-weight:700;color:var(--c-ink)">What We've Launched</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:var(--text-lg);color:var(--c-ink-soft);line-height:1.5">Automated offer comparison tool with net proceeds calculator</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:var(--text-lg);color:var(--c-ink-soft);line-height:1.5">Document vault with e-signature integration</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:var(--text-lg);color:var(--c-ink-soft);line-height:1.5">Concierge dashboard for buyer transaction management</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:var(--text-lg);color:var(--c-ink-soft);line-height:1.5">Mortgage rate comparison tool with lender integration</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:var(--text-lg);color:var(--c-ink-soft);line-height:1.5">Enhanced analytics for pricing recommendations</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:var(--text-lg);color:var(--c-ink-soft);line-height:1.5">Automated 10 new MLS integrations</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:var(--text-lg);color:var(--c-ink-soft);line-height:1.5">Full Title CRM creation</div>
            </div>
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
              <span style="color:var(--c-accent);font-size:16px">→</span>
              <span style="font-size:var(--text-lg);font-weight:700;color:var(--c-ink)">What's Next</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px">
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:var(--text-lg);color:var(--c-ink-soft);line-height:1.5">Launching new website (currently in full testing) — calculator pages, new FAQ website, and deep Artur AI integration</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:var(--text-lg);color:var(--c-ink-soft);line-height:1.5">Staging AI application — allows sellers to apply, get pre-qualified, and onboard through a fully guided AI flow</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:var(--text-lg);color:var(--c-ink-soft);line-height:1.5">All documents updated on the fly via AI — contracts, disclosures, and forms auto-generated per transaction</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:var(--text-lg);color:var(--c-ink-soft);line-height:1.5">Market trend analytics by city, county, and state — powered by AI-driven data</div>
              <div style="padding-left:14px;border-left:3px solid #e8eaff;font-size:var(--text-lg);color:var(--c-ink-soft);line-height:1.5">Integrated 10 AI models (open-source and proprietary) — developed OpenClaw assistant to manage packages, print yard signs, handle shipping, and control inventory</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 07 Q1 2026 OUTLOOK -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">08</span>
          <h2 class="ir-section-title">Q1 2026 Outlook</h2>
        </div>

        <div class="ir-subsection-title">Team</div>
        <p class="ir-text">We are currently a team of 27 (full-time, part-time, and contractor combined), 11 on payroll:</p>
        <ul style="margin:0 0 20px 20px;font-size:var(--text-lg);line-height:1.8;color:var(--c-ink-soft)">
          <li>10 Customer Support and MLS Team (Miami-based manager + part-time, foreign contractors)</li>
          <li>8 Sales Team (Miami-based VP + FTE + foreign contractors)</li>
          <li>6 Developers (Miami-based + 2 foreign contractors)</li>
          <li>4 Brokers (USA contractors)</li>
        </ul>

        <div style="font-size:var(--text-lg);font-weight:700;margin:16px 0 8px;color:var(--c-accent)">Recently Hired</div>
        <ul style="margin:0 0 24px 20px;font-size:var(--text-lg);line-height:1.8;color:var(--c-ink-soft)">
          <li>1 Sales Manager (Miami)</li>
          <li>5 Sales Representatives (foreign)</li>
          <li>3 Developers:
            <ul style="margin:4px 0 0 20px">
              <li>1 Front-End (Miami)</li>
              <li>1 AI Language (Miami)</li>
              <li>1 Back-End (foreign)</li>
            </ul>
          </li>
          <li>1 Compliance &amp; Customer Support (Miami)</li>
        </ul>

        <div class="ir-grid-title">Q1 Highlights</div>
        <ul style="margin:0 0 24px 20px;font-size:var(--text-lg);line-height:1.8;color:var(--c-ink-soft)">
          <li>Hired a part-time CFO to strengthen financial planning, reporting, and investor relations.</li>
          <li>New website launched on www2.beycome.com.</li>
          <li>Buyer/broker agreement flow automated — agreements ramped 5 → 8 → 14 MoM.</li>
          <li>Concierge: 49 clients in Q1 vs 11 in Q4 2025 and 11 in Q1 2025 (+345%) — pricing and model change. $51.7K in revenue.</li>
          <li>TX Title launched — 18 prepaids, 18.4% attach rate in first month.</li>
          <li>FL Title attach rate crossed 30% (30.4% in March). Target: 60%.</li>
          <li>Customer service quality identified as focus area — new stateside hire starting April 7.</li>
        </ul>
        <div class="ir-grid-title">Q2 2026 Revenue Targets</div>
        <div class="ir-kpi-grid">
          <div class="ir-kpi-card"><div class="ir-kpi-value">$700K</div><div class="ir-kpi-label">Listings</div><div class="ir-kpi-sub">Q2 Target</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">$200K</div><div class="ir-kpi-label">Title</div><div class="ir-kpi-sub">Q2 Target</div></div>
          <div class="ir-kpi-card"><div class="ir-kpi-value">$80K</div><div class="ir-kpi-label">Buyer</div><div class="ir-kpi-sub">Q2 Target</div></div>
        </div>

        <div style="margin-top:32px;padding-top:28px;border-top:1px solid var(--c-border)">
          <div style="display:inline-block;padding:6px 14px;border-radius:6px;background:var(--c-accent-soft);color:var(--c-accent);font-size:var(--text-lg);font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:20px">Q2 2026 Focus Areas</div>

          <div style="margin-bottom:18px;padding-left:28px;position:relative;font-size:var(--text-lg);line-height:1.7;color:var(--color-gray-600)">
            <span style="position:absolute;left:0;color:var(--c-accent);font-size:16px">→</span>
            <strong>State expansion</strong> — processing expanding into Maryland, Pennsylvania, California, New York, New Jersey, and Washington DC, all expected to complete before end of Q2. In California, escrow services are also targeted to launch by end of Q2.
          </div>

          <div style="margin-bottom:18px;padding-left:28px;position:relative;font-size:var(--text-lg);line-height:1.7;color:var(--color-gray-600)">
            <span style="position:absolute;left:0;color:var(--c-accent);font-size:16px">→</span>
            <strong>Scale title services</strong> — expand coverage including California, and strengthen operations to support 2&times; volume without increasing headcount at the same pace.
          </div>

          <div style="margin-bottom:18px;padding-left:28px;position:relative;font-size:var(--text-lg);line-height:1.7;color:var(--color-gray-600)">
            <span style="position:absolute;left:0;color:var(--c-accent);font-size:16px">→</span>
            <strong>Platform &amp; product</strong> — launch a new, more intuitive AI-guided UI/UX to simplify the journey and increase engagement and conversion. This includes improving the client dashboard with deeper Artur AI interaction, enhancing the MLS questionnaire UX (more intuitive, embeddable, fully connected to Artur), and better integrating showings and open houses (calendar sync, ShowingTime optimization, automated setup). Artur will also handle more interactions between users, MLS, and title (including scheduling), with the goal of reducing reliance on CS and MLS teams.
          </div>

          <div style="margin-bottom:18px;padding-left:28px;position:relative;font-size:var(--text-lg);line-height:1.7;color:var(--color-gray-600)">
            <span style="position:absolute;left:0;color:var(--c-accent);font-size:16px">→</span>
            <strong>Customer experience</strong> — improve service quality with faster automated responses, better escalation flows, and stronger internal tools.
          </div>

          <div style="margin-bottom:18px;padding-left:28px;position:relative;font-size:var(--text-lg);line-height:1.7;color:var(--color-gray-600)">
            <span style="position:absolute;left:0;color:var(--c-accent);font-size:16px">→</span>
            <strong>Growth &amp; marketing</strong> — continue reducing CAC through content, referrals, and social acquisition. Campaigns are live on Meta, Reddit, and Neighborhood.com, with TikTok coming next. Hiring a new marketing manager. Expand efforts across social media, blog, SEO, and strategic content to diversify acquisition channels and strengthen organic growth.
          </div>

          <div style="margin-bottom:18px;padding-left:28px;position:relative;font-size:var(--text-lg);line-height:1.7;color:var(--color-gray-600)">
            <span style="position:absolute;left:0;color:var(--c-accent);font-size:16px">→</span>
            <strong>Buyer program</strong> — improve conversion by optimizing the funnel, clarifying the value proposition, and reducing friction.
          </div>

          <div style="margin-bottom:0;padding-left:28px;position:relative;font-size:var(--text-lg);line-height:1.7;color:var(--color-gray-600)">
            <span style="position:absolute;left:0;color:var(--c-accent);font-size:16px">→</span>
            <strong>Partnerships</strong> — build cash offer integrations for users, with advanced discussions underway with HomeLight and a slower path with Opendoor. HomeLight is ready to redirect its investor network (ranked #1 nationwide on their platform) into the Beycome system. Also closing new partnerships with OpenCasa (220 concierge properties) and TopBrokerage (investor platform, ~300 expected listings).
          </div>
        </div>
      </div>

      <!-- 09 WHERE WE NEED HELP -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">09</span>
          <h2 class="ir-section-title">Where We Need Help</h2>
        </div>

        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <div class="ir-subsection-title" style="margin:0">Hiring a CMO</div>
          <span style="padding:4px 12px;border-radius:8px;font-size:12px;font-weight:700;color:#bb4b43;background:rgba(187,75,67,0.1)">High priority</span>
        </div>
        <p class="ir-text">We're actively looking for a Head of Marketing with a creative, hands-on, get-it-done mindset.</p>
        <p class="ir-text">Our previous CMO wasn't the right fit, so we're now focused on a strong, performance-driven operator who can truly own CAC and attribution.</p>
        <p class="ir-text">If you know someone (South Florida only), send over their LinkedIn or have them reach out directly.</p>
      </div>

      <!-- 10 EXECUTION STATUS -->
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">10</span>
          <h2 class="ir-section-title">Execution Status vs Plan (2025)</h2>
        </div>
        <div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap">
          <span style="padding:4px 12px;border-radius:8px;font-size:var(--text-lg);font-weight:600;color:#43bb4d;background:rgba(67,187,77,0.1)">8 Done</span>
          <span style="padding:4px 12px;border-radius:8px;font-size:var(--text-lg);font-weight:600;color:#43bb4d;background:rgba(67,187,77,0.1)">1 Running</span>
          <span style="padding:4px 12px;border-radius:8px;font-size:var(--text-lg);font-weight:600;color:#d97706;background:rgba(217,119,6,0.1)">1 In progress</span>
          <span style="padding:4px 12px;border-radius:8px;font-size:var(--text-lg);font-weight:600;color:#bb4b43;background:rgba(187,75,67,0.1)">1 At risk</span>
        </div>

        <div class="ir-table-wrap">
          <table class="ir-table" style="min-width:auto">
            <thead>
              <tr>
                <th style="text-align:left;width:70%">Initiative</th>
                <th style="text-align:right;width:30%">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Seed raise</td>
                <td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:var(--text-lg)">✓ Done</span></td>
              </tr>
              <tr>
                <td>Hire: CMO</td>
                <td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#bb4b43;font-weight:600;font-size:var(--text-lg)">△ At risk</span></td>
              </tr>
              <tr>
                <td>Hire: Title Operations Lead</td>
                <td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:var(--text-lg)">✓ Done</span></td>
              </tr>
              <tr>
                <td>Hire: Sales Manager</td>
                <td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:var(--text-lg)">✓ Done</span></td>
              </tr>
              <tr>
                <td>Hire: Tech Team</td>
                <td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:var(--text-lg)">✓ Done</span></td>
              </tr>
              <tr>
                <td>Marketing: Paid acquisition playbook</td>
                <td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:var(--text-lg)">◔ Running</span></td>
              </tr>
              <tr>
                <td>Marketing: Content + SEO foundation</td>
                <td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:var(--text-lg)">✓ Done</span></td>
              </tr>
              <tr>
                <td>Title: Florida coverage expansion</td>
                <td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:var(--text-lg)">✓ Done</span></td>
              </tr>
              <tr>
                <td>Title: Texas entry</td>
                <td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:var(--text-lg)">✓ Done</span></td>
              </tr>
              <tr>
                <td>Buyer/Concierge: Launch MVP</td>
                <td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#43bb4d;font-weight:600;font-size:var(--text-lg)">✓ Done</span></td>
              </tr>
              <tr>
                <td>Mortgage: Partner integration</td>
                <td style="text-align:right"><span style="display:inline-flex;align-items:center;gap:5px;color:#d97706;font-weight:600;font-size:var(--text-lg)">◔ In progress</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- DOWNLOADABLE DOCUMENTS -->
      <?php
      $rdocs_file = __DIR__ . '/docs/report-docs.json';
      $rdocs = file_exists($rdocs_file) ? json_decode(file_get_contents($rdocs_file), true) : [];
      $my_docs = $rdocs['q1-2026'] ?? [];
      if (!empty($my_docs)) :
      ?>
      <div class="ir-section">
        <div class="ir-section-header">
          <span class="ir-section-number">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </span>
          <h2 class="ir-section-title">Financial Documents</h2>
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          <?php
          $type_labels = ['pl' => 'P&L Statement', 'pl-title' => 'P&L Beycome Title', 'balance-sheet' => 'Balance Sheet', 'pl-jan' => 'P&L — January', 'pl-feb' => 'P&L — February', 'pl-mar' => 'P&L — March', 'pl-apr' => 'P&L — April', 'pl-may' => 'P&L — May', 'pl-jun' => 'P&L — June', 'pl-jul' => 'P&L — July', 'pl-aug' => 'P&L — August', 'pl-sep' => 'P&L — September', 'pl-oct' => 'P&L — October', 'pl-nov' => 'P&L — November', 'pl-dec' => 'P&L — December'];
          foreach ($my_docs as $tkey => $doc) :
            $size = $doc['size'] > 1048576 ? round($doc['size']/1048576,1).'MB' : round($doc['size']/1024).'KB';
          ?>
          <a href="/docs/<?php echo htmlspecialchars($doc['filename']); ?>" download style="display:flex;align-items:center;gap:12px;padding:16px 24px;background:#fff;border:1px solid var(--c-border);border-radius:var(--radius-md);text-decoration:none;color:var(--c-ink);transition:border-color 0.15s,box-shadow 0.15s;flex:1;min-width:240px">
            <div style="width:40px;height:40px;border-radius:10px;background:#fef2f2;display:grid;place-items:center;flex-shrink:0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b42318" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div>
              <div style="font-size:var(--text-lg);font-weight:700"><?php echo htmlspecialchars($type_labels[$tkey] ?? $tkey); ?></div>
              <div style="font-size:12px;color:var(--c-ink-soft)">PDF · <?php echo $size; ?></div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" stroke-width="2" style="margin-left:auto;flex-shrink:0"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
          <?php endforeach; ?>
        </div>
      </div>
      <?php endif; ?>

    </div><!-- /.ir-page -->

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
      .bc-legal-footer { margin-top: 48px; padding: 28px 16px; border-top: 1px solid hsla(0, 0%, 88%, 1); background: #f9fafb; }
      .bc-legal-footer-inner { max-width: 1152px; margin: 0 auto; font-family: Roboto, "Segoe UI", "Helvetica Neue", sans-serif; font-size: 12px; line-height: 1.55; color: hsla(210, 38.9%, 14.1%, 0.7); }
      .bc-legal-footer-title { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: hsla(210, 39%, 14%, 1); margin-bottom: 10px; }
      .bc-legal-footer p { margin: 0 0 8px; }
      .bc-legal-footer a { color: var(--c-accent); text-decoration: none; }
      .bc-legal-footer a:hover { text-decoration: underline; }
      .bc-legal-footer-contact { margin-top: 12px; padding-top: 10px; border-top: 1px solid hsla(0, 0%, 88%, 1); font-size: 12px; }
    </style>
  </div>

  <!-- ORG CHART MODAL -->
  <div class="ir-org-overlay" id="orgModal" onclick="if(event.target===this)this.classList.remove('active')">
    <div class="ir-org-modal">
      <button class="ir-org-close" onclick="document.getElementById('orgModal').classList.remove('active')" aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <h3 class="ir-org-title">Beycome Organization</h3>
      <p class="ir-org-subtitle">Q1 2026 — 11 FTE + 16 Contractors</p>

      <!-- CEO -->
      <div class="org-tree">
        <div class="org-card ceo">
          <div class="org-name">Nico Jodin</div>
          <div class="org-role">CEO &amp; Founder</div>
          <span class="org-badge fte">FTE — Miami</span>
        </div>
        <div class="org-connector"></div>
      </div>

      <!-- 4 Departments -->
      <div class="org-departments">

        <!-- TECH -->
        <div class="org-dept-box">
          <div class="org-dept-title">Technology</div>
          <div class="org-group">
            <div class="org-card vp">
              <div class="org-name">Cyril Carbonnier</div>
              <div class="org-role">CTO</div>
              <span class="org-badge fte">FTE — Miami</span>
            </div>
          </div>
          <div style="text-align:center;margin:6px 0">
            <div style="width:2px;height:16px;background:var(--c-border);margin:0 auto"></div>
          </div>
          <div class="org-group">
            <div class="org-card-sm">
              <div class="org-name">Arnolis Salgueiro</div>
              <div class="org-role">Front Office</div>
              <span class="org-badge fte">FTE — Miami</span>
            </div>
            <div class="org-card-sm">
              <div class="org-name">Jonathan Salgueiro</div>
              <div class="org-role">Back Office</div>
              <span class="org-badge fte">FTE — Miami</span>
            </div>
            <div class="org-card-sm">
              <div class="org-name">Mac Cooper</div>
              <div class="org-role">AI Engineer</div>
              <span class="org-badge fte">FTE — Miami</span>
            </div>
          </div>
          <div style="text-align:center;margin:8px 0 4px">
            <div style="font-size:11px;color:var(--c-ink-soft);font-weight:600;text-transform:uppercase;letter-spacing:0.06em">Contractors</div>
          </div>
          <div class="org-group">
            <div class="org-ghost">
              <div class="org-name">Maruf Alam</div>
              <div class="org-role">AI Data</div>
              <span class="org-badge contractor">FT Contractor — India</span>
            </div>
            <div class="org-ghost">
              <div class="org-name">Istiak Ahmed</div>
              <div class="org-role">AI Builder</div>
              <span class="org-badge contractor">FT Contractor — India</span>
            </div>
          </div>
        </div>

        <!-- CS / DATA ENTRY / COMPLIANCE -->
        <div class="org-dept-box">
          <div class="org-dept-title">Customer / Compliance</div>
          <div class="org-group">
            <div class="org-card vp">
              <div class="org-name">Yaleyn Azcunce</div>
              <div class="org-role">General Manager</div>
              <span class="org-badge fte">FTE — Miami</span>
            </div>
          </div>
          <div style="text-align:center;margin:6px 0">
            <div style="width:2px;height:16px;background:var(--c-border);margin:0 auto"></div>
          </div>
          <div class="org-group">
            <div class="org-card-sm">
              <div class="org-name">Andrys Varga</div>
              <div class="org-role">Data Entry / Compliance</div>
              <span class="org-badge fte">FTE — Miami</span>
            </div>
          </div>
          <div style="text-align:center;margin:8px 0 4px">
            <div style="font-size:11px;color:var(--c-ink-soft);font-weight:600;text-transform:uppercase;letter-spacing:0.06em">Contractors</div>
          </div>
          <div class="org-group">
            <div class="org-ghost">
              <div class="org-name">5 CS Representatives</div>
              <div class="org-role">Customer Support</div>
              <span class="org-badge pt">Part-Time Contractor</span>
            </div>
            <div class="org-ghost">
              <div class="org-name">3 MLS Team</div>
              <div class="org-role">MLS Operations</div>
              <span class="org-badge contractor">FT Contractor — Nica</span>
            </div>
          </div>
        </div>

        <!-- SALES -->
        <div class="org-dept-box">
          <div class="org-dept-title">Sales</div>
          <div class="org-group">
            <div class="org-card vp">
              <div class="org-name">Sam Odio</div>
              <div class="org-role">VP Sales</div>
              <span class="org-badge fte">FTE — Miami</span>
            </div>
          </div>
          <div style="text-align:center;margin:6px 0">
            <div style="width:2px;height:16px;background:var(--c-border);margin:0 auto"></div>
          </div>
          <div class="org-group">
            <div class="org-card-sm">
              <div class="org-name">Christian Grullon</div>
              <div class="org-role">Buyer / Concierge</div>
              <span class="org-badge fte">FTE — Miami</span>
            </div>
            <div class="org-card-sm">
              <div class="org-name">Christian Linaza</div>
              <div class="org-role">Buyer / Concierge</div>
              <span class="org-badge fte">FTE — Miami</span>
            </div>
          </div>
          <div style="text-align:center;margin:8px 0 4px">
            <div style="font-size:11px;color:var(--c-ink-soft);font-weight:600;text-transform:uppercase;letter-spacing:0.06em">Contractors</div>
          </div>
          <div class="org-group">
            <div class="org-ghost">
              <div class="org-name">4 Sales Reps</div>
              <div class="org-role">Sales</div>
              <span class="org-badge contractor">FT Contractor — Nica</span>
            </div>
            <div class="org-card-sm">
              <div class="org-name">1 Title Sales</div>
              <div class="org-role">Beycome Title LLC</div>
              <span class="org-badge fte">FTE — Miami</span>
            </div>
          </div>
        </div>

        <!-- FINANCE & MARKETING -->
        <div class="org-dept-box">
          <div class="org-dept-title">Finance &amp; Marketing</div>
          <div class="org-group">
            <div class="org-card vp">
              <div class="org-name">Michael Blanche</div>
              <div class="org-role">CFO</div>
              <span class="org-badge pt">Part-Time Contractor</span>
            </div>
            <div class="org-card vp">
              <div class="org-name">Tommy Chang</div>
              <div class="org-role">SERP / Marketing</div>
              <span class="org-badge contractor">FT Contractor — Ca</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Legend -->
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:24px;padding-top:16px;border-top:1px solid var(--c-border)">
        <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--c-ink-soft)"><span class="org-badge fte" style="margin:0">FTE</span> Full-time employee</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--c-ink-soft)"><span class="org-badge contractor" style="margin:0">Contractor</span> Contractor (remote)</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--c-ink-soft)"><span class="org-badge pt" style="margin:0">Part-Time</span> Part-time contractor</div>
      </div>
    </div>
  </div>

  <script>
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') document.getElementById('orgModal').classList.remove('active');
  });
  </script>
</body>
</html>
