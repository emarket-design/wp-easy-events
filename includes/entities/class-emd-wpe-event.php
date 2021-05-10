<?php
/**
 * Entity Class
 *
 * @package WP_EASY_EVENTS
 * @since WPAS 4.0
 */
if (!defined('ABSPATH')) exit;
/**
 * Emd_Wpe_Event Class
 * @since WPAS 4.0
 */
class Emd_Wpe_Event extends Emd_Entity {
	protected $post_type = 'emd_wpe_event';
	protected $textdomain = 'wp-easy-events';
	protected $sing_label;
	protected $plural_label;
	protected $menu_entity;
	protected $id;
	/**
	 * Initialize entity class
	 *
	 * @since WPAS 4.0
	 *
	 */
	public function __construct() {
		add_action('init', array(
			$this,
			'set_filters'
		) , 1);
		add_action('admin_init', array(
			$this,
			'set_metabox'
		));
		add_filter('post_updated_messages', array(
			$this,
			'updated_messages'
		));
		add_action('admin_menu', array(
			$this,
			'add_menu_link'
		));
		add_action('admin_head-edit.php', array(
			$this,
			'add_opt_button'
		));
		$is_adv_filt_ext = apply_filters('emd_adv_filter_on', 0);
		if ($is_adv_filt_ext === 0) {
			add_action('manage_emd_wpe_event_posts_custom_column', array(
				$this,
				'custom_columns'
			) , 10, 2);
			add_filter('manage_emd_wpe_event_posts_columns', array(
				$this,
				'column_headers'
			));
		}
		add_action('admin_init', array(
			$this,
			'set_single_taxs'
		));
		add_filter('post_row_actions', array(
			$this,
			'duplicate_link'
		) , 10, 2);
		add_action('admin_action_emd_duplicate_entity', array(
			$this,
			'duplicate_entity'
		));
	}
	public function set_single_taxs() {
		global $pagenow;
		if ('post-new.php' === $pagenow || 'post.php' === $pagenow) {
			if ((isset($_REQUEST['post_type']) && $this->post_type === $_REQUEST['post_type']) || (isset($_REQUEST['post']) && get_post_type($_REQUEST['post']) === $this->post_type)) {
				$this->stax = new Emd_Single_Taxonomy('wp-easy-events');
			}
		}
	}
	public function change_title_disable_emd_temp($title, $id) {
		$post = get_post($id);
		if ($this->post_type == $post->post_type && (!empty($this->id) && $this->id == $id)) {
			return '';
		}
		return $title;
	}
	/**
	 * Get column header list in admin list pages
	 * @since WPAS 4.0
	 *
	 * @param array $columns
	 *
	 * @return array $columns
	 */
	public function column_headers($columns) {
		$ent_list = get_option(str_replace("-", "_", $this->textdomain) . '_ent_list');
		if (!empty($ent_list[$this->post_type]['featured_img'])) {
			$columns['featured_img'] = __('Featured Image', $this->textdomain);
		}
		foreach ($this->boxes as $mybox) {
			foreach ($mybox['fields'] as $fkey => $mybox_field) {
				if (!in_array($fkey, Array(
					'wpas_form_name',
					'wpas_form_submitted_by',
					'wpas_form_submitted_ip'
				)) && !in_array($mybox_field['type'], Array(
					'textarea',
					'wysiwyg'
				)) && $mybox_field['list_visible'] == 1) {
					$columns[$fkey] = $mybox_field['name'];
				}
			}
		}
		$taxonomies = get_object_taxonomies($this->post_type, 'objects');
		if (!empty($taxonomies)) {
			$tax_list = get_option(str_replace("-", "_", $this->textdomain) . '_tax_list');
			foreach ($taxonomies as $taxonomy) {
				if (!empty($tax_list[$this->post_type][$taxonomy->name]) && $tax_list[$this->post_type][$taxonomy->name]['list_visible'] == 1) {
					$columns[$taxonomy->name] = $taxonomy->label;
				}
			}
		}
		$rel_list = get_option(str_replace("-", "_", $this->textdomain) . '_rel_list');
		if (!empty($rel_list)) {
			foreach ($rel_list as $krel => $rel) {
				if ($rel['from'] == $this->post_type && in_array($rel['show'], Array(
					'any',
					'from'
				))) {
					$columns[$krel] = $rel['from_title'];
				} elseif ($rel['to'] == $this->post_type && in_array($rel['show'], Array(
					'any',
					'to'
				))) {
					$columns[$krel] = $rel['to_title'];
				}
			}
		}
		return $columns;
	}
	/**
	 * Get custom column values in admin list pages
	 * @since WPAS 4.0
	 *
	 * @param int $column_id
	 * @param int $post_id
	 *
	 * @return string $value
	 */
	public function custom_columns($column_id, $post_id) {
		if (taxonomy_exists($column_id) == true) {
			$terms = get_the_terms($post_id, $column_id);
			$ret = array();
			if (!empty($terms)) {
				foreach ($terms as $term) {
					$url = add_query_arg(array(
						'post_type' => $this->post_type,
						'term' => $term->slug,
						'taxonomy' => $column_id
					) , admin_url('edit.php'));
					$a_class = preg_replace('/^emd_/', '', $this->post_type);
					$ret[] = sprintf('<a href="%s"  class="' . $a_class . '-tax ' . $term->slug . '">%s</a>', $url, $term->name);
				}
			}
			echo implode(', ', $ret);
			return;
		}
		$rel_list = get_option(str_replace("-", "_", $this->textdomain) . '_rel_list');
		if (!empty($rel_list) && !empty($rel_list[$column_id])) {
			$rel_arr = $rel_list[$column_id];
			if ($rel_arr['from'] == $this->post_type) {
				$other_ptype = $rel_arr['to'];
			} elseif ($rel_arr['to'] == $this->post_type) {
				$other_ptype = $rel_arr['from'];
			}
			$column_id = str_replace('rel_', '', $column_id);
			if (function_exists('p2p_type') && p2p_type($column_id)) {
				$rel_args = apply_filters('emd_ext_p2p_add_query_vars', array(
					'posts_per_page' => - 1
				) , Array(
					$other_ptype
				));
				$connected = p2p_type($column_id)->get_connected($post_id, $rel_args);
				$ptype_obj = get_post_type_object($this->post_type);
				$edit_cap = $ptype_obj->cap->edit_posts;
				$ret = array();
				if (empty($connected->posts)) return '&ndash;';
				foreach ($connected->posts as $myrelpost) {
					$rel_title = get_the_title($myrelpost->ID);
					$rel_title = apply_filters('emd_ext_p2p_connect_title', $rel_title, $myrelpost, '');
					$url = get_permalink($myrelpost->ID);
					$url = apply_filters('emd_ext_connected_ptype_url', $url, $myrelpost, $edit_cap);
					$ret[] = sprintf('<a href="%s" title="%s" target="_blank">%s</a>', $url, $rel_title, $rel_title);
				}
				echo implode(', ', $ret);
				return;
			}
		}
		$value = get_post_meta($post_id, $column_id, true);
		$type = "";
		foreach ($this->boxes as $mybox) {
			foreach ($mybox['fields'] as $fkey => $mybox_field) {
				if ($fkey == $column_id) {
					$type = $mybox_field['type'];
					break;
				}
			}
		}
		if ($column_id == 'featured_img') {
			$type = 'featured_img';
		}
		switch ($type) {
			case 'featured_img':
				$thumb_url = wp_get_attachment_image_src(get_post_thumbnail_id($post_id) , 'thumbnail');
				if (!empty($thumb_url)) {
					$value = "<img style='max-width:100%;height:auto;' src='" . $thumb_url[0] . "' >";
				}
			break;
			case 'plupload_image':
			case 'image':
			case 'thickbox_image':
				$image_list = emd_mb_meta($column_id, 'type=image');
				$value = "";
				if (!empty($image_list)) {
					$myimage = current($image_list);
					$value = "<img style='max-width:100%;height:auto;' src='" . $myimage['url'] . "' >";
				}
			break;
			case 'user':
			case 'user-adv':
				$user_id = emd_mb_meta($column_id);
				if (!empty($user_id)) {
					$user_info = get_userdata($user_id);
					$value = $user_info->display_name;
				}
			break;
			case 'file':
				$file_list = emd_mb_meta($column_id, 'type=file');
				if (!empty($file_list)) {
					$value = "";
					foreach ($file_list as $myfile) {
						$fsrc = wp_mime_type_icon($myfile['ID']);
						$value.= "<a style='margin:5px;' href='" . $myfile['url'] . "' target='_blank'><img src='" . $fsrc . "' title='" . $myfile['name'] . "' width='20' /></a>";
					}
				}
			break;
			case 'radio':
			case 'checkbox_list':
			case 'select':
			case 'select_advanced':
				$value = emd_get_attr_val(str_replace("-", "_", $this->textdomain) , $post_id, $this->post_type, $column_id);
			break;
			case 'checkbox':
				if ($value == 1) {
					$value = '<span class="dashicons dashicons-yes"></span>';
				} elseif ($value == 0) {
					$value = '<span class="dashicons dashicons-no-alt"></span>';
				}
			break;
			case 'rating':
				$value = apply_filters('emd_get_rating_value', $value, Array(
					'meta' => $column_id
				) , $post_id);
			break;
		}
		if (is_array($value)) {
			$value = "<div class='clonelink'>" . implode("</div><div class='clonelink'>", $value) . "</div>";
		}
		echo $value;
	}
	/**
	 * Register post type and taxonomies and set initial values for taxs
	 *
	 * @since WPAS 4.0
	 *
	 */
	public static function register() {
		$labels = array(
			'name' => __('Events', 'wp-easy-events') ,
			'singular_name' => __('Event', 'wp-easy-events') ,
			'add_new' => __('Add New', 'wp-easy-events') ,
			'add_new_item' => __('Add New Event', 'wp-easy-events') ,
			'edit_item' => __('Edit Event', 'wp-easy-events') ,
			'new_item' => __('New Event', 'wp-easy-events') ,
			'all_items' => __('All Events', 'wp-easy-events') ,
			'view_item' => __('View Event', 'wp-easy-events') ,
			'search_items' => __('Search Events', 'wp-easy-events') ,
			'not_found' => __('No Events Found', 'wp-easy-events') ,
			'not_found_in_trash' => __('No Events Found In Trash', 'wp-easy-events') ,
			'menu_name' => __('Events', 'wp-easy-events') ,
		);
		$ent_map_list = get_option('wp_easy_events_ent_map_list', Array());
		$myrole = emd_get_curr_usr_role('wp_easy_events');
		if (!empty($ent_map_list['emd_wpe_event']['rewrite'])) {
			$rewrite = $ent_map_list['emd_wpe_event']['rewrite'];
		} else {
			$rewrite = 'events';
		}
		$supports = Array(
			'comments'
		);
		if (empty($ent_map_list['emd_wpe_event']['attrs']['blt_title']) || $ent_map_list['emd_wpe_event']['attrs']['blt_title'] != 'hide') {
			if (empty($ent_map_list['emd_wpe_event']['edit_attrs'])) {
				$supports[] = 'title';
			} elseif ($myrole == 'administrator') {
				$supports[] = 'title';
			} elseif ($myrole != 'administrator' && !empty($ent_map_list['emd_wpe_event']['edit_attrs'][$myrole]['blt_title']) && $ent_map_list['emd_wpe_event']['edit_attrs'][$myrole]['blt_title'] == 'edit') {
				$supports[] = 'title';
			}
		}
		if (empty($ent_map_list['emd_wpe_event']['attrs']['blt_content']) || $ent_map_list['emd_wpe_event']['attrs']['blt_content'] != 'hide') {
			if (empty($ent_map_list['emd_wpe_event']['edit_attrs'])) {
				$supports[] = 'editor';
			} elseif ($myrole == 'administrator') {
				$supports[] = 'editor';
			} elseif ($myrole != 'administrator' && !empty($ent_map_list['emd_wpe_event']['edit_attrs'][$myrole]['blt_content']) && $ent_map_list['emd_wpe_event']['edit_attrs'][$myrole]['blt_content'] == 'edit') {
				$supports[] = 'editor';
			}
		}
		if (empty($ent_map_list['emd_wpe_event']['attrs']['featured_img']) || $ent_map_list['emd_wpe_event']['attrs']['featured_img'] != 'hide') {
			if (empty($ent_map_list['emd_wpe_event']['edit_attrs'])) {
				$supports[] = 'thumbnail';
			} elseif ($myrole == 'administrator') {
				$supports[] = 'thumbnail';
			} elseif ($myrole != 'administrator' && !empty($ent_map_list['emd_wpe_event']['edit_attrs'][$myrole]['featured_img']) && $ent_map_list['emd_wpe_event']['edit_attrs'][$myrole]['featured_img'] == 'edit') {
				$supports[] = 'thumbnail';
			}
		}
		if (empty($ent_map_list['emd_wpe_event']['attrs']['blt_excerpt']) || $ent_map_list['emd_wpe_event']['attrs']['blt_excerpt'] != 'hide') {
			if (empty($ent_map_list['emd_wpe_event']['edit_attrs'])) {
				$supports[] = 'excerpt';
			} elseif ($myrole == 'administrator') {
				$supports[] = 'excerpt';
			} elseif ($myrole != 'administrator' && !empty($ent_map_list['emd_wpe_event']['edit_attrs'][$myrole]['blt_excerpt']) && $ent_map_list['emd_wpe_event']['edit_attrs'][$myrole]['blt_excerpt'] == 'edit') {
				$supports[] = 'excerpt';
			}
		}
		register_post_type('emd_wpe_event', array(
			'labels' => $labels,
			'public' => true,
			'publicly_queryable' => true,
			'show_ui' => true,
			'description' => __('Any planned public or social occasion.', 'wp-easy-events') ,
			'show_in_menu' => true,
			'menu_position' => 6,
			'has_archive' => true,
			'exclude_from_search' => false,
			'rewrite' => array(
				'slug' => $rewrite
			) ,
			'can_export' => true,
			'show_in_rest' => false,
			'hierarchical' => false,
			'menu_icon' => 'dashicons-calendar',
			'map_meta_cap' => 'true',
			'taxonomies' => array() ,
			'capability_type' => 'emd_wpe_event',
			'supports' => $supports,
		));
		$tax_settings = get_option('wp_easy_events_tax_settings', Array());
		$myrole = emd_get_curr_usr_role('wp_easy_events');
		$emd_event_tag_nohr_labels = array(
			'name' => __('Tags', 'wp-easy-events') ,
			'singular_name' => __('Tag', 'wp-easy-events') ,
			'search_items' => __('Search Tags', 'wp-easy-events') ,
			'popular_items' => __('Popular Tags', 'wp-easy-events') ,
			'all_items' => __('All', 'wp-easy-events') ,
			'parent_item' => null,
			'parent_item_colon' => null,
			'edit_item' => __('Edit Tag', 'wp-easy-events') ,
			'update_item' => __('Update Tag', 'wp-easy-events') ,
			'add_new_item' => __('Add New Tag', 'wp-easy-events') ,
			'new_item_name' => __('Add New Tag Name', 'wp-easy-events') ,
			'separate_items_with_commas' => __('Seperate Tags with commas', 'wp-easy-events') ,
			'add_or_remove_items' => __('Add or Remove Tags', 'wp-easy-events') ,
			'choose_from_most_used' => __('Choose from the most used Tags', 'wp-easy-events') ,
			'menu_name' => __('Tags', 'wp-easy-events') ,
		);
		if (empty($tax_settings['emd_event_tag']['hide']) || (!empty($tax_settings['emd_event_tag']['hide']) && $tax_settings['emd_event_tag']['hide'] != 'hide')) {
			if (!empty($tax_settings['emd_event_tag']['rewrite'])) {
				$rewrite = $tax_settings['emd_event_tag']['rewrite'];
			} else {
				$rewrite = 'emd_event_tag';
			}
			$targs = array(
				'hierarchical' => false,
				'labels' => $emd_event_tag_nohr_labels,
				'public' => true,
				'show_ui' => true,
				'show_in_nav_menus' => true,
				'show_in_menu' => true,
				'show_tagcloud' => true,
				'update_count_callback' => '_update_post_term_count',
				'query_var' => true,
				'rewrite' => array(
					'slug' => $rewrite,
				) ,
				'show_in_rest' => false,
				'capabilities' => array(
					'manage_terms' => 'manage_emd_event_tag',
					'edit_terms' => 'edit_emd_event_tag',
					'delete_terms' => 'delete_emd_event_tag',
					'assign_terms' => 'assign_emd_event_tag'
				) ,
			);
			if ($myrole != 'administrator' && !empty($tax_settings['emd_event_tag']['edit'][$myrole]) && $tax_settings['emd_event_tag']['edit'][$myrole] != 'edit') {
				$targs['meta_box_cb'] = false;
			}
			register_taxonomy('emd_event_tag', array(
				'emd_wpe_event'
			) , $targs);
		}
		$emd_event_cat_nohr_labels = array(
			'name' => __('Categories', 'wp-easy-events') ,
			'singular_name' => __('Category', 'wp-easy-events') ,
			'search_items' => __('Search Categories', 'wp-easy-events') ,
			'popular_items' => __('Popular Categories', 'wp-easy-events') ,
			'all_items' => __('All', 'wp-easy-events') ,
			'parent_item' => null,
			'parent_item_colon' => null,
			'edit_item' => __('Edit Category', 'wp-easy-events') ,
			'update_item' => __('Update Category', 'wp-easy-events') ,
			'add_new_item' => __('Add New Category', 'wp-easy-events') ,
			'new_item_name' => __('Add New Category Name', 'wp-easy-events') ,
			'separate_items_with_commas' => __('Seperate Categories with commas', 'wp-easy-events') ,
			'add_or_remove_items' => __('Add or Remove Categories', 'wp-easy-events') ,
			'choose_from_most_used' => __('Choose from the most used Categories', 'wp-easy-events') ,
			'menu_name' => __('Categories', 'wp-easy-events') ,
		);
		if (empty($tax_settings['emd_event_cat']['hide']) || (!empty($tax_settings['emd_event_cat']['hide']) && $tax_settings['emd_event_cat']['hide'] != 'hide')) {
			if (!empty($tax_settings['emd_event_cat']['rewrite'])) {
				$rewrite = $tax_settings['emd_event_cat']['rewrite'];
			} else {
				$rewrite = 'emd_event_cat';
			}
			$targs = array(
				'hierarchical' => false,
				'labels' => $emd_event_cat_nohr_labels,
				'public' => true,
				'show_ui' => true,
				'show_in_nav_menus' => true,
				'show_in_menu' => true,
				'show_tagcloud' => true,
				'update_count_callback' => '_update_post_term_count',
				'query_var' => true,
				'rewrite' => array(
					'slug' => $rewrite,
				) ,
				'show_in_rest' => false,
				'capabilities' => array(
					'manage_terms' => 'manage_emd_event_cat',
					'edit_terms' => 'edit_emd_event_cat',
					'delete_terms' => 'delete_emd_event_cat',
					'assign_terms' => 'assign_emd_event_cat'
				) ,
			);
			if ($myrole != 'administrator' && !empty($tax_settings['emd_event_cat']['edit'][$myrole]) && $tax_settings['emd_event_cat']['edit'][$myrole] != 'edit') {
				$targs['meta_box_cb'] = false;
			}
			register_taxonomy('emd_event_cat', array(
				'emd_wpe_event'
			) , $targs);
		}
	}
	/**
	 * Set metabox fields,labels,filters, comments, relationships if exists
	 *
	 * @since WPAS 4.0
	 *
	 */
	public function set_filters() {
		do_action('emd_ext_class_init', $this);
		$search_args = Array();
		$filter_args = Array();
		$this->sing_label = __('Event', 'wp-easy-events');
		$this->plural_label = __('Events', 'wp-easy-events');
		$this->menu_entity = 'emd_wpe_event';
		$this->boxes['emd_wpe_event_info_emd_wpe_event_0'] = array(
			'id' => 'emd_wpe_event_info_emd_wpe_event_0',
			'title' => __('Event Info', 'wp-easy-events') ,
			'app_name' => 'wp_easy_events',
			'pages' => array(
				'emd_wpe_event'
			) ,
			'context' => 'normal',
		);
		$this->boxes['emd_cust_field_meta_box'] = array(
			'id' => 'emd_cust_field_meta_box',
			'title' => __('Custom Fields', 'wp-easy-events') ,
			'app_name' => 'wp_easy_events',
			'pages' => array(
				'emd_wpe_event'
			) ,
			'context' => 'normal',
			'priority' => 'low'
		);
		list($search_args, $filter_args) = $this->set_args_boxes();
		if (empty($this->boxes['emd_cust_field_meta_box']['fields'])) {
			unset($this->boxes['emd_cust_field_meta_box']);
		}
		if (!post_type_exists($this->post_type) || in_array($this->post_type, Array(
			'post',
			'page'
		))) {
			self::register();
		}
		do_action('emd_set_adv_filtering', $this->post_type, $search_args, $this->boxes, $filter_args, $this->textdomain, $this->plural_label);
		add_action('admin_notices', array(
			$this,
			'show_lite_filters'
		));
		$ent_map_list = get_option(str_replace('-', '_', $this->textdomain) . '_ent_map_list');
		if (!function_exists('p2p_register_connection_type')) {
			return;
		}
		$rel_list = get_option(str_replace('-', '_', $this->textdomain) . '_rel_list');
		$myrole = emd_get_curr_usr_role('wp_easy_events');
		if (empty($ent_map_list['emd_wpe_event']['hide_rels']['rel_event_attendee']) || $ent_map_list['emd_wpe_event']['hide_rels']['rel_event_attendee'] != 'hide') {
			if ($myrole != 'administrator' && !empty($ent_map_list['emd_wpe_event']['edit_rels'][$myrole]['rel_event_attendee']) && $ent_map_list['emd_wpe_event']['edit_rels'][$myrole]['rel_event_attendee'] != 'edit') {
				$admin_box = 'none';
			} else {
				$admin_box = 'to';
			}
			$rel_fields = Array();
			p2p_register_connection_type(array(
				'name' => 'event_attendee',
				'from' => 'emd_wpe_event',
				'to' => 'emd_event_attendee',
				'sortable' => 'any',
				'reciprocal' => false,
				'cardinality' => 'one-to-many',
				'title' => array(
					'from' => __('Attendees', 'wp-easy-events') ,
					'to' => __('Events', 'wp-easy-events')
				) ,
				'from_labels' => array(
					'singular_name' => __('Event', 'wp-easy-events') ,
					'search_items' => __('Search Events', 'wp-easy-events') ,
					'not_found' => __('No Events found.', 'wp-easy-events') ,
				) ,
				'to_labels' => array(
					'singular_name' => __('Attendee', 'wp-easy-events') ,
					'search_items' => __('Search Attendees', 'wp-easy-events') ,
					'not_found' => __('No Attendees found.', 'wp-easy-events') ,
				) ,
				'fields' => $rel_fields,
				'admin_box' => $admin_box,
			));
		}
		$myrole = emd_get_curr_usr_role('wp_easy_events');
		if (empty($ent_map_list['emd_wpe_event']['hide_rels']['rel_event_organizer']) || $ent_map_list['emd_wpe_event']['hide_rels']['rel_event_organizer'] != 'hide') {
			if ($myrole != 'administrator' && !empty($ent_map_list['emd_wpe_event']['edit_rels'][$myrole]['rel_event_organizer']) && $ent_map_list['emd_wpe_event']['edit_rels'][$myrole]['rel_event_organizer'] != 'edit') {
				$admin_box = 'none';
			} else {
				$admin_box = array(
					'show' => 'any',
					'context' => 'advanced'
				);
			}
			$rel_fields = Array();
			p2p_register_connection_type(array(
				'name' => 'event_organizer',
				'from' => 'emd_wpe_event',
				'to' => 'emd_event_organizer',
				'sortable' => 'any',
				'reciprocal' => false,
				'cardinality' => 'many-to-many',
				'title' => array(
					'from' => __('Organizers', 'wp-easy-events') ,
					'to' => __('Events', 'wp-easy-events')
				) ,
				'from_labels' => array(
					'singular_name' => __('Event', 'wp-easy-events') ,
					'search_items' => __('Search Events', 'wp-easy-events') ,
					'not_found' => __('No Events found.', 'wp-easy-events') ,
				) ,
				'to_labels' => array(
					'singular_name' => __('Organizer', 'wp-easy-events') ,
					'search_items' => __('Search Organizers', 'wp-easy-events') ,
					'not_found' => __('No Organizers found.', 'wp-easy-events') ,
				) ,
				'fields' => $rel_fields,
				'admin_box' => $admin_box,
			));
		}
	}
	/**
	 * Initialize metaboxes
	 * @since WPAS 4.5
	 *
	 */
	public function set_metabox() {
		if (class_exists('EMD_Meta_Box') && is_array($this->boxes)) {
			foreach ($this->boxes as $meta_box) {
				new EMD_Meta_Box($meta_box);
			}
		}
	}
	/**
	 * Change content for created frontend views
	 * @since WPAS 4.0
	 * @param string $content
	 *
	 * @return string $content
	 */
	public function change_content($content) {
		global $post;
		$layout = "";
		$this->id = $post->ID;
		$tools = get_option('wp_easy_events_tools');
		if (!empty($tools['disable_emd_templates'])) {
			add_filter('the_title', array(
				$this,
				'change_title_disable_emd_temp'
			) , 10, 2);
		}
		if (get_post_type() == $this->post_type && is_single()) {
			ob_start();
			do_action('emd_single_before_content', $this->textdomain, $this->post_type);
			emd_get_template_part($this->textdomain, 'single', 'emd-wpe-event');
			do_action('emd_single_after_content', $this->textdomain, $this->post_type);
			$layout = ob_get_clean();
		}
		if ($layout != "") {
			$content = $layout;
		}
		if (!empty($tools['disable_emd_templates'])) {
			remove_filter('the_title', array(
				$this,
				'change_title_disable_emd_temp'
			) , 10, 2);
		}
		return $content;
	}
	/**
	 * Add operations and add new submenu hook
	 * @since WPAS 4.4
	 */
	public function add_menu_link() {
		add_submenu_page(null, __('CSV Import/Export', 'wp-easy-events') , __('CSV Import/Export', 'wp-easy-events') , 'manage_operations_emd_wpe_events', 'operations_emd_wpe_event', array(
			$this,
			'get_operations'
		));
	}
	/**
	 * Display operations page
	 * @since WPAS 4.0
	 */
	public function get_operations() {
		if (current_user_can('manage_operations_emd_wpe_events')) {
			$myapp = str_replace("-", "_", $this->textdomain);
			if (!function_exists('emd_operations_entity')) {
				emd_lite_get_operations('opr', $this->plural_label, $this->textdomain);
			} else {
				do_action('emd_operations_entity', $this->post_type, $this->plural_label, $this->sing_label, $myapp, $this->menu_entity);
			}
		}
	}
	public function show_lite_filters() {
		if (class_exists('EMD_AFC')) {
			return;
		}
		global $pagenow;
		if (get_post_type() == $this->post_type && $pagenow == 'edit.php') {
			emd_lite_get_filters($this->textdomain);
		}
	}
}
new Emd_Wpe_Event;