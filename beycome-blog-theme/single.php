<?php get_header(); ?>

<?php
$cats = get_the_category();
$cat = $cats ? $cats[0] : null;
$content = get_the_content();
$reading_time = beycome_blog_reading_time();
$has_thumb = has_post_thumbnail();

// Determine pill color from root category slug
$bc_pill_colors = [
    'selling-a-home'   => 'bc-pill--selling',
    'buying-a-home'    => 'bc-pill--buying',
    'homeowner-guides' => 'bc-pill--homeowner',
    'local-insights'   => 'bc-pill--local',
];
$bc_pill_class = '';
if ($cat) {
    $root = $cat->parent ? get_term($cat->parent, 'category') : $cat;
    $bc_pill_class = $bc_pill_colors[$root->slug] ?? $bc_pill_colors[$cat->slug] ?? '';
}
?>

<!-- Reading progress bar -->
<div class="bc-progress-bar" id="bc-progress-bar"></div>

<!-- Breadcrumb bar -->
<div class="bc-breadcrumb-bar">
    <div class="bc-container">
        <nav class="bc-breadcrumb" aria-label="Breadcrumb">
            <a href="<?php echo esc_url(home_url('/')); ?>">Blog</a>
            <span aria-hidden="true">&rsaquo;</span>
            <?php if ($cat) : ?>
            <a href="<?php echo esc_url(get_category_link($cat->term_id)); ?>"><?php echo esc_html($cat->name); ?></a>
            <span aria-hidden="true">&rsaquo;</span>
            <?php endif; ?>
            <span class="bc-breadcrumb-current"><?php the_title(); ?></span>
        </nav>
    </div>
</div>

<!-- Article hero with featured image -->
<section class="bc-single-hero">
    <div class="bc-single-hero-inner">
        <?php if ($cat) : ?>
        <a href="<?php echo esc_url(get_category_link($cat->term_id)); ?>" class="bc-category-pill <?php echo esc_attr($bc_pill_class); ?>"><?php echo esc_html($cat->name); ?></a>
        <?php endif; ?>
        <h1><?php the_title(); ?></h1>
        <div class="bc-article-meta">
            <span class="bc-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                Updated <?php echo get_the_modified_date('F j, Y'); ?>
            </span>
            <span class="bc-meta-dot">&middot;</span>
            <span class="bc-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <?php echo (int)$reading_time; ?> min read
            </span>
        </div>
    </div>

    <?php if ($has_thumb) : ?>
    <div class="bc-single-hero-img">
        <div class="bc-container">
            <?php the_post_thumbnail('beycome-blog-hero', ['alt' => esc_attr(get_the_title()), 'loading' => 'eager', 'fetchpriority' => 'high']); ?>
        </div>
    </div>
    <?php endif; ?>
</section>

<!-- Article body -->
<section class="bc-single-body">
    <div class="bc-container">
        <div class="bc-article-layout">

            <!-- Main content -->
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
                            <h3>How much can you save selling and buying with Beycome?</h3>
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

                <!-- Prev / Next in same category -->
                <?php
                $prev_post = get_previous_post(true);
                $next_post = get_next_post(true);
                if ($prev_post || $next_post) :
                ?>
                <nav class="bc-post-nav" aria-label="Article navigation">
                    <?php if ($prev_post) : ?>
                    <a href="<?php echo esc_url(get_permalink($prev_post)); ?>" class="bc-post-nav-prev">
                        <div class="bc-post-nav-label">&larr; Previous</div>
                        <div class="bc-post-nav-title"><?php echo esc_html(get_the_title($prev_post)); ?></div>
                    </a>
                    <?php else : ?>
                    <span></span>
                    <?php endif; ?>
                    <?php if ($next_post) : ?>
                    <a href="<?php echo esc_url(get_permalink($next_post)); ?>" class="bc-post-nav-next">
                        <div class="bc-post-nav-label">Next &rarr;</div>
                        <div class="bc-post-nav-title"><?php echo esc_html(get_the_title($next_post)); ?></div>
                    </a>
                    <?php endif; ?>
                </nav>
                <?php endif; ?>

                <!-- Related posts -->
                <?php if ($cat) :
                    $related = new WP_Query([
                        'category__in' => [$cat->term_id],
                        'post__not_in' => [get_the_ID()],
                        'posts_per_page' => 3,
                        'post_status' => 'publish',
                        'orderby' => 'rand',
                    ]);
                    if ($related->have_posts()) :
                ?>
                <div class="bc-related-posts">
                    <h3 class="bc-explore-title">Explore more articles</h3>
                    <div class="bc-blog-strip-grid">
                        <?php while ($related->have_posts()) : $related->the_post(); ?>
                        <?php echo beycome_blog_card(get_the_ID(), 'beycome-blog-card', false); ?>
                        <?php endwhile; wp_reset_postdata(); ?>
                    </div>
                    <a href="<?php echo esc_url(get_category_link($cat->term_id)); ?>" class="bc-related-title">Discover more <span style="color:var(--c-accent-orange)"><?php echo esc_html($cat->name); ?></span> articles</a>
                </div>
                <?php endif; endif; ?>
            </div>

            <!-- Sidebar: TOC + Share -->
            <aside class="bc-sidebar" id="bc-sidebar">
                <div class="bc-sidebar-sticky" id="bc-sidebar-sticky">

                    <!-- Table of contents -->
                    <div class="bc-toc" id="bc-toc">
                        <div class="bc-toc-title">In this article</div>
                        <nav class="bc-toc-nav" id="bc-toc-nav" aria-label="Table of contents"></nav>
                    </div>

                    <!-- Sidebar CTA: Sell -->
                    <div class="bc-sidebar-cta" style="margin-top:20px">
                        <h3 style="font-family:var(--font-title);font-size:18px;font-weight:700;color:var(--c-primary);margin-bottom:8px">Ready to sell your home?</h3>
                        <p style="font-size:14px;color:var(--c-secondary);margin-bottom:16px;line-height:1.5">List on the MLS for just $99 — no listing agent commission.</p>
                        <a href="https://www.beycome.com/flat-fee-mls/" class="bc-cta-btn">Sell Your Home &rarr;</a>
                    </div>

                    <!-- Sidebar CTA: Buy -->
                    <div class="bc-sidebar-cta" style="margin-top:20px">
                        <h3 style="font-family:var(--font-title);font-size:18px;font-weight:700;color:var(--c-primary);margin-bottom:8px">Buying a home?</h3>
                        <p style="font-size:14px;color:var(--c-secondary);margin-bottom:16px;line-height:1.5">Get 2% of the purchase price back at closing with Beycome's buyer program.</p>
                        <a href="https://www.beycome.com/i-want-to-buy-a-home" class="bc-cta-btn bc-cta-btn--blue">Buy a Home &rarr;</a>
                    </div>

                    <!-- Related Articles -->
                    <div class="bc-sidebar-card" style="margin-top:20px">
                        <h3 class="bc-sidebar-title">Related articles</h3>
                        <ul class="bc-resources-list">
                            <?php
                            if ($cat) :
                                $related_side = new WP_Query([
                                    'category__in' => [$cat->term_id],
                                    'post__not_in' => [get_the_ID()],
                                    'posts_per_page' => 5,
                                    'orderby' => 'rand',
                                    'post_status' => 'publish',
                                ]);
                                while ($related_side->have_posts()) : $related_side->the_post();
                            ?>
                            <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
                            <?php endwhile; wp_reset_postdata(); endif; ?>
                        </ul>
                        <?php if ($cat) : ?>
                        <a href="<?php echo esc_url(get_category_link($cat->term_id)); ?>" style="font-size:15px;font-weight:700;color:var(--c-accent-orange);display:block;margin-top:12px">Browse all <?php echo esc_html($cat->name); ?> &rarr;</a>
                        <?php endif; ?>
                    </div>

                    <!-- Real Estate Calculators -->
                    <div class="bc-sidebar-card" style="margin-top:20px">
                        <h3 class="bc-sidebar-title">Real estate calculators</h3>
                        <ul class="bc-resources-list">
                            <li><a href="https://www.beycome.com/calculators">All Calculators</a></li>
                            <li><a href="https://www.beycome.com/calculators/mortgage-calculator">Mortgage Calculator</a></li>
                            <li><a href="https://www.beycome.com/calculators/home-sale-calculator">Home Sale Calculator</a></li>
                            <li><a href="https://www.beycome.com/calculators/closing-cost-calculator">Closing Cost Calculator</a></li>
                        </ul>
                    </div>

                </div>
            </aside>

        </div>
    </div>
</section>

<script>
(function() {
    // Reading progress bar
    var bar = document.getElementById('bc-progress-bar');
    var article = document.getElementById('bc-article');
    if (bar && article) {
        function updateProgress() {
            var rect = article.getBoundingClientRect();
            var articleTop = rect.top + window.scrollY;
            var scrolled = window.scrollY - articleTop + window.innerHeight * 0.2;
            var pct = Math.min(100, Math.max(0, (scrolled / article.offsetHeight) * 100));
            bar.style.width = pct + '%';
        }
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // Table of contents builder
    var tocNav = document.getElementById('bc-toc-nav');
    if (tocNav && article) {
        var headings = article.querySelectorAll('h2, h3');
        if (headings.length < 2) {
            var tocEl = document.getElementById('bc-toc');
            if (tocEl) tocEl.style.display = 'none';
        } else {
            headings.forEach(function(h, i) {
                if (!h.id) h.id = 'section-' + i;
                var a = document.createElement('a');
                a.href = '#' + h.id;
                a.textContent = h.textContent;
                var div = document.createElement('div');
                div.className = h.tagName === 'H3' ? 'bc-toc-item bc-toc-item-sub' : 'bc-toc-item';
                div.appendChild(a);
                tocNav.appendChild(div);
            });
            var tocLinks = tocNav.querySelectorAll('a');
            function onScrollToc() {
                var scrollY = window.scrollY + 160;
                var active = null;
                headings.forEach(function(h) { if (h.offsetTop <= scrollY) active = h.id; });
                tocLinks.forEach(function(l) { l.classList.toggle('active', l.hash === '#' + active); });
            }
            window.addEventListener('scroll', onScrollToc, { passive: true });
            onScrollToc();
            tocNav.addEventListener('click', function(e) {
                var link = e.target.closest('a');
                if (!link || !link.hash) return;
                var target = document.querySelector(link.hash);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    // Copy link buttons (sidebar + inline bars)
    document.querySelectorAll('.bc-share-copy').forEach(function(copyBtn) {
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(window.location.href).then(function() {
                var orig = copyBtn.innerHTML;
                copyBtn.textContent = 'Copied!';
                setTimeout(function() { copyBtn.innerHTML = orig; }, 2000);
            });
        });
    });
})();
</script>

<?php get_footer(); ?>
