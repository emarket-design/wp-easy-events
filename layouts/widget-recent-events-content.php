<?php $real_post = $post;
$ent_attrs = get_option('wp_easy_events_attr_list');
?>
<a style="text-decoration:none" class="list-group-item" href="<?php echo get_permalink(); ?>" title="<?php echo get_the_title(); ?>">
<div class="event-title" style="font-weight:600"><?php echo get_the_title(); ?></div>
<div class="event-dates"><?php echo emd_human_readable_date_range(emd_translate_date_format($ent_attrs['emd_wpe_event']['emd_event_startdate'], emd_mb_meta('emd_event_startdate')) , emd_translate_date_format($ent_attrs['emd_wpe_event']['emd_event_enddate'], emd_mb_meta('emd_event_enddate'))); ?></div>
</a>