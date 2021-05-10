<?php
/**
 * Entity Related Shortcode Functions
 *
 * @package WP_EASY_EVENTS
 * @since WPAS 4.0
 */
if (!defined('ABSPATH')) exit;
/**
 * Shortcode function
 *
 * @since WPAS 4.0
 * @param array $atts
 * @param array $args
 * @param string $form_name
 * @param int $pageno
 *
 * @return html
 */
function wp_easy_events_wpee_event_grid_set_shc($atts, $args = Array() , $form_name = '', $pageno = 1, $shc_page_count = 0) {
	global $shc_count;
	if ($shc_page_count != 0) {
		$shc_count = $shc_page_count;
	} else {
		if (empty($shc_count)) {
			$shc_count = 1;
		} else {
			$shc_count++;
		}
	}
	$fields = Array(
		'app' => 'wp_easy_events',
		'class' => 'emd_wpe_event',
		'shc' => 'wpee_event_grid',
		'shc_count' => $shc_count,
		'form' => $form_name,
		'has_pages' => true,
		'pageno' => $pageno,
		'pgn_class' => '',
		'theme' => 'na',
		'hier' => 0,
		'hier_type' => 'ul',
		'hier_depth' => - 1,
		'hier_class' => '',
		'has_json' => 0,
	);
	$args_default = array(
		'posts_per_page' => '20',
		'post_status' => 'publish',
		'orderby' => 'date',
		'order' => 'DESC',
		'filter' => ''
	);
	return emd_shc_get_layout_list($atts, $args, $args_default, $fields);
}
add_shortcode('wpee_event_grid', 'wpee_event_grid_list');
function wpee_event_grid_list($atts) {
	$show_shc = 1;
	$show_shc = apply_filters('emd_show_shc', $show_shc, 'wpee_event_grid');
	if ($show_shc == 1) {
		wp_enqueue_style('view-wpee-event-grid');
		wp_enqueue_style('emd-pagination');
		add_action('wp_footer', 'wp_easy_events_enq_allview');
		wp_easy_events_enq_custom_css_js();
		$list = wp_easy_events_wpee_event_grid_set_shc($atts);
	} else {
		$list = '<div class="alert alert-info not-authorized">You are not authorized to access this content.</div>';
		$list = apply_filters('emd_no_access_msg_shc', $list, 'wpee_event_grid');
	}
	return $list;
}
add_filter('widget_text', 'shortcode_unautop');
add_filter('widget_text', 'do_shortcode', 11);