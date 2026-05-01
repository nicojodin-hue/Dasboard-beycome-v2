<?php get_header(); ?>

<!-- Breadcrumb bar -->
<div class="bc-breadcrumb-bar">
    <div class="bc-container">
        <nav class="bc-breadcrumb">
            <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
            <span>&rsaquo;</span>
            <span class="bc-breadcrumb-current">Search Results</span>
        </nav>
    </div>
</div>

<section class="bc-hero" style="padding:32px 24px 32px">
    <div class="bc-hero-inner">
        <h1 style="font-size:42px;margin-top:8px">Search Results</h1>
        <p>Results for "<?php echo esc_html(get_search_query()); ?>"</p>
        <div class="bc-article-meta">
            <span class="bc-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <?php global $wp_query; echo $wp_query->found_posts; ?> result<?php echo $wp_query->found_posts !== 1 ? 's' : ''; ?> found
            </span>
        </div>
        <div class="bc-search-bar" style="margin-top:24px">
            <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
                <input type="search" name="s" placeholder="Search again..." value="<?php echo get_search_query(); ?>">
                <button type="submit" aria-label="Search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
            </form>
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
                    $cats = get_the_category();
                    $cat_name = $cats ? $cats[0]->name : '';
                ?>
                <a href="<?php the_permalink(); ?>" class="bc-archive-card">
                    <?php if ($cat_name) : ?>
                    <span class="bc-archive-card-cat"><?php echo esc_html($cat_name); ?></span>
                    <?php endif; ?>
                    <h3 class="bc-archive-card-title"><?php the_title(); ?></h3>
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
            <?php the_posts_pagination(['prev_text' => '&laquo; Previous', 'next_text' => 'Next &raquo;']); ?>
        <?php else : ?>
            <div style="text-align:center;padding:64px 0">
                <p style="font-size:18px;color:var(--c-secondary);margin-bottom:24px">No results found. Try a different search term.</p>
                <a href="<?php echo esc_url(home_url('/')); ?>" style="font-size:16px;font-weight:700;color:var(--c-accent-orange)">Back to Help Center &rarr;</a>
            </div>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
