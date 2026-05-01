<!DOCTYPE html>
<!--
 __          ________            _____  ______   ____  ________     _______ ____  __  __ ______ __  __ ______
 \ \        / /  ____|     /\   |  __ \|  ____| |  _ \|  ____\ \   / / ____/ __ \|  \/  |  ____||  \/  |  ____|
  \ \  /\  / /| |__       /  \  | |__) | |__    | |_) | |__   \ \_/ / |   | |  | | \  / | |__   | \  / | |__
   \ \/  \/ / |  __|     / /\ \ |  _  /|  __|   |  _ <|  __|   \   /| |   | |  | | |\/| |  __|  | |\/| |  __|
    \  /\  /  | |____   / ____ \| | \ \| |____  | |_) | |____   | | | |___| |__| | |  | | |____ | |  | | |
     \/  \/   |______| /_/    \_\_|  \_\______| |____/|______|  |_|  \_____\____/|_|  |_|______||_|  |_|_|
-->
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Favicon -->
    <link rel="icon" href="https://www.beycome.com/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="https://www.beycome.com/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="https://www.beycome.com/public/assets/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" href="https://www.beycome.com/public/assets/images/apple-touch-icon.png">
    <link rel="mask-icon" color="#000000" href="https://www.beycome.com/public/assets/images/safari-pinned-tab.svg">

    <!-- SEO Meta (description, canonical, robots handled by Yoast when active) -->
    <?php if (!defined('WPSEO_VERSION')) : ?>
    <meta name="description" content="<?php echo esc_attr(beycome_faq_meta_description()); ?>">
    <link rel="canonical" href="<?php echo esc_url(beycome_faq_canonical()); ?>">
    <meta name="robots" content="<?php echo (is_search() || is_404()) ? 'noindex, follow' : 'index, follow'; ?>">
    <?php endif; ?>
    <meta name="keywords" content="FSBO, flat fee MLS, for sale by owner, sell my home, buy a home, real estate FAQ, closing costs, mortgage pre-approval, title insurance, home equity, MLS listing, Beycome, real estate calculator, home sale, buyer rebate">
    <meta name="author" content="Beycome">

    <!-- Open Graph + Twitter (skip if Yoast handles them) -->
    <?php if (!defined('WPSEO_VERSION')) : ?>
    <meta property="og:type" content="<?php echo is_single() ? 'article' : 'website'; ?>">
    <meta property="og:title" content="<?php echo esc_attr(wp_get_document_title()); ?>">
    <meta property="og:description" content="<?php echo esc_attr(beycome_faq_meta_description()); ?>">
    <meta property="og:url" content="<?php echo esc_url(beycome_faq_canonical()); ?>">
    <meta property="og:site_name" content="Beycome FAQ">
    <meta property="og:image" content="https://www.beycome.com/logos/logo-beycome-512x512.png">
    <meta property="og:locale" content="en_US">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@beycome">
    <meta name="twitter:title" content="<?php echo esc_attr(wp_get_document_title()); ?>">
    <meta name="twitter:description" content="<?php echo esc_attr(beycome_faq_meta_description()); ?>">
    <meta name="twitter:image" content="https://www.beycome.com/logos/logo-beycome-512x512.png">
    <?php endif; ?>

    <!-- GEO -->
    <meta name="geo.region" content="US-FL">
    <meta name="geo.placename" content="South Miami, Florida">
    <meta name="geo.position" content="25.7078;-80.2918">
    <meta name="ICBM" content="25.7078, -80.2918">

    <!-- Hreflang -->
    <link rel="alternate" hreflang="en-us" href="<?php echo esc_url(beycome_faq_canonical()); ?>">
    <link rel="alternate" hreflang="x-default" href="<?php echo esc_url(beycome_faq_canonical()); ?>">

    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="bc-header">
    <div class="bc-header-inner">
        <!-- Desktop nav (hidden on mobile) -->
        <nav class="bc-header-nav bc-desktop-only">
            <a href="<?php echo esc_url(home_url('/category/knowledge-base/')); ?>">Knowledge Base</a>
            <a href="<?php echo esc_url(home_url('/category/faq/')); ?>">How To</a>
            <a href="https://www.beycome.com/blog">Blog</a>
        </nav>

        <!-- Mobile: logo left -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="bc-header-logo">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/logo-faq.png'); ?>" alt="Beycome FAQ" width="200" height="27">
        </a>

        <!-- Desktop: search (hidden on mobile) -->
        <div class="bc-header-right bc-desktop-only">
            <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="bc-hsearch" id="bc-hsearch">
                <input type="search" name="s" class="bc-hsearch-input" id="bc-hsearch-input" placeholder="closing costs, mortgage..." autocomplete="off">
                <button type="button" class="bc-hsearch-btn" id="bc-hsearch-btn" aria-label="Search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
            </form>
        </div>

        <!-- Mobile: hamburger (hidden on desktop via inline style + CSS) -->
        <button type="button" class="bc-mobile-menu-btn" id="bc-mobile-menu-btn" aria-label="Open menu" aria-expanded="false" style="display:none">
            <svg class="bc-menu-icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            <svg class="bc-menu-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" style="display:none"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
    </div>
</header>

<!-- Mobile menu panel (hidden on desktop) -->
<div class="bc-mobile-menu" id="bc-mobile-menu" style="display:none">
    <nav class="bc-mobile-menu-nav">
        <a href="<?php echo esc_url(home_url('/category/knowledge-base/')); ?>">Knowledge Base</a>
        <a href="<?php echo esc_url(home_url('/category/faq/')); ?>">How To</a>
        <a href="https://www.beycome.com/blog">Blog</a>
        <a href="https://www.beycome.com/calculators">Calculators</a>
    </nav>
    <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="bc-mobile-menu-search">
        <input type="search" name="s" placeholder="Search FAQs..." autocomplete="off">
        <button type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
    </form>
</div>
