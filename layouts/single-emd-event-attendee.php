<?php $real_post = $post;
$ent_attrs = get_option('wp_easy_events_attr_list');
?>
<div id="single-emd-event-attendee-<?php echo get_the_ID(); ?>" class="emd-container emd-event-attendee-wrap single-wrap">
<?php $is_editable = 0; ?>
<?php do_action('emd_qr_code_checkin_qr', 'wp_easy_events', 'emd_event_attendee', 'emd_attendee_checkin'); ?>
<div style="border:2px solid #2C2828;background-color: #fff;padding:5px" class="table-responsive">
    <table id="eventticket" class="noborder">
        <tbody>
            <tr>
                <td class="noborder" rowspan="5"><?php echo do_shortcode("[wpee_event_grid filter=\"rel::event_attendee::is::" . $real_post->ID . ";\"]"); ?>
</td>
                <td class="noborder"><?php _e('Ticket ID', 'wp-easy-events'); ?>:</td>
                <td class="noborder"><strong><?php echo esc_html(emd_mb_meta('emd_attendee_ticket_id')); ?>
</strong></td>
                <td class="noborder qrcode" rowspan="5"><?php do_action('emd_qr_code_show_qr_code', 'wp_easy_events'); ?></td>
            </tr>
            <tr>
                <td class="noborder"><?php _e('First Name', 'wp-easy-events'); ?>: </td>
                <td class="noborder"><strong><?php echo esc_html(emd_mb_meta('emd_attendee_first_name')); ?>
</strong></td>
            </tr>
            <tr>
                <td class="noborder"><?php _e('Last Name', 'wp-easy-events'); ?>: </td>
                <td class="noborder"><strong><?php echo esc_html(emd_mb_meta('emd_attendee_last_name')); ?>
</strong></td>
            </tr>
            <tr>
                <td class="noborder"><?php _e('Email', 'wp-easy-events'); ?>:</td>
                <td class="noborder"><strong><?php echo esc_html(emd_mb_meta('emd_attendee_email')); ?>
</strong></td>
            </tr>
            <tr>
                <td class="noborder"><?php _e('Quantity', 'wp-easy-events'); ?>:</td>
                <td class="noborder"><strong><?php echo esc_html(emd_mb_meta('emd_attendee_quantity')); ?>
</strong></td>
            </tr>
        </tbody>
    </table>
</div>
</div><!--container-end-->