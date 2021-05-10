jQuery(document).ready(function($){
	$.fn.loopRules = function (rules,k,v,cond_vars_conditional){
                $.each(rules,function(attr,j){
                        if(j.comb) {
                                $.each(j.comb, function (vk,vc) {
					if(vc.type == 'checkbox'){
						change_on = "input[name='"+vc.key+"[]']";	
					}
					else if(vc.type == 'radio'){
						change_on = "input[name='"+vc.key+"']";	
					}
					else {
                                                change_on = '#'+vc.key;
					}
                                        $.fn.checkChange(change_on,k,v,cond_vars_conditional);
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
	$.fn.changeInput = function (attr,view,type,rev){
                if(rev == 1 && view == 'hide'){
                        view = 'show';
                }
                else if(rev == 1 && view == 'show'){
                        view = 'hide';
                }
                if(view == 'hide'){
			if(type == 'checkbox'){
				$('input[name="'+attr+'[]"]').rules("remove");
				$('input[name="'+attr+'[]"]').attr("checked", false);
				$('.input_'+attr).closest('.emd-form-group').hide();
			}
			else if(type == 'radio'){
				$('input[name="'+attr+'"]').rules("remove");
				$('input[name="'+attr+'"]').attr("checked", false);
				$('.input_'+attr).closest('.emd-form-group').hide();
			}
			else {
				$('#'+attr).rules("remove");
				$('#'+attr).val('');
				$('#'+attr).closest('.emd-form-group').hide();
			}
                }
                else if(view == 'show'){
			if(type == 'checkbox' || type == 'radio'){
				$('.input_'+attr).closest('.emd-form-group').delay("slow").fadeIn("slow");
			}
			else {
				$('#'+attr).closest('.emd-form-group').delay("slow").fadeIn("slow");
			}
                }
        }
	$.fn.changeTax = function (tax,view,rev){
                if(rev == 1 && view == 'hide'){
                        view = 'show';
                }
                else if(rev == 1 && view == 'show'){
                        view = 'hide';
                }
                if(view == 'hide'){
			if($('#'+tax) != undefined){
				$('#'+tax).rules("remove");
			}
			else if($('#'+tax+'[]') != undefined){
				$('#'+tax+'[]').rules("remove");
			}
			$('#'+tax).closest('.emd-form-group').hide();
                }
                else if(view == 'show'){
			$('#'+tax).closest('.emd-form-group').delay("slow").fadeIn("slow");
                }
        }
        $.fn.changeRel = function (rel,view,rev){
                if(rev == 1 && view == 'hide'){
                        view = 'show';
                }
                else if(rev == 1 && view == 'show'){
                        view = 'hide';
                }
                if(view == 'hide'){
			if($('#rel_'+rel) != undefined){
				$('#rel_'+rel).rules("remove");
			}
			else if($('#rel_'+rel+'[]') != undefined){
				$('#rel_'+rel+'[]').rules("remove");
			}
			$('#rel_'+rel).closest('.emd-form-group').hide();
                }
                else if(view == 'show'){
			$('#rel_'+rel).closest('.emd-form-group').delay("slow").fadeIn("slow");
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
                                $.fn.changeInput(attr,j.view,j.type,rev);
                        }
                        else if(type == 'tax'){
                                $.fn.changeTax(attr,j.view,rev);
                        }
                        else if(type == 'rel'){
                                $.fn.changeRel(attr,j.view,rev);
                        }
                });
        }
	$.fn.getFieldVal = function (k,type){
                check_val_arr = [];
                switch(type){
                        case 'radio':
                                check_val = $('input[type='+ type + '][name='+k+']').filter(':checked').val();
                                break;
                        case 'checkbox':
                                check_val = $("input[name='"+k+"[]']").is(":checked");
                                break;
                        case 'multi_hier':
                        case 'multi_tax':
				check_val_arr = $('#'+k).select2('val');
                                return check_val_arr;
                        case 'tax':
                        case 'hier':
				check_val = $('#'+k).select2('val');
                                break;
                        default:
                                check_val = $('#'+k).val();
				if(check_val == undefined){
					check_val = $("input[name='"+k+"']").val();
				}
                                break;
                }
                return check_val;
        }
	$.fn.checkChange = function (change_on,k,v,cond_vars_conditional) {	
		$(change_on).change(function(){
			$.fn.checkCond(k,v,cond_vars_conditional);
		});
        }
	$.fn.checkCond = function (k,v,cond_vars_conditional){
		$.fn.checkHide(v,cond_vars_conditional);
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
	$.fn.checkHide = function (v,cond_vars_conditional){
		if(v.start_hide_attr != undefined && v.start_hide_attr.length != 0 ){
			$.each(v.start_hide_attr,function(a,b){
				if(cond_vars_conditional[b] != undefined){
					$.fn.checkHide(cond_vars_conditional[b],cond_vars_conditional);
				}
				$.fn.changeInput(b,'hide',v.attr_rules[b].type,0);
			});
		}
		if(v.start_hide_tax != undefined && v.start_hide_tax.length != 0 ){
			$.each(v.start_hide_tax,function(a,b){
				if(cond_vars_conditional[b] != undefined){
					$.fn.checkHide(cond_vars_conditional[b],cond_vars_conditional);
				}
				$.fn.changeTax(b,'hide',0);
			});
	       }
	       if(v.start_hide_rel!= undefined && v.start_hide_rel.length != 0 ){
			$.each(v.start_hide_rel,function(a,b){
				if(cond_vars_conditional[b] != undefined){
					$.fn.checkHide(cond_vars_conditional[b],cond_vars_conditional);
				}
				$.fn.changeRel(b,'hide',0);
			});
	       }
	}
	
	$.fn.conditionalCheck = function (cond_vars_conditional){
                $.each(cond_vars_conditional, function (k, v) {
			if(v.start_hide_attr != undefined && v.start_hide_attr.length != 0 ){
                                $.each(v.start_hide_attr,function(a,b){
                                	$.fn.changeInput(b,'hide',v.attr_rules[b].type,0);
                                });
                        }
                        if(v.start_hide_tax != undefined && v.start_hide_tax.length != 0 ){
                                $.each(v.start_hide_tax,function(a,b){
                                	$.fn.changeTax(b,'hide',0);
                                });
                        }
                        if(v.start_hide_rel!= undefined && v.start_hide_rel.length != 0 ){
                                $.each(v.start_hide_rel,function(a,b){
                                	$.fn.changeRel(b,'hide',0);
                                });
                        }
			if(v.type == 'checkbox'){
				change_on = "input[name='"+k+"[]']";	
			}
			else if(v.type == 'radio'){
				change_on = "input[name='"+k+"']";
			}
			else {
				change_on = '#'+k;
				if($(change_on).val() == undefined){
					change_on = "input[name='"+k+"']";
				}
			}
			$.fn.checkChange(change_on,k,v,cond_vars_conditional);
			if(v.attr_rules != undefined){
                                $.fn.loopRules(v.attr_rules,k,v,cond_vars_conditional);
                        }
                        if(v.tax_rules != undefined){
                                $.fn.loopRules(v.tax_rules,k,v,cond_vars_conditional);
                        }
                        if(v.rel_rules != undefined){
                                $.fn.loopRules(v.rel_rules,k,v,cond_vars_conditional);
                        }
                });
        }
});
