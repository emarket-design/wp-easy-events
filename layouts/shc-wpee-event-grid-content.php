<?php global $wpee_event_grid_count, $wpee_event_grid_filter, $wpee_event_grid_set_list;
$real_post = $post;
$ent_attrs = get_option('wp_easy_events_attr_list');
?>
<a href="<?php echo get_permalink(); ?>" style="text-decoration:none" title="<?php echo get_the_title(); ?>">
<div class="event-block">
    <div class="event-thumb">
        <?php echo emd_featured_img('', '', 'wp_easy_events'); ?>
    </div>
    <div class="event-block-text">
        <div class="event-date textMedium">
            <?php echo emd_human_readable_date_range(emd_translate_date_format($ent_attrs['emd_wpe_event']['emd_event_startdate'], emd_mb_meta('emd_event_startdate')) , emd_translate_date_format($ent_attrs['emd_wpe_event']['emd_event_enddate'], emd_mb_meta('emd_event_enddate'))); ?>
        </div>
        <div class="event-heading font-bold textMedium">
            <?php echo get_the_title(); ?>
        </div>
        <div class="event-venue textMedium">
            <?php echo do_shortcode("[wpee_venue_list filter=\"rel::event_venue::is::" . $real_post->ID . ";;" . $wpee_event_grid_filter . "\"]"); ?>

        </div>
    </div>
</div></a>