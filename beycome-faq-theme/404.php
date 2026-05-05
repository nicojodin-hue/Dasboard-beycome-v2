<?php get_header(); ?>

<!-- Breadcrumb bar -->
<div class="bc-breadcrumb-bar">
    <div class="bc-container">
        <nav class="bc-breadcrumb">
            <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
            <span>&rsaquo;</span>
            <span class="bc-breadcrumb-current">Page Not Found</span>
        </nav>
    </div>
</div>

<section class="bc-hero">
    <div class="bc-hero-inner">
        <h1>Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
        <div class="bc-search-bar" style="margin-top:24px">
            <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
                <input type="search" name="s" placeholder="Search FAQs..." value="">
                <button type="submit" aria-label="Search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
            </form>
        </div>
    </div>
</section>

<section style="padding:48px 0 80px;background:#f9fafb">
    <div class="bc-container">
        <h2 class="bc-section-title" style="margin-bottom:24px">Popular Articles</h2>
        <div class="bc-article-list">
            <?php
            $popular = new WP_Query(['posts_per_page' => 10, 'orderby' => 'date', 'order' => 'DESC']);
            while ($popular->have_posts()) : $popular->the_post();
            ?>
            <a href="<?php the_permalink(); ?>" class="bc-article-row">
                <span><?php the_title(); ?></span>
                <span class="bc-article-cat"><?php
                    $cats = get_the_category();
                    echo $cats ? esc_html($cats[0]->name) : '';
                ?></span>
            </a>
            <?php endwhile; wp_reset_postdata(); ?>
        </div>
        <div style="text-align:center;margin-top:32px">
            <a href="<?php echo esc_url(home_url('/')); ?>" style="font-size:16px;font-weight:700;color:var(--c-accent-orange)">Back to Help Center &rarr;</a>
        </div>
    </div>
</section>

<?php get_footer(); ?>
