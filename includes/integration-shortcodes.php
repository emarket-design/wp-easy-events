<?php
/**
 * Integration Shortcode Functions
 *
 * @package WP_EASY_EVENTS
 * @since WPAS 4.0
 */
if (!defined('ABSPATH')) exit;
add_shortcode('events_calendar', 'wp_easy_events_get_integ_events_calendar');
/**
 * Display integration shortcode or no access msg
 * @since WPAS 4.0
 *
 * @return string $layout or $no_access_msg
 */
function wp_easy_events_get_integ_events_calendar($atts) {
	$no_access_msg = __('You are not allowed to access to this area. Please contact the site administrator.', 'wp-easy-events');
	$access_views = get_option('wp_easy_events_access_views', Array());
	if (!current_user_can('view_events_calendar') && !empty($access_views['integration']) && in_array('events_calendar', $access_views['integration'])) {
		return $no_access_msg;
	} else {
		wp_enqueue_script('jquery');
		add_action('wp_footer', 'wp_easy_events_enq_allview');
		if (!empty($atts) && !empty($atts['filter'])) {
			$shc_filter = "events_calendar_filter";
			global $ {
				$shc_filter
			};
			$ {
				$shc_filter
			} = $atts['filter'];
		}
		ob_start();
		emd_get_template_part('wp-easy-events', 'integration', 'events-calendar');
		$layout = ob_get_clean();
		return $layout;
	}
}