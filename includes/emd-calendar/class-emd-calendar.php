<?php
/**
 * Calendar Class
 *
 * @package     
 * @copyright   Copyright (c) 2014,  Emarket Design
*  @since       WPAS 4.7
 */
if (!defined('ABSPATH')) exit;
/**
 * Emd_Calendar Class
 *
 * @since 1.0
 */
class Emd_Calendar {
	var $app = "";
	var $textdomain = 'emd-plugins';
	/**
	 * Instantiate calendar class 
	 * Add action to display settings
	 * @since 1.0
	 *
	 * @param string $app
	 *
	 */
	public function __construct($app) {
		add_action('emd_display_settings_calendar', array(
					$this,
					'display_settings'
					));
		$this->app = $app;
	}
	/**
	 * Display calendar page
	 * @since 1.0
	 *
	 * @param string $app
	 *
	 * @return html
	 */
	public function display_settings($app) {
		if($app != $this->app){
			return;
		}
		global $title;

		$calendar_conf = get_option($this->app . '_calendar_conf');
		$settings_errors = get_settings_errors($this->app . '_calendar_conf');
		?>
			<div class="wrap">
			<h2><?php echo $title;?></h2>
			<?php if ( isset( $_GET['settings-updated'] )  && empty($settings_errors)){ ?>
				<div class='updated'>
					<p><?php _e( 'Your settings have been saved.', $this->textdomain); ?></p>
					</div>
					<?php }else {
					settings_errors($this->app . '_calendar_conf');
				} ?>

			<form id="calendar_conf" method="post" action="options.php">
			<input type='hidden' id='<?php esc_attr_e($this->app) ?>_calendar_conf_app_name' name='<?php esc_attr_e($this->app) ?>_calendar_conf[app_name]' value='<?php echo $this->app; ?>'>
			<?php 
			settings_fields($this->app . '_calendar_conf');  
		$calendar_conf = get_option($this->app . '_calendar_conf');

		$this->display_calendars($calendar_conf);
		?>
			</div><!-- .wrap -->
			<?php
	}
	/**
	 * Display calendars in accordion which has calendar conf
	 * @since 1.0
	 *
	 * @param array $calendar_conf
	 *
	 * @return html 
	 */
	private function display_calendars($calendar_conf){
		$has_calendar = get_option($this->app .'_has_calendar'); ?>
		<div id="tab-entity" class="tab-content">	
		<p><?php _e('Define calendar options by clicking on each entity name.',$this->textdomain); ?></p>	
		<?php		
		if (!empty($has_calendar)) { ?>
			<div id="calendar-entity-list" class="accordion-container">
				<ul class="outer-border" style="margin-top:20px;">
				<?php foreach ($has_calendar as $key_cal => $val_cal) {
					echo '<li id="' . esc_attr($key_cal) . '" class="control-section accordion-section">
						<h3 class="accordion-section-title hndle" tabindex="0">' . $val_cal['label'] . '</h3>';
					echo '<div class="accordion-section-content"><div class="inside">';
					$this->conn_conf($calendar_conf,$key_cal,$val_cal);
					echo '</table>';
					echo '</div></div></li>';
				}
			echo '</ul>';
			submit_button();
			echo '</div>';
		}
		echo '</div></form>';
	}
	/**
	 * Display settings for each calendar connection
	 * @since 1.0
	 *
	 * @param array $calendar_conf
	 * @param string $key_cal
	 * @param array $val_cal
	 *
	 * @return html 
	 */
	private function conn_conf($calendar_conf,$key_cal,$val_cal){
		if(empty($calendar_conf[$key_cal]['entity'])){
			$entity = $val_cal['entity'];
		}
		else {
			$entity = $calendar_conf[$key_cal]['entity'];
		}
		?>
			<input type='hidden' id='<?php esc_attr_e($this->app) ?>_calendar_conf_<?php echo $key_cal;?>_entity' name='<?php esc_attr_e($this->app) ?>_calendar_conf[<?php echo $key_cal; ?>][entity]' value='<?php echo $val_cal['entity']; ?>'>
			<table class="form-table">
			<tbody>
			<tr>
			<th scope="row">
			<label for="views">
			<?php _e('Views', $this->textdomain); ?>
			</label>
			</th>
			<td>
			<input id='<?php esc_attr_e($this->app) ?>_calendar_conf_<?php echo $key_cal;?>_views' name='<?php esc_attr_e($this->app) ?>_calendar_conf[<?php echo $key_cal; ?>][views][]' type='checkbox' value="month" <?php echo (isset($calendar_conf[$key_cal]['views']) && in_array('month',$calendar_conf[$key_cal]['views'])) ? " checked" : "" ?>></input> <?php _e('Month',$this->textdomain); ?><br>
			
			<input id='<?php esc_attr_e($this->app) ?>_calendar_conf_<?php echo $key_cal;?>_views' name='<?php esc_attr_e($this->app) ?>_calendar_conf[<?php echo $key_cal; ?>][views][]' type='checkbox' value="basicWeek" <?php echo (isset($calendar_conf[$key_cal]['views']) && in_array('basicWeek',$calendar_conf[$key_cal]['views'])) ? " checked" : "" ?>></input> <?php _e('Basic Week',$this->textdomain); ?><br>
			<input id='<?php esc_attr_e($this->app) ?>_calendar_conf_<?php echo $key_cal;?>_views' name='<?php esc_attr_e($this->app) ?>_calendar_conf[<?php echo $key_cal; ?>][views][]' type='checkbox' value="basicDay" <?php echo (isset($calendar_conf[$key_cal]['views']) && in_array('basicDay',$calendar_conf[$key_cal]['views'])) ? " checked" : "" ?>></input> <?php _e('Basic Day',$this->textdomain); ?><br>
			<input id='<?php esc_attr_e($this->app) ?>_calendar_conf_<?php echo $key_cal;?>_views' name='<?php esc_attr_e($this->app) ?>_calendar_conf[<?php echo $key_cal; ?>][views][]' type='checkbox' value="agendaWeek" <?php echo (isset($calendar_conf[$key_cal]['views']) && in_array('agendaWeek',$calendar_conf[$key_cal]['views'])) ? " checked" : "" ?>></input> <?php _e('Agenda Week',$this->textdomain); ?><br>
			<input id='<?php esc_attr_e($this->app) ?>_calendar_conf_<?php echo $key_cal;?>_views' name='<?php esc_attr_e($this->app) ?>_calendar_conf[<?php echo $key_cal; ?>][views][]' type='checkbox' value="agendaDay" <?php echo (isset($calendar_conf[$key_cal]['views']) && in_array('agendaDay',$calendar_conf[$key_cal]['views'])) ? " checked" : "" ?>></input> <?php _e('Agenda Day',$this->textdomain); ?><br>
			<p class="description"><?php _e( 'Views are ways of displaying days and events.',$this->textdomain ); ?></p>
			</td>
			</tr>
			<tr>
			<th scope="row">
			<label for="default_view">
			<?php _e('Default View', $this->textdomain); ?>
			</label>
			</th>
			<td>
			<select id='<?php esc_attr_e($this->app) ?>_calendar_conf_<?php echo $key_cal;?>default_view' name='<?php esc_attr_e($this->app) ?>_calendar_conf[<?php echo $key_cal; ?>][default_view]'>
			<option value="month" <?php echo (isset($calendar_conf[$key_cal]['default_view']) && $calendar_conf[$key_cal]['default_view'] == 'month') ? "selected='selected' " : "" ?>><?php _e('Month',$this->textdomain); ?></option>
			<option value="basicWeek" <?php echo (isset($calendar_conf[$key_cal]['default_view']) && $calendar_conf[$key_cal]['default_view'] == 'basicWeek') ? "selected='selected' " : "" ?>><?php _e('Basic Week',$this->textdomain); ?></option>
			<option value="basicDay" <?php echo (isset($calendar_conf[$key_cal]['default_view']) && $calendar_conf[$key_cal]['default_view'] == 'basicDay') ? "selected='selected' " : "" ?>><?php _e('Basic Day',$this->textdomain); ?></option>
			<option value="agendaWeek" <?php echo (isset($calendar_conf[$key_cal]['default_view']) && $calendar_conf[$key_cal]['default_view'] == 'agendaWeek') ? "selected='selected' " : "" ?>><?php _e('Agenda Week',$this->textdomain); ?></option>
			<option value="agendaDay" <?php echo (isset($calendar_conf[$key_cal]['default_view']) && $calendar_conf[$key_cal]['default_view'] == 'agendaDay') ? "selected='selected' " : "" ?>><?php _e('Agenda Day',$this->textdomain); ?></option>
			</select>
			</td>
			</tr>
			<?php 
			$header_options = Array('title' => __('Title',$this->textdomain),
						'prev' => __('Previous',$this->textdomain),
						'next' => __('Next',$this->textdomain),
						'prevYear' => __('Previous Year',$this->textdomain),
						'nextYear' => __('Next Year',$this->textdomain),
						'today' => __('Today',$this->textdomain),
						'views' => __('Views',$this->textdomain)
					);
			?>
			<tr>
			<th scope="row">
			<label for="jui_theme">
			<?php _e('jQuery UI Theme', $this->textdomain); ?>
			</label>
			</th>
			<td>
			<select id='<?php esc_attr_e($this->app) ?>_calendar_conf_<?php echo $key_cal;?>jui_theme' name='<?php esc_attr_e($this->app) ?>_calendar_conf[<?php echo $key_cal; ?>][jui_theme]'>
			<?php
			if(isset($calendar_conf[$key_cal]['jui_theme']) && $calendar_conf[$key_cal]['jui_theme'] == 'none'){
				$calendar_conf[$key_cal]['jui_theme'] = 'smoothness';
			}
			$themes= Array('smoothness' => __("Smoothness",$this->textdomain),
					'ui-lightness' => __("UI lightness",$this->textdomain),
					'ui-darkness' => __("UI darkness",$this->textdomain),
					'start' => __("Start",$this->textdomain),
					'redmond' => __("Redmond",$this->textdomain),
					'sunny' => __("Sunny",$this->textdomain),
					'overcast' => __("Overcast",$this->textdomain),
					'le-frog' => __("Le Frog",$this->textdomain),
					'flick' => __("Flick",$this->textdomain),
					'pepper-grinder' => __("Pepper Grinder",$this->textdomain),
					'eggplant' => __("Eggplant",$this->textdomain),
					'dark-hive' => __("Dark Hive",$this->textdomain),
					'cupertino' => __("Cupertino",$this->textdomain),
					'south-street' => __("South Street",$this->textdomain),
					'blitzer' => __("Blitzer",$this->textdomain),
					'humanity' => __("Humanity",$this->textdomain),
					'hot-sneaks' => __("Hot Sneaks",$this->textdomain),
					'excite-bike' => __("Excite Bike",$this->textdomain),
					'vader' => __("Vader",$this->textdomain),
					'dot-luv' => __("Dot Luv",$this->textdomain),
					'mint-choc' => __("Mint Choc",$this->textdomain),
					'black-tie' => __("Black Tie",$this->textdomain),
					'trontastic' => __("Trontastic",$this->textdomain),
					'swanky-purse' => __("Swanky Purse",$this->textdomain)
				);
			foreach($themes as $ktheme => $vtheme){
				echo '<option value="' .  $ktheme . '" ';
				if(isset($calendar_conf[$key_cal]['jui_theme']) && $calendar_conf[$key_cal]['jui_theme'] == $ktheme){
					echo  "selected='selected' ";
				}
				echo '>' . $vtheme . '</option>';
			}
			?>
			</select>
			<p class="description"><?php _e( 'Enables/disables use of jQuery UI theming.',$this->textdomain ); ?></p>
			</td>
			</tr>
			</tbody>
			</table>
			<?php
	}
}
