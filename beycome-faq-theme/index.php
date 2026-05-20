<?php
/**
 * Fallback template
 */
if (is_category() || is_tag() || is_archive()) {
    get_template_part('archive');
} elseif (is_search()) {
    get_template_part('search');
} elseif (is_single()) {
    get_template_part('single');
} elseif (is_404()) {
    get_template_part('404');
} else {
    get_template_part('front-page');
}
