jQuery(document).ready(function($){
        if($('#event-gmap').length && $('#event-venue').length){
                $('#event-gmap').attr('href',$('#event-gmap').attr('href').replace('FADDRESS',encodeURIComponent($("#event-venue").data('fulladdress'))));
        }
        var faddress = '';
        if($('#event-venue').length){
                faddress = $("#event-venue").data('fulladdress');
        }
        $('#gcal-button-id').attr('href',$('#gcal-button-id').attr('href').replace('LOCATION',faddress));
        var cal = ics();
        cal.addEvent( $('#ical-button-id').data('title'), $('#ical-button-id').data('content') , faddress, $('#ical-button-id').data('start'),$('#ical-button-id').data('end'));
        $("#ical-button-id").on('click',function(){
                cal.download('ical','.ics');
        });

        $('a[rel*=leanModal]').leanModal({ top : 50, overlay : 0.4, closeButton: ".modal_close" });
});