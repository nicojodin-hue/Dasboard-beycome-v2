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

    <!-- Canonical — always present, Yoast will override if active -->
    <link rel="canonical" href="<?php echo esc_url(beycome_blog_canonical()); ?>">
    <!-- SEO Meta (description, robots — skipped if Yoast handles them) -->
    <?php if (!defined('WPSEO_VERSION')) : ?>
    <meta name="description" content="<?php echo esc_attr(beycome_blog_meta_description()); ?>">
    <meta name="robots" content="<?php echo (is_search() || is_404()) ? 'noindex, follow' : 'index, follow'; ?>">
    <?php endif; ?>
    <meta name="keywords" content="FSBO, flat fee MLS, for sale by owner, sell my home, buy a home, real estate blog, closing costs, mortgage, title insurance, home equity, MLS listing, Beycome, real estate guide, home sale, buyer rebate">
    <meta name="author" content="Beycome">

    <!-- Open Graph + Twitter (skip if Yoast handles them) -->
    <?php if (!defined('WPSEO_VERSION')) : ?>
    <meta property="og:type" content="<?php echo is_single() ? 'article' : 'website'; ?>">
    <meta property="og:title" content="<?php echo esc_attr(wp_get_document_title()); ?>">
    <meta property="og:description" content="<?php echo esc_attr(beycome_blog_meta_description()); ?>">
    <meta property="og:url" content="<?php echo esc_url(beycome_blog_canonical()); ?>">
    <meta property="og:site_name" content="Beycome Blog">
    <meta property="og:image" content="<?php echo is_single() && has_post_thumbnail() ? esc_url(get_the_post_thumbnail_url(null, 'beycome-blog-hero')) : 'https://www.beycome.com/logos/logo-beycome-512x512.png'; ?>">
    <meta property="og:locale" content="en_US">
    <?php if (is_single()) : ?>
    <meta property="article:published_time" content="<?php echo get_the_date('c'); ?>">
    <meta property="article:modified_time" content="<?php echo get_the_modified_date('c'); ?>">
    <?php $cats = get_the_category(); if ($cats) : ?>
    <meta property="article:section" content="<?php echo esc_attr($cats[0]->name); ?>">
    <?php endif; endif; ?>
    <meta name="twitter:card" content="<?php echo is_single() && has_post_thumbnail() ? 'summary_large_image' : 'summary'; ?>">
    <meta name="twitter:site" content="@beycome">
    <meta name="twitter:title" content="<?php echo esc_attr(wp_get_document_title()); ?>">
    <meta name="twitter:description" content="<?php echo esc_attr(beycome_blog_meta_description()); ?>">
    <meta name="twitter:image" content="<?php echo is_single() && has_post_thumbnail() ? esc_url(get_the_post_thumbnail_url(null, 'beycome-blog-hero')) : 'https://www.beycome.com/logos/logo-beycome-512x512.png'; ?>">
    <?php endif; ?>

    <!-- GEO -->
    <meta name="geo.region" content="US-FL">
    <meta name="geo.placename" content="South Miami, Florida">
    <meta name="geo.position" content="25.7078;-80.2918">
    <meta name="ICBM" content="25.7078, -80.2918">

    <!-- Hreflang -->
    <link rel="alternate" hreflang="en-us" href="<?php echo esc_url(beycome_blog_canonical()); ?>">
    <link rel="alternate" hreflang="x-default" href="<?php echo esc_url(beycome_blog_canonical()); ?>">

    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="bc-header">
    <div class="bc-header-inner">
        <!-- Desktop nav left (hidden on mobile) -->
        <nav class="bc-header-nav bc-desktop-only">
            <?php
            $hdr_cats = ['Selling' => 'selling-a-home', 'Buying' => 'buying-a-home', 'Homeowner' => 'homeowner-guides', 'Local' => 'local-insights'];
            $hdr_subcats = [
                'selling-a-home'   => ['Preparing Your Home' => 'preparing-your-home', 'Pricing Your Home' => 'pricing-your-home', 'Flat Fee MLS' => 'flat-fee-mls', 'FSBO Contracts' => 'fsbo-contracts', 'Selling Process' => 'selling-process', 'Handling Negotiations' => 'handling-negotiations', 'Finances of Selling' => 'finances-of-selling'],
                'buying-a-home'    => ['Buying Process' => 'buying-process', 'Finding a Home' => 'finding-a-home', 'Inspecting a Home' => 'inspecting-a-home', 'Making an Offer' => 'making-an-offer', 'Mortgage Basics' => 'mortgage-basics', 'Moving Tips' => 'moving-tips', 'Preparing to Buy' => 'preparing-to-buy', 'Where to Live' => 'where-to-live'],
                'homeowner-guides' => ['Home Improvements' => 'home-improvements', 'Landscaping' => 'landscaping', 'Lifestyle & Design' => 'lifestyle-design', 'Refinancing' => 'refinancing', 'Renting a Home' => 'renting-a-home'],
                'local-insights'   => ['Florida' => 'florida', 'Georgia' => 'georgia', 'Texas' => 'texas', 'North Carolina' => 'north-carolina', 'South Carolina' => 'south-carolina', 'Ohio' => 'ohio'],
            ];
            foreach ($hdr_cats as $_lbl => $_slug) :
                $_t = get_term_by('slug', $_slug, 'category');
                $_u = $_t ? get_category_link($_t->term_id) : home_url('/category/' . $_slug . '/');
                $_subs = $hdr_subcats[$_slug] ?? [];
            ?>
            <div class="bc-nav-item">
                <a href="<?php echo esc_url($_u); ?>"><?php echo esc_html($_lbl); ?><svg class="bc-nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="11" height="11" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></a>
                <?php if (!empty($_subs)) : ?>
                <div class="bc-nav-dropdown">
                    <div class="bc-nav-dropdown-inner">
                        <a href="<?php echo esc_url($_u); ?>" class="bc-nav-dropdown-all">All <?php echo esc_html($_lbl); ?> &rarr;</a>
                        <?php foreach ($_subs as $_sub_lbl => $_sub_slug) :
                            $_sub = get_term_by('slug', $_sub_slug, 'category');
                            if (!$_sub || !$_sub->count) continue;
                        ?>
                        <a href="<?php echo esc_url(get_category_link($_sub->term_id)); ?>"><?php echo esc_html($_sub_lbl); ?></a>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php endif; ?>
            </div>
            <?php endforeach; ?>
            <a href="https://www.beycome.com/faq">FAQ</a>
        </nav>

        <!-- Logo center (mobile: left-aligned) -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="bc-header-logo">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/logo-blog.png'); ?>" alt="Beycome Blog" height="27" loading="eager">
        </a>

        <!-- Desktop search right (hidden on mobile) -->
        <div class="bc-header-right bc-desktop-only">
            <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="bc-hsearch" id="bc-hsearch">
                <input type="search" name="s" class="bc-hsearch-input" id="bc-hsearch-input" placeholder="FSBO, mortgage, closing costs..." autocomplete="off">
                <button type="button" class="bc-hsearch-btn" id="bc-hsearch-btn" aria-label="Search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
            </form>
        </div>

        <!-- Mobile hamburger (hidden on desktop) -->
        <button type="button" class="bc-mobile-menu-btn" id="bc-mobile-menu-btn" aria-label="Open menu" aria-expanded="false" style="display:none">
            <svg class="bc-menu-icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            <svg class="bc-menu-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" style="display:none"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
    </div>
</header>

<!-- Mobile menu panel -->
<div class="bc-mobile-menu" id="bc-mobile-menu" style="display:none">
    <nav class="bc-mobile-menu-nav">
        <?php
        $mob_cats = [
            'Selling'   => 'selling-a-home',
            'Buying'    => 'buying-a-home',
            'Homeowner' => 'homeowner-guides',
            'Local'     => 'local-insights',
        ];
        foreach ($mob_cats as $_lbl => $_slug) :
            $_t = get_term_by('slug', $_slug, 'category');
            $_u = $_t ? get_category_link($_t->term_id) : home_url('/category/' . $_slug . '/');
        ?>
        <a href="<?php echo esc_url($_u); ?>"><?php echo esc_html($_lbl); ?></a>
        <?php endforeach; ?>
        <a href="https://www.beycome.com/calculators">Calculators</a>
        <a href="https://www.beycome.com/faq">FAQ</a>
    </nav>
    <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="bc-mobile-menu-search">
        <input type="search" name="s" placeholder="Search articles..." autocomplete="off">
        <button type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
    </form>
</div>
