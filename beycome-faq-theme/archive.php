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
    if ($raw) $desc = $raw;
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
            <p class="bc-archive-desc"><?php echo esc_html(wp_trim_words($desc, 25, '...')); ?></p>
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
