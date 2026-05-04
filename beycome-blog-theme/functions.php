<?php
/**
 * Beycome Blog Theme — Functions
 */

function beycome_blog_enqueue() {
    wp_enqueue_style('beycome-blog-main', get_template_directory_uri() . '/assets/main.css', [], '1.7.58');
}
add_action('wp_enqueue_scripts', 'beycome_blog_enqueue');

function beycome_blog_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_image_size('beycome-blog-card', 800, 450, true);
    add_image_size('beycome-blog-hero', 1200, 675, true);
    add_image_size('beycome-blog-thumb', 192, 144, true);
    add_theme_support('custom-logo', ['height' => 110, 'width' => 768, 'flex-height' => true, 'flex-width' => true]);
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);
    register_nav_menus(['primary' => 'Primary Menu']);
}
add_action('after_setup_theme', 'beycome_blog_setup');

function beycome_blog_admin_bar() {
    if (is_admin_bar_showing()) {
        echo '<style>html{margin-top:0!important}#wpadminbar{position:fixed!important}</style>';
    }
}
add_action('wp_head', 'beycome_blog_admin_bar');

// ===== SEO: Custom title ===== //
function beycome_blog_title($title) {
    if (is_front_page() || is_home()) {
        return 'Beycome Blog — Real Estate Guides, Market Insights & FSBO Tips';
    }
    if (is_single()) {
        return get_the_title() . ' — Beycome Blog';
    }
    if (is_category()) {
        $term  = get_queried_object();
        $name  = $term->name;
        $paged = get_query_var('paged');
        $pg    = $paged > 1 ? ' — Page ' . $paged : '';
        if ($term->parent) {
            $parent = get_term($term->parent, 'category');
            if ($parent && !is_wp_error($parent)) {
                return $name . ' Guides — ' . $parent->name . ' | Beycome Blog' . $pg;
            }
        }
        return $name . ' Articles & Guides | Beycome Blog' . $pg;
    }
    if (is_tag()) {
        $paged = get_query_var('paged');
        $pg    = $paged > 1 ? ' — Page ' . $paged : '';
        return single_tag_title('', false) . ' Real Estate Articles | Beycome Blog' . $pg;
    }
    if (is_search()) {
        return 'Search Results for "' . get_search_query() . '" — Beycome Blog';
    }
    if (is_404()) {
        return 'Page Not Found — Beycome Blog';
    }
    return $title;
}
add_filter('pre_get_document_title', 'beycome_blog_title');

// ===== SEO: Meta description helper ===== //
function beycome_blog_meta_description() {
    if (is_front_page() || is_home()) {
        return 'Real estate guides, market reads, and how-tos for people buying, selling, or renting — without paying a fortune in commissions. Updated weekly by Beycome.';
    }
    if (is_single()) {
        $excerpt = get_the_excerpt();
        if (!$excerpt) {
            $excerpt = wp_trim_words(strip_tags(get_the_content()), 25, '...');
        }
        return wp_strip_all_tags($excerpt);
    }
    if (is_category()) {
        $term = get_queried_object();
        $desc = strip_tags(category_description());
        if ($desc) {
            $trimmed = wp_strip_all_tags($desc);
            return mb_strlen($trimmed) > 155 ? mb_substr($trimmed, 0, 152) . '...' : $trimmed;
        }
        $name = $term->name;
        if ($term->parent) {
            $parent = get_term($term->parent, 'category');
            $pname  = ($parent && !is_wp_error($parent)) ? $parent->name : '';
            $desc   = 'Browse ' . $name . ' guides and tips' . ($pname ? ' in ' . $pname : '') . '. Expert real estate advice from Beycome to help you buy, sell, and close smarter.';
        } else {
            $desc = 'Browse all ' . $name . ' articles on Beycome Blog — real estate guides, tips, and how-tos to help you navigate every step of buying or selling your home.';
        }
        return mb_strlen($desc) > 155 ? mb_substr($desc, 0, 152) . '...' : $desc;
    }
    if (is_tag()) {
        $name = single_tag_title('', false);
        $desc = 'Find real estate articles tagged ' . $name . ' on Beycome Blog — guides, market insights, and tips for buyers and sellers.';
        return mb_strlen($desc) > 155 ? mb_substr($desc, 0, 152) . '...' : $desc;
    }
    if (is_search()) {
        return 'Search results for "' . get_search_query() . '" on Beycome Blog.';
    }
    return 'Beycome Blog — Real estate help center for buyers and sellers.';
}

// ===== SEO: Canonical URL helper ===== //
function beycome_blog_canonical() {
    if (is_front_page() || is_home()) return home_url('/');
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
function beycome_blog_reading_time($post_id = null) {
    if (!$post_id) $post_id = get_the_ID();
    $content = get_post_field('post_content', $post_id);
    $word_count = str_word_count(strip_tags($content));
    return max(1, ceil($word_count / 250));
}

// ===== SEO: Organization schema ===== //
function beycome_blog_org_schema() {
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

// ===== SEO: Article schema for single posts ===== //
function beycome_blog_article_schema() {
    if (!is_single()) return;

    $post = get_post();
    $cats = get_the_category();
    $cat_name = $cats ? $cats[0]->name : 'Real Estate';
    $thumbnail = get_the_post_thumbnail_url(null, 'beycome-blog-hero');
    if (!$thumbnail) $thumbnail = 'https://www.beycome.com/logos/logo-beycome-512x512.png';

    $schema = [
        '@context' => 'https://schema.org',
        '@graph' => [
            beycome_blog_org_schema(),
            [
                '@type' => 'BlogPosting',
                '@id' => get_permalink() . '#article',
                'headline' => get_the_title(),
                'description' => beycome_blog_meta_description(),
                'image' => ['@type' => 'ImageObject', 'url' => $thumbnail],
                'datePublished' => get_the_date('c'),
                'dateModified' => get_the_modified_date('c'),
                'author' => ['@type' => 'Organization', '@id' => 'https://www.beycome.com/#organization'],
                'publisher' => ['@type' => 'Organization', '@id' => 'https://www.beycome.com/#organization'],
                'mainEntityOfPage' => ['@type' => 'WebPage', '@id' => get_permalink()],
                'articleSection' => $cat_name,
                'inLanguage' => 'en-US',
            ],
            [
                '@type' => 'BreadcrumbList',
                'itemListElement' => array_filter([
                    ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => home_url('/')],
                    $cats ? ['@type' => 'ListItem', 'position' => 2, 'name' => $cats[0]->name, 'item' => get_category_link($cats[0]->term_id)] : null,
                    ['@type' => 'ListItem', 'position' => $cats ? 3 : 2, 'name' => get_the_title()],
                ]),
            ],
        ],
    ];

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}
add_action('wp_head', 'beycome_blog_article_schema');

// ===== SEO: Blog homepage schema ===== //
function beycome_blog_home_schema() {
    if (!is_home() && !is_front_page()) return;
    $schema = [
        '@context' => 'https://schema.org',
        '@graph' => [
            beycome_blog_org_schema(),
            [
                '@type' => 'Blog',
                '@id' => home_url('/') . '#blog',
                'name' => 'Beycome Blog',
                'description' => 'Real estate guides, market reads, and how-tos for buyers and sellers.',
                'url' => home_url('/'),
                'publisher' => ['@type' => 'Organization', '@id' => 'https://www.beycome.com/#organization'],
                'inLanguage' => 'en-US',
            ],
        ],
    ];
    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}
add_action('wp_head', 'beycome_blog_home_schema');

// ===== SEO: Increase posts per page for archives ===== //
function beycome_blog_posts_per_page($query) {
    if (!is_admin() && $query->is_main_query()) {
        if (is_category() || is_tag()) {
            $query->set('posts_per_page', 24);
        }
    }
}
add_action('pre_get_posts', 'beycome_blog_posts_per_page');

// ===== SEO: Remove unnecessary head clutter ===== //
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_shortlink_wp_head');

// ===== Helper: render a blog card (image + meta + title) ===== //
function beycome_blog_card($post_id, $size = 'beycome-blog-card', $show_excerpt = false) {
    $title = get_the_title($post_id);
    $url = get_permalink($post_id);
    $cats = get_the_category($post_id);
    $cat = $cats ? $cats[0] : null;
    $date = get_the_date('M j, Y', $post_id);
    $reading_time = beycome_blog_reading_time($post_id);
    $has_thumb = has_post_thumbnail($post_id);
    $thumb = $has_thumb ? get_the_post_thumbnail($post_id, $size, ['alt' => esc_attr($title), 'loading' => 'lazy']) : '';
    $excerpt = $show_excerpt ? wp_trim_words(get_the_excerpt($post_id) ?: strip_tags(get_post_field('post_content', $post_id)), 18, '…') : '';

    $cat_colors = ['selling-a-home' => 'selling', 'buying-a-home' => 'buying', 'homeowner-guides' => 'homeowner', 'local-insights' => 'local'];
    $card_modifier = '';
    if ($cat) {
        $root_slug = $cat->slug;
        if ($cat->parent) {
            $parent = get_term($cat->parent, 'category');
            if ($parent && !is_wp_error($parent)) $root_slug = $parent->slug;
        }
        if (isset($cat_colors[$root_slug])) $card_modifier = ' bc-blog-card--' . $cat_colors[$root_slug];
    }

    ob_start();
    ?>
    <a href="<?php echo esc_url($url); ?>" class="bc-blog-card<?php echo esc_attr($card_modifier); ?>">
        <div class="bc-blog-card-img">
            <?php if ($has_thumb): echo $thumb; else: ?>
            <div class="bc-blog-card-img-placeholder"></div>
            <?php endif; ?>
            <?php if ($cat): ?>
            <span class="bc-blog-card-cat"><?php echo esc_html($cat->name); ?></span>
            <?php endif; ?>
        </div>
        <div class="bc-blog-card-body">
            <h3 class="bc-blog-card-title"><?php echo esc_html($title); ?></h3>
            <?php if ($show_excerpt && $excerpt): ?>
            <p class="bc-blog-card-excerpt"><?php echo esc_html($excerpt); ?></p>
            <?php endif; ?>
            <div class="bc-blog-card-footer">
                <span class="bc-blog-card-time"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><?php echo (int)$reading_time; ?> min</span>
                <span class="bc-blog-card-date"><?php echo esc_html($date); ?></span>
            </div>
        </div>
    </a>
    <?php
    return ob_get_clean();
}

// ===== Force category/tag archives to be indexed even if Yoast has them noindexed ===== //
add_filter('wpseo_robots', function($robots) {
    if (is_category() || is_tag()) return 'index, follow';
    return $robots;
});

// ===== Mid-article CTA injection ===== //
function beycome_blog_mid_cta($content) {
    if (!is_singular('post')) return $content;

    $count = substr_count($content, '</p>');
    if ($count < 4) return $content;

    $target = max(2, (int) round($count / 2));
    $seen   = 0;
    $done   = false;

    $cta = '<div class="bc-mid-cta" aria-label="Beycome — Buy or Sell Without the Commission">'
         . '<div class="bc-mid-cta-card bc-mid-cta-card--sell">'
         . '<p class="bc-mid-cta-label">Sell smarter</p>'
         . '<p class="bc-mid-cta-title">List your home on the MLS for $99</p>'
         . '<p class="bc-mid-cta-desc">No listing agent, no 3% commission. Beycome handles your MLS listing so you keep more of what your home is worth.</p>'
         . '<a href="https://www.beycome.com/flat-fee-mls/" class="bc-mid-cta-btn bc-mid-cta-btn--sell">Sell your home &rarr;</a>'
         . '</div>'
         . '<div class="bc-mid-cta-card bc-mid-cta-card--buy">'
         . '<p class="bc-mid-cta-label">Buy smarter</p>'
         . '<p class="bc-mid-cta-title">Get up to 2% back at closing</p>'
         . '<p class="bc-mid-cta-desc">Buy any home with a Beycome agent and receive a rebate of up to 2% of the purchase price — paid to you at closing.</p>'
         . '<a href="https://www.beycome.com/buy/" class="bc-mid-cta-btn bc-mid-cta-btn--buy">Buy a home &rarr;</a>'
         . '</div>'
         . '</div>';

    return preg_replace_callback('#</p>#i', function($m) use (&$seen, &$done, $target, $cta) {
        $seen++;
        if (!$done && $seen === $target) {
            $done = true;
            return '</p>' . $cta;
        }
        return '</p>';
    }, $content);
}
add_filter('the_content', 'beycome_blog_mid_cta');

// ===== Helper: render a compact aside card (small thumb + title) ===== //
function beycome_blog_aside_card($post_id) {
    $title = get_the_title($post_id);
    $url = get_permalink($post_id);
    $cats = get_the_category($post_id);
    $cat = $cats ? $cats[0] : null;
    $has_thumb = has_post_thumbnail($post_id);
    $date = get_the_date('M j, Y', $post_id);

    ob_start();
    ?>
    <a href="<?php echo esc_url($url); ?>" class="bc-aside-card">
        <div class="bc-aside-card-img">
            <?php if ($has_thumb): echo get_the_post_thumbnail($post_id, 'beycome-blog-thumb', ['alt' => esc_attr($title), 'loading' => 'lazy']); else: ?>
            <div class="bc-aside-card-img-placeholder"></div>
            <?php endif; ?>
        </div>
        <div class="bc-aside-card-body">
            <?php if ($cat): ?><div class="bc-aside-card-cat"><?php echo esc_html(strtoupper($cat->name)); ?></div><?php endif; ?>
            <div class="bc-aside-card-title"><?php echo esc_html($title); ?></div>
            <div class="bc-aside-card-date"><?php echo esc_html($date); ?></div>
        </div>
    </a>
    <?php
    return ob_get_clean();
}
