<?php get_header(); ?>

<?php
// Helper: resolve a category by slug
function bc_cat($slug) {
    $t = get_term_by('slug', $slug, 'category');
    if (!$t) return ['url' => '#', 'count' => 0, 'id' => 0];
    return ['url' => get_category_link($t->term_id), 'count' => (int)$t->count, 'id' => $t->term_id];
}

// Helper: resolve a tag by slug
function bc_tag($slug) {
    $t = get_term_by('slug', $slug, 'post_tag');
    if (!$t) return ['url' => '#', 'count' => 0, 'id' => 0];
    return ['url' => get_tag_link($t->term_id), 'count' => (int)$t->count, 'id' => $t->term_id];
}

// Subnav: label → category slug
$bc_subnav = [
    'Selling'   => 'selling-a-home',
    'Buying'    => 'buying-a-home',
    'Homeowner' => 'homeowner-guides',
    'Local'     => 'local-insights',
];
?>

<!-- Blog secondary subnav (hidden on homepage via CSS) -->
<nav class="bc-blog-subnav" style="display:none">
    <div class="bc-container">
        <div class="bc-blog-subnav-inner">
            <div class="bc-blog-subnav-links">
                <?php foreach ($bc_subnav as $label => $slug) :
                    $t = get_term_by('slug', $slug, 'category');
                    $url = $t ? get_category_link($t->term_id) : '#';
                    $active = ($t && is_category($t->term_id)) ? ' class="active"' : '';
                ?>
                <a href="<?php echo esc_url($url); ?>"<?php echo $active; ?>><?php echo esc_html($label); ?></a>
                <?php endforeach; ?>
                <a href="https://www.beycome.com/faq">FAQ</a>
            </div>
        </div>
    </div>
</nav>

<!-- Blog hero tagline -->
<section class="bc-blog-hero">
    <div class="bc-container">
        <h1>Real estate,<br>decoded.</h1>
        <p>Guides, market insights, and how-tos, from buying to renting,<br>plus tips on saving equity, pricing smart, and navigating every step.</p>
    </div>
</section>

<?php
// Resolve excluded category IDs
$_local_guides = get_term_by('slug', 'local-guides', 'category');
$_reviews_term = get_term_by('slug', 'beycome-reviews', 'category');
$_exclude_ids  = array_filter([
    $_local_guides ? $_local_guides->term_id : 0,
    $_reviews_term ? $_reviews_term->term_id : 0,
]);
$_tax_exclude = !empty($_exclude_ids) ? [['taxonomy' => 'category', 'field' => 'term_id', 'terms' => $_exclude_ids, 'operator' => 'NOT IN']] : [];

// Try sticky post first
$featured   = null;
$sticky_ids = get_option('sticky_posts');
if (!empty($sticky_ids)) {
    $sticky_q = new WP_Query(array_filter([
        'post__in'            => $sticky_ids,
        'posts_per_page'      => 1,
        'post_status'         => 'publish',
        'ignore_sticky_posts' => true,
        'tax_query'           => $_tax_exclude ?: null,
    ]));
    if ($sticky_q->have_posts()) $featured = $sticky_q->posts[0];
    wp_reset_postdata();
}

// Fetch 4 aside posts (exclude featured if found)
$_aside_args = [
    'posts_per_page'      => $featured ? 4 : 5,
    'post_status'         => 'publish',
    'ignore_sticky_posts' => true,
    'post__not_in'        => $featured ? [$featured->ID] : [],
];
if (!empty($_tax_exclude)) $_aside_args['tax_query'] = $_tax_exclude;
$aside_query = new WP_Query($_aside_args);
$aside_posts = $aside_query->posts;
if (!$featured && !empty($aside_posts)) {
    $featured    = array_shift($aside_posts);
    $aside_posts = array_slice($aside_posts, 0, 4);
}
wp_reset_postdata();
?>

<?php if ($featured) : ?>
<section class="bc-blog-featured-section">
    <div class="bc-container">
        <div class="bc-blog-featured-grid">

            <!-- Big featured card -->
            <?php
            $feat_cats      = get_the_category($featured->ID);
            $feat_cat       = $feat_cats ? $feat_cats[0] : null;
            $feat_time      = beycome_blog_reading_time($featured->ID);
            $feat_has_thumb = has_post_thumbnail($featured->ID);
            $feat_excerpt   = wp_trim_words(get_the_excerpt($featured->ID) ?: strip_tags(get_post_field('post_content', $featured->ID)), 32, '…');
            $feat_pill_map  = ['selling-a-home' => 'bc-pill--selling', 'buying-a-home' => 'bc-pill--buying', 'homeowner-guides' => 'bc-pill--homeowner', 'local-insights' => 'bc-pill--local'];
            $feat_root_slug = $feat_cat ? $feat_cat->slug : '';
            if ($feat_cat && $feat_cat->parent) { $p = get_term($feat_cat->parent, 'category'); if ($p && !is_wp_error($p)) $feat_root_slug = $p->slug; }
            $feat_pill_class = $feat_pill_map[$feat_root_slug] ?? '';
            ?>
            <a href="<?php echo esc_url(get_permalink($featured->ID)); ?>" class="bc-featured-card">
                <div class="bc-featured-card-img">
                    <?php if ($feat_has_thumb) : echo get_the_post_thumbnail($featured->ID, 'beycome-blog-hero', ['alt' => esc_attr(get_the_title($featured->ID)), 'loading' => 'eager']); else : ?>
                    <div class="bc-featured-card-img-placeholder"></div>
                    <?php endif; ?>
                    <span class="bc-featured-badge">Featured</span>
                    <div class="bc-featured-card-overlay">
                        <?php
                        $feat_title_full = get_the_title($featured->ID);
                        preg_match('/^(.*?)\s*(\([^)]+\))\s*$/', $feat_title_full, $feat_title_parts);
                        $feat_title_main = !empty($feat_title_parts[1]) ? $feat_title_parts[1] : $feat_title_full;
                        $feat_title_sub  = !empty($feat_title_parts[2]) ? $feat_title_parts[2] : '';
                        ?>
                        <h2 class="bc-featured-card-title">
                            <?php echo esc_html($feat_title_main); ?>
                            <?php if ($feat_title_sub) : ?><span class="bc-featured-title-sub"><?php echo esc_html($feat_title_sub); ?></span><?php endif; ?>
                        </h2>
                        <?php if ($feat_excerpt) : ?>
                        <p class="bc-featured-card-excerpt"><?php echo esc_html($feat_excerpt); ?></p>
                        <?php endif; ?>
                    </div>
                </div>
            </a>

        </div>
    </div>
</section>
<?php endif; ?>


<!-- Category strips -->
<?php
$strip_categories = [
    'Selling a Home'   => 'selling-a-home',
    'Buying a Home'    => 'buying-a-home',
    'Homeowner Guides' => 'homeowner-guides',
    'Local Insights'   => 'local-insights',
];
$strip_modifiers = [
    'selling-a-home'   => 'bc-blog-strip-section--selling',
    'buying-a-home'    => 'bc-blog-strip-section--buying',
    'homeowner-guides' => 'bc-blog-strip-section--homeowner',
    'local-insights'   => 'bc-blog-strip-section--local',
];
$strip_subcats = [
    'selling-a-home'   => ['Preparing Your Home' => 'preparing-your-home', 'Pricing Your Home' => 'pricing-your-home', 'Flat Fee MLS' => 'flat-fee-mls', 'FSBO Contracts' => 'fsbo-contracts', 'Selling Process' => 'selling-process', 'Handling Negotiations' => 'handling-negotiations', 'Finances of Selling' => 'finances-of-selling'],
    'buying-a-home'    => ['Buying Process' => 'buying-process', 'Finding a Home' => 'finding-a-home', 'Inspecting a Home' => 'inspecting-a-home', 'Making an Offer' => 'making-an-offer', 'Mortgage Basics' => 'mortgage-basics', 'Moving Tips' => 'moving-tips', 'Preparing to Buy' => 'preparing-to-buy', 'Where to Live' => 'where-to-live'],
    'homeowner-guides' => ['Home Improvements' => 'home-improvements', 'Landscaping' => 'landscaping', 'Lifestyle & Design' => 'lifestyle-design', 'Refinancing' => 'refinancing', 'Renting a Home' => 'renting-a-home'],
    'local-insights'   => ['Florida' => 'florida', 'Georgia' => 'georgia', 'Texas' => 'texas', 'North Carolina' => 'north-carolina', 'South Carolina' => 'south-carolina', 'Ohio' => 'ohio'],
];
foreach ($strip_categories as $strip_label => $strip_slug) :
    $strip_term = get_term_by('slug', $strip_slug, 'category');
    if (!$strip_term) continue;
    $strip_query = new WP_Query([
        'tax_query'      => [['taxonomy' => 'category', 'field' => 'term_id', 'terms' => $strip_term->term_id]],
        'posts_per_page' => 3,
        'post_status'    => 'publish',
    ]);
    if (!$strip_query->have_posts()) { wp_reset_postdata(); continue; }
?>
<section class="bc-blog-strip-section <?php echo esc_attr($strip_modifiers[$strip_slug] ?? ''); ?>">
    <div class="bc-container">
        <div class="bc-blog-strip-header">
            <h2 class="bc-blog-strip-title"><?php echo esc_html($strip_label); ?></h2>
            <a href="<?php echo esc_url(get_category_link($strip_term->term_id)); ?>" class="bc-blog-strip-see-all">See all &rarr;</a>
        </div>
        <?php if (!empty($strip_subcats[$strip_slug])) : ?>
        <div class="bc-blog-strip-subcats">
            <?php foreach ($strip_subcats[$strip_slug] as $sub_label => $sub_slug) :
                $sub = bc_cat($sub_slug);
                if (!$sub['id'] || !$sub['count']) continue;
            ?>
            <a href="<?php echo esc_url($sub['url']); ?>" class="bc-topic-sub"><?php echo esc_html($sub_label); ?></a>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
        <div class="bc-blog-strip-grid">
            <?php while ($strip_query->have_posts()) : $strip_query->the_post(); ?>
            <?php echo beycome_blog_card(get_the_ID(), 'beycome-blog-card', false); ?>
            <?php endwhile; wp_reset_postdata(); ?>
        </div>
    </div>
</section>
<?php endforeach; ?>

<!-- By Location -->
<?php
$bc_location_groups = [
    'Florida'        => ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale', 'Sarasota', 'Naples', 'West Palm Beach', 'Fort Myers', 'Cape Coral', 'Tallahassee', 'Gainesville', 'Clearwater', 'Bradenton', 'Daytona Beach'],
    'Georgia'        => ['Atlanta', 'Savannah', 'Augusta', 'Alpharetta', 'Marietta', 'Roswell', 'Sandy Springs'],
    'Texas'          => ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'The Woodlands', 'Sugar Land'],
    'North Carolina' => ['Charlotte', 'Raleigh', 'Durham', 'Asheville', 'Wilmington', 'Cary', 'Chapel Hill'],
    'South Carolina' => ['Charleston', 'Columbia', 'Greenville', 'Myrtle Beach', 'Hilton Head'],
    'Ohio'           => ['Columbus', 'Cleveland', 'Cincinnati', 'Dayton', 'Akron'],
    'Michigan'       => ['Detroit', 'Grand Rapids', 'Ann Arbor', 'Troy', 'Lansing'],
    'Minnesota'      => ['Minneapolis', 'Saint Paul', 'Bloomington', 'Edina'],
    'Tennessee'      => ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Franklin'],
    'Virginia'       => ['Richmond', 'Virginia Beach', 'Norfolk', 'Alexandria', 'Fairfax'],
    'Colorado'       => ['Denver', 'Colorado Springs', 'Boulder', 'Fort Collins', 'Aurora'],
    'Arizona'        => ['Phoenix', 'Scottsdale', 'Tucson', 'Mesa', 'Chandler', 'Gilbert'],
    'Nevada'         => ['Las Vegas', 'Henderson', 'Reno', 'Summerlin'],
    'California'     => ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose', 'Irvine'],
    'Illinois'       => ['Chicago', 'Naperville', 'Evanston'],
    'Maryland'       => ['Baltimore', 'Annapolis', 'Bethesda', 'Rockville'],
    'Pennsylvania'   => ['Philadelphia', 'Pittsburgh', 'Harrisburg'],
    'New York'       => ['New York City', 'Brooklyn', 'Buffalo', 'Albany'],
    'Washington'     => ['Seattle', 'Bellevue', 'Tacoma', 'Spokane'],
];
?>
<section class="bc-blog-location-section">
    <div class="bc-container">
        <h2 class="bc-blog-strip-title" style="margin-bottom:20px">By Location</h2>
        <div class="bc-blog-location-groups">
            <?php foreach ($bc_location_groups as $state => $cities) :
                $state_tag = get_term_by('name', $state, 'post_tag');
                $city_tags = [];
                foreach ($cities as $city) {
                    $t = get_term_by('name', $city, 'post_tag');
                    if ($t && $t->count > 0) $city_tags[] = $t;
                }
                $state_has_posts = ($state_tag && $state_tag->count > 0);
                if (!$state_has_posts && empty($city_tags)) continue;
            ?>
            <div class="bc-location-group">
                <div class="bc-location-group-state">
                    <?php if ($state_has_posts) : ?>
                    <a href="<?php echo esc_url(get_tag_link($state_tag->term_id)); ?>" class="bc-location-state-link"><?php echo esc_html($state); ?></a>
                    <?php else : ?>
                    <span class="bc-location-state-link bc-location-state-link--inactive"><?php echo esc_html($state); ?></span>
                    <?php endif; ?>
                </div>
                <?php if (!empty($city_tags)) : ?>
                <div class="bc-location-group-cities">
                    <?php foreach ($city_tags as $ct) : ?>
                    <a href="<?php echo esc_url(get_tag_link($ct->term_id)); ?>" class="bc-location-city-tag"><?php echo esc_html($ct->name); ?></a>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
