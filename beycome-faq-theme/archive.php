<?php get_header(); ?>

<?php
$title = '';
$desc = '';
if (is_category()) {
    $term = get_queried_object();
    $title = $term->name;
    $raw = strip_tags(category_description());
    if (!$raw && $term->parent) {
        $raw = strip_tags(category_description($term->parent));
    }
    if ($raw) $desc = $raw;
} elseif (is_tag()) {
    $title = single_tag_title('', false);
    $raw = strip_tags(tag_description());
    if ($raw) {
        $desc = $raw;
    } else {
        // Fallback descriptions for known tags
        $bc_tag_descs = [
            'advertisement'        => 'Tips and guides on how to advertise your property listing for maximum exposure — from MLS syndication and social media sharing to Craigslist, Facebook Marketplace, and yard signs.',
            'buyer'                => 'Articles covering everything buyers need to know — from finding a home and making an offer to navigating inspections, mortgage approval, and closing day with confidence.',
            'closing'              => 'Guides to help you understand and prepare for closing — what documents you need, how to read a closing disclosure, who pays what, and what to expect on the day you sign.',
            'compliance'           => 'Real estate compliance resources covering MLS rules, listing requirements, fair housing regulations, and what homeowners need to know to stay on the right side of the law.',
            'contact'              => 'Resources on how to communicate effectively with agents, buyers, sellers, and title companies — including what information is allowed on MLS listings and how to handle inquiries.',
            'copyright'            => 'Information about copyright in real estate — photo rights, MLS rules around image use, and how to handle flagged or disputed listing photos.',
            'credit-esential'      => 'Essential guides on credit scores, FICO ratings, and how your credit history affects your ability to buy a home, qualify for a mortgage, and secure the best interest rate.',
            'credit-essentials'    => 'Essential guides on credit scores, FICO ratings, and how your credit history affects your ability to buy a home, qualify for a mortgage, and secure the best interest rate.',
            'marketing'            => 'Real estate marketing tools and strategies for FSBO sellers — yard signs, business cards, flyers, open houses, social media, and how to get maximum exposure for your listing.',
            'mls-listing'          => 'Step-by-step guides to MLS listings — how to create, update, pause, and manage your flat fee MLS listing on Beycome, and what information is displayed to buyers and agents.',
            'mortgage'             => 'Plain-language mortgage guides covering loan types, interest rates, pre-approval, monthly payments, insurance requirements, and how to compare mortgage offers.',
            'not-showing'          => 'Troubleshooting guides for listings that are not showing on Zillow, Realtor.com, or other portals — causes, timelines, and how to resolve syndication issues.',
            'photo'                => 'Photo requirements and best practices for MLS listings — size, resolution, copyright rules, and how to upload or update your listing photos on Beycome.',
            'requirement'          => 'Overviews of key real estate requirements — from MLS listing rules and photo standards to mortgage qualification criteria and document checklists for buyers and sellers.',
            'rules'                => 'Guides to MLS rules, fair housing regulations, and platform policies that govern how homes are listed, marketed, and sold on Beycome and the broader MLS network.',
            'sheet'                => 'Information about MLS data sheets — how to find, read, and download your MLS listing sheet, and how to share it with buyers and agents.',
            'showing'              => 'How to schedule, manage, and track property showings as a FSBO seller — setting availability, receiving requests, using ShowingTime, and following up after visits.',
            'showingtime'          => 'How to enable and use ShowingTime for your Beycome listing — setting up appointment scheduling, managing showing requests, and syncing your availability calendar.',
            'syndication'          => 'How real estate syndication works — how your Beycome listing is automatically distributed to Zillow, Redfin, Realtor.com, Trulia, and 100+ other home search portals.',
            'title'                => 'Title insurance, title search, and closing guides — what title insurance covers, how long it lasts, what Beycome Title offers, and how to set up title services in Florida.',
            'upgrade'              => 'How to upgrade your Beycome listing with add-ons — professional photography, 3D tours, social media promotion, yard signs, and other à la carte tools to sell faster.',
            'verification-process' => 'What happens during the Beycome listing verification process — how long it takes, what is checked, and how to speed up approval so your home goes live on the MLS.',
            'zillow'               => 'Why your listing may not appear on Zillow, how syndication timelines work, and what to do if your Beycome MLS listing is missing from Zillow or other search portals.',
        ];
        $bc_slug = get_queried_object()->slug;
        if (isset($bc_tag_descs[$bc_slug])) {
            $desc = $bc_tag_descs[$bc_slug];
        }
    }
} else {
    $title = 'Archive';
}
?>

<!-- Breadcrumb bar -->
<div class="bc-breadcrumb-bar">
    <div class="bc-container">
        <nav class="bc-breadcrumb">
            <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
            <span>&rsaquo;</span>
            <span class="bc-breadcrumb-current"><?php echo esc_html($title); ?></span>
        </nav>
    </div>
</div>

<section class="bc-hero" style="padding:32px 24px 32px">
    <div class="bc-hero-inner">
        <?php if (is_category()) : ?>
        <a href="<?php echo esc_url(get_category_link(get_queried_object_id())); ?>" class="bc-category-pill"><?php echo esc_html($title); ?></a>
        <?php elseif (is_tag()) : ?>
        <span class="bc-category-pill"><?php echo esc_html($title); ?></span>
        <?php endif; ?>
        <h1 style="font-size:40px;margin-top:24px"><?php echo esc_html($title); ?></h1>
        <?php if ($desc) : ?>
            <p class="bc-archive-desc"><?php echo esc_html($desc); ?></p>
        <?php endif; ?>
        <div class="bc-article-meta">
            <span class="bc-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <?php global $wp_query; echo $wp_query->found_posts; ?> article<?php echo $wp_query->found_posts !== 1 ? 's' : ''; ?>
            </span>
        </div>
    </div>
</section>

<section style="padding:48px 0 80px;background:#f9fafb">
    <div class="bc-container">
        <?php if (have_posts()) : ?>
            <div class="bc-archive-grid">
                <?php while (have_posts()) : the_post();
                    $word_count = str_word_count(strip_tags(get_the_content()));
                    $read_time = max(1, ceil($word_count / 250));
                ?>
                <a href="<?php the_permalink(); ?>" class="bc-archive-card">
                    <h2 class="bc-archive-card-title"><?php the_title(); ?></h2>
                    <p class="bc-archive-card-excerpt"><?php echo wp_trim_words(get_the_excerpt(), 18, '...'); ?></p>
                    <div class="bc-archive-card-meta">
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            <?php echo $read_time; ?> min
                        </span>
                        <span><?php echo get_the_date('M j, Y'); ?></span>
                    </div>
                </a>
                <?php endwhile; ?>
            </div>
            <?php
            the_posts_pagination([
                'prev_text' => '&laquo; Previous',
                'next_text' => 'Next &raquo;',
                'class' => 'bc-pagination',
            ]);
            ?>
        <?php else : ?>
            <p style="font-size:18px;color:var(--c-secondary);text-align:center;padding:48px 0">No articles found in this category.</p>
        <?php endif; ?>
    </div>
</section>

<!-- Category intro text -->
<?php
$bc_cat_intros = [
    'faq' => [
        'Beycome is a flat fee real estate platform. Sell your home for a one-time $99 listing fee, or buy with up to 2% back at closing.',
        'Our FAQ section answers the most common questions homeowners and buyers have about how Beycome works — from listing setup to closing day.',
        'Browse the articles below or use the search bar to find the answer you need.',
    ],
    'knowledge-base' => [
        'Our knowledge base covers essential real estate topics to help you make smarter decisions when buying or selling a home.',
        'From mortgage types and credit scores to closing disclosures and home inspections, every guide is written in plain language — no jargon.',
        'Each article is reviewed regularly to reflect current market practices, regulations, and platform updates.',
    ],
];
if (is_category()) {
    $bc_slug = get_queried_object()->slug;
    if (isset($bc_cat_intros[$bc_slug])) :
?>
<section class="bc-cat-intro-section">
    <div class="bc-container">
        <?php foreach ($bc_cat_intros[$bc_slug] as $bc_sentence) : ?>
        <p class="bc-cat-intro-text"><?php echo esc_html($bc_sentence); ?></p>
        <?php endforeach; ?>
    </div>
</section>
<?php endif; } ?>

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
<?php
$archive_title = '';
$archive_url = '';
if (is_category()) {
    $archive_title = single_cat_title('', false);
    $archive_url = get_category_link(get_queried_object_id());
} elseif (is_tag()) {
    $archive_title = single_tag_title('', false);
    $archive_url = get_tag_link(get_queried_object_id());
}

// Build ItemList from current posts
$items = [];
$pos = 1;
if (have_posts()) : rewind_posts();
    while (have_posts()) : the_post();
        $items[] = [
            '@type' => 'ListItem',
            'position' => $pos++,
            'url' => get_permalink(),
            'name' => get_the_title(),
        ];
    endwhile;
    rewind_posts();
endif;

$schemas = [
    // CollectionPage
    [
        '@context' => 'https://schema.org',
        '@type' => 'CollectionPage',
        'name' => $archive_title . ' — Beycome FAQ',
        'description' => beycome_faq_meta_description(),
        'url' => $archive_url,
        'publisher' => beycome_faq_org_schema(),
        'mainEntity' => [
            '@type' => 'ItemList',
            'numberOfItems' => count($items),
            'itemListElement' => $items,
        ],
    ],

    // BreadcrumbList
    [
        '@context' => 'https://schema.org',
        '@type' => 'BreadcrumbList',
        'itemListElement' => [
            ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => home_url('/')],
            ['@type' => 'ListItem', 'position' => 2, 'name' => $archive_title],
        ],
    ],
];
echo json_encode($schemas, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
?>
</script>

<?php
$bc_faq_topics = get_categories(['hide_empty' => true, 'orderby' => 'name', 'order' => 'ASC']);
if ($bc_faq_topics) :
?>
<section class="bc-footer-topics-section">
    <div class="bc-container">
        <div class="bc-footer-topics-label">Dive into more topics</div>
        <div class="bc-footer-topics-pills">
            <?php foreach ($bc_faq_topics as $bc_topic) : ?>
            <a href="<?php echo esc_url(get_category_link($bc_topic->term_id)); ?>" class="bc-topic-sub bc-topic-grey"><?php echo esc_html($bc_topic->name); ?></a>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<?php get_footer(); ?>
