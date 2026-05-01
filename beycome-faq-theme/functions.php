<?php
/**
 * Beycome FAQ Theme — Functions
 */

function beycome_faq_enqueue() {
    wp_enqueue_style('beycome-faq-main', get_template_directory_uri() . '/assets/main.css', [], '3.1.5');
    if (is_single()) {
        wp_enqueue_script('beycome-faq-js', get_template_directory_uri() . '/assets/faq.js', [], '1.0.0', true);
    }
}
add_action('wp_enqueue_scripts', 'beycome_faq_enqueue');

function beycome_faq_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', ['height' => 110, 'width' => 768, 'flex-height' => true, 'flex-width' => true]);
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);
    register_nav_menus(['primary' => 'Primary Menu']);
}
add_action('after_setup_theme', 'beycome_faq_setup');

// Fix admin bar
function beycome_faq_admin_bar() {
    if (is_admin_bar_showing()) {
        echo '<style>html{margin-top:0!important}#wpadminbar{position:fixed!important}</style>';
    }
}
add_action('wp_head', 'beycome_faq_admin_bar');

// ===== SEO: Custom title ===== //
function beycome_faq_title($title) {
    if (is_front_page()) {
        return 'Beycome FAQ — Real Estate Help Center | Buy, Sell & Close Your Home';
    }
    if (is_single()) {
        return get_the_title() . ' — Beycome FAQ';
    }
    if (is_category()) {
        return single_cat_title('', false) . ' — Beycome FAQ & Knowledge Base';
    }
    if (is_tag()) {
        return single_tag_title('', false) . ' — Beycome FAQ';
    }
    if (is_search()) {
        return 'Search Results for "' . get_search_query() . '" — Beycome FAQ';
    }
    if (is_404()) {
        return 'Page Not Found — Beycome FAQ';
    }
    return $title;
}
add_filter('pre_get_document_title', 'beycome_faq_title');

// ===== SEO: Meta description helper ===== //
function beycome_faq_meta_description() {
    if (is_front_page()) {
        return 'Get answers to common real estate questions. Beycome FAQ covers mortgages, closing costs, MLS listings, title insurance, buyer programs, and 20+ free calculators.';
    }
    if (is_single()) {
        $excerpt = get_the_excerpt();
        if (!$excerpt) {
            $excerpt = wp_trim_words(strip_tags(get_the_content()), 25, '...');
        }
        return wp_strip_all_tags($excerpt);
    }
    if (is_category()) {
        $desc = strip_tags(category_description());
        if ($desc) return wp_trim_words($desc, 25, '...');
        return single_cat_title('', false) . ' — Browse articles and guides from Beycome\'s real estate knowledge base.';
    }
    if (is_tag()) {
        return single_tag_title('', false) . ' — Articles and guides from Beycome\'s real estate FAQ.';
    }
    if (is_search()) {
        return 'Search results for "' . get_search_query() . '" on Beycome FAQ.';
    }
    return 'Beycome FAQ — Real estate help center for buyers and sellers.';
}

// ===== SEO: Canonical URL helper ===== //
function beycome_faq_canonical() {
    if (is_front_page()) return home_url('/');
    if (is_single()) return get_permalink();
    if (is_category()) {
        $url = get_category_link(get_queried_object_id());
        $paged = get_query_var('paged');
        if ($paged > 1) $url = trailingslashit($url) . 'page/' . $paged . '/';
        return $url;
    }
    if (is_tag()) {
        $url = get_tag_link(get_queried_object_id());
        $paged = get_query_var('paged');
        if ($paged > 1) $url = trailingslashit($url) . 'page/' . $paged . '/';
        return $url;
    }
    if (is_search()) return home_url('/?s=' . urlencode(get_search_query()));
    return home_url($_SERVER['REQUEST_URI']);
}

// ===== SEO: Reading time helper ===== //
function beycome_faq_reading_time($post_id = null) {
    if (!$post_id) $post_id = get_the_ID();
    $content = get_post_field('post_content', $post_id);
    $word_count = str_word_count(strip_tags($content));
    return max(1, ceil($word_count / 250));
}

// ===== SEO: Organization schema (shared) ===== //
function beycome_faq_org_schema() {
    return [
        '@type' => 'Organization',
        '@id' => 'https://www.beycome.com/#organization',
        'name' => 'Beycome',
        'url' => 'https://www.beycome.com',
        'logo' => [
            '@type' => 'ImageObject',
            'url' => 'https://www.beycome.com/logos/logo-beycome-512x512.png',
            'width' => 512,
            'height' => 512,
        ],
        'sameAs' => [
            'https://www.facebook.com/beycomeUSA/',
            'https://www.instagram.com/beycome/',
            'https://linkedin.com/company/beycome',
            'https://x.com/beycome',
        ],
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => '5701 Sunset Drive #224',
            'addressLocality' => 'South Miami',
            'addressRegion' => 'FL',
            'postalCode' => '33143',
            'addressCountry' => 'US',
        ],
        'telephone' => '+1-804-656-5007',
        'email' => 'contact@beycome.com',
    ];
}

// ===== SEO: Increase posts per page for archives ===== //
function beycome_faq_posts_per_page($query) {
    if (!is_admin() && $query->is_main_query()) {
        if (is_category() || is_tag()) {
            $query->set('posts_per_page', 24);
        }
    }
}
add_action('pre_get_posts', 'beycome_faq_posts_per_page');

// ===== SEO: Remove unnecessary head clutter ===== //
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
