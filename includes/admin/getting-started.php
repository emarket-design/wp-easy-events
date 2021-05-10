<?php
/**
 * Getting Started
 *
 * @package WP_EASY_EVENTS
 * @since WPAS 5.3
 */
if (!defined('ABSPATH')) exit;
add_action('wp_easy_events_getting_started', 'wp_easy_events_getting_started');
/**
 * Display getting started information
 * @since WPAS 5.3
 *
 * @return html
 */
function wp_easy_events_getting_started() {
	global $title;
	list($display_version) = explode('-', WP_EASY_EVENTS_VERSION);
?>
<style>
.about-wrap img{
max-height: 200px;
}
div.comp-feature {
    font-weight: 400;
    font-size:20px;
}
.edition-com {
    display: none;
}
.green{
color: #008000;
font-size: 30px;
}
#nav-compare:before{
    content: "\f179";
}
#emd-about .nav-tab-wrapper a:before{
    position: relative;
    box-sizing: content-box;
padding: 0px 3px;
color: #4682b4;
    width: 20px;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
font-family: dashicons;
}
#nav-getting-started:before{
content: "\f102";
}
#nav-release-notes:before{
content: "\f348";
}
#nav-resources:before{
content: "\f118";
}
#nav-features:before{
content: "\f339";
}
#emd-about .embed-container { 
	position: relative; 
	padding-bottom: 56.25%;
	height: 0;
	overflow: hidden;
	max-width: 100%;
	height: auto;
	} 

#emd-about .embed-container iframe,
#emd-about .embed-container object,
#emd-about .embed-container embed { 
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	}
#emd-about ul li:before{
    content: "\f522";
    font-family: dashicons;
    font-size:25px;
 }
#gallery {
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
#gallery .gallery-item {
	margin-top: 10px;
	margin-right: 10px;
	text-align: center;
        cursor:pointer;
}
#gallery img {
	border: 2px solid #cfcfcf; 
height: 405px; 
width: auto; 
}
#gallery .gallery-caption {
	margin-left: 0;
}
#emd-about .top{
text-decoration:none;
}
#emd-about .toc{
    background-color: #fff;
    padding: 25px;
    border: 1px solid #add8e6;
    border-radius: 8px;
}
#emd-about h3,
#emd-about h2{
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0.6em;
    margin-left: 0px;
}
#emd-about p,
#emd-about .emd-section li{
font-size:18px
}
#emd-about a.top:after{
content: "\f342";
    font-family: dashicons;
    font-size:25px;
text-decoration:none;
}
#emd-about .toc a,
#emd-about a.top{
vertical-align: top;
}
#emd-about li{
list-style-type: none;
line-height: normal;
}
#emd-about ol li {
    list-style-type: decimal;
}
#emd-about .quote{
    background: #fff;
    border-left: 4px solid #088cf9;
    -webkit-box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
    margin-top: 25px;
    padding: 1px 12px;
}
#emd-about .tooltip{
    display: inline;
    position: relative;
}
#emd-about .tooltip:hover:after{
    background: #333;
    background: rgba(0,0,0,.8);
    border-radius: 5px;
    bottom: 26px;
    color: #fff;
    content: 'Click to enlarge';
    left: 20%;
    padding: 5px 15px;
    position: absolute;
    z-index: 98;
    width: 220px;
}
</style>

<?php add_thickbox(); ?>
<div id="emd-about" class="wrap about-wrap">
<div id="emd-header" style="padding:10px 0" class="wp-clearfix">
<div style="float:right"><img src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/wpee-logo-250x150.gif"; ?>"></div>
<div style="margin: .2em 200px 0 0;padding: 0;color: #32373c;line-height: 1.2em;font-size: 2.8em;font-weight: 400;">
<?php printf(__('Welcome to WP Easy Events Community %s', 'wp-easy-events') , $display_version); ?>
</div>

<p class="about-text">
<?php printf(__("Easy-to-use yet beautiful and powerful  event management system for successful events", 'wp-easy-events') , $display_version); ?>
</p>
<div style="display: inline-block;"><a style="height: 50px; background:#ff8484;padding:10px 12px;color:#ffffff;text-align: center;font-weight: bold;line-height: 50px; font-family: Arial;border-radius: 6px; text-decoration: none;" href="https://emdplugins.com/plugin-pricing/wp-easy-events-wordpress-plugin-pricing/?pk_campaign=wp-easy-events-upgradebtn&amp;pk_kwd=wp-easy-events-resources"><?php printf(__('Upgrade Now', 'wp-easy-events') , $display_version); ?></a></div>
<div style="display: inline-block;margin-bottom: 20px;"><a style="height: 50px; background:#f0ad4e;padding:10px 12px;color:#ffffff;text-align: center;font-weight: bold;line-height: 50px; font-family: Arial;border-radius: 6px; text-decoration: none;" href="https://wpeasyevents.emdplugins.com//?pk_campaign=wp-easy-events-buybtn&amp;pk_kwd=wp-easy-events-resources"><?php printf(__('Visit Pro Demo Site', 'wp-easy-events') , $display_version); ?></a></div>
<?php
	$tabs['getting-started'] = __('Getting Started', 'wp-easy-events');
	$tabs['release-notes'] = __('Release Notes', 'wp-easy-events');
	$tabs['resources'] = __('Resources', 'wp-easy-events');
	$tabs['features'] = __('Features', 'wp-easy-events');
	$active_tab = isset($_GET['tab']) ? $_GET['tab'] : 'getting-started';
	echo '<h2 class="nav-tab-wrapper wp-clearfix">';
	foreach ($tabs as $ktab => $mytab) {
		$tab_url[$ktab] = esc_url(add_query_arg(array(
			'tab' => $ktab
		)));
		$active = "";
		if ($active_tab == $ktab) {
			$active = "nav-tab-active";
		}
		echo '<a href="' . esc_url($tab_url[$ktab]) . '" class="nav-tab ' . $active . '" id="nav-' . $ktab . '">' . $mytab . '</a>';
	}
	echo '</h2>';
?>
<?php echo '<div class="tab-content" id="tab-getting-started"';
	if ("getting-started" != $active_tab) {
		echo 'style="display:none;"';
	}
	echo '>';
?>
<div style="height:25px" id="rtop"></div><div class="toc"><h3 style="color:#0073AA;text-align:left;">Quickstart</h3><ul><li><a href="#gs-sec-212">Live Demo Site</a></li>
<li><a href="#gs-sec-214">Need Help?</a></li>
<li><a href="#gs-sec-211">Learn More</a></li>
<li><a href="#gs-sec-213">Installation, Configuration & Customization Service</a></li>
<li><a href="#gs-sec-71">WP Easy Events Community Introduction</a></li>
<li><a href="#gs-sec-83">WP Easy Events Pro for all-in-one event management and ticketing system for successful events</a></li>
<li><a href="#gs-sec-73">EMD CSV Import Export Extension helps you get your data in and out of WordPress quickly, saving you ton of time</a></li>
<li><a href="#gs-sec-72">EMD Advanced Filters and Columns Extension for finding what's important faster</a></li>
<li><a href="#gs-sec-82">EMD QR Code Extension for easy and fast ticket processing</a></li>
<li><a href="#gs-sec-85">WP Easy Events WooCommerce Extension for integrated event ticket sales</a></li>
<li><a href="#gs-sec-84">WP Easy Events Easy Digital Downloads Extension for integrated event ticket sales</a></li>
<li><a href="#gs-sec-140">EMD MailChimp Extension - A powerful way to promote your future events to the very people who already attended one of yours</a></li>
</ul></div><div class="quote">
<p class="about-description">The secret of getting ahead is getting started - Mark Twain</p>
</div>
<div id="gs-sec-212"></div><div style="color:white;background:#0000003b;padding:5px 10px;font-size: 1.4em;font-weight: 600;">Live Demo Site</div><div class="changelog emd-section getting-started-212" style="margin:0;background-color:white;padding:10px"><div id="gallery"></div><div class="sec-desc"><p>Feel free to check out our <a target="_blank" href="https://wpeasyeventscom.emdplugins.com/?pk_campaign=wp-easy-events-gettingstarted&pk_kwd=wp-easy-events-livedemo">live demo site</a> to learn how to use WP Easy Events Community starter edition. The demo site will always have the latest version installed.</p>
<p>You can also use the demo site to identify possible issues. If the same issue exists in the demo site, open a support ticket and we will fix it. If a WP Easy Events Community feature is not functioning or displayed correctly in your site but looks and works properly in the demo site, it means the theme or a third party plugin or one or more configuration parameters of your site is causing the issue.</p>
<p>If you'd like us to identify and fix the issues specific to your site, purchase a work order to get started.</p>
<p><a target="_blank" style="
    padding: 16px;
    background: coral;
    border: 1px solid lightgray;
    border-radius: 12px;
    text-decoration: none;
    color: white;
    margin: 10px 0;
    display: inline-block;" href="https://emdplugins.com/expert-service-pricing/?pk_campaign=wp-easy-events-gettingstarted&pk_kwd=wp-easy-events-livedemo">Purchase Work Order</a></p></div></div><div style="margin-top:15px"><a href="#rtop" class="top">Go to top</a></div><hr style="margin-top:40px"><div id="gs-sec-214"></div><div style="color:white;background:#0000003b;padding:5px 10px;font-size: 1.4em;font-weight: 600;">Need Help?</div><div class="changelog emd-section getting-started-214" style="margin:0;background-color:white;padding:10px"><div id="gallery"></div><div class="sec-desc"><p>There are many resources available in case you need help:</p>
<ul>
<li>Search our <a target="_blank" href="https://emdplugins.com/support">knowledge base</a></li>
<li><a href="https://emdplugins.com/kb_tags/wp-easy-events" target="_blank">Browse our WP Easy Events Community articles</a></li>
<li><a href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation" target="_blank">Check out WP Easy Events Community documentation for step by step instructions.</a></li>
<li><a href="https://emdplugins.com/emdplugins-support-introduction/" target="_blank">Open a support ticket if you still could not find the answer to your question</a></li>
</ul>
<p>Please read <a href="https://emdplugins.com/questions/what-to-write-on-a-support-ticket-related-to-a-technical-issue/" target="_blank">"What to write to report a technical issue"</a> before submitting a support ticket.</p></div></div><div style="margin-top:15px"><a href="#rtop" class="top">Go to top</a></div><hr style="margin-top:40px"><div id="gs-sec-211"></div><div style="color:white;background:#0000003b;padding:5px 10px;font-size: 1.4em;font-weight: 600;">Learn More</div><div class="changelog emd-section getting-started-211" style="margin:0;background-color:white;padding:10px"><div id="gallery"></div><div class="sec-desc"><p>The following articles provide step by step instructions on various concepts covered in WP Easy Events Community.</p>
<ul><li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article340">Concepts</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article453">Content Access</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article452">Quick Start</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article390">Working with Attendees</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article347">Working with Venues</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article346">Working with Organizers</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article345">Working with Events</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article348">Widgets</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article391">Standards</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article349">Integrations</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article392">Forms</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article350">Roles and Capabilities</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article393">Notifications</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article341">Administration</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article454">Creating Shortcodes</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article343">Screen Options</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article342">Localization(l10n)</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article394">Customizations</a>
</li>
<li>
<a target="_blank" href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation/#article344">Glossary</a>
</li></ul>
</div></div><div style="margin-top:15px"><a href="#rtop" class="top">Go to top</a></div><hr style="margin-top:40px"><div id="gs-sec-213"></div><div style="color:white;background:#0000003b;padding:5px 10px;font-size: 1.4em;font-weight: 600;">Installation, Configuration & Customization Service</div><div class="changelog emd-section getting-started-213" style="margin:0;background-color:white;padding:10px"><div id="gallery"></div><div class="sec-desc"><p>Get the peace of mind that comes from having WP Easy Events Community properly installed, configured or customized by eMarket Design.</p>
<p>Being the developer of WP Easy Events Community, we understand how to deliver the best value, mitigate risks and get the software ready for you to use quickly.</p>
<p>Our service includes:</p>
<ul>
<li>Professional installation by eMarket Design experts.</li>
<li>Configuration to meet your specific needs</li>
<li>Installation completed quickly and according to best practice</li>
<li>Knowledge of WP Easy Events Community best practices transferred to your team</li>
</ul>
<p>Pricing of the service is based on the complexity of level of effort, required skills or expertise. To determine the estimated price and duration of this service, and for more information about related services, purchase a work order.  
<p><a target="_blank" style="
    padding: 16px;
    background: coral;
    border: 1px solid lightgray;
    border-radius: 12px;
    text-decoration: none;
    color: white;
    margin: 10px 0;
    display: inline-block;" href="https://emdplugins.com/expert-service-pricing/?pk_campaign=wp-easy-events-gettingstarted&pk_kwd=wp-easy-events-livedemo">Purchase Work Order</a></p></div></div><div style="margin-top:15px"><a href="#rtop" class="top">Go to top</a></div><hr style="margin-top:40px"><div id="gs-sec-71"></div><div style="color:white;background:#0000003b;padding:5px 10px;font-size: 1.4em;font-weight: 600;">WP Easy Events Community Introduction</div><div class="changelog emd-section getting-started-71" style="margin:0;background-color:white;padding:10px"><div class="emd-yt" data-youtube-id="jO2VopUTBhI" data-ratio="16:9">loading...</div><div class="sec-desc"><p>Watch WP Easy Events Community introduction video to learn about the plugin features and configuration.</p></div></div><div style="margin-top:15px"><a href="#rtop" class="top">Go to top</a></div><hr style="margin-top:40px"><div id="gs-sec-83"></div><div style="color:white;background:#0000003b;padding:5px 10px;font-size: 1.4em;font-weight: 600;">WP Easy Events Pro for all-in-one event management and ticketing system for successful events</div><div class="changelog emd-section getting-started-83" style="margin:0;background-color:white;padding:10px"><div class="emd-yt" data-youtube-id="TqpkUi3p7ik" data-ratio="16:9">loading...</div><div class="sec-desc"><p><strong>Best Value</strong></p>
<p>WP Easy Events WordPress plugin offers fully featured event registration and ticketing system that allows promotion, management and hosting of successful events all in one package.</p>
<p>Feature summary:</p>
<ul>
<li>Create beautiful, customized event registration pages and ticketing experience for successful events</li>
<li>Create and manage venues, organizers, performers and attendees</li>
<li>Promote events and engage attendees using integrated powerful social media sharing and rating system</li>
<li>Collect payments online using WooCommerce or Easy Digital Downloads ecommerce plugins (sold separately) or simply process registrations</li>
<li>Fully responsive interface that matches your brand perfectly</li>
<li>Advanced custom reporting and real-time analytics to get the insights you need to increase attendance</li>
</ul>
<div style="margin:25px"><a href="https://emdplugins.com/plugins/wp-easy-events-wordpress-plugin/?pk_campaign=wpeepro-buybtn&pk_kwd=wp-easy-events-resources"><img style="width: 154px;" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/button_buy-now.png"; ?>"></a></div></div></div><div style="margin-top:15px"><a href="#rtop" class="top">Go to top</a></div><hr style="margin-top:40px"><div id="gs-sec-73"></div><div style="color:white;background:#0000003b;padding:5px 10px;font-size: 1.4em;font-weight: 600;">EMD CSV Import Export Extension helps you get your data in and out of WordPress quickly, saving you ton of time</div><div class="changelog emd-section getting-started-73" style="margin:0;background-color:white;padding:10px"><div class="emd-yt" data-youtube-id="yoSyp-zgrVA" data-ratio="16:9">loading...</div><div class="sec-desc"><p>This extension is included in the pro edition.</p>
<p>EMD CSV Import Export Extension helps bulk import, export, update entries from/to CSV files. You can also reset(delete) all data and start over again without modifying database. The export feature is also great for backups and archiving old or obsolete data.</p>
<p><a href="https://emdplugins.com/plugin-features/wp-easy-events-importexport-addon/?pk_campaign=emdimpexp-buybtn&pk_kwd=wp-easy-events-resources"><img style="width: 154px;" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/button_buy-now.png"; ?>"></a></p></div></div><div style="margin-top:15px"><a href="#rtop" class="top">Go to top</a></div><hr style="margin-top:40px"><div id="gs-sec-72"></div><div style="color:white;background:#0000003b;padding:5px 10px;font-size: 1.4em;font-weight: 600;">EMD Advanced Filters and Columns Extension for finding what's important faster</div><div class="changelog emd-section getting-started-72" style="margin:0;background-color:white;padding:10px"><div class="emd-yt" data-youtube-id="GXcKKRzzsdw" data-ratio="16:9">loading...</div><div class="sec-desc"><p>This extension is included in the pro edition.</p>
<p>EMD Advanced Filters and Columns Extension for WP Easy Events Community edition helps you:</p>
<ul><li>Filter entries quickly to find what you're looking for</li>
<li>Save your frequently used filters so you do not need to create them again</li>
<li>Sort quote request columns to see what's important faster</li>
<li>Change the display order of columns </li>
<li>Enable or disable columns for better and cleaner look </li>
<li>Export search results to PDF or CSV for custom reporting</li></ul><div style="margin:25px"><a href="https://emdplugins.com/plugin-features/wp-easy-events-smart-search-and-columns-addon/?pk_campaign=emd-afc-buybtn&pk_kwd=wp-easy-events-resources"><img style="width: 154px;" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/button_buy-now.png"; ?>"></a></div></div></div><div style="margin-top:15px"><a href="#rtop" class="top">Go to top</a></div><hr style="margin-top:40px"><div id="gs-sec-82"></div><div style="color:white;background:#0000003b;padding:5px 10px;font-size: 1.4em;font-weight: 600;">EMD QR Code Extension for easy and fast ticket processing</div><div class="changelog emd-section getting-started-82" style="margin:0;background-color:white;padding:10px"><div class="emd-yt" data-youtube-id="AfPAiXseYZY" data-ratio="16:9">loading...</div><div class="sec-desc"><p>This extension is included in the pro edition.</p>
<p>Creates a QR codes based check-in, check out system for the community edition of WP Easy Events WordPress plugin.</p>
<ul>
<li>Enable QR code processing in event ticket pages to check in attendees</li>
<li>Only authorized logged-in users, admins and users who belong to event staff role, can process check-ins</li>
<li>Any QR code reader app, available freely most app stores, can be used for processing</li>
<li>Once attendee checks in, subsequent check-ins are not allowed</li>
</ul>
<div style="margin:25px"><a href="https://emdplugins.com/plugin-features/wp-easy-events-qr-code-addon/?pk_campaign=emd-qr-buybtn&pk_kwd=wp-easy-events-resources"><img style="width: 154px;" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/button_buy-now.png"; ?>"></a></div></div></div><div style="margin-top:15px"><a href="#rtop" class="top">Go to top</a></div><hr style="margin-top:40px"><div id="gs-sec-85"></div><div style="color:white;background:#0000003b;padding:5px 10px;font-size: 1.4em;font-weight: 600;">WP Easy Events WooCommerce Extension for integrated event ticket sales</div><div class="changelog emd-section getting-started-85" style="margin:0;background-color:white;padding:10px"><div class="emd-yt" data-youtube-id="nJxFFQdEFb8" data-ratio="16:9">loading...</div><div class="sec-desc"><p>WooCommerce Extension allows to sell event tickets using WooCommerce . This video shows how to configure tickets as WooCommerce products and link events to display add to cart buttons in event pages.The WooCommerce Extension can also be used in WP Easy Events Pro WordPress Plugin.</p><p>Features Summary:</p><ul><li>Collect ticket payments using WooCommerce WordPress plugin</li><li>Connect events to tickets easily</li><li>Ajax powered, smooth, fully integrated checkout process</li><li>Supports simple, grouped and variable priced tickets</li><li>Integrated ticket inventory management system through WooCommerce</li><li>All WooCommerce ticket orders are linked to events after order is completed.</li><li>Sell tickets and other products at the same time</li><li>After WooCommerce order completed, attendee gets <a href="/plugins/wp-easy-events-professional/#advanced-attendee-management" title="WP Easy Events ProfessionalWordPress Plugin WooCommerce extension">fully customizable email notification</a> with a link to event ticket</li></ul><div style="margin:25px"><a href="https://emdplugins.com/plugin-features/wp-easy-events-woocommerce-addon/?pk_campaign=wpee-woo-buybtn&pk_kwd=wp-easy-events-resources"><img style="width: 154px;" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/button_buy-now.png"; ?>"></a></div></div></div><div style="margin-top:15px"><a href="#rtop" class="top">Go to top</a></div><hr style="margin-top:40px"><div id="gs-sec-84"></div><div style="color:white;background:#0000003b;padding:5px 10px;font-size: 1.4em;font-weight: 600;">WP Easy Events Easy Digital Downloads Extension for integrated event ticket sales</div><div class="changelog emd-section getting-started-84" style="margin:0;background-color:white;padding:10px"><div class="emd-yt" data-youtube-id="RwFo2DXWtfE" data-ratio="16:9">loading...</div><div class="sec-desc"><p>Easy Digital Downloads Extension allows to sell event tickets using Easy Digital Downloads. This video shows how to create and configure Event tickets as downloads in EDD and link them to the related events to make them available for purchase.</p><p>Features Summary:</p><ul><li>Collect ticket payments using Easy Digital Downloads WordPress plugin</li><li>Connect events to tickets easily</li><li>Ajax powered, smooth, fully integrated checkout process</li><li>Supports simple, grouped and variable priced tickets</li><li>Integrated ticket inventory management system through EDD</li><li>All EDD ticket orders are linked to events after order is completed.</li><li>Sell tickets and other products at the same time</li><li>After Easy Digital Downloads order completed, attendee gets <a href="/plugins/wp-easy-events-professional/#advanced-attendee-management" title="WP Easy Events ProfessionalWordPress Plugin Easy Digital Downloads">fully customizable email notification</a> with a link to event ticket</li></ul><div style="margin:25px"><a href="https://emdplugins.com/plugin-features/wp-easy-events-easy-digital-downloads-addon/?pk_campaign=wpee-edd-buybtn&pk_kwd=wp-easy-events-resources"><img style="width: 154px;" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/button_buy-now.png"; ?>"></a></div></div></div><div style="margin-top:15px"><a href="#rtop" class="top">Go to top</a></div><hr style="margin-top:40px"><div id="gs-sec-140"></div><div style="color:white;background:#0000003b;padding:5px 10px;font-size: 1.4em;font-weight: 600;">EMD MailChimp Extension - A powerful way to promote your future events to the very people who already attended one of yours</div><div class="changelog emd-section getting-started-140" style="margin:0;background-color:white;padding:10px"><div class="emd-yt" data-youtube-id="Oi_c-0W1Sdo" data-ratio="16:9">loading...</div><div class="sec-desc"><p>MailChimp is an email marketing service to send email campaigns. EMD MailChimp Extension allows you to build email list based on your event registrations.</p><div style="margin:25px"><a href="https://emdplugins.com/plugin-features/wp-easy-events-mailchimp-addon/?pk_campaign=emd-mailchimp-buybtn&pk_kwd=wp-easy-events-resources"><img style="width: 154px;" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/button_buy-now.png"; ?>"></a></div></div></div><div style="margin-top:15px"><a href="#rtop" class="top">Go to top</a></div><hr style="margin-top:40px">

<?php echo '</div>'; ?>
<?php echo '<div class="tab-content" id="tab-release-notes"';
	if ("release-notes" != $active_tab) {
		echo 'style="display:none;"';
	}
	echo '>';
?>
<p class="about-description">This page lists the release notes from every production version of WP Easy Events Community.</p>


<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.8.3 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-1292" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
tested with WP 5.7</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.8.2 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-1222" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
fixes and improvements for better performance and compatibility</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.8.1 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-1155" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
tested with WP 5.5.1</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-1154" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
updates to translation strings and libraries</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-1153" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
Added version numbers to js and css files for caching purposes</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.8.0 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-1084" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
Added previous and next buttons for the edit screens of events, organizers and attendees</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-1071" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
updates and improvements to form library</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.7.0 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-1029" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
Emd templates</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-1028" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
updates and improvements to form library</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-1027" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
Added support for Emd Custom Field Builder when upgraded to premium editions</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.6.0 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-966" style="margin:0">
<h3 style="font-size:18px;" class="fix"><div  style="font-size:110%;color:#c71585"><span class="dashicons dashicons-admin-tools"></span> FIX</div>
Session cleanup workflow by creating a custom table to process records.</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-965" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
Added Emd form builder support.</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-964" style="margin:0">
<h3 style="font-size:18px;" class="fix"><div  style="font-size:110%;color:#c71585"><span class="dashicons dashicons-admin-tools"></span> FIX</div>
XSS related issues.</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-963" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
Cleaned up unnecessary code and optimized the library file content.</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.5.4 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-896" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
compatibility update and performance improvements</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.5.3 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-878" style="margin:0">
<h3 style="font-size:18px;" class="fix"><div  style="font-size:110%;color:#c71585"><span class="dashicons dashicons-admin-tools"></span> FIX</div>
Event Organizer and Performer relationships not displaying properly</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.5.2 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-877" style="margin:0">
<h3 style="font-size:18px;" class="fix"><div  style="font-size:110%;color:#c71585"><span class="dashicons dashicons-admin-tools"></span> FIX</div>
Event tickets not displaying properly</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.5.1 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-870" style="margin:0">
<h3 style="font-size:18px;" class="fix"><div  style="font-size:110%;color:#c71585"><span class="dashicons dashicons-admin-tools"></span> FIX</div>
Minor issues related to the templating system</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.5.0 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-842" style="margin:0">
<h3 style="font-size:18px;" class="fix"><div  style="font-size:110%;color:#c71585"><span class="dashicons dashicons-admin-tools"></span> FIX</div>
Minor enhancements for better compatibility with WordPress 5.x</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-841" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
Emd templating system to match modern web standards</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-840" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
Created a new shortcode page which displays all available shortcodes. You can access this page under the plugin settings.</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.4.0 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-796" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
Updated the emd templating system reducing CSS file size and improving layout display.</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-795" style="margin:0">
<h3 style="font-size:18px;" class="fix"><div  style="font-size:110%;color:#c71585"><span class="dashicons dashicons-admin-tools"></span> FIX</div>
Organizer connection producing errors when disabled from the plugin settings.</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.3.2 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-763" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
compatibility update and performance improvements</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.3.1 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-739" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
library updates for better stability and compatibility</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-738" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
library updates</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.3.0 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-589" style="margin:0">
<h3 style="font-size:18px;" class="fix"><div  style="font-size:110%;color:#c71585"><span class="dashicons dashicons-admin-tools"></span> FIX</div>
issue with multiple RSVP forms on venue and organizer pages</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-588" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
library updates</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.2.0 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-309" style="margin:0">
<h3 style="font-size:18px;" class="fix"><div  style="font-size:110%;color:#c71585"><span class="dashicons dashicons-admin-tools"></span> FIX</div>
RSVP form to autofill name if user is logged in</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-308" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
Updated calendar library and added language support</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-299" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
Updated codemirror libraries for custom CSS and JS options in plugin settings</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-298" style="margin:0">
<h3 style="font-size:18px;" class="fix"><div  style="font-size:110%;color:#c71585"><span class="dashicons dashicons-admin-tools"></span> FIX</div>
PHP 7 compatibility</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-297" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
Added custom JavaScript option in plugin settings under Tools tab</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-296" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
Updated calendar library and added languages</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.1.0 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-225" style="margin:0">
<h3 style="font-size:18px;" class="fix"><div  style="font-size:110%;color:#c71585"><span class="dashicons dashicons-admin-tools"></span> FIX</div>
WP Sessions security vulnerability</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-224" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
Added support for EMD MailChimp extension</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<h3 style="font-size: 18px;font-weight:700;color: white;background: #708090;padding:5px 10px;width:155px;border: 2px solid #fff;border-radius:4px;text-align:center">3.0.0 changes</h3>
<div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-87" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
Many minor fixes and improvements</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-86" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
EMD CSV Import Export Extension for bulk importing/exporting events, organizers, venues, attendees and the relationship data among each other</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-85" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
Added featured image for organizers and venues</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-84" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
Ability to limit event forms to logged-in users only from plugin settings.</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-83" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
Ability enable/disable any field and taxonomy from backend and/or frontend</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-82" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
EMD Widget area to include sidebar widgets in plugin pages</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-81" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
Ability to set page template for event, venue, organizer pages. Options are sidebar on left, sidebar on right or full width</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-80" style="margin:0">
<h3 style="font-size:18px;" class="new"><div style="font-size:110%;color:#00C851"><span class="dashicons dashicons-megaphone"></span> NEW</div>
Added ability to use EMD or theme templating system</h3>
<div ></a></div></div></div><hr style="margin:30px 0"><div class="wp-clearfix"><div class="changelog emd-section whats-new whats-new-88" style="margin:0">
<h3 style="font-size:18px;" class="tweak"><div  style="font-size:110%;color:#33b5e5"><span class="dashicons dashicons-admin-settings"></span> TWEAK</div>
Added From name and address to RSVP notifications</h3>
<div ></a></div></div></div><hr style="margin:30px 0">
<?php echo '</div>'; ?>
<?php echo '<div class="tab-content" id="tab-resources"';
	if ("resources" != $active_tab) {
		echo 'style="display:none;"';
	}
	echo '>';
?>
<div style="color:white;background:#0000003b;padding:5px 10px;font-size: 1.4em;font-weight: 600;">How to resolve theme related issues</div><div class="emd-section changelog resources resources-74" style="margin:0;background-color:white;padding:10px"><div style="height:40px" id="gs-sec-74"></div><div id="gallery" class="wp-clearfix"><div class="sec-img gallery-item"><a class="thickbox tooltip" rel="gallery-74" href="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/emd_templating_system.png"; ?>"><img src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/emd_templating_system.png"; ?>"></a></div></div><div class="sec-desc"><p>If your theme is not coded based on WordPress theme coding standards, does have an unorthodox markup or its style.css is messing up how WP Easy Events Community pages look and feel, you will see some unusual changes on your site such as sidebars not getting displayed where they are supposed to or random text getting displayed on headers etc. after plugin activation.</p>
<p>The good news is WP Easy Events Community plugin is designed to minimize theme related issues by providing two distinct templating systems:</p>
<ul>
<li>The EMD templating system is the default templating system where the plugin uses its own templates for plugin pages.</li>
<li>The theme templating system where WP Easy Events Community uses theme templates for plugin pages.</li>
</ul>
<p>The EMD templating system is the recommended option. If the EMD templating system does not work for you, you need to check "Disable EMD Templating System" option at Settings > Tools tab and switch to theme based templating system.</p>
<p>Please keep in mind that when you disable EMD templating system, you loose the flexibility of modifying plugin pages without changing theme template files.</p>
<p>If none of the provided options works for you, you may still fix theme related conflicts following the steps in <a href="https://docs.emdplugins.com/docs/wp-easy-events-community-documentation">WP Easy Events Community Documentation - Resolving theme related conflicts section.</a></p>

<div class="quote">
<p>If you’re unfamiliar with code/templates and resolving potential conflicts, <a href="https://emdplugins.com/open-a-support-ticket/?pk_campaign=raq-hireme&ticket_topic=pre-sales-questions"> do yourself a favor and hire us</a>. Sometimes the cost of hiring someone else to fix things is far less than doing it yourself. We will get your site up and running in no time.</p>
</div></div></div><div style="margin-top:15px"><a href="#ptop" class="top">Go to top</a></div><hr style="margin-top:40px">
<?php echo '</div>'; ?>
<?php echo '<div class="tab-content" id="tab-features"';
	if ("features" != $active_tab) {
		echo 'style="display:none;"';
	}
	echo '>';
?>
<h3>All you need to be up and running in no time</h3>
<p>Explore the full list of features available in the the latest version of WP Easy Events. Click on a feature title to learn more.</p>
<table class="widefat features striped form-table" style="width:auto;font-size:16px">
<tr><td><a href="https://emdplugins.com/?p=10649&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/video-folder.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10649&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Powerful, easy to use event widgets for your sidebars.</a></td><td></td></tr>
<tr><td><a href="https://emdplugins.com/?p=10542&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/shop.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10542&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Categorize, tag events to relate events, venues, performers and organizers.</a></td><td></td></tr>
<tr><td><a href="https://emdplugins.com/?p=10533&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/responsive.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10533&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Let visitors use any device to see your event, organizer, venue or performer pages.</a></td><td></td></tr>
<tr><td><a href="https://emdplugins.com/?p=10642&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/central-location.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10642&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">One, powerful event repository to grow your business.</a></td><td></td></tr>
<tr><td><a href="https://emdplugins.com/?p=10541&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/settings.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10541&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Customize most from the plugin settings with ease.</a></td><td></td></tr>
<tr><td><a href="https://emdplugins.com/?p=10647&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/event-registration.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10647&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Supports single or variable priced event tickets to attract more customers.</a></td><td></td></tr>
<tr><td><a href="https://emdplugins.com/?p=26088&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/marketplace.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=26088&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Vendors can create and update their own events, organizers, venues, event performers as well as sponsors and attendees. Vendors can edit their own information from the WordPress admin and/or the frontend of your site.</a></td><td> - Premium feature (Included in Enterprise only)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=24206&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/frontend_edit.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=24206&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Let users with no WordPress experience edit any content from the frontend of your site.</a></td><td> - Premium feature (Included in Enterprise only)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=24205&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/sponsors.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=24205&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Sell sponsorship packages, promote sponsors in their own pages and more.</a></td><td> - Premium feature (Included in Enterprise only)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=24204&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/conference.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=24204&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Create multi-session, multi-track, multi-venue conferences, summits, seminars, training events.</a></td><td> - Premium feature (Included in Enterprise only)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=22167&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/repeating_events.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=22167&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Create repeating events with ease.</a></td><td> - Premium feature (included in both Pro and Enterprise)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10990&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/empower-users.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10990&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Expand what your event organizer staff can do from the plugin settings.</a></td><td> - Premium feature (included in both Pro and Enterprise)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10552&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/analytics.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10552&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Get real-time insight on your events</a></td><td> - Premium feature (included in both Pro and Enterprise)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10549&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/social-share.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10549&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Painless, integrated social media sharing for event, venue, organizer and performer promotions.</a></td><td> - Premium feature</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10551&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/key.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10551&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Event manager and event staff custom user roles to divide tasks among staff.</a></td><td> - Premium feature (included in both Pro and Enterprise)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10648&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/megaphone.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10648&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Keep event staff and attendees in touch with instant notifications.</a></td><td> - Premium feature included in Starter edition. Pro and Enterprise have more powerful features)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10550&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/rgb.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10550&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Keep visitors on your site with relating events to each other.</a></td><td> - Premium feature (included in both Pro and Enterprise)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10539&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/attendee.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10539&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Powerful event attendee management.</a></td><td> - Premium feature included in Starter edition. Pro and Enterprise have more powerful features)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10652&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/dashboard.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10652&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Powerful event management dashboard to track what works and what does not.</a></td><td> - Premium feature (included in both Pro and Enterprise)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10650&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/brush-pencil.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10650&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Create custom event, venue, organizer and attendee fields with ease.</a></td><td> - Premium feature (included in both Pro and Enterprise)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10547&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/mix-match.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10547&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Powerful custom views of your events, organizers, performers, venues and attendees to display unique segments.</a></td><td> - Premium feature (included in both Pro and Enterprise)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10548&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/heart.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10548&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Powerful, integrating event rating system to get instant feedback from customers.</a></td><td> - Premium feature (included in both Pro and Enterprise)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10644&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/events-calendar.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10644&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Awesome looking, customizable event calendar.</a></td><td> - Premium feature included in Starter edition. Pro and Enterprise have more powerful features)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10651&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/performer.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10651&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Showcase your event performers with ease - each event performer has his or her own page.</a></td><td> - Premium feature (included in both Pro and Enterprise)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10646&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/multiple-hosts.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10646&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Manage unlimited event organizers with ease.</a></td><td> - Premium feature included in Starter edition. Pro and Enterprise have more powerful features)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10645&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/venues.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10645&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Host multiple events on multiple venues at the same time - perfect for multi-session events.</a></td><td> - Premium feature included in Starter edition. Pro and Enterprise have more powerful features)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10643&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/event-pages.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10643&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Beautiful event pages to attract customers.</a></td><td> - Premium feature included in Starter edition. Pro and Enterprise have more powerful features)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10558&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/mailchimp.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10558&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Allow event attendees sign up to your MailChimp email list.</a></td><td> - Add-on</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10653&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/zoomin.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10653&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Smart search for events, organizers, venues, attendees and performers to find what is important faster.</a></td><td> - Add-on (included both Pro and Enterprise)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10557&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/eddcom.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10557&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Easy Digital Downloads addon to configure and sell event tickets.</a></td><td> - Add-on</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10654&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/csv-impexp.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10654&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Import, export and update events, venues, organizers, performers and attendees from or to CSV.</a></td><td> - Add-on (included both Pro and Enterprise)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10655&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/qrcode.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10655&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">Process event tickets using QR codes.</a></td><td> - Add-on (included both Pro and Enterprise)</td></tr>
<tr><td><a href="https://emdplugins.com/?p=10556&pk_campaign=wp-easy-events-com&pk_kwd=getting-started"><img style="width:128px;height:auto" src="<?php echo WP_EASY_EVENTS_PLUGIN_URL . "assets/img/woocom.png"; ?>"></a></td><td><a href="https://emdplugins.com/?p=10556&pk_campaign=wp-easy-events-com&pk_kwd=getting-started">WooCommerce addon to configure and sell event tickets.</a></td><td> - Add-on</td></tr>
</table>
<?php echo '</div>'; ?>
<?php echo '</div>';
}