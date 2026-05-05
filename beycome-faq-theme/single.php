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

<script>
(function() {
    // === TOC ===
    var article = document.getElementById('bc-article');
    var tocList = document.getElementById('bc-toc-list');
    var tocNav = document.getElementById('bc-toc');
    if (article && tocList) {
        var headings = article.querySelectorAll('h2, h3');
        if (headings.length < 2) { tocNav.style.display = 'none'; }
        else {
            headings.forEach(function(h, i) {
                var id = 'section-' + i;
                h.id = id;
                var li = document.createElement('li');
                li.className = 'bc-toc-item' + (h.tagName === 'H3' ? ' bc-toc-sub' : '');
                var a = document.createElement('a');
                a.href = '#' + id;
                a.textContent = h.textContent;
                a.addEventListener('click', function(e) {
                    e.preventDefault();
                    var top = document.getElementById(id).getBoundingClientRect().top + window.pageYOffset - 100;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                });
                li.appendChild(a);
                tocList.appendChild(li);
            });
            var tocLinks = tocList.querySelectorAll('a');
            var obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        tocLinks.forEach(function(l) { l.classList.remove('active'); });
                        var a = tocList.querySelector('a[href="#' + entry.target.id + '"]');
                        if (a) a.classList.add('active');
                    }
                });
            }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });
            headings.forEach(function(h) { obs.observe(h); });
        }
    }

    // === 2. Reading progress bar ===
    var bar = document.getElementById('bc-progress-bar');
    if (article && bar) {
        window.addEventListener('scroll', function() {
            var rect = article.getBoundingClientRect();
            var start = rect.top + window.pageYOffset - window.innerHeight;
            var end = rect.bottom + window.pageYOffset - window.innerHeight;
            var progress = Math.min(1, Math.max(0, (window.pageYOffset - start) / (end - start)));
            bar.style.width = (progress * 100) + '%';
        });
    }

    // Copy link buttons
    document.querySelectorAll('.bc-share-copy').forEach(function(copyBtn) {
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(window.location.href).then(function() {
                var orig = copyBtn.innerHTML;
                copyBtn.textContent = 'Copied!';
                setTimeout(function() { copyBtn.innerHTML = orig; }, 2000);
            });
        });
    });

    // === 1. Auto internal links ===
    if (article) {
        var linkMap = [
            ['flat fee MLS', 'https://www.beycome.com/flat-fee-mls'],
            ['flat-fee MLS', 'https://www.beycome.com/flat-fee-mls'],
            ['closing costs', 'https://www.beycome.com/calculators/closing-cost-calculator'],
            ['closing cost', 'https://www.beycome.com/calculators/closing-cost-calculator'],
            ['mortgage calculator', 'https://www.beycome.com/calculators/mortgage-calculator'],
            ['mortgage pre-approval', 'https://www.beycome.com/faq/knowledge-base/how-long-is-mortgage-preapproval-good-for/'],
            ['pre-approval', 'https://www.beycome.com/faq/knowledge-base/how-long-is-mortgage-preapproval-good-for/'],
            ['title insurance', 'https://www.beycome.com/faq/knowledge-base/what-is-title-insurance/'],
            ['home equity', 'https://www.beycome.com/calculators/home-equity-calculator'],
            ['HELOC', 'https://www.beycome.com/faq/knowledge-base/what-is-a-heloc/'],
            ['FHA loan', 'https://www.beycome.com/faq/knowledge-base/what-is-an-fha-loan/'],
            ['VA loan', 'https://www.beycome.com/faq/knowledge-base/what-is-a-va-loan/'],
            ['USDA loan', 'https://www.beycome.com/faq/knowledge-base/what-is-a-usda-loan/'],
            ['jumbo loan', 'https://www.beycome.com/faq/knowledge-base/what-is-a-jumbo-loan/'],
            ['conventional loan', 'https://www.beycome.com/faq/knowledge-base/what-is-a-conventional-loan/'],
            ['loan-to-value', 'https://www.beycome.com/faq/knowledge-base/what-is-ltv/'],
            ['LTV', 'https://www.beycome.com/faq/knowledge-base/what-is-ltv/'],
            ['down payment', 'https://www.beycome.com/calculators/down-payment-calculator'],
            ['commission calculator', 'https://www.beycome.com/calculators/commission-calculator'],
            ['home sale calculator', 'https://www.beycome.com/calculators/home-sale-calculator'],
            ['amortization', 'https://www.beycome.com/calculators/amortization-calculator'],
            ['rent vs buy', 'https://www.beycome.com/calculators/rent-vs-buy-calculator'],
            ['property tax', 'https://www.beycome.com/calculators/property-tax-calculator'],
            ['capital gains', 'https://www.beycome.com/calculators/capital-gains-tax-calculator'],
            ['Beycome Title', 'https://www.beycometitle.com/'],
            ['FSBO', 'https://www.beycome.com/faq/knowledge-base/how-to-sell-your-home-without-an-agent/'],
            ['for sale by owner', 'https://www.beycome.com/faq/knowledge-base/how-to-sell-your-home-without-an-agent/'],
        ];

        var paragraphs = article.querySelectorAll('p');
        // Clean up empty anchor tags from WP content
        article.querySelectorAll('a').forEach(function(a) {
            if (!a.textContent.trim() && !a.querySelector('img')) {
                a.parentNode.removeChild(a);
            }
        });

        var linked = {};
        paragraphs.forEach(function(p) {
            if (p.querySelector('a')) return;
            var html = p.innerHTML;
            for (var i = 0; i < linkMap.length; i++) {
                var kw = linkMap[i][0];
                var url = linkMap[i][1];
                if (linked[kw]) continue;
                var regex = new RegExp('\\b(' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')\\b', 'i');
                if (regex.test(html) && !html.match(new RegExp('<a[^>]*>' + kw, 'i'))) {
                    html = html.replace(regex, '<a href="' + url + '" class="bc-auto-link">$1</a>');
                    linked[kw] = true;
                    p.innerHTML = html;
                    break;
                }
            }
        });
    }
})();
</script>

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
