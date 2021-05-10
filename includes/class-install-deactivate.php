<?php
/**
 * Install and Deactivate Plugin Functions
 * @package WP_EASY_EVENTS
 * @since WPAS 4.0
 */
if (!defined('ABSPATH')) exit;
if (!class_exists('Wp_Easy_Events_Install_Deactivate')):
	/**
	 * Wp_Easy_Events_Install_Deactivate Class
	 * @since WPAS 4.0
	 */
	class Wp_Easy_Events_Install_Deactivate {
		private $option_name;
		/**
		 * Hooks for install and deactivation and create options
		 * @since WPAS 4.0
		 */
		public function __construct() {
			$this->option_name = 'wp_easy_events';
			add_action('admin_init', array(
				$this,
				'check_update'
			));
			register_activation_hook(WP_EASY_EVENTS_PLUGIN_FILE, array(
				$this,
				'install'
			));
			register_deactivation_hook(WP_EASY_EVENTS_PLUGIN_FILE, array(
				$this,
				'deactivate'
			));
			add_action('wp_head', array(
				$this,
				'version_in_header'
			));
			add_action('admin_init', array(
				$this,
				'setup_pages'
			));
			add_action('admin_notices', array(
				$this,
				'install_notice'
			));
			add_action('generate_rewrite_rules', 'emd_create_rewrite_rules');
			add_filter('query_vars', 'emd_query_vars');
			add_action('admin_init', array(
				$this,
				'register_settings'
			) , 0);
			add_action('wp_ajax_emd_load_file', 'emd_load_file');
			add_action('wp_ajax_nopriv_emd_load_file', 'emd_load_file');
			add_action('wp_ajax_emd_delete_file', 'emd_delete_file');
			add_action('wp_ajax_nopriv_emd_delete_file', 'emd_delete_file');
			add_action('init', array(
				$this,
				'init_extensions'
			) , 99);
			do_action('emd_ext_actions', $this->option_name);
			add_filter('tiny_mce_before_init', array(
				$this,
				'tinymce_fix'
			));
		}
		public function check_update() {
			$curr_version = get_option($this->option_name . '_version', 1);
			$new_version = constant(strtoupper($this->option_name) . '_VERSION');
			if (version_compare($curr_version, $new_version, '<')) {
				P2P_Storage::install();
				$this->set_options();
				$this->set_roles_caps();
				$this->set_notification();
				if (!get_option($this->option_name . '_activation_date')) {
					$triggerdate = mktime(0, 0, 0, date('m') , date('d') + 7, date('Y'));
					add_option($this->option_name . '_activation_date', $triggerdate);
				}
				set_transient($this->option_name . '_activate_redirect', true, 30);
				do_action($this->option_name . '_upgrade', $new_version);
				update_option($this->option_name . '_version', $new_version);
			}
		}
		public function version_in_header() {
			$version = constant(strtoupper($this->option_name) . '_VERSION');
			$name = constant(strtoupper($this->option_name) . '_NAME');
			echo '<meta name="generator" content="' . $name . ' v' . $version . ' - https://emdplugins.com" />' . "\n";
		}
		public function init_extensions() {
			do_action('emd_ext_init', $this->option_name);
		}
		/**
		 * Runs on plugin install to setup custom post types and taxonomies
		 * flushing rewrite rules, populates settings and options
		 * creates roles and assign capabilities
		 * @since WPAS 4.0
		 *
		 */
		public function install() {
			$this->set_options();
			$this->set_notification();
			P2P_Storage::install();
			Emd_Wpe_Event::register();
			Emd_Event_Organizer::register();
			Emd_Event_Venues::register();
			Emd_Event_Attendee::register();
			flush_rewrite_rules();
			$this->set_roles_caps();
			set_transient($this->option_name . '_activate_redirect', true, 30);
			do_action('emd_ext_install_hook', $this->option_name);
		}
		/**
		 * Runs on plugin deactivate to remove options, caps and roles
		 * flushing rewrite rules
		 * @since WPAS 4.0
		 *
		 */
		public function deactivate() {
			flush_rewrite_rules();
			$this->remove_caps_roles();
			$this->reset_options();
			do_action('emd_ext_deactivate', $this->option_name);
		}
		/**
		 * Register notification and/or license settings
		 * @since WPAS 4.0
		 *
		 */
		public function register_settings() {
			$notif_settings = new Emd_Notifications($this->option_name);
			$notif_settings->register_settings();
			emd_calendar_register_settings($this->option_name);
			do_action('emd_ext_register', $this->option_name);
			if (!get_transient($this->option_name . '_activate_redirect')) {
				return;
			}
			// Delete the redirect transient.
			delete_transient($this->option_name . '_activate_redirect');
			$query_args = array(
				'page' => $this->option_name
			);
			wp_safe_redirect(add_query_arg($query_args, admin_url('admin.php')));
		}
		/**
		 * Sets caps and roles
		 *
		 * @since WPAS 4.0
		 *
		 */
		public function set_roles_caps() {
			global $wp_roles;
			$cust_roles = Array(
				'wpee_event_staff' => __('Event Staff', 'wp-easy-events') ,
			);
			update_option($this->option_name . '_cust_roles', $cust_roles);
			$add_caps = Array(
				'edit_others_emd_event_attendees' => Array(
					'administrator',
					'wpee_event_staff'
				) ,
				'edit_private_emd_wpe_events' => Array(
					'administrator'
				) ,
				'edit_published_emd_wpe_events' => Array(
					'administrator'
				) ,
				'edit_published_emd_event_attendees' => Array(
					'administrator',
					'wpee_event_staff'
				) ,
				'manage_operations_emd_wpe_events' => Array(
					'administrator'
				) ,
				'edit_private_emd_event_attendees' => Array(
					'administrator',
					'wpee_event_staff'
				) ,
				'publish_emd_event_attendees' => Array(
					'administrator',
					'wpee_event_staff'
				) ,
				'delete_others_emd_event_attendees' => Array(
					'administrator',
					'wpee_event_staff'
				) ,
				'edit_emd_event_venuess' => Array(
					'administrator'
				) ,
				'read_private_emd_event_attendees' => Array(
					'administrator',
					'wpee_event_staff'
				) ,
				'edit_emd_wpe_events' => Array(
					'administrator',
					'wpee_event_staff'
				) ,
				'delete_published_emd_event_attendees' => Array(
					'administrator',
					'wpee_event_staff'
				) ,
				'manage_operations_emd_event_organizers' => Array(
					'administrator'
				) ,
				'edit_emd_event_cat' => Array(
					'administrator'
				) ,
				'read' => Array(
					'wpee_event_staff'
				) ,
				'export' => Array(
					'administrator'
				) ,
				'assign_emd_event_tag' => Array(
					'administrator'
				) ,
				'delete_emd_event_cat' => Array(
					'administrator'
				) ,
				'manage_operations_emd_event_attendees' => Array(
					'administrator'
				) ,
				'delete_emd_event_tag' => Array(
					'administrator'
				) ,
				'edit_others_emd_wpe_events' => Array(
					'administrator'
				) ,
				'manage_emd_event_tag' => Array(
					'administrator'
				) ,
				'assign_emd_event_cat' => Array(
					'administrator'
				) ,
				'publish_emd_wpe_events' => Array(
					'administrator'
				) ,
				'read_private_emd_wpe_events' => Array(
					'administrator'
				) ,
				'edit_emd_event_organizers' => Array(
					'administrator'
				) ,
				'edit_emd_event_tag' => Array(
					'administrator'
				) ,
				'manage_emd_event_cat' => Array(
					'administrator'
				) ,
				'delete_emd_event_attendees' => Array(
					'administrator',
					'wpee_event_staff'
				) ,
				'delete_others_emd_wpe_events' => Array(
					'administrator'
				) ,
				'delete_published_emd_wpe_events' => Array(
					'administrator'
				) ,
				'delete_private_emd_event_attendees' => Array(
					'administrator',
					'wpee_event_staff'
				) ,
				'delete_private_emd_wpe_events' => Array(
					'administrator'
				) ,
				'delete_emd_wpe_events' => Array(
					'administrator'
				) ,
				'view_wp_easy_events_dashboard' => Array(
					'administrator'
				) ,
				'edit_emd_event_attendees' => Array(
					'administrator',
					'wpee_event_staff'
				) ,
				'manage_operations_emd_event_venuess' => Array(
					'administrator'
				) ,
			);
			update_option($this->option_name . '_add_caps', $add_caps);
			if (class_exists('WP_Roles')) {
				if (!isset($wp_roles)) {
					$wp_roles = new WP_Roles();
				}
			}
			if (is_object($wp_roles)) {
				if (!empty($cust_roles)) {
					foreach ($cust_roles as $krole => $vrole) {
						$myrole = get_role($krole);
						if (empty($myrole)) {
							$myrole = add_role($krole, $vrole);
						}
					}
				}
				$this->set_reset_caps($wp_roles, 'add');
			}
		}
		/**
		 * Removes caps and roles
		 *
		 * @since WPAS 4.0
		 *
		 */
		public function remove_caps_roles() {
			global $wp_roles;
			if (class_exists('WP_Roles')) {
				if (!isset($wp_roles)) {
					$wp_roles = new WP_Roles();
				}
			}
			if (is_object($wp_roles)) {
				$this->set_reset_caps($wp_roles, 'remove');
				remove_role('wpee_event_staff');
			}
		}
		/**
		 * Set  capabilities
		 *
		 * @since WPAS 4.0
		 * @param object $wp_roles
		 * @param string $type
		 *
		 */
		public function set_reset_caps($wp_roles, $type) {
			$caps['enable'] = get_option($this->option_name . '_add_caps', Array());
			$caps['enable'] = apply_filters('emd_ext_get_caps', $caps['enable'], $this->option_name);
			foreach ($caps as $stat => $role_caps) {
				foreach ($role_caps as $mycap => $roles) {
					foreach ($roles as $myrole) {
						if (($type == 'add' && $stat == 'enable') || ($stat == 'disable' && $type == 'remove')) {
							$wp_roles->add_cap($myrole, $mycap);
						} else if (($type == 'remove' && $stat == 'enable') || ($type == 'add' && $stat == 'disable')) {
							$wp_roles->remove_cap($myrole, $mycap);
						}
					}
				}
			}
		}
		/**
		 * Sets notification options
		 * @since WPAS 4.0
		 *
		 */
		private function set_notification() {
			$notify_list['event_attendee'] = Array(
				'label' => __('Attendee Tickets', 'wp-easy-events') ,
				'active' => 1,
				'level' => 'rel',
				'entity' => 'emd_wpe_event',
				'ev_front_add' => 1,
				'object' => 'event_attendee',
				'user_msg' => Array(
					'subject' => 'Thank you for your RSVP',
					'message' => '<p>We have received your reservations and will contact you if we have any questions.</p>
<hr>
<p><b>Details</b></p>
<hr>
<div style="width:575px;padding:10px;border:2px solid black;background-color:white">
    <table border="0" cellpadding="5" cellspacing="5">
        <tbody>
            <tr>
                <td rowspan="6">
                     {emd_event_picture},
                </td>
                <td>
                    Event: <strong>{title}</strong>
                </td>
            </tr>
            <tr>
                <td>
                    Ticket ID: <strong> {emd_attendee_ticket_id}</strong>
                </td>
            </tr>
            <tr>
                <td>
                    Start Date: <strong>{emd_event_startdate}</strong>
                </td>
            </tr>
            <tr>
                <td>
                    End Date: <strong>{emd_event_enddate}</strong>
                </td>
            </tr>
            <tr>
                <td>
                    Quantity: <strong>{emd_attendee_quantity}</strong>
                </td>
            </tr>
            <tr>
                <td style="text-align:right">
                    <a href=" {emd_event_attendee_permalink}">Click to view and print your ticket</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>',
					'send_to' => Array(
						Array(
							'active' => 1,
							'entity' => 'emd_event_attendee',
							'attr' => 'emd_attendee_email',
							'label' => __('Attendees Email', 'wp-easy-events') ,
							'rel' => 'event_attendee',
							'from_to' => 'from'
						)
					) ,
					'reply_to' => '',
					'cc' => '',
					'bcc' => ''
				)
			);
			update_option($this->option_name . '_notify_init_list', $notify_list);
			if (get_option($this->option_name . '_notify_list') === false) {
				update_option($this->option_name . '_notify_list', $notify_list);
			}
		}
		/**
		 * Set app specific options
		 *
		 * @since WPAS 4.0
		 *
		 */
		private function set_options() {
			$access_views = Array();
			if (get_option($this->option_name . '_setup_pages', 0) == 0) {
				update_option($this->option_name . '_setup_pages', 1);
			}
			$ent_list = Array(
				'emd_wpe_event' => Array(
					'label' => __('Events', 'wp-easy-events') ,
					'rewrite' => 'events',
					'archive_view' => 0,
					'featured_img' => 1,
					'rest_api' => 0,
					'sortable' => 0,
					'searchable' => 1,
					'class_title' => Array(
						'blt_title'
					) ,
					'unique_keys' => Array(
						'blt_title'
					) ,
					'blt_list' => Array(
						'blt_content' => __('Description', 'wp-easy-events') ,
						'blt_excerpt' => __('Excerpt', 'wp-easy-events') ,
					) ,
					'req_blt' => Array(
						'blt_title' => Array(
							'msg' => __('Title', 'wp-easy-events')
						) ,
					) ,
				) ,
				'emd_event_organizer' => Array(
					'label' => __('Organizers', 'wp-easy-events') ,
					'rewrite' => 'organizers',
					'archive_view' => 0,
					'featured_img' => 1,
					'rest_api' => 0,
					'sortable' => 0,
					'searchable' => 1,
					'class_title' => Array(
						'blt_title'
					) ,
					'unique_keys' => Array(
						'blt_title'
					) ,
					'blt_list' => Array(
						'blt_content' => __('Detail', 'wp-easy-events') ,
					) ,
					'req_blt' => Array(
						'blt_title' => Array(
							'msg' => __('Title', 'wp-easy-events')
						) ,
					) ,
				) ,
				'emd_event_venues' => Array(
					'label' => __('Venues', 'wp-easy-events') ,
					'rewrite' => 'venues',
					'archive_view' => 0,
					'featured_img' => 1,
					'rest_api' => 0,
					'sortable' => 0,
					'searchable' => 1,
					'class_title' => Array(
						'blt_title'
					) ,
					'unique_keys' => Array(
						'blt_title'
					) ,
					'blt_list' => Array(
						'blt_content' => __('Details', 'wp-easy-events') ,
						'blt_excerpt' => __('Excerpt', 'wp-easy-events') ,
					) ,
					'req_blt' => Array(
						'blt_title' => Array(
							'msg' => __('Title', 'wp-easy-events')
						) ,
					) ,
				) ,
				'emd_event_attendee' => Array(
					'label' => __('Attendees', 'wp-easy-events') ,
					'rewrite' => 'attendee',
					'archive_view' => 0,
					'rest_api' => 0,
					'sortable' => 0,
					'searchable' => 0,
					'class_title' => Array(
						'emd_attendee_ticket_id'
					) ,
					'unique_keys' => Array(
						'emd_attendee_ticket_id'
					) ,
				) ,
			);
			update_option($this->option_name . '_ent_list', $ent_list);
			$shc_list['app'] = 'WP Easy Events';
			$shc_list['has_gmap'] = 1;
			$shc_list['has_form_lite'] = 1;
			$shc_list['has_lite'] = 1;
			$shc_list['has_bs'] = 0;
			$shc_list['has_autocomplete'] = 0;
			$shc_list['remove_vis'] = 0;
			$shc_list['forms']['event_attendee'] = Array(
				'name' => 'event_attendee',
				'type' => 'submit',
				'ent' => 'emd_event_attendee',
				'targeted_device' => 'desktops',
				'label_position' => 'top',
				'element_size' => 'medium',
				'display_inline' => '0',
				'noaccess_msg' => 'You are not allowed to access to this area. Please contact the site administrator.',
				'disable_submit' => '0',
				'submit_status' => 'publish',
				'visitor_submit_status' => 'publish',
				'submit_button_type' => 'btn-success',
				'submit_button_label' => 'Submit',
				'submit_button_size' => 'btn-std',
				'submit_button_block' => '0',
				'submit_button_fa' => '',
				'submit_button_fa_size' => '',
				'submit_button_fa_pos' => 'left',
				'show_captcha' => 'never-show',
				'disable_after' => '0',
				'confirm_method' => 'text',
				'confirm_url' => '',
				'confirm_success_txt' => 'Thanks for your registration.',
				'confirm_error_txt' => 'There has been an error when processing your registration. Please contact the site administrator.',
				'enable_ajax' => '1',
				'after_submit' => 'hide',
				'schedule_start' => '',
				'schedule_end' => '',
				'enable_operators' => '0',
				'ajax_search' => '0',
				'result_templ' => '',
				'result_fields' => '',
				'noresult_msg' => '',
				'view_name' => '',
				'honeypot' => '1',
				'login_reg' => 'none'
			);
			$shc_list['shcs']['wpee_event_grid'] = Array(
				"class_name" => "emd_wpe_event",
				"type" => "std",
				'page_title' => __('Event Grid', 'wp-easy-events') ,
			);
			$shc_list['integrations']['events_calendar'] = Array(
				'type' => 'integration',
				'app_dash' => 0,
				'shc_entities' => '',
				'page_title' => __('Events Calendar', 'wp-easy-events')
			);
			if (!empty($shc_list)) {
				update_option($this->option_name . '_shc_list', $shc_list);
			}
			$attr_list['emd_wpe_event']['emd_event_featured'] = Array(
				'label' => __('Featured', 'wp-easy-events') ,
				'display_type' => 'checkbox',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 0,
				'mid' => 'emd_wpe_event_info_emd_wpe_event_0',
				'type' => 'binary',
				'options' => array(
					1 => 1
				) ,
			);
			$attr_list['emd_wpe_event']['emd_event_registration_type'] = Array(
				'label' => __('Registration Type', 'wp-easy-events') ,
				'display_type' => 'radio',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 1,
				'mid' => 'emd_wpe_event_info_emd_wpe_event_0',
				'desc' => __('<a href="https://emdplugins.com/plugins/wp-easy-event-woocommerce-extension/?pk_campaign=wpee-pro&amp;pk_kwd=regtypelink" title="Buy WP Easy Event WooCommerce Extension Now">WooCommerce</a> and <a href="https://emdplugins.com/plugins/wp-easy-event-easy-digital-downloads-extension/?pk_campaign=wpee-pro&amp;pk_kwd=regtypelink" title="Buy WP Easy Event Easy Digital Downloads Extension Now">Easy Digital Downloads</a> types require corresponding extensions to work.', 'wp-easy-events') ,
				'type' => 'char',
				'options' => array(
					'none' => esc_attr(__('No registration', 'wp-easy-events')) ,
					'rsvp' => esc_attr(__('RSVP required', 'wp-easy-events')) ,
					'woo' => esc_attr(__('WooCommerce', 'wp-easy-events')) ,
					'edd' => esc_attr(__('Easy Digital Downloads', 'wp-easy-events'))
				) ,
				'std' => 'none',
			);
			$attr_list['emd_wpe_event']['emd_event_startdate'] = Array(
				'label' => __('Start Date', 'wp-easy-events') ,
				'display_type' => 'datetime',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 0,
				'list_visible' => 1,
				'mid' => 'emd_wpe_event_info_emd_wpe_event_0',
				'type' => 'datetime',
				'dformat' => array(
					'dateFormat' => 'mm-dd-yy',
					'timeFormat' => 'HH:mm'
				) ,
				'date_format' => 'm-d-Y H:i',
				'time_format' => 'hh:mm',
			);
			$attr_list['emd_wpe_event']['emd_event_enddate'] = Array(
				'label' => __('End Date', 'wp-easy-events') ,
				'display_type' => 'datetime',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 0,
				'list_visible' => 1,
				'mid' => 'emd_wpe_event_info_emd_wpe_event_0',
				'type' => 'datetime',
				'dformat' => array(
					'dateFormat' => 'mm-dd-yy',
					'timeFormat' => 'HH:mm'
				) ,
				'date_format' => 'm-d-Y H:i',
				'time_format' => 'hh:mm',
			);
			$attr_list['emd_wpe_event']['emd_event_external_url'] = Array(
				'label' => __('Website', 'wp-easy-events') ,
				'display_type' => 'text',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 0,
				'list_visible' => 0,
				'mid' => 'emd_wpe_event_info_emd_wpe_event_0',
				'type' => 'char',
				'url' => true,
			);
			$attr_list['emd_wpe_event']['emd_event_display_timezone'] = Array(
				'label' => __('Display Timezone On Event Page', 'wp-easy-events') ,
				'display_type' => 'checkbox',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 0,
				'list_visible' => 0,
				'mid' => 'emd_wpe_event_info_emd_wpe_event_0',
				'type' => 'binary',
				'options' => array(
					1 => 1
				) ,
				'conditional' => Array(
					'attr_rules' => Array(
						'emd_event_timezone' => Array(
							'type' => 'select_advanced',
							'view' => 'show',
							'depend_check' => 'is',
							'depend_value' => true
						) ,
					) ,
					'start_hide_attr' => Array(
						'emd_event_timezone'
					) ,
				) ,
			);
			$attr_list['emd_wpe_event']['emd_event_timezone'] = Array(
				'label' => __('Timezone', 'wp-easy-events') ,
				'display_type' => 'select_advanced',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 0,
				'mid' => 'emd_wpe_event_info_emd_wpe_event_0',
				'type' => 'char',
				'options' => array(
					'' => __('Please Select', 'wp-easy-events') ,
					'UTC-12' => esc_attr(__('UTC-12', 'wp-easy-events')) ,
					'UTC-115' => esc_attr(__('UTC-11:30', 'wp-easy-events')) ,
					'UTC-11' => esc_attr(__('UTC-11', 'wp-easy-events')) ,
					'UTC-105' => esc_attr(__('UTC-10:30', 'wp-easy-events')) ,
					'UTC-10' => esc_attr(__('UTC-10', 'wp-easy-events')) ,
					'UTC-95' => esc_attr(__('UTC-9:30', 'wp-easy-events')) ,
					'UTC-9' => esc_attr(__('UTC-9', 'wp-easy-events')) ,
					'UTC-85' => esc_attr(__('UTC-8:30', 'wp-easy-events')) ,
					'UTC-8' => esc_attr(__('UTC-8', 'wp-easy-events')) ,
					'UTC-75' => esc_attr(__('UTC-7:30', 'wp-easy-events')) ,
					'UTC-7' => esc_attr(__('UTC-7', 'wp-easy-events')) ,
					'UTC-65' => esc_attr(__('UTC-6:30', 'wp-easy-events')) ,
					'UTC-6' => esc_attr(__('UTC-6', 'wp-easy-events')) ,
					'UTC-55' => esc_attr(__('UTC-5:30', 'wp-easy-events')) ,
					'UTC-5' => esc_attr(__('UTC-5', 'wp-easy-events')) ,
					'UTC-45' => esc_attr(__('UTC-4:30', 'wp-easy-events')) ,
					'UTC-4' => esc_attr(__('UTC-4', 'wp-easy-events')) ,
					'UTC-35' => esc_attr(__('UTC-3:30', 'wp-easy-events')) ,
					'UTC-3' => esc_attr(__('UTC-3', 'wp-easy-events')) ,
					'UTC-25' => esc_attr(__('UTC-2:30', 'wp-easy-events')) ,
					'UTC-2' => esc_attr(__('UTC-2', 'wp-easy-events')) ,
					'UTC-15' => esc_attr(__('UTC-1:30', 'wp-easy-events')) ,
					'UTC-1' => esc_attr(__('UTC-1', 'wp-easy-events')) ,
					'UTC-05' => esc_attr(__('UTC-0:30', 'wp-easy-events')) ,
					'UTC0' => esc_attr(__('UTC+0', 'wp-easy-events')) ,
					'UTC05' => esc_attr(__('UTC+0:30', 'wp-easy-events')) ,
					'UTC1' => esc_attr(__('UTC+1', 'wp-easy-events')) ,
					'UTC15' => esc_attr(__('UTC+1:30', 'wp-easy-events')) ,
					'UTC2' => esc_attr(__('UTC+2', 'wp-easy-events')) ,
					'UTC25' => esc_attr(__('UTC+2:30', 'wp-easy-events')) ,
					'UTC3' => esc_attr(__('UTC+3', 'wp-easy-events')) ,
					'UTC35' => esc_attr(__('UTC+3:30', 'wp-easy-events')) ,
					'UTC4' => esc_attr(__('UTC+4', 'wp-easy-events')) ,
					'UTC45' => esc_attr(__('UTC+4:30', 'wp-easy-events')) ,
					'UTC5' => esc_attr(__('UTC+5', 'wp-easy-events')) ,
					'UTC55' => esc_attr(__('UTC+5:30', 'wp-easy-events')) ,
					'UTC575' => esc_attr(__('UTC+5:45', 'wp-easy-events')) ,
					'UTC6' => esc_attr(__('UTC+6', 'wp-easy-events')) ,
					'UTC65' => esc_attr(__('UTC+6:30', 'wp-easy-events')) ,
					'UTC7' => esc_attr(__('UTC+7', 'wp-easy-events')) ,
					'UTC75' => esc_attr(__('UTC+7:30', 'wp-easy-events')) ,
					'UTC8' => esc_attr(__('UTC+8', 'wp-easy-events')) ,
					'UTC85' => esc_attr(__('UTC+8:30', 'wp-easy-events')) ,
					'UTC875' => esc_attr(__('UTC+8:45', 'wp-easy-events')) ,
					'UTC9' => esc_attr(__('UTC+9', 'wp-easy-events')) ,
					'UTC95' => esc_attr(__('UTC+9:30', 'wp-easy-events')) ,
					'UTC10' => esc_attr(__('UTC+10', 'wp-easy-events')) ,
					'UTC105' => esc_attr(__('UTC+10:30', 'wp-easy-events')) ,
					'UTC11' => esc_attr(__('UTC+11', 'wp-easy-events')) ,
					'UTC115' => esc_attr(__('UTC+11:30', 'wp-easy-events')) ,
					'UTC12' => esc_attr(__('UTC+12', 'wp-easy-events')) ,
					'UTC1275' => esc_attr(__('UTC+12:45', 'wp-easy-events')) ,
					'UTC13' => esc_attr(__('UTC+13', 'wp-easy-events')) ,
					'UTC1375' => esc_attr(__('UTC+13:45', 'wp-easy-events')) ,
					'UTC14' => esc_attr(__('UTC+14', 'wp-easy-events'))
				) ,
				'std' => 'UTC0',
			);
			$attr_list['emd_wpe_event']['emd_event_cost'] = Array(
				'label' => __('Cost', 'wp-easy-events') ,
				'display_type' => 'text',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 0,
				'list_visible' => 1,
				'mid' => 'emd_wpe_event_info_emd_wpe_event_0',
				'type' => 'char',
			);
			$attr_list['emd_event_organizer']['emd_eo_email'] = Array(
				'label' => __('Email', 'wp-easy-events') ,
				'display_type' => 'text',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 1,
				'mid' => 'emd_event_organizer_info_emd_event_organizer_0',
				'type' => 'char',
				'email' => true,
			);
			$attr_list['emd_event_organizer']['emd_eo_phone'] = Array(
				'label' => __('Phone', 'wp-easy-events') ,
				'display_type' => 'text',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 1,
				'mid' => 'emd_event_organizer_info_emd_event_organizer_0',
				'type' => 'char',
			);
			$attr_list['emd_event_organizer']['emd_eo_website'] = Array(
				'label' => __('Website', 'wp-easy-events') ,
				'display_type' => 'text',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 1,
				'mid' => 'emd_event_organizer_info_emd_event_organizer_0',
				'type' => 'char',
				'url' => true,
			);
			$attr_list['emd_event_venues']['emd_venue_address'] = Array(
				'label' => __('Address', 'wp-easy-events') ,
				'display_type' => 'text',
				'required' => 1,
				'srequired' => 0,
				'filterable' => 0,
				'list_visible' => 1,
				'mid' => 'emd_event_venues_info_emd_event_venues_0',
				'type' => 'char',
				'data-cell' => 'A17',
			);
			$attr_list['emd_event_venues']['emd_venue_city'] = Array(
				'label' => __('City', 'wp-easy-events') ,
				'display_type' => 'text',
				'required' => 1,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 1,
				'mid' => 'emd_event_venues_info_emd_event_venues_0',
				'type' => 'char',
				'data-cell' => 'A18',
			);
			$attr_list['emd_event_venues']['emd_venue_state'] = Array(
				'label' => __('State', 'wp-easy-events') ,
				'display_type' => 'select_advanced',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 1,
				'mid' => 'emd_event_venues_info_emd_event_venues_0',
				'type' => 'char',
				'options' => array(
					'' => __('Please Select', 'wp-easy-events') ,
					'AL' => esc_attr(__('Alabama', 'wp-easy-events')) ,
					'AK' => esc_attr(__('Alaska', 'wp-easy-events')) ,
					'AZ' => esc_attr(__('Arizona', 'wp-easy-events')) ,
					'AR' => esc_attr(__('Arkansas', 'wp-easy-events')) ,
					'CA' => esc_attr(__('California', 'wp-easy-events')) ,
					'CO' => esc_attr(__('Colorado', 'wp-easy-events')) ,
					'CT' => esc_attr(__('Connecticut', 'wp-easy-events')) ,
					'DE' => esc_attr(__('Delaware', 'wp-easy-events')) ,
					'DC' => esc_attr(__('District Of Columbia', 'wp-easy-events')) ,
					'FL' => esc_attr(__('Florida', 'wp-easy-events')) ,
					'GA' => esc_attr(__('Georgia', 'wp-easy-events')) ,
					'HI' => esc_attr(__('Hawaii', 'wp-easy-events')) ,
					'ID' => esc_attr(__('Idaho', 'wp-easy-events')) ,
					'IL' => esc_attr(__('Illinois', 'wp-easy-events')) ,
					'IN' => esc_attr(__('Indiana', 'wp-easy-events')) ,
					'IA' => esc_attr(__('Iowa', 'wp-easy-events')) ,
					'KS' => esc_attr(__('Kansas', 'wp-easy-events')) ,
					'KY' => esc_attr(__('Kentucky', 'wp-easy-events')) ,
					'LA' => esc_attr(__('Louisiana', 'wp-easy-events')) ,
					'ME' => esc_attr(__('Maine', 'wp-easy-events')) ,
					'MD' => esc_attr(__('Maryland', 'wp-easy-events')) ,
					'MA' => esc_attr(__('Massachusetts', 'wp-easy-events')) ,
					'MI' => esc_attr(__('Michigan', 'wp-easy-events')) ,
					'MN' => esc_attr(__('Minnesota', 'wp-easy-events')) ,
					'MS' => esc_attr(__('Mississippi', 'wp-easy-events')) ,
					'MO' => esc_attr(__('Missouri', 'wp-easy-events')) ,
					'MT' => esc_attr(__('Montana', 'wp-easy-events')) ,
					'NE' => esc_attr(__('Nebraska', 'wp-easy-events')) ,
					'NV' => esc_attr(__('Nevada', 'wp-easy-events')) ,
					'NH' => esc_attr(__('New Hampshire', 'wp-easy-events')) ,
					'NJ' => esc_attr(__('New Jersey', 'wp-easy-events')) ,
					'NM' => esc_attr(__('New Mexico', 'wp-easy-events')) ,
					'NY' => esc_attr(__('New York', 'wp-easy-events')) ,
					'NC' => esc_attr(__('North Carolina', 'wp-easy-events')) ,
					'ND' => esc_attr(__('North Dakota', 'wp-easy-events')) ,
					'OH' => esc_attr(__('Ohio', 'wp-easy-events')) ,
					'OK' => esc_attr(__('Oklahoma', 'wp-easy-events')) ,
					'OR' => esc_attr(__('Oregon', 'wp-easy-events')) ,
					'PA' => esc_attr(__('Pennsylvania', 'wp-easy-events')) ,
					'RI' => esc_attr(__('Rhode Island', 'wp-easy-events')) ,
					'SC' => esc_attr(__('South Carolina', 'wp-easy-events')) ,
					'SD' => esc_attr(__('South Dakota', 'wp-easy-events')) ,
					'TN' => esc_attr(__('Tennessee', 'wp-easy-events')) ,
					'TX' => esc_attr(__('Texas', 'wp-easy-events')) ,
					'UT' => esc_attr(__('Utah', 'wp-easy-events')) ,
					'VT' => esc_attr(__('Vermont', 'wp-easy-events')) ,
					'VA' => esc_attr(__('Virginia', 'wp-easy-events')) ,
					'WA' => esc_attr(__('Washington', 'wp-easy-events')) ,
					'WV' => esc_attr(__('West Virginia', 'wp-easy-events')) ,
					'WI' => esc_attr(__('Wisconsin', 'wp-easy-events')) ,
					'WY' => esc_attr(__('Wyoming', 'wp-easy-events')) ,
					'AS' => esc_attr(__('American Samoa', 'wp-easy-events')) ,
					'GU' => esc_attr(__('Guam', 'wp-easy-events')) ,
					'MP' => esc_attr(__('Northern Mariana Islands', 'wp-easy-events')) ,
					'PR' => esc_attr(__('Puerto Rico', 'wp-easy-events')) ,
					'UM' => esc_attr(__('United States Minor Outlying Islands', 'wp-easy-events')) ,
					'VI' => esc_attr(__('Virgin Islands', 'wp-easy-events')) ,
					'AA' => esc_attr(__('Armed Forces Americas', 'wp-easy-events')) ,
					'AP' => esc_attr(__('Armed Forces Pacific', 'wp-easy-events')) ,
					'AE' => esc_attr(__('Armed Forces Others', 'wp-easy-events'))
				) ,
				'data-cell' => 'A19',
			);
			$attr_list['emd_event_venues']['emd_venue_postcode'] = Array(
				'label' => __('Postal Code', 'wp-easy-events') ,
				'display_type' => 'text',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 1,
				'mid' => 'emd_event_venues_info_emd_event_venues_0',
				'type' => 'char',
				'data-cell' => 'A20',
			);
			$attr_list['emd_event_venues']['emd_venue_country'] = Array(
				'label' => __('Country', 'wp-easy-events') ,
				'display_type' => 'select_advanced',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 0,
				'mid' => 'emd_event_venues_info_emd_event_venues_0',
				'type' => 'char',
				'options' => array(
					'' => __('Please Select', 'wp-easy-events') ,
					'AFG' => esc_attr(__('Afghanistan', 'wp-easy-events')) ,
					'ALA' => esc_attr(__('Åland Islands', 'wp-easy-events')) ,
					'ALB' => esc_attr(__('Albania', 'wp-easy-events')) ,
					'DZA' => esc_attr(__('Algeria', 'wp-easy-events')) ,
					'ASM' => esc_attr(__('American Samoa', 'wp-easy-events')) ,
					'AND' => esc_attr(__('Andorra', 'wp-easy-events')) ,
					'AGO' => esc_attr(__('Angola', 'wp-easy-events')) ,
					'AIA' => esc_attr(__('Anguilla', 'wp-easy-events')) ,
					'ATA' => esc_attr(__('Antarctica', 'wp-easy-events')) ,
					'ATG' => esc_attr(__('Antigua and Barbuda', 'wp-easy-events')) ,
					'ARG' => esc_attr(__('Argentina', 'wp-easy-events')) ,
					'ARM' => esc_attr(__('Armenia', 'wp-easy-events')) ,
					'ABW' => esc_attr(__('Aruba', 'wp-easy-events')) ,
					'AUS' => esc_attr(__('Australia', 'wp-easy-events')) ,
					'AUT' => esc_attr(__('Austria', 'wp-easy-events')) ,
					'AZE' => esc_attr(__('Azerbaijan', 'wp-easy-events')) ,
					'BHS' => esc_attr(__('Bahamas', 'wp-easy-events')) ,
					'BHR' => esc_attr(__('Bahrain', 'wp-easy-events')) ,
					'BGD' => esc_attr(__('Bangladesh', 'wp-easy-events')) ,
					'BRB' => esc_attr(__('Barbados', 'wp-easy-events')) ,
					'BLR' => esc_attr(__('Belarus', 'wp-easy-events')) ,
					'BEL' => esc_attr(__('Belgium', 'wp-easy-events')) ,
					'BLZ' => esc_attr(__('Belize', 'wp-easy-events')) ,
					'BEN' => esc_attr(__('Benin', 'wp-easy-events')) ,
					'BMU' => esc_attr(__('Bermuda', 'wp-easy-events')) ,
					'BTN' => esc_attr(__('Bhutan', 'wp-easy-events')) ,
					'BOL' => esc_attr(__('Bolivia, Plurinational State of', 'wp-easy-events')) ,
					'BES' => esc_attr(__('Bonaire, Sint Eustatius and Saba', 'wp-easy-events')) ,
					'BIH' => esc_attr(__('Bosnia and Herzegovina', 'wp-easy-events')) ,
					'BWA' => esc_attr(__('Botswana', 'wp-easy-events')) ,
					'BVT' => esc_attr(__('Bouvet Island', 'wp-easy-events')) ,
					'BRA' => esc_attr(__('Brazil', 'wp-easy-events')) ,
					'IOT' => esc_attr(__('British Indian Ocean Territory', 'wp-easy-events')) ,
					'BRN' => esc_attr(__('Brunei Darussalam', 'wp-easy-events')) ,
					'BGR' => esc_attr(__('Bulgaria', 'wp-easy-events')) ,
					'BFA' => esc_attr(__('Burkina Faso', 'wp-easy-events')) ,
					'BDI' => esc_attr(__('Burundi', 'wp-easy-events')) ,
					'KHM' => esc_attr(__('Cambodia', 'wp-easy-events')) ,
					'CMR' => esc_attr(__('Cameroon', 'wp-easy-events')) ,
					'CAN' => esc_attr(__('Canada', 'wp-easy-events')) ,
					'CPV' => esc_attr(__('Cape Verde', 'wp-easy-events')) ,
					'CYM' => esc_attr(__('Cayman Islands', 'wp-easy-events')) ,
					'CAF' => esc_attr(__('Central African Republic', 'wp-easy-events')) ,
					'TCD' => esc_attr(__('Chad', 'wp-easy-events')) ,
					'CHL' => esc_attr(__('Chile', 'wp-easy-events')) ,
					'CHN' => esc_attr(__('China', 'wp-easy-events')) ,
					'CXR' => esc_attr(__('Christmas Island', 'wp-easy-events')) ,
					'CCK' => esc_attr(__('Cocos (Keeling) Islands', 'wp-easy-events')) ,
					'COL' => esc_attr(__('Colombia', 'wp-easy-events')) ,
					'COM' => esc_attr(__('Comoros', 'wp-easy-events')) ,
					'COG' => esc_attr(__('Congo', 'wp-easy-events')) ,
					'COD' => esc_attr(__('Congo, the Democratic Republic of the', 'wp-easy-events')) ,
					'COK' => esc_attr(__('Cook Islands', 'wp-easy-events')) ,
					'CRI' => esc_attr(__('Costa Rica', 'wp-easy-events')) ,
					'CIV' => esc_attr(__('Côte d\'Ivoire', 'wp-easy-events')) ,
					'HRV' => esc_attr(__('Croatia', 'wp-easy-events')) ,
					'CUB' => esc_attr(__('Cuba', 'wp-easy-events')) ,
					'CUW' => esc_attr(__('Curaçao', 'wp-easy-events')) ,
					'CYP' => esc_attr(__('Cyprus', 'wp-easy-events')) ,
					'CZE' => esc_attr(__('Czech Republic', 'wp-easy-events')) ,
					'DNK' => esc_attr(__('Denmark', 'wp-easy-events')) ,
					'DJI' => esc_attr(__('Djibouti', 'wp-easy-events')) ,
					'DMA' => esc_attr(__('Dominica', 'wp-easy-events')) ,
					'DOM' => esc_attr(__('Dominican Republic', 'wp-easy-events')) ,
					'ECU' => esc_attr(__('Ecuador', 'wp-easy-events')) ,
					'EGY' => esc_attr(__('Egypt', 'wp-easy-events')) ,
					'SLV' => esc_attr(__('El Salvador', 'wp-easy-events')) ,
					'GNQ' => esc_attr(__('Equatorial Guinea', 'wp-easy-events')) ,
					'ERI' => esc_attr(__('Eritrea', 'wp-easy-events')) ,
					'EST' => esc_attr(__('Estonia', 'wp-easy-events')) ,
					'ETH' => esc_attr(__('Ethiopia', 'wp-easy-events')) ,
					'FLK' => esc_attr(__('Falkland Islands (Malvinas)', 'wp-easy-events')) ,
					'FRO' => esc_attr(__('Faroe Islands', 'wp-easy-events')) ,
					'FJI' => esc_attr(__('Fiji', 'wp-easy-events')) ,
					'FIN' => esc_attr(__('Finland', 'wp-easy-events')) ,
					'FRA' => esc_attr(__('France', 'wp-easy-events')) ,
					'GUF' => esc_attr(__('French Guiana', 'wp-easy-events')) ,
					'PYF' => esc_attr(__('French Polynesia', 'wp-easy-events')) ,
					'ATF' => esc_attr(__('French Southern Territories', 'wp-easy-events')) ,
					'GAB' => esc_attr(__('Gabon', 'wp-easy-events')) ,
					'GMB' => esc_attr(__('Gambia', 'wp-easy-events')) ,
					'GEO' => esc_attr(__('Georgia', 'wp-easy-events')) ,
					'DEU' => esc_attr(__('Germany', 'wp-easy-events')) ,
					'GHA' => esc_attr(__('Ghana', 'wp-easy-events')) ,
					'GIB' => esc_attr(__('Gibraltar', 'wp-easy-events')) ,
					'GRC' => esc_attr(__('Greece', 'wp-easy-events')) ,
					'GRL' => esc_attr(__('Greenland', 'wp-easy-events')) ,
					'GRD' => esc_attr(__('Grenada', 'wp-easy-events')) ,
					'GLP' => esc_attr(__('Guadeloupe', 'wp-easy-events')) ,
					'GUM' => esc_attr(__('Guam', 'wp-easy-events')) ,
					'GTM' => esc_attr(__('Guatemala', 'wp-easy-events')) ,
					'GGY' => esc_attr(__('Guernsey', 'wp-easy-events')) ,
					'GIN' => esc_attr(__('Guinea', 'wp-easy-events')) ,
					'GNB' => esc_attr(__('Guinea-Bissau', 'wp-easy-events')) ,
					'GUY' => esc_attr(__('Guyana', 'wp-easy-events')) ,
					'HTI' => esc_attr(__('Haiti', 'wp-easy-events')) ,
					'HMD' => esc_attr(__('Heard Island and McDonald Islands', 'wp-easy-events')) ,
					'VAT' => esc_attr(__('Holy See (Vatican City State)', 'wp-easy-events')) ,
					'HND' => esc_attr(__('Honduras', 'wp-easy-events')) ,
					'HKG' => esc_attr(__('Hong Kong', 'wp-easy-events')) ,
					'HUN' => esc_attr(__('Hungary', 'wp-easy-events')) ,
					'ISL' => esc_attr(__('Iceland', 'wp-easy-events')) ,
					'IND' => esc_attr(__('India', 'wp-easy-events')) ,
					'IDN' => esc_attr(__('Indonesia', 'wp-easy-events')) ,
					'IRN' => esc_attr(__('Iran, Islamic Republic of', 'wp-easy-events')) ,
					'IRQ' => esc_attr(__('Iraq', 'wp-easy-events')) ,
					'IRL' => esc_attr(__('Ireland', 'wp-easy-events')) ,
					'IMN' => esc_attr(__('Isle of Man', 'wp-easy-events')) ,
					'ISR' => esc_attr(__('Israel', 'wp-easy-events')) ,
					'ITA' => esc_attr(__('Italy', 'wp-easy-events')) ,
					'JAM' => esc_attr(__('Jamaica', 'wp-easy-events')) ,
					'JPN' => esc_attr(__('Japan', 'wp-easy-events')) ,
					'JEY' => esc_attr(__('Jersey', 'wp-easy-events')) ,
					'JOR' => esc_attr(__('Jordan', 'wp-easy-events')) ,
					'KAZ' => esc_attr(__('Kazakhstan', 'wp-easy-events')) ,
					'KEN' => esc_attr(__('Kenya', 'wp-easy-events')) ,
					'KIR' => esc_attr(__('Kiribati', 'wp-easy-events')) ,
					'PRK' => esc_attr(__('Korea, Democratic People\'s Republic of', 'wp-easy-events')) ,
					'KOR' => esc_attr(__('Korea, Republic of', 'wp-easy-events')) ,
					'KWT' => esc_attr(__('Kuwait', 'wp-easy-events')) ,
					'KGZ' => esc_attr(__('Kyrgyzstan', 'wp-easy-events')) ,
					'LAO' => esc_attr(__('Lao People\'s Democratic Republic', 'wp-easy-events')) ,
					'LVA' => esc_attr(__('Latvia', 'wp-easy-events')) ,
					'LBN' => esc_attr(__('Lebanon', 'wp-easy-events')) ,
					'LSO' => esc_attr(__('Lesotho', 'wp-easy-events')) ,
					'LBR' => esc_attr(__('Liberia', 'wp-easy-events')) ,
					'LBY' => esc_attr(__('Libya', 'wp-easy-events')) ,
					'LIE' => esc_attr(__('Liechtenstein', 'wp-easy-events')) ,
					'LTU' => esc_attr(__('Lithuania', 'wp-easy-events')) ,
					'LUX' => esc_attr(__('Luxembourg', 'wp-easy-events')) ,
					'MAC' => esc_attr(__('Macao', 'wp-easy-events')) ,
					'MKD' => esc_attr(__('Macedonia, the former Yugoslav Republic of', 'wp-easy-events')) ,
					'MDG' => esc_attr(__('Madagascar', 'wp-easy-events')) ,
					'MWI' => esc_attr(__('Malawi', 'wp-easy-events')) ,
					'MYS' => esc_attr(__('Malaysia', 'wp-easy-events')) ,
					'MDV' => esc_attr(__('Maldives', 'wp-easy-events')) ,
					'MLI' => esc_attr(__('Mali', 'wp-easy-events')) ,
					'MLT' => esc_attr(__('Malta', 'wp-easy-events')) ,
					'MHL' => esc_attr(__('Marshall Islands', 'wp-easy-events')) ,
					'MTQ' => esc_attr(__('Martinique', 'wp-easy-events')) ,
					'MRT' => esc_attr(__('Mauritania', 'wp-easy-events')) ,
					'MUS' => esc_attr(__('Mauritius', 'wp-easy-events')) ,
					'MYT' => esc_attr(__('Mayotte', 'wp-easy-events')) ,
					'MEX' => esc_attr(__('Mexico', 'wp-easy-events')) ,
					'FSM' => esc_attr(__('Micronesia, Federated States of', 'wp-easy-events')) ,
					'MDA' => esc_attr(__('Moldova, Republic of', 'wp-easy-events')) ,
					'MCO' => esc_attr(__('Monaco', 'wp-easy-events')) ,
					'MNG' => esc_attr(__('Mongolia', 'wp-easy-events')) ,
					'MNE' => esc_attr(__('Montenegro', 'wp-easy-events')) ,
					'MSR' => esc_attr(__('Montserrat', 'wp-easy-events')) ,
					'MAR' => esc_attr(__('Morocco', 'wp-easy-events')) ,
					'MOZ' => esc_attr(__('Mozambique', 'wp-easy-events')) ,
					'MMR' => esc_attr(__('Myanmar', 'wp-easy-events')) ,
					'NAM' => esc_attr(__('Namibia', 'wp-easy-events')) ,
					'NRU' => esc_attr(__('Nauru', 'wp-easy-events')) ,
					'NPL' => esc_attr(__('Nepal', 'wp-easy-events')) ,
					'NLD' => esc_attr(__('Netherlands', 'wp-easy-events')) ,
					'NCL' => esc_attr(__('New Caledonia', 'wp-easy-events')) ,
					'NZL' => esc_attr(__('New Zealand', 'wp-easy-events')) ,
					'NIC' => esc_attr(__('Nicaragua', 'wp-easy-events')) ,
					'NER' => esc_attr(__('Niger', 'wp-easy-events')) ,
					'NGA' => esc_attr(__('Nigeria', 'wp-easy-events')) ,
					'NIU' => esc_attr(__('Niue', 'wp-easy-events')) ,
					'NFK' => esc_attr(__('Norfolk Island', 'wp-easy-events')) ,
					'MNP' => esc_attr(__('Northern Mariana Islands', 'wp-easy-events')) ,
					'NOR' => esc_attr(__('Norway', 'wp-easy-events')) ,
					'OMN' => esc_attr(__('Oman', 'wp-easy-events')) ,
					'PAK' => esc_attr(__('Pakistan', 'wp-easy-events')) ,
					'PLW' => esc_attr(__('Palau', 'wp-easy-events')) ,
					'PSE' => esc_attr(__('Palestinian Territory, Occupied', 'wp-easy-events')) ,
					'PAN' => esc_attr(__('Panama', 'wp-easy-events')) ,
					'PNG' => esc_attr(__('Papua New Guinea', 'wp-easy-events')) ,
					'PRY' => esc_attr(__('Paraguay', 'wp-easy-events')) ,
					'PER' => esc_attr(__('Peru', 'wp-easy-events')) ,
					'PHL' => esc_attr(__('Philippines', 'wp-easy-events')) ,
					'PCN' => esc_attr(__('Pitcairn', 'wp-easy-events')) ,
					'POL' => esc_attr(__('Poland', 'wp-easy-events')) ,
					'PRT' => esc_attr(__('Portugal', 'wp-easy-events')) ,
					'PRI' => esc_attr(__('Puerto Rico', 'wp-easy-events')) ,
					'QAT' => esc_attr(__('Qatar', 'wp-easy-events')) ,
					'REU' => esc_attr(__('Réunion', 'wp-easy-events')) ,
					'ROU' => esc_attr(__('Romania', 'wp-easy-events')) ,
					'RUS' => esc_attr(__('Russian Federation', 'wp-easy-events')) ,
					'RWA' => esc_attr(__('Rwanda', 'wp-easy-events')) ,
					'BLM' => esc_attr(__('Saint Barthélemy', 'wp-easy-events')) ,
					'SHN' => esc_attr(__('Saint Helena, Ascension and Tristan da Cunha', 'wp-easy-events')) ,
					'KNA' => esc_attr(__('Saint Kitts and Nevis', 'wp-easy-events')) ,
					'LCA' => esc_attr(__('Saint Lucia', 'wp-easy-events')) ,
					'MAF' => esc_attr(__('Saint Martin (French part)', 'wp-easy-events')) ,
					'SPM' => esc_attr(__('Saint Pierre and Miquelon', 'wp-easy-events')) ,
					'VCT' => esc_attr(__('Saint Vincent and the Grenadines', 'wp-easy-events')) ,
					'WSM' => esc_attr(__('Samoa', 'wp-easy-events')) ,
					'SMR' => esc_attr(__('San Marino', 'wp-easy-events')) ,
					'STP' => esc_attr(__('Sao Tome and Principe', 'wp-easy-events')) ,
					'SAU' => esc_attr(__('Saudi Arabia', 'wp-easy-events')) ,
					'SEN' => esc_attr(__('Senegal', 'wp-easy-events')) ,
					'SRB' => esc_attr(__('Serbia', 'wp-easy-events')) ,
					'SYC' => esc_attr(__('Seychelles', 'wp-easy-events')) ,
					'SLE' => esc_attr(__('Sierra Leone', 'wp-easy-events')) ,
					'SGP' => esc_attr(__('Singapore', 'wp-easy-events')) ,
					'SXM' => esc_attr(__('Sint Maarten (Dutch part)', 'wp-easy-events')) ,
					'SVK' => esc_attr(__('Slovakia', 'wp-easy-events')) ,
					'SVN' => esc_attr(__('Slovenia', 'wp-easy-events')) ,
					'SLB' => esc_attr(__('Solomon Islands', 'wp-easy-events')) ,
					'SOM' => esc_attr(__('Somalia', 'wp-easy-events')) ,
					'ZAF' => esc_attr(__('South Africa', 'wp-easy-events')) ,
					'SGS' => esc_attr(__('South Georgia and the South Sandwich Islands', 'wp-easy-events')) ,
					'SSD' => esc_attr(__('South Sudan', 'wp-easy-events')) ,
					'ESP' => esc_attr(__('Spain', 'wp-easy-events')) ,
					'LKA' => esc_attr(__('Sri Lanka', 'wp-easy-events')) ,
					'SDN' => esc_attr(__('Sudan', 'wp-easy-events')) ,
					'SUR' => esc_attr(__('Suriname', 'wp-easy-events')) ,
					'SJM' => esc_attr(__('Svalbard and Jan Mayen', 'wp-easy-events')) ,
					'SWZ' => esc_attr(__('Swaziland', 'wp-easy-events')) ,
					'SWE' => esc_attr(__('Sweden', 'wp-easy-events')) ,
					'CHE' => esc_attr(__('Switzerland', 'wp-easy-events')) ,
					'SYR' => esc_attr(__('Syrian Arab Republic', 'wp-easy-events')) ,
					'TWN' => esc_attr(__('Taiwan, Province of China', 'wp-easy-events')) ,
					'TJK' => esc_attr(__('Tajikistan', 'wp-easy-events')) ,
					'TZA' => esc_attr(__('Tanzania, United Republic of', 'wp-easy-events')) ,
					'THA' => esc_attr(__('Thailand', 'wp-easy-events')) ,
					'TLS' => esc_attr(__('Timor-Leste', 'wp-easy-events')) ,
					'TGO' => esc_attr(__('Togo', 'wp-easy-events')) ,
					'TKL' => esc_attr(__('Tokelau', 'wp-easy-events')) ,
					'TON' => esc_attr(__('Tonga', 'wp-easy-events')) ,
					'TTO' => esc_attr(__('Trinidad and Tobago', 'wp-easy-events')) ,
					'TUN' => esc_attr(__('Tunisia', 'wp-easy-events')) ,
					'TUR' => esc_attr(__('Turkey', 'wp-easy-events')) ,
					'TKM' => esc_attr(__('Turkmenistan', 'wp-easy-events')) ,
					'TCA' => esc_attr(__('Turks and Caicos Islands', 'wp-easy-events')) ,
					'TUV' => esc_attr(__('Tuvalu', 'wp-easy-events')) ,
					'UGA' => esc_attr(__('Uganda', 'wp-easy-events')) ,
					'UKR' => esc_attr(__('Ukraine', 'wp-easy-events')) ,
					'ARE' => esc_attr(__('United Arab Emirates', 'wp-easy-events')) ,
					'GBR' => esc_attr(__('United Kingdom', 'wp-easy-events')) ,
					'USA' => esc_attr(__('United States', 'wp-easy-events')) ,
					'UMI' => esc_attr(__('United States Minor Outlying Islands', 'wp-easy-events')) ,
					'URY' => esc_attr(__('Uruguay', 'wp-easy-events')) ,
					'UZB' => esc_attr(__('Uzbekistan', 'wp-easy-events')) ,
					'VUT' => esc_attr(__('Vanuatu', 'wp-easy-events')) ,
					'VEN' => esc_attr(__('Venezuela, Bolivarian Republic of', 'wp-easy-events')) ,
					'VNM' => esc_attr(__('Viet Nam', 'wp-easy-events')) ,
					'VGB' => esc_attr(__('Virgin Islands, British', 'wp-easy-events')) ,
					'VIR' => esc_attr(__('Virgin Islands, U.S.', 'wp-easy-events')) ,
					'WLF' => esc_attr(__('Wallis and Futuna', 'wp-easy-events')) ,
					'ESH' => esc_attr(__('Western Sahara', 'wp-easy-events')) ,
					'YEM' => esc_attr(__('Yemen', 'wp-easy-events')) ,
					'ZMB' => esc_attr(__('Zambia', 'wp-easy-events')) ,
					'ZWE' => esc_attr(__('Zimbabwe', 'wp-easy-events'))
				) ,
				'conditional' => Array(
					'attr_rules' => Array(
						'emd_venue_state' => Array(
							'type' => 'select_advanced',
							'view' => 'show',
							'depend_check' => 'is',
							'depend_value' => 'USA',
							'comb_type' => 'any',
							'comb' => Array(
								Array(
									'key' => 'emd_venue_country',
									'depend_check' => 'is',
									'depend_value' => 'UMI',
									'type' => 'select'
								) ,
							)
						) ,
					) ,
					'start_hide_attr' => Array(
						'emd_venue_state'
					) ,
				) ,
				'data-cell' => 'A21',
			);
			$attr_list['emd_event_venues']['emd_venue_fulladdress'] = Array(
				'label' => __('Full Address', 'wp-easy-events') ,
				'display_type' => 'calculated',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 0,
				'list_visible' => 0,
				'mid' => 'emd_event_venues_info_emd_event_venues_0',
				'type' => 'char',
				'data-cell' => 'F22',
				'data-formula' => 'SERVER("EMD_VENUE_FULLADDRESS",A17,A18,A19,A20,A21)',
			);
			$attr_list['emd_event_venues']['emd_venue_map'] = Array(
				'label' => __('Map', 'wp-easy-events') ,
				'display_type' => 'map',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 0,
				'list_visible' => 0,
				'mid' => 'emd_event_venues_info_emd_event_venues_0',
				'address_field' => 'emd_venue_fulladdress',
				'type' => 'char',
			);
			$attr_list['emd_event_attendee']['emd_attendee_ticket_id'] = Array(
				'label' => __('Ticket ID', 'wp-easy-events') ,
				'display_type' => 'hidden',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 1,
				'mid' => 'emd_event_attendee_info_emd_event_attendee_0',
				'desc' => __('Unique identifier for every ticket', 'wp-easy-events') ,
				'type' => 'char',
				'hidden_func' => 'unique_id',
				'uniqueAttr' => true,
			);
			$attr_list['emd_event_attendee']['emd_attendee_first_name'] = Array(
				'label' => __('First Name', 'wp-easy-events') ,
				'display_type' => 'text',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 1,
				'mid' => 'emd_event_attendee_info_emd_event_attendee_0',
				'type' => 'char',
				'user_map' => 'user_firstname',
			);
			$attr_list['emd_event_attendee']['emd_attendee_last_name'] = Array(
				'label' => __('Last Name', 'wp-easy-events') ,
				'display_type' => 'text',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 1,
				'mid' => 'emd_event_attendee_info_emd_event_attendee_0',
				'type' => 'char',
				'user_map' => 'user_lastname',
			);
			$attr_list['emd_event_attendee']['emd_attendee_email'] = Array(
				'label' => __('Email', 'wp-easy-events') ,
				'display_type' => 'text',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 1,
				'mid' => 'emd_event_attendee_info_emd_event_attendee_0',
				'type' => 'char',
				'email' => true,
			);
			$attr_list['emd_event_attendee']['emd_attendee_full_name'] = Array(
				'label' => __('Full Name', 'wp-easy-events') ,
				'display_type' => 'hidden',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 0,
				'list_visible' => 0,
				'mid' => 'emd_event_attendee_info_emd_event_attendee_0',
				'type' => 'char',
				'hidden_func' => 'concat',
				'concat_string' => '!#ent_attendee_first_name# !#ent_attendee_last_name#',
			);
			$attr_list['emd_event_attendee']['emd_attendee_quantity'] = Array(
				'label' => __('Quantity', 'wp-easy-events') ,
				'display_type' => 'text',
				'required' => 1,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 1,
				'mid' => 'emd_event_attendee_info_emd_event_attendee_0',
				'type' => 'signed',
				'std' => '1',
				'min' => 1,
				'integer' => true,
			);
			$attr_list['emd_event_attendee']['emd_attendee_checkin'] = Array(
				'label' => __('Check-in', 'wp-easy-events') ,
				'display_type' => 'checkbox',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 1,
				'mid' => 'emd_event_attendee_info_emd_event_attendee_0',
				'type' => 'binary',
				'options' => array(
					1 => 1
				) ,
			);
			$attr_list['emd_event_attendee']['wpas_form_name'] = Array(
				'label' => __('Form Name', 'wp-easy-events') ,
				'display_type' => 'hidden',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 0,
				'mid' => 'emd_event_attendee_info_emd_event_attendee_0',
				'type' => 'char',
				'options' => array() ,
				'no_update' => 1,
				'std' => 'admin',
			);
			$attr_list['emd_event_attendee']['wpas_form_submitted_by'] = Array(
				'label' => __('Form Submitted By', 'wp-easy-events') ,
				'display_type' => 'hidden',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 0,
				'mid' => 'emd_event_attendee_info_emd_event_attendee_0',
				'type' => 'char',
				'options' => array() ,
				'hidden_func' => 'user_login',
				'no_update' => 1,
			);
			$attr_list['emd_event_attendee']['wpas_form_submitted_ip'] = Array(
				'label' => __('Form Submitted IP', 'wp-easy-events') ,
				'display_type' => 'hidden',
				'required' => 0,
				'srequired' => 0,
				'filterable' => 1,
				'list_visible' => 0,
				'mid' => 'emd_event_attendee_info_emd_event_attendee_0',
				'type' => 'char',
				'options' => array() ,
				'hidden_func' => 'user_ip',
				'no_update' => 1,
			);
			$attr_list = apply_filters('emd_ext_attr_list', $attr_list, $this->option_name);
			if (!empty($attr_list)) {
				update_option($this->option_name . '_attr_list', $attr_list);
			}
			$glob_list['glb_event_location'] = Array(
				'label' => __('Hide Event Map Icon', 'wp-easy-events') ,
				'type' => 'checkbox',
				'desc' => 'Hides map icon in event pages when checked.',
				'in_form' => 0,
				'values' => '',
				'dflt' => '',
				'required' => 0,
			);
			if (!empty($glob_list)) {
				update_option($this->option_name . '_glob_init_list', $glob_list);
				if (get_option($this->option_name . '_glob_list') === false) {
					update_option($this->option_name . '_glob_list', $glob_list);
				}
			}
			$glob_forms_list['event_attendee']['captcha'] = 'never-show';
			$glob_forms_list['event_attendee']['noaccess_msg'] = 'You are not allowed to access to this area. Please contact the site administrator.';
			$glob_forms_list['event_attendee']['error_msg'] = 'There has been an error when processing your registration. Please contact the site administrator.';
			$glob_forms_list['event_attendee']['success_msg'] = 'Thanks for your registration.';
			$glob_forms_list['event_attendee']['login_reg'] = 'none';
			$glob_forms_list['event_attendee']['csrf'] = 1;
			$glob_forms_list['event_attendee']['rel_event_attendee'] = Array(
				'show' => 1,
				'row' => 1,
				'req' => 0,
				'size' => 12,
			);
			$glob_forms_list['event_attendee']['emd_attendee_first_name'] = Array(
				'show' => 1,
				'row' => 2,
				'req' => 0,
				'size' => 12,
			);
			$glob_forms_list['event_attendee']['emd_attendee_last_name'] = Array(
				'show' => 1,
				'row' => 3,
				'req' => 0,
				'size' => 12,
			);
			$glob_forms_list['event_attendee']['emd_attendee_quantity'] = Array(
				'show' => 1,
				'row' => 4,
				'req' => 1,
				'size' => 4,
			);
			$glob_forms_list['event_attendee']['emd_attendee_email'] = Array(
				'show' => 1,
				'row' => 5,
				'req' => 0,
				'size' => 12,
			);
			$glob_forms_list['event_attendee']['emd_attendee_ticket_id'] = Array(
				'show' => 1,
				'row' => 6,
				'req' => 0,
				'size' => 12,
			);
			$glob_forms_list['event_attendee']['emd_attendee_full_name'] = Array(
				'show' => 1,
				'row' => 7,
				'req' => 0,
				'size' => 12,
			);
			if (!empty($glob_forms_list)) {
				update_option($this->option_name . '_glob_forms_init_list', $glob_forms_list);
				if (get_option($this->option_name . '_glob_forms_list') === false) {
					update_option($this->option_name . '_glob_forms_list', $glob_forms_list);
				}
			}
			$tax_list['emd_wpe_event']['emd_event_cat'] = Array(
				'archive_view' => 0,
				'label' => __('Categories', 'wp-easy-events') ,
				'single_label' => __('Category', 'wp-easy-events') ,
				'default' => '',
				'type' => 'single',
				'hier' => 0,
				'sortable' => 0,
				'list_visible' => 0,
				'required' => 0,
				'srequired' => 0,
				'rewrite' => 'emd_event_cat'
			);
			$tax_list['emd_wpe_event']['emd_event_tag'] = Array(
				'archive_view' => 0,
				'label' => __('Tags', 'wp-easy-events') ,
				'single_label' => __('Tag', 'wp-easy-events') ,
				'default' => '',
				'type' => 'multi',
				'hier' => 0,
				'sortable' => 0,
				'list_visible' => 0,
				'required' => 0,
				'srequired' => 0,
				'rewrite' => 'emd_event_tag'
			);
			$tax_list = apply_filters('emd_ext_tax_list', $tax_list, $this->option_name);
			if (!empty($tax_list)) {
				update_option($this->option_name . '_tax_list', $tax_list);
			}
			$rel_list['rel_event_organizer'] = Array(
				'from' => 'emd_wpe_event',
				'to' => 'emd_event_organizer',
				'type' => 'many-to-many',
				'from_title' => __('Organizers', 'wp-easy-events') ,
				'to_title' => __('Events', 'wp-easy-events') ,
				'required' => 0,
				'srequired' => 0,
				'show' => 'any',
				'filter' => ''
			);
			$rel_list['rel_event_venue'] = Array(
				'from' => 'emd_event_venues',
				'to' => 'emd_wpe_event',
				'type' => 'one-to-many',
				'from_title' => __('Events', 'wp-easy-events') ,
				'to_title' => __('Venues', 'wp-easy-events') ,
				'required' => 1,
				'srequired' => 0,
				'show' => 'any',
				'filter' => ''
			);
			$rel_list['rel_event_attendee'] = Array(
				'from' => 'emd_wpe_event',
				'to' => 'emd_event_attendee',
				'type' => 'one-to-many',
				'from_title' => __('Attendees', 'wp-easy-events') ,
				'to_title' => __('Events', 'wp-easy-events') ,
				'required' => 0,
				'srequired' => 0,
				'show' => 'to',
				'filter' => ''
			);
			if (!empty($rel_list)) {
				update_option($this->option_name . '_rel_list', $rel_list);
			}
			$emd_activated_plugins = get_option('emd_activated_plugins');
			if (!$emd_activated_plugins) {
				update_option('emd_activated_plugins', Array(
					'wp-easy-events'
				));
			} elseif (!in_array('wp-easy-events', $emd_activated_plugins)) {
				array_push($emd_activated_plugins, 'wp-easy-events');
				update_option('emd_activated_plugins', $emd_activated_plugins);
			}
			//conf parameters for incoming email
			//conf parameters for inline entity
			//conf parameters for calendar
			$has_calendar = Array(
				'event_calendar' => Array(
					'label' => 'Event Calendar',
					'lite' => 1,
					'entity' => 'emd_wpe_event',
					'start' => 'emd_event_startdate',
					'end' => 'emd_event_enddate',
					'title' => 'blt_title'
				)
			);
			update_option($this->option_name . '_has_calendar', $has_calendar);
			//conf parameters for woocommerce
			$has_woocommerce = Array(
				'woo_event_tickets' => Array(
					'label' => 'Woo Event Tickets',
					'entity' => 'emd_wpe_event',
					'txn' => '',
					'order_rel' => 1,
					'product_rel' => 1,
					'myaccount_before' => '',
					'myaccount_after' => '',
					'smanager_caps' => Array(
						'edit_emd_wpe_events',
						'delete_emd_wpe_events',
						'edit_others_emd_wpe_events',
						'publish_emd_wpe_events',
						'read_private_emd_wpe_events',
						'delete_private_emd_wpe_events',
						'delete_published_emd_wpe_events',
						'delete_others_emd_wpe_events',
						'edit_private_emd_wpe_events',
						'edit_published_emd_wpe_events',
						'edit_emd_event_attendees',
						'delete_emd_event_attendees',
						'edit_others_emd_event_attendees',
						'publish_emd_event_attendees',
						'read_private_emd_event_attendees',
						'delete_private_emd_event_attendees',
						'delete_published_emd_event_attendees',
						'delete_others_emd_event_attendees',
						'edit_private_emd_event_attendees',
						'edit_published_emd_event_attendees',
						'assign_emd_event_cat',
						'assign_emd_event_tag'
					) ,
					'customer_caps' => Array() ,
					'order_term' => '',
					'order_type' => 'many-to-many',
					'order_from' => 'Events',
					'order_to' => 'Woo Orders',
					'order_box' => 'from',
					'order_layout' => 'None',
					'order_header' => '',
					'order_footer' => '',
					'recent_orders_label' => '',
					'recent_orders_url' => '',
					'product_term' => '',
					'product_type' => 'one-to-one',
					'product_from' => 'Events',
					'product_to' => 'Woo Tickets',
					'product_box' => 'any',
					'product_layout' => '!#woo_product_add_to_cart#',
					'product_header' => '',
					'product_footer' => ''
				)
			);
			update_option($this->option_name . '_has_woocommerce', $has_woocommerce);
			//conf parameters for woocommerce
			$has_edd = Array(
				'edd_event_tickets' => Array(
					'label' => 'Edd Event Tickets',
					'entity' => 'emd_wpe_event',
					'txn' => '',
					'order_rel' => 1,
					'product_rel' => 1,
					'myaccount_before' => '',
					'myaccount_after' => '',
					'smanager_caps' => Array(
						'edit_emd_wpe_events',
						'delete_emd_wpe_events',
						'edit_others_emd_wpe_events',
						'publish_emd_wpe_events',
						'read_private_emd_wpe_events',
						'delete_private_emd_wpe_events',
						'delete_published_emd_wpe_events',
						'delete_others_emd_wpe_events',
						'edit_private_emd_wpe_events',
						'edit_published_emd_wpe_events',
						'edit_emd_event_attendees',
						'delete_emd_event_attendees',
						'edit_others_emd_event_attendees',
						'publish_emd_event_attendees',
						'read_private_emd_event_attendees',
						'delete_private_emd_event_attendees',
						'delete_published_emd_event_attendees',
						'delete_others_emd_event_attendees',
						'edit_private_emd_event_attendees',
						'edit_published_emd_event_attendees',
						'assign_emd_event_cat',
						'assign_emd_event_tag'
					) ,
					'sacc_caps' => Array() ,
					'svendor_caps' => Array() ,
					'sworker_caps' => Array(
						'edit_emd_wpe_events',
						'delete_emd_wpe_events',
						'edit_others_emd_wpe_events',
						'publish_emd_wpe_events',
						'read_private_emd_wpe_events',
						'delete_private_emd_wpe_events',
						'delete_published_emd_wpe_events',
						'delete_others_emd_wpe_events',
						'edit_private_emd_wpe_events',
						'edit_published_emd_wpe_events',
						'edit_emd_event_attendees',
						'delete_emd_event_attendees',
						'edit_others_emd_event_attendees',
						'publish_emd_event_attendees',
						'read_private_emd_event_attendees',
						'delete_private_emd_event_attendees',
						'delete_published_emd_event_attendees',
						'delete_others_emd_event_attendees',
						'edit_private_emd_event_attendees',
						'edit_published_emd_event_attendees',
						'assign_emd_event_cat',
						'assign_emd_event_tag'
					) ,
					'order_term' => '',
					'order_type' => 'many-to-many',
					'order_from' => 'Events',
					'order_to' => 'EDD Orders',
					'order_box' => 'from',
					'order_layout' => 'None',
					'order_header' => '',
					'order_footer' => '',
					'purchase_history_label' => '',
					'purchase_history_url' => '',
					'product_term' => '',
					'product_type' => 'one-to-one',
					'product_from' => 'Events',
					'product_to' => 'EDD Tickets',
					'product_box' => 'any',
					'product_layout' => '!#shortcode[purchase_link id="!#edd_download_id#" text="Purchase" style="button" color="blue"]#',
					'product_header' => '',
					'product_footer' => ''
				)
			);
			update_option($this->option_name . '_has_edd', $has_edd);
			//conf parameters for mailchimp
			$has_mailchimp = Array(
				'event_attendee' => Array(
					'entity' => 'emd_event_attendee',
					'tax' => Array()
				)
			);
			update_option($this->option_name . '_has_mailchimp', $has_mailchimp);
			//action to configure different extension conf parameters for this plugin
			do_action('emd_ext_set_conf', 'wp-easy-events');
		}
		/**
		 * Reset app specific options
		 *
		 * @since WPAS 4.0
		 *
		 */
		private function reset_options() {
			delete_option($this->option_name . '_shc_list');
			$emd_calendar_apps = get_option('emd_calendar_apps', Array());
			unset($emd_calendar_apps[$this->option_name]);
			update_option('emd_calendar_apps', $emd_calendar_apps);
			delete_option($this->option_name . '_has_calendar');
			delete_option($this->option_name . '_has_edd');
			delete_option($this->option_name . '_has_mailchimp');
			do_action('emd_ext_reset_conf', 'wp-easy-events');
		}
		/**
		 * Show admin notices
		 *
		 * @since WPAS 4.0
		 *
		 * @return html
		 */
		public function install_notice() {
			if (isset($_GET[$this->option_name . '_adm_notice1'])) {
				update_option($this->option_name . '_adm_notice1', true);
			}
			if (current_user_can('manage_options') && get_option($this->option_name . '_adm_notice1') != 1) {
?>
<div class="updated">
<?php
				printf('<p><a href="%1s" target="_blank"> %2$s </a>%3$s<a style="float:right;" href="%4$s"><span class="dashicons dashicons-dismiss" style="font-size:15px;"></span>%5$s</a></p>', 'https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/?pk_campaign=wp-easy-events&pk_source=plugin&pk_medium=link&pk_content=notice', __('New To WP Easy Events? Review the documentation!', 'wpas') , __('&#187;', 'wpas') , esc_url(add_query_arg($this->option_name . '_adm_notice1', true)) , __('Dismiss', 'wpas'));
?>
</div>
<?php
			}
			if (isset($_GET[$this->option_name . '_adm_notice2'])) {
				update_option($this->option_name . '_adm_notice2', true);
			}
			if (current_user_can('manage_options') && get_option($this->option_name . '_adm_notice2') != 1) {
?>
<div class="updated">
<?php
				printf('<p><a href="%1s" target="_blank"> %2$s </a>%3$s<a style="float:right;" href="%4$s"><span class="dashicons dashicons-dismiss" style="font-size:15px;"></span>%5$s</a></p>', 'https://emdplugins.com/plugins/wp-easy-events-wordpress-plugin?pk_campaign=empd-com&pk_source=plugin&pk_medium=link&pk_content=notice', __('Get all the features you need for successful events now!', 'wpas') , __('&#187;', 'wpas') , esc_url(add_query_arg($this->option_name . '_adm_notice2', true)) , __('Dismiss', 'wpas'));
?>
</div>
<?php
			}
			if (current_user_can('manage_options') && get_option($this->option_name . '_setup_pages') == 1) {
				echo "<div id=\"message\" class=\"updated\"><p><strong>" . __('Welcome to WP Easy Events', 'wp-easy-events') . "</strong></p>
           <p class=\"submit\"><a href=\"" . add_query_arg('setup_wp_easy_events_pages', 'true', admin_url('index.php')) . "\" class=\"button-primary\">" . __('Setup WP Easy Events Pages', 'wp-easy-events') . "</a> <a class=\"skip button-primary\" href=\"" . add_query_arg('skip_setup_wp_easy_events_pages', 'true', admin_url('index.php')) . "\">" . __('Skip setup', 'wp-easy-events') . "</a></p>
         </div>";
			}
		}
		/**
		 * Setup pages for components and redirect to dashboard
		 *
		 * @since WPAS 4.0
		 *
		 */
		public function setup_pages() {
			if (!is_admin()) {
				return;
			}
			if (!empty($_GET['setup_' . $this->option_name . '_pages'])) {
				$shc_list = get_option($this->option_name . '_shc_list');
				emd_create_install_pages($this->option_name, $shc_list);
				update_option($this->option_name . '_setup_pages', 2);
				wp_redirect(admin_url('admin.php?page=' . $this->option_name . '_settings&wp-easy-events-installed=true'));
				exit;
			}
			if (!empty($_GET['skip_setup_' . $this->option_name . '_pages'])) {
				update_option($this->option_name . '_setup_pages', 2);
				wp_redirect(admin_url('admin.php?page=' . $this->option_name . '_settings'));
				exit;
			}
		}
		public function tinymce_fix($init) {
			global $post;
			$ent_list = get_option($this->option_name . '_ent_list', Array());
			if (!empty($post) && in_array($post->post_type, array_keys($ent_list))) {
				$init['wpautop'] = false;
				$init['indent'] = true;
			}
			return $init;
		}
	}
endif;
return new Wp_Easy_Events_Install_Deactivate();