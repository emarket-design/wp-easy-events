<?php
/**
 * Calculate formulas
 * @package WP_EASY_EVENTS
 * @since WPAS 4.6
 */
if (!defined('ABSPATH')) exit;
add_action('wp_ajax_wp_easy_events_emd_calc_formula', 'wp_easy_events_emd_calc_formula');
add_action('wp_ajax_nopriv_wp_easy_events_emd_calc_formula', 'wp_easy_events_emd_calc_formula');
function wp_easy_events_emd_calc_formula() {
	require_once WP_EASY_EVENTS_PLUGIN_DIR . 'assets/ext/calculate/Calculate.php';
	$result = '';
	switch ($_GET['function']) {
		case 'EMD_VENUE_FULLADDRESS':
			$A17 = $_GET["params"][1];
			$A18 = $_GET["params"][2];
			$A19 = $_GET["params"][3];
			$A20 = $_GET["params"][4];
			$A21 = $_GET["params"][5];
			if (isset($A17) && isset($A18) && isset($A19) && isset($A21)) {
				$result = PHPExcel_Calculation_TextData::CONCATENATE($A17, ", ", PHPExcel_Calculation_Logical::STATEMENT_IF($A18, $A18, "") , " ", $A19, " ", PHPExcel_Calculation_Logical::STATEMENT_IF($A20, $A20, "") , " ", $A21);
			}
		break;
	}
	echo $result;
	die();
}