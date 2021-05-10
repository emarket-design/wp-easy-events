<?php
/**
 * Entity Widget Classes
 *
 * @package WP_EASY_EVENTS
 * @since WPAS 4.0
 */
if (!defined('ABSPATH')) exit;
/**
 * Entity widget class extends Emd_Widget class
 *
 * @since WPAS 4.0
 */
class wp_easy_events_recent_events_widget extends Emd_Widget {
	public $title;
	public $text_domain = 'wp-easy-events';
	public $class_label;
	public $class = 'emd_wpe_event';
	public $type = 'entity';
	public $has_pages = false;
	public $css_label = 'recent-events';
	public $id = 'wp_easy_events_recent_events_widget';
	public $query_args = array(
		'post_type' => 'emd_wpe_event',
		'post_status' => 'publish',
		'orderby' => 'date',
		'order' => 'DESC',
		'context' => 'wp_easy_events_recent_events_widget',
	);
	public $filter = '';
	public $header = '';
	public $footer = '';
	/**
	 * Instantiate entity widget class with params
	 *
	 * @since WPAS 4.0
	 */
	public function __construct() {
		parent::__construct($this->id, __('Recent Events', 'wp-easy-events') , __('Events', 'wp-easy-events') , __('The most recent events', 'wp-easy-events'));
	}
	/**
	 * Get header and footer for layout
	 *
	 * @since WPAS 4.6
	 */
	protected function get_header_footer() {
		ob_start();
		emd_get_template_part('wp_easy_events', 'widget', 'recent-events-header');
		$this->header = ob_get_clean();
		ob_start();
		emd_get_template_part('wp_easy_events', 'widget', 'recent-events-footer');
		$this->footer = ob_get_clean();
	}
	/**
	 * Enqueue css and js for widget
	 *
	 * @since WPAS 4.5
	 */
	protected function enqueue_scripts() {
		if (is_active_widget(false, false, $this->id_base) && !is_admin()) {
			wp_enqueue_style('wpee-listgroup');
		}
		wp_easy_events_enq_custom_css_js();
	}
	/**
	 * Returns widget layout
	 *
	 * @since WPAS 4.0
	 */
	public static function layout() {
		ob_start();
		emd_get_template_part('wp_easy_events', 'widget', 'recent-events-content');
		$layout = ob_get_clean();
		return $layout;
	}
}
/**
 * Entity widget class extends Emd_Widget class
 *
 * @since WPAS 4.0
 */
class wp_easy_events_featured_events_widget extends Emd_Widget {
	public $title;
	public $text_domain = 'wp-easy-events';
	public $class_label;
	public $class = 'emd_wpe_event';
	public $type = 'entity';
	public $has_pages = false;
	public $css_label = 'featured-events';
	public $id = 'wp_easy_events_featured_events_widget';
	public $query_args = array(
		'post_type' => 'emd_wpe_event',
		'post_status' => 'publish',
		'orderby' => 'date',
		'order' => 'DESC',
		'context' => 'wp_easy_events_featured_events_widget',
	);
	public $filter = 'attr::emd_event_featured::is::1';
	public $header = '';
	public $footer = '';
	/**
	 * Instantiate entity widget class with params
	 *
	 * @since WPAS 4.0
	 */
	public function __construct() {
		parent::__construct($this->id, __('Featured Events', 'wp-easy-events') , __('Events', 'wp-easy-events') , __('The most recent events', 'wp-easy-events'));
	}
	/**
	 * Get header and footer for layout
	 *
	 * @since WPAS 4.6
	 */
	protected function get_header_footer() {
		ob_start();
		emd_get_template_part('wp_easy_events', 'widget', 'featured-events-header');
		$this->header = ob_get_clean();
		ob_start();
		emd_get_template_part('wp_easy_events', 'widget', 'featured-events-footer');
		$this->footer = ob_get_clean();
	}
	/**
	 * Enqueue css and js for widget
	 *
	 * @since WPAS 4.5
	 */
	protected function enqueue_scripts() {
		if (is_active_widget(false, false, $this->id_base) && !is_admin()) {
			wp_enqueue_style('wpee-listgroup');
		}
		wp_easy_events_enq_custom_css_js();
	}
	/**
	 * Returns widget layout
	 *
	 * @since WPAS 4.0
	 */
	public static function layout() {
		ob_start();
		emd_get_template_part('wp_easy_events', 'widget', 'featured-events-content');
		$layout = ob_get_clean();
		return $layout;
	}
}
$access_views = get_option('wp_easy_events_access_views', Array());
if (empty($access_views['widgets']) || (!empty($access_views['widgets']) && in_array('recent_events', $access_views['widgets']) && current_user_can('view_recent_events'))) {
	register_widget('wp_easy_events_recent_events_widget');
}
if (empty($access_views['widgets']) || (!empty($access_views['widgets']) && in_array('featured_events', $access_views['widgets']) && current_user_can('view_featured_events'))) {
	register_widget('wp_easy_events_featured_events_widget');
}