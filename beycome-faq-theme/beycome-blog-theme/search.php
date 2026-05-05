<?php get_header(); ?>

<div class="bc-breadcrumb-bar">
    <div class="bc-container">
        <nav class="bc-breadcrumb" aria-label="Breadcrumb">
            <a href="<?php echo esc_url(home_url('/')); ?>">Blog</a>
            <span>&rsaquo;</span>
            <span class="bc-breadcrumb-current">Search</span>
        </nav>
    </div>
</div>

<section class="bc-blog-archive-hero">
    <div class="bc-container">
        <span class="bc-category-pill bc-topic-grey">SEARCH RESULTS</span>
        <h1>
            <?php if (get_search_query()) : ?>
            Results for &ldquo;<?php echo esc_html(get_search_query()); ?>&rdquo;
            <?php else : ?>
            Search
            <?php endif; ?>
        </h1>
        <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="bc-search-bar" style="margin-top:24px">
            <input type="search" name="s" value="<?php echo esc_attr(get_search_query()); ?>" placeholder="FSBO, mortgage, closing costs…" autocomplete="off">
            <button type="submit" aria-label="Search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
        </form>
    </div>
</section>

<section class="bc-blog-archive-section">
    <div class="bc-container">
        <?php if (have_posts()) : ?>
        <div class="bc-blog-card-grid">
            <?php while (have_posts()) : the_post(); ?>
            <?php echo beycome_blog_card(get_the_ID(), 'beycome-blog-card', true); ?>
            <?php endwhile; ?>
        </div>
        <?php the_posts_pagination(['prev_text' => '&larr; Previous', 'next_text' => 'Next &rarr;']); ?>
        <?php else : ?>
        <div class="bc-blog-no-posts">
            <p>No results found for &ldquo;<?php echo esc_html(get_search_query()); ?>&rdquo;.</p>
            <p><a href="<?php echo esc_url(home_url('/')); ?>">Browse all articles &rarr;</a></p>
        </div>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
