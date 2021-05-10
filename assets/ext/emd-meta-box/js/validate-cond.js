jQuery( document ).ready( function( $ )
{
	var $form = $( '#post' );

	// Required field styling
	$.each( emd_mb.validationOptions.rules, function( k, v )
	{
		if ( v['required'] )
		{
			//$( '#' + k ).parent().siblings( '.mb-label' ).addClass( 'required' ).append( '<span>*</span>' );
			$('input[name='+k+'],select[name='+k+'],textarea[name='+k+']').parents().find('label[for='+k+']').parent().addClass( 'required' ).append( '<span>*</span>' );
		}
	} );

	emd_mb.validationOptions.invalidHandler = function( form, validator )
	{
		// Re-enable the submit ( publish/update ) button and hide the ajax indicator
		$( '#publish' ).removeClass( 'button-primary-disabled' );
		$( '#ajax-loading' ).attr( 'style', '' );
		$form.siblings( '#message' ).remove();
		$form.before( '<div id="message" class="error"><p>' + emd_mb.summaryMessage + '</p></div>' );
	};
	
	//added for validation to work on select2 (required and selects)
	emd_mb.validationOptions.ignore= null;
	$.extend($.validator.messages,validate_msg);

	$form.validate(emd_mb.validationOptions );


	//functions for conditional checks , not called if no conditional set
	$.fn.loopRules = function (rules,k,v){
		$.each(rules,function(attr,j){
			if(j.comb) {
				$.each(j.comb, function (vk,vc) {
					action = 'change';
					if(vc.type == 'radio'){
						change_on = 'input[type='+ vc.type + '][name='+vc.key+']';
					}
					else if(vc.type == 'multi_hier'){
						change_on = "input[name='tax_input["+vc.key+"][]']";
					}
					else if(vc.type == 'multi_tax'){
						action = 'click';
						change_on = "#tagsdiv-"+vc.key;
					}
					else if(vc.type == 'hier' || vc.type == 'tax'){
						change_on = "input[name='radio_tax_input["+vc.key+"][]']";
					}
					else {
						change_on = '#'+vc.key;
					}
					$.fn.checkChange(change_on,action,k,v);
				});
			} 
		});
	}
	$.fn.checkValue = function (check_opr,check_val,depend_value){
                found = 0;
                switch(check_opr) {
                        case 'is':
                                if(!$.isArray(check_val)  && check_val ===  depend_value){
                                        found = 1;
                                }
                                else if($.isArray(check_val)  && $.inArray(depend_value, check_val) != -1){
                                        found = 1;
                                }
                                break;
			case 'is_not':
				if(!$.isArray(check_val)  && check_val !=  depend_value){
					found = 1;
				}
				else if($.isArray(check_val)  && $.inArray(depend_value, check_val) == -1){
					found = 1;
				}
				break;
                        case 'greater':
                                if(check_val >  depend_value){
                                        found = 1;
                                }
                                break;
			 case 'less':
                                if(check_val <  depend_value){
                                        found = 1;
                                }
			case 'contains':
                                if(check_val.indexOf(depend_value) !== -1){
                                        found = 1;
                                }
                                break;
                        case 'starts':
                                if(check_val.match("^"+depend_value)){
                                        found = 1;
                                }
                                break;
                        case 'ends':
                                if(check_val.match(depend_value+"$")){
                                        found = 1;
                                }
                                break;
                }
                return found;
        }
	$.fn.getFieldVal = function (k,type){
                check_val_arr = [];
                switch(type){
                        case 'radio':
                                check_val = $('input[type='+ type + '][name='+k+']').filter(':checked').val();
                                break;
                        case 'checkbox':
                                check_val = $('#'+k).is(":checked");
                                break;
                        case 'multi_hier':
                                $.each($("input[name='tax_input[" + k + "][]']").filter(':checked'),function (mhi,mhv){
                                        multi_val = $(mhv).parent().text().trim();
                                        check_val_arr.push(multi_val);
                                });
                                return check_val_arr;
			case 'multi_tax':
				$.each($('div.tagchecklist span'),function (mti,mtv){
					multi_val = $(mtv).text().replace('X','').trim();
					check_val_arr.push(multi_val);
				});
				return check_val_arr;
                        case 'tax':
			case 'hier':
				check_val = $("input[name='radio_tax_input["+k+"][]']").filter(':checked').parent().text().trim();
                                break;
                        default:
                                check_val = $('#'+k).val();
                                break;
                }
                return check_val;
        }
	$.fn.checkChange = function (change_on,action,k,v) {
		if(action == 'change'){
			$(change_on).change(function(){
				$.fn.checkCond(k,v);
			});
		}
		else if(action == 'click'){
			$(change_on).click(function(){
				$.fn.checkCond(k,v);
			});
		}
	}
        $.fn.loopCond = function (rules, check_val, type) {
                $.each(rules,function(attr,j){
                        found = $.fn.checkValue(j.depend_check,check_val,j.depend_value);
                        //check if any combination value to be checked
                        if(found == 1 && j.comb_type == 'all' && j.comb){
                                //loop each comb
                                $.each(j.comb, function (vk,vc) {
                                        check_val_all = $.fn.getFieldVal(vc.key,vc.type);
                                        found = $.fn.checkValue(vc.depend_check,check_val_all,vc.depend_value);
                                        if(found == 0){
                                                return false;
                                        }
                                });
                        }
			if(found == 0 && j.comb_type == 'any' && j.comb){
                                $.each(j.comb, function (vk,vc) {
                                        check_val_any = $.fn.getFieldVal(vc.key,vc.type);
                                        found = $.fn.checkValue(vc.depend_check,check_val_any,vc.depend_value);
                                        if(found == 1){
                                                return false;
                                        }
                                });
                        }
                        rev = 1;
                        if(found == 1){
                                rev = 0;
                        }
                        if(type == 'attr'){
                                $.fn.changeInput(attr,j.view,j.valid,rev);
                        }
                        else if(type == 'tax'){
                                $.fn.changeTax(attr,j.view,j.valid,rev);
                        }
                        else if(type == 'rel'){
                                $.fn.changeRel(attr,j.view,j.valid,rev);
                        }
                });
        }
	$.fn.checkCond = function (k,v){
		if(v.attr_rules != undefined){
                	$.fn.loopCond(v.attr_rules,$.fn.getFieldVal(k,v.type), 'attr');
		}
		if(v.tax_rules != undefined){
                	$.fn.loopCond(v.tax_rules,$.fn.getFieldVal(k,v.type), 'tax');
		}
		if(v.rel_rules != undefined){
                	$.fn.loopCond(v.rel_rules,$.fn.getFieldVal(k,v.type), 'rel');
		}
        }
	$.fn.changeInput = function (attr,view,valid,rev){
                if(rev == 1 && view == 'hide'){
                        view = 'show';
                }
                else if(rev == 1 && view == 'show'){
                        view = 'hide';
                }
                if(view == 'hide'){
                        $('label[for='+attr+']').closest('.emd-mb-label').removeClass('required').hide();
			if($('#'+attr).length){
                        	$('#'+attr).closest('.emd-mb-input').hide();
                        	$('#'+attr).rules("remove");
                        	$('#'+attr).val('');
			}
			else {
                        	$('.'+attr).closest('.emd-mb-input').hide();
				$('input[name="'+attr+'"]').rules("remove");
				$('input[name="'+attr+'"]').attr("checked", false);
			}
                }
                else if(view == 'show'){
                        $('label[for='+attr+']').closest('.emd-mb-label').show();
			if($('#'+attr).length){
                        	$('#'+attr).closest('.emd-mb-input').show();
			}
			else {
                        	$('.'+attr).closest('.emd-mb-input').show();
			}
                        if(valid != undefined && valid.required == true){
                                $('label[for='+attr+']').closest('.emd-mb-label').addClass('required');
                        	$('#'+attr).rules("add",valid);
                        }
                }
        }
        $.fn.changeTax = function (tax,view,valid,rev){
                if(rev == 1 && view == 'hide'){
                        view = 'show';
                }
                else if(rev == 1 && view == 'show'){
                        view = 'hide';
                }
                if(view == 'hide'){
                        $('#tagsdiv-'+tax).hide();
			$('#radio-tagsdiv-'+tax).hide();
			$('#'+tax+'div').hide();
			$('#radio-'+tax+'div').hide();
                }
                else if(view == 'show'){
                        $('#tagsdiv-'+tax).show();
			$('#radio-tagsdiv-'+tax).show();
			$('#'+tax+'div').show();
			$('#radio-'+tax+'div').show();
                }
        }
	$.fn.changeRel = function (rel,view,valid,rev){
                if(rev == 1 && view == 'hide'){
                        view = 'show';
                }
                else if(rev == 1 && view == 'show'){
                        view = 'hide';
                }
                if(view == 'hide'){
                        $('#p2p-any-'+rel).hide();
			$('#p2p-from-'+rel).hide();
			$('#p2p-to-'+rel).hide();
                }
                else if(view == 'show'){
                        $('#p2p-any-'+rel).show();
			$('#p2p-from-'+rel).show();
			$('#p2p-to-'+rel).show();
                }
        }

	
	
	//emd_mb conditional options 
	//first check if there is any conditional set for any of the attributes for this entity
	//if there is loop and process them
	//console.log('condi');
        //console.log(emd_mb.conditional);
	if($(emd_mb.conditional).length != 0){
		$.each(emd_mb.conditional, function (k, v) {
			show_start_hide = 0;
			action = 'change';
			if(v.type == 'radio'){
				change_on = 'input[type='+ v.type + '][name='+k+']';
				check_val = $(change_on).filter(':checked').val();
				if(typeof check_val === "undefined"){
					show_start_hide = 1;
				}
			}
 			else if(v.type == 'checkbox'){
				change_on = '#'+k;
				check_val = $(change_on).is(":checked");
				if(!check_val){
					show_start_hide = 1;
				}
			}
			else if(v.type == 'multi_hier'){
				change_on = "input[name='tax_input["+k+"][]']";
				check_val = $(change_on).filter(':checked').val();
				if(typeof check_val === "undefined"){
					show_start_hide = 1;
				}
			}
			else if(v.type == 'multi_tax'){
				action = 'click';
				change_on = "#tagsdiv-"+vc.key;
				tcount = $("div.tagchecklist a").length;
				if(tcount == 0){
					show_start_hide = 1;
				}
			}
			else if(v.type == 'hier' || v.type =='tax'){
				change_on = "input[name='radio_tax_input["+k+"][]']";
				check_val = $(change_on).filter(':checked').val();
				if(typeof check_val === "undefined"){
					show_start_hide = 1;
				}
			}
			else {
				change_on = '#'+k;
				check_val = $(change_on).val();
				if(typeof check_val === 'undefined'){
					show_start_hide = 1;
				}
			}
			if(v.start_hide_attr != undefined && v.start_hide_attr.length != 0 ){
                                $.each(v.start_hide_attr,function(a,b){
					v.attr_rules[b]['valid'] = emd_mb.validationOptions.rules[b];
					emd_mb.validationOptions.rules[b] = {};
					$('.'+b).closest('.emd-mb-input').hide();
					$('label[for='+b+']').closest('.emd-mb-label').removeClass('required').hide();
                                });
                        }
                        if(v.start_hide_tax != undefined && v.start_hide_tax.length != 0 ){
                                $.each(v.start_hide_tax,function(a,b){
					$('#tagsdiv-'+b).hide();
					$('#radio-tagsdiv-'+b).hide();
					$('#'+b+'div').hide();
					$('#radio-'+b+'div').hide();
                                });
                        }
                        if(v.start_hide_rel!= undefined && v.start_hide_rel.length != 0 ){
                                $.each(v.start_hide_rel,function(a,b){
                                                $('#p2p-any-'+b).hide();
                                                $('#p2p-to-'+b).hide();
                                                $('#p2p-from-'+b).hide();
                                });
                        }
			if(show_start_hide != 1){
                                $.fn.checkCond(k,v);
                        }

			
                        $.fn.checkChange(change_on,action,k,v);
			
			if(v.attr_rules != undefined){
				$.fn.loopRules(v.attr_rules,k,v);
			}
			if(v.tax_rules != undefined){
				$.fn.loopRules(v.tax_rules,k,v);
			}
			if(v.rel_rules != undefined){
				$.fn.loopRules(v.rel_rules,k,v);
			}
			
		});
	}
} );
