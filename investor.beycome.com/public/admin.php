<?php
session_start();

// Admin password (different from investor password)
$ADMIN_PASS = 'beycomeadmin2026';
$DOCS_DIR = __DIR__ . '/docs/';

// Logout
if (isset($_GET['logout'])) {
    unset($_SESSION['admin_auth']);
    header('Location: /admin.php');
    exit;
}

// Login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['admin_password'])) {
    if (hash_equals($ADMIN_PASS, $_POST['admin_password'])) {
        $_SESSION['admin_auth'] = true;
    } else {
        $login_error = true;
    }
}

// Handle report PDF upload (P&L / Balance Sheet per report)
$report_msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['report_pdf']) && !empty($_SESSION['admin_auth'])) {
    $file = $_FILES['report_pdf'];
    $report = trim($_POST['report_id'] ?? '');
    $doc_type = trim($_POST['doc_type'] ?? '');

    if ($file['error'] === UPLOAD_ERR_OK && $report && $doc_type) {
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if ($ext === 'pdf') {
            // Fixed filename pattern: report-id_doc-type.pdf
            $safe_name = $report . '_' . $doc_type . '.pdf';
            $dest = $DOCS_DIR . $safe_name;
            if (move_uploaded_file($file['tmp_name'], $dest)) {
                // Save to report-docs.json
                $rdocs_file = $DOCS_DIR . 'report-docs.json';
                $rdocs = file_exists($rdocs_file) ? json_decode(file_get_contents($rdocs_file), true) : [];
                $rdocs[$report][$doc_type] = [
                    'filename' => $safe_name,
                    'size' => $file['size'],
                    'uploaded' => date('Y-m-d H:i:s'),
                ];
                file_put_contents($rdocs_file, json_encode($rdocs, JSON_PRETTY_PRINT));
                $report_msg = 'success';
            } else {
                $report_msg = 'error';
            }
        } else {
            $report_msg = 'invalid_type';
        }
    }
}

// Handle report PDF delete
if (isset($_GET['del_report']) && isset($_GET['del_type']) && !empty($_SESSION['admin_auth'])) {
    $del_report = $_GET['del_report'];
    $del_type = $_GET['del_type'];
    $rdocs_file = $DOCS_DIR . 'report-docs.json';
    $rdocs = file_exists($rdocs_file) ? json_decode(file_get_contents($rdocs_file), true) : [];
    if (isset($rdocs[$del_report][$del_type])) {
        $filepath = $DOCS_DIR . $rdocs[$del_report][$del_type]['filename'];
        if (file_exists($filepath)) unlink($filepath);
        unset($rdocs[$del_report][$del_type]);
        if (empty($rdocs[$del_report])) unset($rdocs[$del_report]);
        file_put_contents($rdocs_file, json_encode($rdocs, JSON_PRETTY_PRINT));
    }
    header('Location: /admin.php');
    exit;
}

// Handle file upload
$upload_msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['pdf_file']) && !empty($_SESSION['admin_auth'])) {
    $file = $_FILES['pdf_file'];
    $label = trim($_POST['file_label'] ?? '');
    $category = trim($_POST['file_category'] ?? 'Q1 2026');

    if ($file['error'] === UPLOAD_ERR_OK) {
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (in_array($ext, ['pdf', 'xlsx', 'pptx', 'docx', 'csv', 'mp4', 'mov', 'webm', 'm4v', 'avi', 'mkv'])) {
            // Clean filename
            $safe_name = preg_replace('/[^a-zA-Z0-9._-]/', '_', $file['name']);
            $dest = $DOCS_DIR . $safe_name;

            if (move_uploaded_file($file['tmp_name'], $dest)) {
                // Save metadata
                $meta_file = $DOCS_DIR . 'files.json';
                $meta = file_exists($meta_file) ? json_decode(file_get_contents($meta_file), true) : [];
                $meta[] = [
                    'filename' => $safe_name,
                    'label' => $label ?: pathinfo($safe_name, PATHINFO_FILENAME),
                    'category' => $category,
                    'size' => $file['size'],
                    'uploaded' => date('Y-m-d H:i:s'),
                    'ext' => $ext,
                ];
                file_put_contents($meta_file, json_encode($meta, JSON_PRETTY_PRINT));
                $upload_msg = 'success';
            } else {
                $upload_msg = 'error';
            }
        } else {
            $upload_msg = 'invalid_type';
        }
    }
}

// Handle file delete
if (isset($_GET['delete']) && !empty($_SESSION['admin_auth'])) {
    $del_file = basename($_GET['delete']);
    $meta_file = $DOCS_DIR . 'files.json';
    $meta = file_exists($meta_file) ? json_decode(file_get_contents($meta_file), true) : [];

    // Remove from metadata
    $meta = array_filter($meta, function($m) use ($del_file) { return $m['filename'] !== $del_file; });
    file_put_contents($meta_file, json_encode(array_values($meta), JSON_PRETTY_PRINT));

    // Remove file
    $filepath = $DOCS_DIR . $del_file;
    if (file_exists($filepath)) unlink($filepath);

    header('Location: /admin.php');
    exit;
}

// Auth gate
if (empty($_SESSION['admin_auth'])) {
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Admin | Beycome Investor</title>
<style>
@font-face { font-family:Roboto; font-style:normal; font-weight:400; font-display:swap; src:url('/assets/roboto-400.woff2') format('woff2'); }
@font-face { font-family:Roboto; font-style:normal; font-weight:700; font-display:swap; src:url('/assets/roboto-700.woff2') format('woff2'); }
*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:Roboto,sans-serif;background:#fefefe;color:#1a1f4d}
.card{background:#fff;border-radius:20px;box-shadow:0 22px 60px rgba(21,25,70,0.13);padding:44px 40px;max-width:380px;width:100%;text-align:center}
.card img{width:130px;margin:0 auto 28px;display:block}
.card h2{font-size:18px;font-weight:700;margin-bottom:6px}
.card p{font-size:14px;color:#5a627a;margin-bottom:28px}
input{width:100%;padding:11px 14px;border:1.5px solid #d5d8f0;border-radius:10px;font-size:15px;font-family:inherit;color:#1a1f4d;outline:none;margin-bottom:14px}
input:focus{border-color:#5a6ad4}
.err{font-size:13px;color:#b42318;margin-bottom:14px;display:<?php echo isset($login_error) ? 'block' : 'none'; ?>}
button{width:100%;padding:12px;background:#5a6ad4;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;font-family:inherit;cursor:pointer}
button:hover{background:#4a5ab8}
</style>
</head>
<body>
<div class="card">
    <img src="/assets/logo.svg" alt="Beycome">
    <h2>Admin Access</h2>
    <p>Upload and manage investor documents</p>
    <form method="POST">
        <input type="password" name="admin_password" placeholder="Admin password" autofocus required>
        <div class="err">Incorrect password.</div>
        <button type="submit">Continue</button>
    </form>
</div>
</body>
</html>
<?php exit; } ?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Admin | Beycome Investor</title>
<style>
@font-face { font-family:Roboto; font-style:normal; font-weight:400; font-display:swap; src:url('/assets/roboto-400.woff2') format('woff2'); }
@font-face { font-family:Roboto; font-style:normal; font-weight:700; font-display:swap; src:url('/assets/roboto-700.woff2') format('woff2'); }
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Roboto,sans-serif;background:#f5f5ff;color:#1a1f4d;min-height:100vh}
.header{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;background:#fff;box-shadow:0 2px 12px rgba(21,25,70,0.1);position:sticky;top:0;z-index:50}
.header img{height:24px}
.header a{font-size:14px;color:#5a627a;text-decoration:none;font-weight:600}
.header a:hover{color:#5a6ad4}
.page{max-width:800px;margin:0 auto;padding:32px 24px}
h1{font-size:28px;font-weight:700;margin-bottom:8px}
.sub{font-size:15px;color:#5a627a;margin-bottom:32px}
.card{background:#fff;border:1px solid #d5d8f0;border-radius:16px;padding:28px;margin-bottom:24px;box-shadow:0 4px 16px rgba(21,25,70,0.06)}
.card h3{font-size:18px;font-weight:700;margin-bottom:16px}
label{display:block;font-size:13px;font-weight:700;color:#5a627a;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.04em}
input[type="text"],select{width:100%;padding:10px 14px;border:1.5px solid #d5d8f0;border-radius:10px;font-size:14px;font-family:inherit;outline:none;margin-bottom:16px}
input[type="text"]:focus,select:focus{border-color:#5a6ad4}
input[type="file"]{margin-bottom:16px;font-size:14px}
.btn{display:inline-flex;align-items:center;gap:6px;padding:10px 24px;background:#5a6ad4;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer}
.btn:hover{background:#4a5ab8}
.btn-danger{background:#bb4b43}
.btn-danger:hover{background:#9a3a33}
.msg{padding:12px 16px;border-radius:10px;font-size:14px;margin-bottom:16px}
.msg-success{background:#e8f5ec;color:#2e7d32;border:1px solid #c8e6c9}
.msg-error{background:#fef2f2;color:#b42318;border:1px solid #fecaca}
table{width:100%;border-collapse:collapse;font-size:14px}
th{text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.04em;color:#5a627a;padding:10px 12px;border-bottom:2px solid #d5d8f0}
td{padding:10px 12px;border-bottom:1px solid #eceeff}
.ext{display:inline-block;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:700;text-transform:uppercase}
.ext-pdf{background:#fef2f2;color:#b42318}
.ext-xlsx{background:#e8f5ec;color:#2e7d32}
.ext-pptx{background:#fff3e0;color:#e65100}
.ext-docx{background:#e3f2fd;color:#1565c0}
.ext-csv{background:#f3e5f5;color:#7b1fa2}
.ext-mp4,.ext-mov,.ext-webm,.ext-m4v,.ext-avi,.ext-mkv{background:#ede9fe;color:#5b21b6}
</style>
</head>
<body>
<div class="header">
    <img src="/assets/logo.svg" alt="Beycome">
    <div style="display:flex;gap:20px;align-items:center">
        <a href="/">← View Investor Portal</a>
        <a href="/admin.php?logout">Log out</a>
    </div>
</div>

<div class="page">
    <h1>Document Manager</h1>
    <p class="sub">Upload financial documents for investors to download.</p>

    <?php if ($upload_msg === 'success') : ?>
    <div class="msg msg-success">✓ Document uploaded successfully.</div>
    <?php elseif ($upload_msg === 'error') : ?>
    <div class="msg msg-error">✗ Upload failed. Please try again.</div>
    <?php elseif ($upload_msg === 'invalid_type') : ?>
    <div class="msg msg-error">✗ Invalid file type. Allowed: PDF, XLSX, PPTX, DOCX, CSV, MP4, MOV, WEBM, M4V, AVI, MKV.</div>
    <?php endif; ?>

    <!-- Report Financial Documents (P&L, Balance Sheet) -->
    <div class="card">
        <h3>Report Financial Documents</h3>
        <p style="font-size:14px;color:#5a627a;margin-bottom:20px">Upload P&amp;L and Balance Sheet PDFs for each report. Partners can download these directly from the report page.</p>

        <?php if ($report_msg === 'success') : ?>
        <div class="msg msg-success">✓ Report document uploaded successfully.</div>
        <?php elseif ($report_msg === 'error') : ?>
        <div class="msg msg-error">✗ Upload failed. Please try again.</div>
        <?php elseif ($report_msg === 'invalid_type') : ?>
        <div class="msg msg-error">✗ Only PDF files are allowed.</div>
        <?php endif; ?>

        <form method="POST" enctype="multipart/form-data">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px">
                <div>
                    <label>Report</label>
                    <select name="report_id">
                        <option value="q1-2026">Q1 2026</option>
                        <option value="feb-2026">February 2026</option>
                        <option value="fy-2025">FY 2025</option>
                    </select>
                </div>
                <div>
                    <label>Document Type</label>
                    <select name="doc_type">
                        <option value="pl">P&amp;L Statement (Quarterly)</option>
                        <option value="pl-title">P&amp;L Beycome Title</option>
                        <option value="balance-sheet">Balance Sheet</option>
                        <option value="pl-jan">P&amp;L — January</option>
                        <option value="pl-feb">P&amp;L — February</option>
                        <option value="pl-mar">P&amp;L — March</option>
                        <option value="pl-apr">P&amp;L — April</option>
                        <option value="pl-may">P&amp;L — May</option>
                        <option value="pl-jun">P&amp;L — June</option>
                        <option value="pl-jul">P&amp;L — July</option>
                        <option value="pl-aug">P&amp;L — August</option>
                        <option value="pl-sep">P&amp;L — September</option>
                        <option value="pl-oct">P&amp;L — October</option>
                        <option value="pl-nov">P&amp;L — November</option>
                        <option value="pl-dec">P&amp;L — December</option>
                    </select>
                </div>
                <div>
                    <label>PDF File</label>
                    <input type="file" name="report_pdf" accept=".pdf" required>
                </div>
            </div>
            <button type="submit" class="btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Upload
            </button>
        </form>

        <?php
        $rdocs_file = $DOCS_DIR . 'report-docs.json';
        $rdocs = file_exists($rdocs_file) ? json_decode(file_get_contents($rdocs_file), true) : [];
        $report_labels = ['q1-2026' => 'Q1 2026', 'feb-2026' => 'February 2026', 'fy-2025' => 'FY 2025'];
        $type_labels = ['pl' => 'P&L Statement', 'pl-title' => 'P&L Beycome Title', 'balance-sheet' => 'Balance Sheet', 'pl-jan' => 'P&L — January', 'pl-feb' => 'P&L — February', 'pl-mar' => 'P&L — March', 'pl-apr' => 'P&L — April', 'pl-may' => 'P&L — May', 'pl-jun' => 'P&L — June', 'pl-jul' => 'P&L — July', 'pl-aug' => 'P&L — August', 'pl-sep' => 'P&L — September', 'pl-oct' => 'P&L — October', 'pl-nov' => 'P&L — November', 'pl-dec' => 'P&L — December'];
        if (!empty($rdocs)) : ?>
        <table style="margin-top:20px">
            <thead><tr><th>Report</th><th>Type</th><th>Size</th><th>Uploaded</th><th></th></tr></thead>
            <tbody>
            <?php foreach ($rdocs as $rid => $types) :
                foreach ($types as $tkey => $doc) :
                    $size = $doc['size'] > 1048576 ? round($doc['size']/1048576,1).'MB' : round($doc['size']/1024).'KB';
            ?>
                <tr>
                    <td><strong><?php echo htmlspecialchars($report_labels[$rid] ?? $rid); ?></strong></td>
                    <td><span class="ext ext-pdf"><?php echo htmlspecialchars($type_labels[$tkey] ?? $tkey); ?></span></td>
                    <td><?php echo $size; ?></td>
                    <td style="color:#5a627a"><?php echo date('M j, Y', strtotime($doc['uploaded'])); ?></td>
                    <td>
                        <a href="/docs/<?php echo htmlspecialchars($doc['filename']); ?>" target="_blank" style="color:#5a6ad4;font-size:13px;font-weight:600;text-decoration:none;margin-right:12px">View</a>
                        <a href="/admin.php?del_report=<?php echo urlencode($rid); ?>&del_type=<?php echo urlencode($tkey); ?>" onclick="return confirm('Delete this document?')" style="color:#bb4b43;font-size:13px;font-weight:600;text-decoration:none">Delete</a>
                    </td>
                </tr>
            <?php endforeach; endforeach; ?>
            </tbody>
        </table>
        <?php endif; ?>
    </div>

    <!-- Upload Form -->
    <div class="card">
        <h3>Upload Document</h3>
        <form method="POST" enctype="multipart/form-data">
            <label>File (PDF, XLSX, PPTX, DOCX, CSV, MP4, MOV, WEBM, M4V, AVI, MKV)</label>
            <input type="file" name="pdf_file" accept=".pdf,.xlsx,.pptx,.docx,.csv,.mp4,.mov,.webm,.m4v,.avi,.mkv,video/*" required>

            <label>Display Name</label>
            <input type="text" name="file_label" placeholder="e.g. Q1 2026 Financial Statements">

            <label>Report Category</label>
            <select name="file_category">
                <option value="Q1 2026">Q1 2026</option>
                <option value="February 2026">February 2026</option>
                <option value="FY 2025">FY 2025</option>
                <option value="General">General</option>
            </select>

            <button type="submit" class="btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Upload Document
            </button>
        </form>
    </div>

    <!-- Existing Documents -->
    <div class="card">
        <h3>Uploaded Documents</h3>
        <?php
        $meta_file = $DOCS_DIR . 'files.json';
        $files = file_exists($meta_file) ? json_decode(file_get_contents($meta_file), true) : [];
        if (empty($files)) : ?>
            <p style="color:#5a627a;font-size:14px">No documents uploaded yet.</p>
        <?php else : ?>
        <table>
            <thead>
                <tr><th>Name</th><th>Category</th><th>Type</th><th>Size</th><th>Date</th><th></th></tr>
            </thead>
            <tbody>
            <?php foreach (array_reverse($files) as $f) :
                $size = $f['size'] > 1048576 ? round($f['size']/1048576, 1).'MB' : round($f['size']/1024).'KB';
            ?>
                <tr>
                    <td><a href="/docs/<?php echo htmlspecialchars($f['filename']); ?>" target="_blank" style="color:#5a6ad4;text-decoration:none;font-weight:600"><?php echo htmlspecialchars($f['label']); ?></a></td>
                    <td><?php echo htmlspecialchars($f['category']); ?></td>
                    <td><span class="ext ext-<?php echo $f['ext']; ?>"><?php echo strtoupper($f['ext']); ?></span></td>
                    <td><?php echo $size; ?></td>
                    <td style="color:#5a627a"><?php echo date('M j, Y', strtotime($f['uploaded'])); ?></td>
                    <td><a href="/admin.php?delete=<?php echo urlencode($f['filename']); ?>" onclick="return confirm('Delete this document?')" style="color:#bb4b43;font-size:13px;font-weight:600;text-decoration:none">Delete</a></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
        <?php endif; ?>
    </div>
</div>
</body>
</html>
