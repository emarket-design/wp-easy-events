<?php
/**
 * Plugin Functions
 * @package     EMD
 * @since       5.3
 */
if (!defined('ABSPATH')) exit;
add_action('wp_easy_events_upgrade', 'wp_easy_events_upgrade_ver_3_5');
function wp_easy_events_upgrade_ver_3_5($new_version) {
	$curr_version = get_option('wp_easy_events_version', '3.4.0');
	if ($new_version >= '3.5.0' && $curr_version <= '3.4.0') {
		global $wpdb;
		if (current_user_can('manage_options')) {
			if (class_exists('Wp_Easy_Events_EDD') && class_exists('Easy_Digital_Downloads')) {
				$sql = "SELECT p2p_id FROM $wpdb->p2p WHERE p2p_type='emd_wpe_event_edd_product'";
				$has_edd_pr = $wpdb->get_col($sql);
				if (!empty($has_edd_pr)) {
					$update = "UPDATE $wpdb->p2p SET p2p_type='edd_event_tickets_edd_product' WHERE p2p_type='emd_wpe_event_edd_product'";
					$wpdb->query($update);
				}
				$sql = "SELECT p2p_id FROM $wpdb->p2p WHERE p2p_type='emd_wpe_event_edd_order'";
				$has_edd_or = $wpdb->get_col($sql);
				if (!empty($has_edd_or)) {
					$update = "UPDATE $wpdb->p2p SET p2p_type='edd_event_tickets_edd_order' WHERE p2p_type='emd_wpe_event_edd_order'";
					$wpdb->query($update);
				}
			}
			if (class_exists('Wp_Easy_Events_WooCommerce') && class_exists('WooCommerce')) {
				$sql = "SELECT p2p_id FROM $wpdb->p2p WHERE p2p_type='emd_wpe_event_woo_product'";
				$has_woo_pr = $wpdb->get_col($sql);
				if (!empty($has_woo_pr)) {
					$update = "UPDATE $wpdb->p2p SET p2p_type='woo_event_tickets_woo_product' WHERE p2p_type='emd_wpe_event_woo_product'";
					$wpdb->query($update);
				}
				$sql = "SELECT p2p_id FROM $wpdb->p2p WHERE p2p_type='emd_wpe_event_woo_order'";
				$has_woo_or = $wpdb->get_col($sql);
				if (!empty($has_woo_or)) {
					$update = "UPDATE $wpdb->p2p SET p2p_type='woo_event_tickets_woo_order' WHERE p2p_type='emd_wpe_event_woo_order'";
					$wpdb->query($update);
				}
			}
		}
	}
}
//call edd completed action
add_action('edd_complete_purchase', 'wp_easy_events_edd_order_completed');
function wp_easy_events_edd_order_completed($payment_id) {
	if (class_exists('Wp_Easy_Events_EDD') && class_exists('Easy_Digital_Downloads')) {
		//1- check all the products in this order
		$payment = new EDD_Payment($payment_id);
		$myorder = Array();
		if (sizeof($payment->downloads) > 0) {
			foreach ($payment->downloads as $item) {
				if (!empty($myorder[$item['id']])) {
					$myorder[$item['id']]+= $item['quantity'];
				} else {
					$myorder[$item['id']] = $item['quantity'];
				}
			}
			if (!empty($myorder)) {
				foreach ($myorder as $pr_id => $qty) {
					//2- see if product is related to an event
					$connected = p2p_type('edd_event_tickets_edd_product')->get_connected($pr_id);
					if (!empty($connected->posts)) {
						$event_id = $connected->posts[0]->ID;
						//3- create relationship with event and order
						$p2p_id = p2p_type('edd_event_tickets_edd_order')->get_p2p_id($payment_id, $event_id);
						if (empty($p2p_id)) {
							p2p_type('edd_event_tickets_edd_order')->connect($payment_id, $event_id, array(
								'date' => current_time('mysql')
							));
							//4- check order customer info and add attendee entity
							$cust = wp_easy_events_get_edd_cust_info($payment);
							wp_easy_events_insert_event_attendee($cust, $qty, $event_id);
						}
					}
				}
			}
		}
	}
}
function wp_easy_events_get_edd_cust_info($payment) {
	$cust_info['fname'] = $payment->first_name;
	$cust_info['lname'] = $payment->last_name;
	$cust_info['full_name'] = $cust_info['fname'];
	if (!empty($cust_info['lname'])) {
		$cust_info['full_name'].= " " . $cust_info['lname'];
	}
	$cust_info['email'] = $payment->email;
	return $cust_info;
}
//call woo completed action
add_action('woocommerce_order_status_completed', 'wp_easy_events_woo_order_completed');
function wp_easy_events_woo_order_completed($order_id) {
	if (class_exists('Wp_Easy_Events_WooCommerce') && class_exists('WooCommerce')) {
		//1- check all the products in this order
		$order = wc_get_order($order_id);
		$myorder = Array();
		if (sizeof($order->get_items()) > 0) {
			foreach ($order->get_items() as $item) {
				if (!empty($myorder[$item['product_id']])) {
					$myorder[$item['product_id']]+= $item['qty'];
				} else {
					$myorder[$item['product_id']] = $item['qty'];
				}
			}
			if (!empty($myorder)) {
				foreach ($myorder as $pr_id => $qty) {
					//2- see if product is related to an event
					$connected = p2p_type('woo_event_tickets_woo_product')->get_connected($pr_id);
					if (!empty($connected->posts)) {
						$event_id = $connected->posts[0]->ID;
						//3- create relationship with event and order
						$p2p_id = p2p_type('woo_event_tickets_woo_order')->get_p2p_id($order_id, $event_id);
						if (empty($p2p_id)) {
							p2p_type('woo_event_tickets_woo_order')->connect($order_id, $event_id, array(
								'date' => current_time('mysql')
							));
							$cust = wp_easy_events_get_woo_cust_info($order);
							//4- check order customer info and add attendee entity
							wp_easy_events_insert_event_attendee($cust, $qty, $event_id);
						}
					}
				}
			}
		}
	}
}
function wp_easy_events_get_woo_cust_info($order) {
	$cust_info['lname'] = '';
	if ($order->get_user_id()) {
		$user_info = get_userdata($order->get_user_id());
	}
	if (!empty($user_info)) {
		$cust_info['fname'] = $user_info->first_name;
		$cust_info['lname'] = $user_info->last_name;
	} else {
		if ($order->billing_first_name || $order->billing_last_name) {
			$cust_info['fname'] = $order->billing_first_name;
			$cust_info['lname'] = $order->billing_last_name;
		} else if ($order->billing_company) {
			$cust_info['fname'] = trim($order->billing_company);
		} else {
			$cust_info['fname'] = __('Guest', 'wp-easy-events');
		}
	}
	$cust_info['full_name'] = $cust_info['fname'];
	if (!empty($cust_info['lname'])) {
		$cust_info['full_name'].= " " . $cust_info['lname'];
	}
	$cust_info['email'] = $order->billing_email;
	return $cust_info;
}
//used by both woo & edd
function wp_easy_events_insert_event_attendee($cust, $qty, $event_id) {
	$mypost = Array(
		'post_type' => 'emd_event_attendee',
		'post_author' => 1,
		'post_status' => 'publish',
	);
	if ($id = wp_insert_post($mypost)) {
		$uniq_id = uniqid($id, false);
		wp_update_post(Array(
			'ID' => $id,
			'post_title' => $uniq_id,
			'post_name' => $uniq_id
		));
		//add attributes
		add_post_meta($id, 'emd_attendee_ticket_id', $uniq_id);
		add_post_meta($id, 'emd_attendee_first_name', $cust['fname']);
		add_post_meta($id, 'emd_attendee_last_name', $cust['lname']);
		add_post_meta($id, 'emd_attendee_full_name', $cust['full_name']);
		add_post_meta($id, 'emd_attendee_email', $cust['email']);
		add_post_meta($id, 'emd_attendee_quantity', $qty);
		p2p_type('event_attendee')->connect($id, $event_id, array(
			'date' => current_time('mysql')
		));
		do_action('emd_notify', 'wp_easy_events', $id, 'rel', 'front_add', Array(
			'event_attendee' => $event_id
		));
	}
}
?>