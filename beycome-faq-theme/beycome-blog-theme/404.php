<?php get_header(); ?>

<section class="bc-blog-archive-hero" style="min-height:40vh;display:flex;align-items:center">
    <div class="bc-container" style="text-align:center">
        <div class="bc-blog-section-label">404</div>
        <h1>Page not found</h1>
        <p class="bc-blog-archive-desc">The article you're looking for has moved or doesn't exist.</p>
        <div style="margin-top:32px;display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="bc-cta-btn">Back to blog &rarr;</a>
            <a href="https://www.beycome.com" class="bc-savings-calc-link">Go to Beycome.com &rarr;</a>
        </div>
    </div>
</section>

<?php get_footer(); ?>
