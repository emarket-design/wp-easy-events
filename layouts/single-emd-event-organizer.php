<?php $real_post = $post;
$ent_attrs = get_option('wp_easy_events_attr_list');
?>
<div id="single-emd-event-organizer-<?php echo get_the_ID(); ?>" class="emd-container emd-event-organizer-wrap single-wrap">
<?php $is_editable = 0; ?>
<div class="notfronteditable">
    <div class="section-wrapper">
        <div style="padding-bottom:10px;clear:both;text-align:right;" id="modified-info-block" class=" modified-info-block">
            <div class="textSmall text-muted modified" style="font-size:75%"><span class="last-modified-text"><?php _e('Last modified', 'wp-easy-events'); ?> </span><span class="last-modified-author"><?php _e('by', 'wp-easy-events'); ?> <?php echo get_the_modified_author(); ?> - </span><span class="last-modified-datetime"><?php echo human_time_diff(strtotime(get_the_modified_date() . " " . get_the_modified_time()) , current_time('timestamp')); ?> </span><span class="last-modified-dttext"><?php _e('ago', 'wp-easy-events'); ?></span></div>
        </div>
        <div class="section-heading">
            <div class='single-header header'>
                <h1 class='single-entry-title entry-title' style='color:inherit;padding:0;margin:0;font-size: 28px;border:0'>
                    <?php if (emd_is_item_visible('title', 'wp_easy_events', 'attribute', $is_editable)) { ?><span class="single-content title"><?php echo get_the_title(); ?></span><?php
} ?>
                </h1>
            </div>
        </div>
        <div class="section-body" style="clear:both">
            <div class="emd-body-top">
                <div class="single-well well emd-event-organizer">
                    <div class="row">
                        <div class="col-sm-<?php if (emd_is_item_visible('featured_img', 'wp_easy_events', 'attribute', 0)) {
	echo '12 well-left';
} else {
	echo ' hidden';
} ?>">
                            <div class="slcontent emdbox">
                                <?php if (emd_is_item_visible('featured_img', 'wp_easy_events', 'attribute', 0)) { ?>
                                <div class="img-gallery segment-block featured-img"><a class="featured-img" title="<?php echo get_the_title(); ?>" href="<?php echo emd_featured_img('url', '', 'wp_easy_events'); ?>"><?php echo emd_featured_img('', 'large', 'wp_easy_events'); ?></a></div>
                                <?php
} ?>
                            </div>
                        </div>
                        <div class="col-sm-<?php if (emd_is_item_visible('featured_img', 'wp_easy_events', 'attribute', 0)) {
	echo '12 well-right';
} else {
	echo '12 well-right';
} ?>">
                            <div class="srcontent emdbox">
                                <?php if (emd_is_item_visible('ent_eo_email', 'wp_easy_events', 'attribute', 0)) { ?>
                                <div class="single-content segment-block ent-eo-email"><i aria-hidden="true" class="fa fa-envelope fa-fw text-muted "></i><a href='mailto:<?php echo antispambot(esc_html(emd_mb_meta('emd_eo_email'))); ?>'><?php echo antispambot(esc_html(emd_mb_meta('emd_eo_email'))); ?></a></div>
                                <?php
} ?><?php if (emd_is_item_visible('ent_eo_phone', 'wp_easy_events', 'attribute', 0)) { ?>
                                <div class="single-content segment-block ent-eo-phone"><i aria-hidden="true" class="fa fa-phone fa-fw text-muted "></i><a href='tel:<?php echo esc_html(emd_mb_meta('emd_eo_phone')); ?>
'><?php echo esc_html(emd_mb_meta('emd_eo_phone')); ?>
</a></div>
                                <?php
} ?><?php if (emd_is_item_visible('ent_eo_website', 'wp_easy_events', 'attribute', 0)) { ?>
                                <div class="single-content segment-block ent-eo-website"><i aria-hidden="true" class="fa fa-link fa-fw text-muted "></i><a href='<?php echo esc_html(emd_mb_meta('emd_eo_website')); ?>
'><?php _e('More info', 'wp-easy-events'); ?></a></div>
                                <?php
} ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="emd-body-content">
                <div class="section-subbody" style="clear:both">
                    <?php if (emd_is_item_visible('content', 'wp_easy_events', 'attribute', 0)) { ?>
                    <div class="single-content segment-block content"><?php echo $post->post_content; ?></div>
                    <?php
} ?>
                </div>
            </div>
            <div class="emd-body-bottom">
                <div class="relationwrap" id="relwrapper-53"> <?php if (emd_is_item_visible('entrelcon_event_organizer', 'wp_easy_events', 'relation')) { ?>
<?php $post = get_post();
	$rel_filter = "";
	$res = emd_get_p2p_connections('connected', 'event_organizer', 'std', $post, 1, 0, '', 'wp_easy_events', $rel_filter);
	$rel_list = get_option('wp_easy_events_rel_list');
?>
<div class="single-relpanel emd-wpe-event event-organizer"><div class="accor-title"><?php _e('Events', 'wp-easy-events'); ?></div>  <?php
	echo $res['before_list'];
	$real_post = $post;
	$rel_count_id = 1;
	$rel_eds = Array();
	foreach ($res['rels'] as $myrel) {
		$post = $myrel;
		echo $res['before_item']; ?>
<div class="relblock">
<ul style="padding-left:0;list-style:none;" class="emd-rellist">
<li class="emd-rellist-permalink">
<a href="<?php echo get_permalink($post->ID); ?>" title="<?php echo get_the_title(); ?>"><?php echo get_the_title(); ?></a>
</li>
<?php if (emd_is_item_visible('featured_img', 'wp_easy_events', 'attribute', 0)) { ?>
<li class=" relseg">
<div style="padding-bottom:0" class="featured-img segment-block">
<div class="segtitle" style="margin-bottom:0;"></div>
<div class="segvalue emd-thumb"><a title="<?php echo get_the_title(); ?>" href="<?php echo get_permalink($post->ID); ?>"><?php echo emd_featured_img('', 'thumbnail', 'wp_easy_events'); ?></a></div>
</div>
</li>
<?php
		} ?>
<li style="margin:0;padding:0" class="tagfunc"><?php if (emd_is_item_visible('ent_event_startdate', 'wp_easy_events', 'attribute')) { ?> <div class="single-content segment-block ent-event-startdate"><i class="fa-fw fa fa-calendar" aria-hidden="true"></i><?php echo emd_human_readable_date_range(emd_translate_date_format($ent_attrs['emd_wpe_event']['emd_event_startdate'], emd_mb_meta('emd_event_startdate')) , emd_translate_date_format($ent_attrs['emd_wpe_event']['emd_event_enddate'], emd_mb_meta('emd_event_enddate'))); ?></div><?php
		} ?> <?php if (emd_is_item_visible('ent_event_timezone', 'wp_easy_events', 'attribute')) { ?> <div class="single-content <?php echo ((emd_mb_meta('emd_event_display_timezone')) ? "segment-block" : "hidden"); ?> ent-event-timezone"> <?php echo emd_get_attr_val('wp_easy_events', $myrel->ID, 'emd_wpe_event', 'emd_event_timezone'); ?></div><?php
		} ?></li><?php if (emd_is_item_visible('ent_event_cost', 'wp_easy_events', 'attribute', 0)) { ?>
<li class=" relseg">
<div style="padding-bottom:0" class="ent-event-cost segment-block">
<div class="segtitle" style="margin-bottom:0;"></div>
<div class="segvalue"><?php echo esc_html(emd_mb_meta('emd_event_cost', '', $myrel->ID)); ?></div>
</div>
</li>
<?php
		} ?>
<?php if (emd_is_item_visible('ent_event_external_url', 'wp_easy_events', 'attribute', 0)) { ?>
<li class=" relseg">
<div style="padding-bottom:0" class="ent-event-external-url segment-block">
<div class="segtitle" style="margin-bottom:0;"></div>
<div class="segvalue"><i aria-hidden="true" class="fa fa-link fa-fw"></i><a title='Link' target='_blank' href='<?php echo esc_html(emd_mb_meta('emd_event_external_url', '', $myrel->ID)); ?>' title='<?php echo get_the_title(); ?>'><?php _e('Click for more info', 'wp-easy-events'); ?></a></div>
</div>
</li>
<?php
		} ?>
<li style="margin:0;padding:0" class="tagfunc"><?php
		$modal_content = '';
		if (emd_mb_meta('emd_event_registration_type') == 'rsvp') {
			$modal_content = do_shortcode("[event_attendee id=" . get_the_ID() . " set=\"rel::event_attendee::is::" . get_the_ID() . "\"]");
			$modal_button = __('RSVP NOW', 'wp-easy-events');
			$modal_heading = __('RSVP', 'wp-easy-events');
		} elseif (emd_mb_meta('emd_event_registration_type') == 'edd') {
			if (shortcode_exists('wpas_edd_product_edd_event_tickets')) {
				$modal_content = do_shortcode("[wpas_edd_product_edd_event_tickets con_name='edd_event_tickets' app_name='wp_easy_events' type='layout' post= " . get_the_ID() . "]");
			}
			$modal_button = __('Tickets', 'wp-easy-events');
			$modal_heading = __('Buy', 'wp-easy-events');
		} elseif (emd_mb_meta('emd_event_registration_type') == 'woo') {
			if (shortcode_exists('wpas_woo_product_woo_event_tickets')) {
				$modal_content = do_shortcode("[wpas_woo_product_woo_event_tickets con_name='woo_event_tickets' app_name='wp_easy_events' type='layout' post= " . get_the_ID() . "]");
			}
			$modal_button = __('Tickets', 'wp-easy-events');
			$modal_heading = __('Buy', 'wp-easy-events');
		}
?>
<?php
		if (!empty($modal_content) && !empty(emd_mb_meta('emd_event_registration_type')) && emd_mb_meta('emd_event_registration_type') != 'none') {
			echo '<div class="section-row" style="margin:10px 0"><a class="export-button" href="#signup-' . get_the_ID() . '" id="go" name="signup-' . get_the_ID() . '" rel="leanModal">';
			echo $modal_button;
			echo '</a></div><!-- Modal --><div id="signup-' . get_the_ID() . '" class="emd-signup">
                <div class="emd-signup-ct"><div class="emd-signup-header">';
			echo $modal_heading . '  ' . get_the_title();
			echo '</div><div class="modal-body" style="padding:15px">';
			echo $modal_content;
			echo '<a href="#" class="modal_close"></a></div></div></div>';
		}
?></li>
</ul>
</div>
<?php
		echo $res['after_item'];
		$rel_count_id++;
	}
	$post = $real_post;
	echo $res['after_list']; ?>
  </div><?php
} ?> </div>
            </div>
        </div>
        <div class="section-footer" style="clear:both"></div>
    </div>
</div>
</div><!--container-end-->