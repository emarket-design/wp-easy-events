<?php
/**
 * Enqueue Scripts Functions
 *
 * @package WP_EASY_EVENTS
 * @since WPAS 4.0
 */
if (!defined('ABSPATH')) exit;
add_action('admin_enqueue_scripts', 'wp_easy_events_load_admin_enq');
/**
 * Enqueue style and js for each admin entity pages and settings
 *
 * @since WPAS 4.0
 * @param string $hook
 *
 */
function wp_easy_events_load_admin_enq($hook) {
	global $typenow;
	$dir_url = WP_EASY_EVENTS_PLUGIN_URL;
	do_action('emd_ext_admin_enq', 'wp_easy_events', $hook);
	$min_trigger = get_option('wp_easy_events_show_rateme_plugin_min', 0);
	$tracking_optin = get_option('wp_easy_events_tracking_optin', 0);
	if (-1 !== intval($tracking_optin) || - 1 !== intval($min_trigger)) {
		wp_enqueue_style('emd-plugin-rateme-css', $dir_url . 'assets/css/emd-plugin-rateme.css');
		wp_enqueue_script('emd-plugin-rateme-js', $dir_url . 'assets/js/emd-plugin-rateme.js');
	}
	if ($hook == 'edit-tags.php') {
		return;
	}
	if (preg_match('/wp_easy_events_calendar/', $hook)) {
		emd_calendar_admin_enq('wp_easy_events');
		return;
	}
	if (isset($_GET['page']) && $_GET['page'] == 'wp_easy_events_settings') {
		wp_enqueue_script('accordion');
		wp_enqueue_style('codemirror-css', $dir_url . 'assets/ext/codemirror/codemirror.min.css');
		wp_enqueue_script('codemirror-js', $dir_url . 'assets/ext/codemirror/codemirror.min.js', array() , '', true);
		wp_enqueue_script('codemirror-css-js', $dir_url . 'assets/ext/codemirror/css.min.js', array() , '', true);
		wp_enqueue_script('codemirror-jvs-js', $dir_url . 'assets/ext/codemirror/javascript.min.js', array() , '', true);
		return;
	} else if (isset($_GET['page']) && in_array($_GET['page'], Array(
		'wp_easy_events_notify'
	))) {
		wp_enqueue_script('accordion');
		return;
	} else if (isset($_GET['page']) && in_array($_GET['page'], Array(
		'wp_easy_events_glossary'
	))) {
		wp_enqueue_script('accordion');
		return;
	} else if (isset($_GET['page']) && $_GET['page'] == 'wp_easy_events') {
		wp_enqueue_style('lazyYT-css', $dir_url . 'assets/ext/lazyyt/lazyYT.min.css');
		wp_enqueue_script('lazyYT-js', $dir_url . 'assets/ext/lazyyt/lazyYT.min.js');
		wp_enqueue_script('getting-started-js', $dir_url . 'assets/js/getting-started.js');
		return;
	} else if (isset($_GET['page']) && in_array($_GET['page'], Array(
		'wp_easy_events_store',
		'wp_easy_events_support'
	))) {
		wp_enqueue_style('admin-tabs', $dir_url . 'assets/css/admin-store.css');
		return;
	} else if (isset($_GET['page']) && $_GET['page'] == 'wp_easy_events_licenses') {
		wp_enqueue_style('admin-css', $dir_url . 'assets/css/emd-admin.min.css');
		return;
	} else if (isset($_GET['page']) && $_GET['page'] == 'wp_easy_events_shortcodes') {
		wp_enqueue_script('emd-copy-js', $dir_url . 'assets/js/emd-copy.js', array(
			'clipboard'
		) , '');
		return;
	}
	if (in_array($typenow, Array(
		'emd_wpe_event',
		'emd_event_organizer',
		'emd_event_venues',
		'emd_event_attendee'
	))) {
		$theme_changer_enq = 1;
		$sing_enq = 0;
		$tab_enq = 0;
		if ($hook == 'post.php' || $hook == 'post-new.php') {
			$unique_vars['msg'] = __('Please enter a unique value.', 'wp-easy-events');
			$unique_vars['reqtxt'] = __('required', 'wp-easy-events');
			$unique_vars['app_name'] = 'wp_easy_events';
			$unique_vars['nonce'] = wp_create_nonce('emd_form');
			$ent_list = get_option('wp_easy_events_ent_list');
			if (!empty($ent_list[$typenow])) {
				$unique_vars['keys'] = $ent_list[$typenow]['unique_keys'];
				if (!empty($ent_list[$typenow]['req_blt'])) {
					$unique_vars['req_blt_tax'] = $ent_list[$typenow]['req_blt'];
				}
			}
			$tax_list = get_option('wp_easy_events_tax_list');
			if (!empty($tax_list[$typenow])) {
				foreach ($tax_list[$typenow] as $txn_name => $txn_val) {
					if ($txn_val['required'] == 1) {
						$unique_vars['req_blt_tax'][$txn_name] = Array(
							'hier' => $txn_val['hier'],
							'type' => $txn_val['type'],
							'label' => $txn_val['label'] . ' ' . __('Taxonomy', 'wp-easy-events')
						);
					}
				}
			}
			$rel_list = get_option('wp_easy_events_rel_list');
			if (!empty($rel_list)) {
				foreach ($rel_list as $rel_name => $rel_val) {
					if ($rel_val['required'] == 1) {
						$rel_name = preg_replace('/^rel_/', '', $rel_name);
						if (($rel_val['show'] == 'any' || $rel_val['show'] == 'from') && $rel_val['from'] == $typenow) {
							$unique_vars['req_blt_tax']['p2p-from-' . $rel_name] = Array(
								'type' => 'rel',
								'label' => $rel_val['from_title'] . ' ' . __('Relationship', 'wp-easy-events')
							);
						} elseif ($rel_val['show'] == 'to' && $rel_val['to'] == $typenow) {
							$unique_vars['req_blt_tax']['p2p-to-' . $rel_name] = Array(
								'type' => 'rel',
								'label' => $rel_val['to_title'] . ' ' . __('Relationship', 'wp-easy-events')
							);
						}
					}
				}
			}
			wp_enqueue_script('unique_validate-js', $dir_url . 'assets/js/unique_validate.js', array(
				'jquery',
				'jquery-validate'
			) , WP_EASY_EVENTS_VERSION, true);
			wp_localize_script("unique_validate-js", 'unique_vars', $unique_vars);
		} elseif ($hook == 'edit.php') {
			wp_enqueue_style('wp-easy-events-allview-css', WP_EASY_EVENTS_PLUGIN_URL . '/assets/css/allview.css');
			emd_lite_admin_enq_files('wp_easy_events', $hook);
		}
		switch ($typenow) {
			case 'emd_wpe_event':
				$tab_enq = 1;
				$sing_enq = 1;
			break;
			case 'emd_event_organizer':
				$sing_enq = 1;
			break;
			case 'emd_event_venues':
				$sing_enq = 1;
			break;
			case 'emd_event_attendee':
				$sing_enq = 1;
			break;
		}
		if ($sing_enq == 1) {
			wp_enqueue_script('radiotax', WP_EASY_EVENTS_PLUGIN_URL . 'includes/admin/singletax/singletax.js', array(
				'jquery'
			) , WP_EASY_EVENTS_VERSION, true);
		}
		if ($tab_enq == 1) {
			wp_enqueue_style('jq-css', WP_EASY_EVENTS_PLUGIN_URL . 'assets/css/smoothness-jquery-ui.css');
		}
	}
}
add_action('wp_enqueue_scripts', 'wp_easy_events_frontend_scripts');
/**
 * Enqueue style and js for each frontend entity pages and components
 *
 * @since WPAS 4.0
 *
 */
function wp_easy_events_frontend_scripts() {
	$dir_url = WP_EASY_EVENTS_PLUGIN_URL;
	wp_register_style('emd-pagination', $dir_url . 'assets/css/emd-pagination.min.css', '', WP_EASY_EVENTS_VERSION);
	wp_register_style('wp-easy-events-allview-css', $dir_url . '/assets/css/allview.css', '', WP_EASY_EVENTS_VERSION);
	$grid_vars = Array();
	$local_vars['ajax_url'] = admin_url('admin-ajax.php');
	$wpas_shc_list = get_option('wp_easy_events_shc_list');
	wp_register_script('view-single-event', $dir_url . 'assets/js/view-single-event.js', '', WP_EASY_EVENTS_VERSION, true);
	wp_register_style('view-wpee-event-grid', $dir_url . 'assets/css/view-wpee-event-grid.css', '', WP_EASY_EVENTS_VERSION);
	wp_register_style('wpee-listgroup', $dir_url . 'assets/css/wpee-listgroup.css', '', WP_EASY_EVENTS_VERSION);
	wp_register_script('modalcdn', $dir_url . 'assets/js/modalcdn.js', '', WP_EASY_EVENTS_VERSION, true);
	wp_register_script('single-event-js', $dir_url . 'assets/js/single-event.js', '', WP_EASY_EVENTS_VERSION, true);
	wp_register_script('modaljs-js', $dir_url . 'assets/js/modaljs.js', '', WP_EASY_EVENTS_VERSION, true);
	do_action('emd_localize_scripts', 'wp_easy_events');
	if (is_single() && get_post_type() == 'emd_event_attendee') {
		do_action('emd_enqueue_sat_view', 'wp-easy-events', 'emd_event_attendee', 'single');
		wp_enqueue_style('wp-easy-events-allview-css');
		wp_easy_events_enq_custom_css_js();
		return;
	}
	if (is_single() && get_post_type() == 'emd_event_organizer') {
		wp_enqueue_script('jquery');
		do_action('emd_enqueue_sat_view', 'wp-easy-events', 'emd_event_organizer', 'single');
		wp_enqueue_script('modalcdn');
		wp_enqueue_script('modaljs-js');
		wp_enqueue_style('wp-easy-events-allview-css');
		wp_easy_events_enq_custom_css_js();
		return;
	}
	if (is_single() && get_post_type() == 'emd_event_venues') {
		wp_enqueue_script('jquery');
		do_action('emd_enqueue_sat_view', 'wp-easy-events', 'emd_event_venues', 'single');
		wp_enqueue_script('modalcdn');
		wp_enqueue_script('modaljs-js');
		wp_enqueue_style('wp-easy-events-allview-css');
		wp_easy_events_enq_custom_css_js();
		return;
	}
	if (is_single() && get_post_type() == 'emd_wpe_event') {
		wp_enqueue_script('jquery');
		do_action('emd_enqueue_sat_view', 'wp-easy-events', 'emd_wpe_event', 'single');
		wp_enqueue_script('view-single-event');
		wp_enqueue_script('single-event-js');
		wp_enqueue_style('wp-easy-events-allview-css');
		wp_easy_events_enq_custom_css_js();
		return;
	}
}
/**
 * Enqueue custom css if set in settings tool tab
 *
 * @since WPAS 5.3
 *
 */
function wp_easy_events_enq_custom_css_js() {
	$tools = get_option('wp_easy_events_tools');
	if (!empty($tools['custom_css'])) {
		$url = home_url();
		if (is_ssl()) {
			$url = home_url('/', 'https');
		}
		wp_enqueue_style('wp-easy-events-custom', add_query_arg(array(
			'wp-easy-events-css' => 1
		) , $url));
	}
	if (!empty($tools['custom_js'])) {
		$url = home_url();
		if (is_ssl()) {
			$url = home_url('/', 'https');
		}
		wp_enqueue_script('wp-easy-events-custom', add_query_arg(array(
			'wp-easy-events-js' => 1
		) , $url));
	}
}
/**
 * If app custom css query var is set, print custom css
 */
function wp_easy_events_print_css() {
	// Only print CSS if this is a stylesheet request
	if (!isset($_GET['wp-easy-events-css']) || intval($_GET['wp-easy-events-css']) !== 1) {
		return;
	}
	ob_start();
	header('Content-type: text/css');
	$tools = get_option('wp_easy_events_tools');
	$raw_content = isset($tools['custom_css']) ? $tools['custom_css'] : '';
	$content = wp_kses($raw_content, array(
		'\'',
		'\"'
	));
	$content = str_replace('&gt;', '>', $content);
	echo $content; //xss okay
	die();
}
function wp_easy_events_print_js() {
	// Only print CSS if this is a stylesheet request
	if (!isset($_GET['wp-easy-events-js']) || intval($_GET['wp-easy-events-js']) !== 1) {
		return;
	}
	ob_start();
	header('Content-type: text/javascript');
	$tools = get_option('wp_easy_events_tools');
	$raw_content = isset($tools['custom_js']) ? $tools['custom_js'] : '';
	$content = wp_kses($raw_content, array(
		'\'',
		'\"'
	));
	$content = str_replace('&gt;', '>', $content);
	echo $content;
	die();
}
function wp_easy_events_print_css_js() {
	wp_easy_events_print_js();
	wp_easy_events_print_css();
}
add_action('plugins_loaded', 'wp_easy_events_print_css_js');
/**
 * Enqueue if allview css is not enqueued
 *
 * @since WPAS 4.5
 *
 */
function wp_easy_events_enq_allview() {
	if (!wp_style_is('wp-easy-events-allview-css', 'enqueued')) {
		wp_enqueue_style('wp-easy-events-allview-css');
	}
}
add_action('admin_print_footer_scripts', 'wp_easy_events_edit_next_prev_button');
function wp_easy_events_edit_next_prev_button() {
	$screen = get_current_screen();
	$supported_types = array(
		'emd_wpe_event',
		'emd_event_organizer',
		'emd_event_venues',
		'emd_event_attendee'
	);
	if (strpos($screen->parent_file, 'edit.php') !== false && in_array($screen->id, $supported_types) && in_array($screen->post_type, $supported_types) && $screen->action != 'add') {
		$next_post = get_previous_post();
		$previous_post = get_next_post();
		$next_post_id = 0;
		if ($next_post && $next_post->ID) {
			$next_post_id = $next_post->ID;
		}
		$previous_post_id = 0;
		if ($previous_post && $previous_post->ID) {
			$previous_post_id = $previous_post->ID;
		}
?>
                <script>
                if(window.jQuery) {
                        jQuery(document).ready(function($) {
                                $(window).load(function() { 
                                <?php if ($next_post_id) { ?>
                                        var is_next_post_available = true;
                                <?php
		} else { ?>
                                        var is_next_post_available = false;
                                <?php
		}
		if ($previous_post_id) { ?>
                                        var is_prev_post_available = true;
                                <?php
		} else { ?>
                                        var is_prev_post_available = false;
                                <?php
		}
		if ($screen->is_block_editor) { ?>
                                                if(is_prev_post_available && is_next_post_available){
                                                        $('.edit-post-header__settings').prepend('<a href="<?php echo get_edit_post_link($previous_post_id) ?>" class="prev-post components-button editor-post-preview is-button is-primary is-large">&larr; <?php _e('Previous', 'wp-easy-events') ?></a><a href="<?php echo get_edit_post_link($next_post_id) ?>" class="next-post components-button editor-post-preview is-button is-primary is-large"><?php _e('Next', 'wp-easy-events') ?> &rarr;</a>');
                                                }else if(is_prev_post_available && !is_next_post_available){
                                                        $('.edit-post-header__settings').prepend('<a href="<?php echo get_edit_post_link($previous_post_id) ?>" class="prev-post components-button editor-post-preview is-button is-primary is-large">&larr; <?php _e('Previous', 'wp-easy-events') ?></a>');
                                                }else if(is_next_post_available && !is_prev_post_available){
                                                        $('.edit-post-header__settings').prepend('<a href="<?php echo get_edit_post_link($next_post_id) ?>" class="next-post components-button editor-post-preview is-button is-primary is-large"><?php _e('Next', 'wp-easy-events') ?> &rarr;</a>');
                                                }
                                        <?php
		} else { ?>
                                                if(is_prev_post_available && is_next_post_available){
                                                        $('.wrap .page-title-action').after('<a href="<?php echo get_edit_post_link($previous_post_id) ?>" class="prev-post page-title-action">&larr; <?php _e('Previous', 'wp-easy-events') ?></a><a href="<?php echo get_edit_post_link($next_post_id) ?>" class="next-post page-title-action"><?php _e('Next', 'wp-easy-events') ?> &rarr;</a>');
                                                }else if(is_prev_post_available && !is_next_post_available){
                                                        $('.wrap .page-title-action').after('<a href="<?php echo get_edit_post_link($previous_post_id) ?>" class="prev-post page-title-action">&larr; <?php _e('Previous', 'wp-easy-events') ?></a>');
                                                }else if(is_next_post_available && !is_prev_post_available){
                                                        $('.wrap .page-title-action').after('<a href="<?php echo get_edit_post_link($next_post_id) ?>" class="next-post page-title-action"><?php _e('Next', 'wp-easy-events') ?> &rarr;</a>');
                                                }
                                        <?php
		} ?>                                                      
                                });
                        });
                }
                </script>
<?php
	}
}