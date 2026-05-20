<?php get_header(); ?>

<?php
// Resolve title, description, pill color based on current term
$arc_title = '';
$arc_desc  = '';
$arc_pill_class = '';
$arc_term  = null;
$arc_parent_term = null;

$category_colors = [
    'selling-a-home'   => 'bc-pill--selling',
    'buying-a-home'    => 'bc-pill--buying',
    'homeowner-guides' => 'bc-pill--homeowner',
    'local-insights'   => 'bc-pill--local',
];

// Short, readable descriptions override for categories flagged with low readability / long paragraphs
$arc_desc_overrides = [
    'selling-a-home'   => 'Tips and guides to help you sell your home by owner — from pricing to closing, without paying a listing agent.',
    'for-sale-by-owner'=> 'Step-by-step FSBO guides. List on the MLS, set the right price, handle offers, and close — all without a listing agent.',
    'buying-a-home'    => 'Guides for every step of buying a home — from getting pre-approved to closing day, with or without a buyer\'s agent.',
    'homeowner-guides' => 'Practical guides for homeowners — improvements, refinancing, renting, and everything in between.',
    'local-insights'   => 'Local real estate market guides and city-specific tips for buyers and sellers across the US.',
    'flat-fee-mls'     => 'Everything you need to know about flat fee MLS listings — how they work, what they cost, and how to pick a service.',
    'buying-process'   => 'A clear breakdown of every step in the home buying process, from house hunting to getting your keys.',
    'mortgage-basics'  => 'Plain-language guides to mortgages — rates, pre-approval, loan types, and what to watch out for.',
    'selling-process'  => 'How to sell your home fast and for top dollar — staging, showings, offers, and closing made simple.',
    'finances-of-selling' => 'Understand the true cost of selling — agent fees, closing costs, taxes, and how to keep more of your equity.',
    'beycome-reviews'  => 'Real reviews from Beycome customers who sold or bought their home and saved thousands in commissions.',
];

if (is_category()) {
    $arc_term  = get_queried_object();
    $arc_title = $arc_term->name;

    // Use override if available for this term or its parent
    if (isset($arc_desc_overrides[$arc_term->slug])) {
        $arc_desc = $arc_desc_overrides[$arc_term->slug];
    } else {
        $raw = strip_tags(category_description());
        if (!$raw && $arc_term->parent) {
            $raw = strip_tags(category_description($arc_term->parent));
        }
        if ($raw) {
            // Cap at 25 words to avoid "Paragraphs are too long" SEO flag
            $arc_desc = wp_trim_words($raw, 25, '.');
        }
    }

    // Determine pill color from this term or its parent
    $root_slug = $arc_term->slug;
    if ($arc_term->parent) {
        $arc_parent_term = get_term($arc_term->parent, 'category');
        $root_slug = $arc_parent_term ? $arc_parent_term->slug : $root_slug;
    }
    $arc_pill_class = $category_colors[$arc_term->slug] ?? $category_colors[$root_slug] ?? 'bc-pill--buying';

} elseif (is_tag()) {
    $arc_term  = get_queried_object();
    $arc_title = $arc_term->name;
    $raw = strip_tags(tag_description());
    if ($raw) {
        $arc_desc = wp_trim_words($raw, 25, '.');
    }
    $arc_pill_class = 'bc-pill--buying';
} else {
    $arc_title = 'All Articles';
}

global $wp_query;
$arc_count = (int) $wp_query->found_posts;
?>

<!-- Breadcrumb bar -->
<div class="bc-breadcrumb-bar">
    <div class="bc-container">
        <nav class="bc-breadcrumb" aria-label="Breadcrumb">
            <a href="<?php echo esc_url(home_url('/')); ?>">Blog</a>
            <span aria-hidden="true">&rsaquo;</span>
            <?php if ($arc_parent_term) : ?>
            <a href="<?php echo esc_url(get_category_link($arc_parent_term->term_id)); ?>"><?php echo esc_html($arc_parent_term->name); ?></a>
            <span aria-hidden="true">&rsaquo;</span>
            <?php endif; ?>
            <span class="bc-breadcrumb-current"><?php echo esc_html($arc_title); ?></span>
        </nav>
    </div>
</div>

<!-- Archive hero -->
<section class="bc-blog-archive-hero">
    <div class="bc-container">
        <div class="bc-blog-archive-hero-inner">
            <?php if ($arc_term && (is_category() || is_tag())) : ?>
            <span class="bc-category-pill <?php echo esc_attr($arc_pill_class); ?>"><?php echo esc_html($arc_title); ?></span>
            <?php endif; ?>
            <h1><?php echo esc_html($arc_title); ?></h1>
            <?php if ($arc_desc) : ?>
            <p class="bc-blog-archive-desc"><?php echo esc_html($arc_desc); ?></p>
            <?php endif; ?>
            <div class="bc-blog-archive-count">
                <span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                    <?php echo $arc_count; ?> article<?php echo $arc_count !== 1 ? 's' : ''; ?>
                </span>
            </div>
        </div>
    </div>
</section>

<?php
// Category pill navigation — top-level shows subcats, subcategory shows siblings
$arc_subcats = [
    'selling-a-home'   => ['Preparing Your Home' => 'preparing-your-home', 'Pricing Your Home' => 'pricing-your-home', 'Flat Fee MLS' => 'flat-fee-mls', 'FSBO Contracts' => 'fsbo-contracts', 'Selling Process' => 'selling-process', 'Handling Negotiations' => 'handling-negotiations', 'Finances of Selling' => 'finances-of-selling'],
    'buying-a-home'    => ['Buying Process' => 'buying-process', 'Finding a Home' => 'finding-a-home', 'Inspecting a Home' => 'inspecting-a-home', 'Making an Offer' => 'making-an-offer', 'Mortgage Basics' => 'mortgage-basics', 'Moving Tips' => 'moving-tips', 'Preparing to Buy' => 'preparing-to-buy', 'Where to Live' => 'where-to-live'],
    'homeowner-guides' => ['Home Improvements' => 'home-improvements', 'Landscaping' => 'landscaping', 'Lifestyle & Design' => 'lifestyle-design', 'Refinancing' => 'refinancing', 'Renting a Home' => 'renting-a-home'],
    'local-insights'   => ['Florida' => 'florida', 'Georgia' => 'georgia', 'Texas' => 'texas', 'North Carolina' => 'north-carolina', 'South Carolina' => 'south-carolina', 'Ohio' => 'ohio'],
];
$arc_pill_modifier = [
    'selling-a-home'   => 'bc-topic-sub--selling',
    'buying-a-home'    => 'bc-topic-sub--buying',
    'homeowner-guides' => 'bc-topic-sub--homeowner',
    'local-insights'   => 'bc-topic-sub--local',
];

$arc_pills_html   = '';
$arc_has_subs     = false;
$arc_nav_modifier = '';

if (is_category() && $arc_term) {
    // Top-level category: show its subcategories
    if (isset($arc_subcats[$arc_term->slug])) {
        $arc_nav_modifier = $arc_pill_modifier[$arc_term->slug] ?? '';
        ob_start();
        foreach ($arc_subcats[$arc_term->slug] as $_lbl => $_slug) {
            $_sub = get_term_by('slug', $_slug, 'category');
            if (!$_sub || !$_sub->count) continue;
            $arc_has_subs = true;
            echo '<a href="' . esc_url(get_category_link($_sub->term_id)) . '" class="bc-topic-sub ' . esc_attr($arc_nav_modifier) . '">' . esc_html($_lbl) . '</a>';
        }
        $arc_pills_html = ob_get_clean();
        if ($arc_term->slug === 'selling-a-home') {
            $arc_pills_html .= '<a href="https://www.beycome.com/blog/north-carolina-property-tax-id/" class="bc-topic-sub ' . esc_attr($arc_nav_modifier) . '">Property Tax Search</a>';
            $arc_has_subs = true;
        }
    }
    // Subcategory: show sibling subcategories with current highlighted
    elseif ($arc_term->parent) {
        $arc_parent = get_term($arc_term->parent, 'category');
        if ($arc_parent && !is_wp_error($arc_parent) && isset($arc_subcats[$arc_parent->slug])) {
            $arc_nav_modifier = $arc_pill_modifier[$arc_parent->slug] ?? '';
            ob_start();
            // "All [Parent]" link first
            echo '<a href="' . esc_url(get_category_link($arc_parent->term_id)) . '" class="bc-topic-sub ' . esc_attr($arc_nav_modifier) . '">All ' . esc_html($arc_parent->name) . '</a>';
            foreach ($arc_subcats[$arc_parent->slug] as $_lbl => $_slug) {
                $_sub = get_term_by('slug', $_slug, 'category');
                if (!$_sub || !$_sub->count) continue;
                $arc_has_subs = true;
                $is_active = ($_sub->term_id === $arc_term->term_id) ? ' bc-topic-sub--active' : '';
                echo '<a href="' . esc_url(get_category_link($_sub->term_id)) . '" class="bc-topic-sub ' . esc_attr($arc_nav_modifier) . $is_active . '">' . esc_html($_lbl) . '</a>';
            }
            $arc_pills_html = ob_get_clean();
        }
    }
}
if ($arc_has_subs) :
?>
<div class="bc-archive-subcats">
    <div class="bc-container">
        <div class="bc-archive-subcats-inner">
            <?php echo $arc_pills_html; ?>
        </div>
    </div>
</div>
<?php endif; ?>

<!-- Card grid -->
<section class="bc-blog-archive-section">
    <div class="bc-container">
        <?php if (have_posts()) : ?>
        <h2 class="bc-sr-only"><?php echo esc_html($arc_title); ?> articles</h2>
        <div class="bc-blog-card-grid">
            <?php while (have_posts()) : the_post(); ?>
            <?php echo beycome_blog_card(get_the_ID(), 'beycome-blog-card', true); ?>
            <?php endwhile; ?>
        </div>

        <!-- Pagination -->
        <?php
        $total = $GLOBALS['wp_query']->max_num_pages;
        if ($total > 1) :
            $paged = max(1, get_query_var('paged'));
        ?>
        <nav class="bc-pagination" aria-label="Archive pagination">
            <?php if ($paged > 1) : ?>
            <a href="<?php echo esc_url(get_pagenum_link($paged - 1)); ?>" class="bc-page-btn">&larr; Previous</a>
            <?php endif; ?>
            <div class="bc-page-numbers">
                <?php
                $start = max(1, $paged - 2);
                $end = min($total, $paged + 2);
                if ($start > 1) echo '<a href="' . esc_url(get_pagenum_link(1)) . '" class="bc-page-num">1</a>';
                if ($start > 2) echo '<span class="bc-page-ellipsis">&hellip;</span>';
                for ($i = $start; $i <= $end; $i++) :
                ?>
                <a href="<?php echo esc_url(get_pagenum_link($i)); ?>" class="bc-page-num<?php echo ($i === $paged) ? ' active' : ''; ?>"><?php echo $i; ?></a>
                <?php endfor; ?>
                <?php if ($end < $total - 1) echo '<span class="bc-page-ellipsis">&hellip;</span>'; ?>
                <?php if ($end < $total) echo '<a href="' . esc_url(get_pagenum_link($total)) . '" class="bc-page-num">' . $total . '</a>'; ?>
            </div>
            <?php if ($paged < $total) : ?>
            <a href="<?php echo esc_url(get_pagenum_link($paged + 1)); ?>" class="bc-page-btn">Next &rarr;</a>
            <?php endif; ?>
        </nav>
        <?php endif; ?>

        <?php else : ?>
        <div class="bc-blog-no-posts">
            <p>No articles found. <a href="<?php echo esc_url(home_url('/')); ?>">Return to blog home &rarr;</a></p>
        </div>
        <?php endif; ?>
    </div>
</section>

<?php
<?php get_footer(); ?>
