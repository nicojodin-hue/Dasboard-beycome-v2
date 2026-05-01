<?php get_header(); ?>

<?php
$cats = get_the_category();
$cat = $cats ? $cats[0] : null;
$content = get_the_content();
$word_count = str_word_count(strip_tags($content));
$reading_time = max(1, ceil($word_count / 250));
?>

<!-- 1. Reading progress bar -->
<div class="bc-progress-bar" id="bc-progress-bar"></div>

<!-- Breadcrumb bar -->
<div class="bc-breadcrumb-bar">
    <div class="bc-container">
        <nav class="bc-breadcrumb">
            <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
            <span>&rsaquo;</span>
            <?php if ($cat) : ?>
            <a href="<?php echo esc_url(get_category_link($cat->term_id)); ?>"><?php echo esc_html($cat->name); ?></a>
            <span>&rsaquo;</span>
            <?php endif; ?>
            <span class="bc-breadcrumb-current"><?php the_title(); ?></span>
        </nav>
    </div>
</div>

<section class="bc-hero" style="padding:32px 24px 32px">
    <div class="bc-hero-inner">
        <?php if ($cat) : ?>
        <a href="<?php echo esc_url(get_category_link($cat->term_id)); ?>" class="bc-category-pill"><?php echo esc_html($cat->name); ?></a>
        <?php endif; ?>
        <h1 style="margin-top:24px"><?php the_title(); ?></h1>
        <div class="bc-article-meta">
            <span class="bc-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                Updated <?php echo get_the_modified_date('F j, Y'); ?>
            </span>
            <span class="bc-meta-dot">&middot;</span>
            <span class="bc-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <?php echo $reading_time; ?> min read
            </span>
        </div>
    </div>
</section>

<?php $cat_ids = wp_get_post_categories(get_the_ID()); ?>
<section style="padding:48px 0 24px;background:#f9fafb">
    <div class="bc-container">
        <div class="bc-article-layout">
            <!-- Main Content -->
            <div>
                <!-- Share — top -->
                <?php get_template_part('partials/share-bar'); ?>

                <article class="bc-article-content" id="bc-article">
                    <?php the_content(); ?>
                </article>

                <!-- Share — bottom -->
                <?php get_template_part('partials/share-bar'); ?>

                <!-- Savings CTA -->
                <div class="bc-savings-cta">
                    <div class="bc-savings-cta-inner">
                        <div class="bc-savings-cta-text">
                            <h2>How much can you save selling and buying with Beycome?</h2>
                            <p>If you sell a <strong>$400,000</strong> home, you save up to <strong class="bc-savings-amount">$20,000</strong> compared to a traditional way. And if you buy your next place with us, you also get <strong>2% back</strong> at closing. Seriously.</p>
                        </div>
                        <div class="bc-savings-cta-actions">
                            <div class="bc-savings-cta-btns">
                                <a href="https://www.beycome.com/flat-fee-mls/" class="bc-cta-btn">Sell your home for $99 &rarr;</a>
                                <a href="https://www.beycome.com/buy/" class="bc-cta-btn bc-cta-btn--blue">Buy with up to 2% back &rarr;</a>
                                <a href="https://www.beycome.com/calculators/commission-calculator" class="bc-savings-calc-link">Calculate your savings &rarr;</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Prev / Next -->
                <?php
                $prev_post = get_previous_post(true);
                $next_post = get_next_post(true);
                if ($prev_post || $next_post) :
                ?>
                <nav class="bc-post-nav">
                    <?php if ($prev_post) : ?>
                    <a href="<?php echo get_permalink($prev_post); ?>">
                        <div class="bc-post-nav-label">&larr; Previous</div>
                        <div class="bc-post-nav-title"><?php echo esc_html($prev_post->post_title); ?></div>
                    </a>
                    <?php else : ?><div></div><?php endif; ?>

                    <?php if ($next_post) : ?>
                    <a href="<?php echo get_permalink($next_post); ?>" class="bc-post-nav-next">
                        <div class="bc-post-nav-label">Next &rarr;</div>
                        <div class="bc-post-nav-title"><?php echo esc_html($next_post->post_title); ?></div>
                    </a>
                    <?php else : ?><div></div><?php endif; ?>
                </nav>
                <?php endif; ?>

                <!-- Explore More Articles -->
                <?php
                $explore = new WP_Query([
            'category__in' => $cat_ids,
            'post__not_in' => [get_the_ID()],
            'posts_per_page' => 3,
            'orderby' => 'rand',
        ]);
        if ($explore->have_posts()) :
        ?>
                <div class="bc-explore-section">
                    <h2 class="bc-explore-title">Explore more articles</h2>
                    <div class="bc-explore-grid">
                        <?php while ($explore->have_posts()) : $explore->the_post();
                            $ex_wc = str_word_count(strip_tags(get_the_content()));
                            $ex_rt = max(1, ceil($ex_wc / 250));
                        ?>
                        <a href="<?php the_permalink(); ?>" class="bc-archive-card">
                            <h3 class="bc-archive-card-title"><?php the_title(); ?></h3>
                            <p class="bc-archive-card-excerpt"><?php echo wp_trim_words(get_the_excerpt(), 18, '...'); ?></p>
                            <div class="bc-archive-card-meta">
                                <span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                                    <?php echo $ex_rt; ?> min
                                </span>
                                <span><?php echo get_the_date('M j, Y'); ?></span>
                            </div>
                        </a>
                        <?php endwhile; wp_reset_postdata(); ?>
                    </div>
                    <?php
                    $explore_cats = get_the_category(get_the_ID());
                    if ($explore_cats) {
                        echo '<a href="' . esc_url(get_category_link($explore_cats[0]->term_id)) . '" style="font-size:15px;font-weight:700;color:var(--c-accent-orange);display:block;text-align:center;margin-top:24px">Discover more ' . esc_html($explore_cats[0]->name) . ' articles &rarr;</a>';
                    }
                    ?>
                </div>
                <?php endif; ?>
            </div>

            <!-- Sidebar -->
            <aside class="bc-article-sidebar">
                <div class="bc-sidebar-sticky">
                <nav class="bc-sidebar-card bc-toc bc-mobile-hide" id="bc-toc">
                    <h3 class="bc-sidebar-title">In this article</h3>
                    <ul class="bc-toc-list" id="bc-toc-list"></ul>
                </nav>

                <div class="bc-sidebar-cta" style="margin-top:20px">
                    <h3 style="font-family:var(--font-title);font-size:18px;font-weight:700;color:var(--c-primary);margin-bottom:8px">Ready to sell your home?</h3>
                    <p style="font-size:14px;color:var(--c-secondary);margin-bottom:16px;line-height:1.5">List on the MLS for just $99 — no listing agent commission.</p>
                    <a href="https://www.beycome.com/flat-fee-mls/" class="bc-cta-btn">Sell Your Home &rarr;</a>
                </div>

                <div class="bc-sidebar-cta" style="margin-top:20px">
                    <h3 style="font-family:var(--font-title);font-size:18px;font-weight:700;color:var(--c-primary);margin-bottom:8px">Buying a home?</h3>
                    <p style="font-size:14px;color:var(--c-secondary);margin-bottom:16px;line-height:1.5">Get 2% of the purchase price back at closing with Beycome's buyer program.</p>
                    <a href="https://www.beycome.com/i-want-to-buy-a-home" class="bc-cta-btn" style="background:var(--c-accent)">Buy a Home &rarr;</a>
                </div>

                <div class="bc-sidebar-card bc-mobile-hide" style="margin-top:20px">
                    <h3 class="bc-sidebar-title">Related articles</h3>
                    <ul class="bc-resources-list">
                        <?php
                        $related = new WP_Query([
                            'category__in' => $cat_ids,
                            'post__not_in' => [get_the_ID()],
                            'posts_per_page' => 5,
                            'orderby' => 'rand',
                        ]);
                        while ($related->have_posts()) : $related->the_post();
                        ?>
                        <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
                        <?php endwhile; wp_reset_postdata(); ?>
                    </ul>
                    <?php
                    $cats_for_link = get_the_category(get_the_ID());
                    if ($cats_for_link) {
                        $cat_link = $cats_for_link[0];
                        echo '<a href="' . esc_url(get_category_link($cat_link->term_id)) . '" style="font-size:15px;font-weight:700;color:var(--c-accent-orange);display:block;margin-top:12px">Browse all ' . esc_html($cat_link->name) . ' &rarr;</a>';
                    }
                    ?>
                </div>

                <div class="bc-sidebar-card bc-mobile-hide" style="margin-top:20px">
                    <h3 class="bc-sidebar-title">Real estate calculators</h3>
                    <ul class="bc-resources-list">
                        <li><a href="https://www.beycome.com/calculators">All Calculators</a></li>
                        <li><a href="https://www.beycome.com/calculators/mortgage-calculator">Mortgage Calculator</a></li>
                        <li><a href="https://www.beycome.com/calculators/home-sale-calculator">Home Sale Calculator</a></li>
                        <li><a href="https://www.beycome.com/calculators/closing-cost-calculator">Closing Cost Calculator</a></li>
                    </ul>
                </div>

                </div><!-- end bc-sidebar-sticky -->
            </aside>
        </div>
    </div>
</section>

<!-- Common questions about Beycome -->
<section class="bc-common-qs-section">
    <div class="bc-container">
        <h2 class="bc-common-qs-title">Common questions about Beycome</h2>
        <div class="bc-common-qs-grid">
            <div class="bc-common-q">
                <h3>How much does it cost to list with Beycome?</h3>
                <p>Beycome offers flat fee MLS listing plans starting at $99. You pay a one-time fee to get your home listed on the MLS — no listing agent commission, no percentage of your sale price. Optional add-ons like professional photography, yard signs, and 3D tours are available à la carte.</p>
            </div>
            <div class="bc-common-q">
                <h3>How long does it take for my listing to go live?</h3>
                <p>Most listings are reviewed and approved within 1–2 business days. Once verified, your home is submitted to the MLS and automatically syndicated to Zillow, Redfin, Realtor.com, and 100+ other portals. Zillow typically reflects new listings within 24–48 hours of MLS submission.</p>
            </div>
            <div class="bc-common-q">
                <h3>Can buyers' agents still show my home?</h3>
                <p>Yes. When you list on the MLS with Beycome, your home is fully visible to all licensed buyers' agents. You set the buyer's agent commission (typically 2–3%) in your listing. Agents can contact you directly or schedule showings through ShowingTime, which is included in most Beycome plans.</p>
            </div>
            <div class="bc-common-q">
                <h3>What does Beycome's buyer program offer?</h3>
                <p>When you buy a home through Beycome, you receive up to 2% of the purchase price back as a credit at closing. On a $400,000 home, that's up to $8,000 returned to you. You still get access to every MLS listing and full support throughout the transaction — without sacrificing the rebate.</p>
            </div>
        </div>
    </div>
</section>

<!-- Dive into more topics -->
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

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
<?php
$cats = get_the_category();
$cat = $cats ? $cats[0] : null;
$word_count = str_word_count(strip_tags(get_the_content()));

$schemas = [
    [
        '@context' => 'https://schema.org',
        '@type' => 'Article',
        'headline' => get_the_title(),
        'description' => beycome_faq_meta_description(),
        'url' => get_permalink(),
        'datePublished' => get_the_date('c'),
        'dateModified' => get_the_modified_date('c'),
        'wordCount' => $word_count,
        'author' => beycome_faq_org_schema(),
        'publisher' => beycome_faq_org_schema(),
        'mainEntityOfPage' => ['@type' => 'WebPage', '@id' => get_permalink()],
        'image' => 'https://www.beycome.com/logos/logo-beycome-512x512.png',
        'articleSection' => $cat ? $cat->name : 'Real Estate',
        'inLanguage' => 'en-US',
    ],
    [
        '@context' => 'https://schema.org',
        '@type' => 'BreadcrumbList',
        'itemListElement' => array_values(array_filter([
            ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => home_url('/')],
            $cat ? ['@type' => 'ListItem', 'position' => 2, 'name' => $cat->name, 'item' => get_category_link($cat->term_id)] : null,
            ['@type' => 'ListItem', 'position' => $cat ? 3 : 2, 'name' => get_the_title()],
        ])),
    ],
];
echo json_encode($schemas, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
?>
</script>

<?php get_footer(); ?>
