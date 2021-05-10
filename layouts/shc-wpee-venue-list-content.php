<?php global $wpee_venue_list_count, $wpee_venue_list_filter, $wpee_venue_list_set_list;
$real_post = $post;
$ent_attrs = get_option('wp_easy_events_attr_list');
?>
<div class="event-grid-venue-blk textRegular text-muted">
<span class="event-grid-venue"><?php echo get_the_title(); ?> | </span>
<span class="event-grid-venue-addr"><?php echo esc_html(emd_mb_meta('emd_venue_fulladdress')); ?>
</span>
</div>