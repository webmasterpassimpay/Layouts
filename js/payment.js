function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

jQuery(document).ready(function($){
	$('body').delegate('.close_alert', 'click', function(){
		$(this).parents('.item_alert').addClass('hide');
		return false;
	});
	$('body').on('click', '[data-modal]', function(){
		if (!$('#' + $(this).data('modal')).length) return false; 
		$('body').addClass('open_modal');
		if ($(this).data('modal-close')) {
			$('.modal').removeClass('show');
		}
		$('#' + $(this).data('modal')).addClass('show');
		return false;
	});
	
	$(document).click(function(event) {
		if ($(event.target).closest(".modalban").length) return;
		if ($(event.target).closest(".inner_modal").length) return;
		$('body').removeClass('open_modal');
		$('.modal').removeClass('show');
		event.stopPropagation();
    });
	$('body').on('click', '.btn_close_modal, .close_modal', function(){
		$(this).closest('.modal').removeClass('show');
		if (!$('.modal.show').length) {
			$('body').removeClass('open_modal');
		}
	});
	$('body').on('click', '.currency_selected_balance', function(){
		$(this).parent().toggleClass('show');
		return false;
	});
	$(document).click(function(event) {
		if ($(event.target).closest(".select_currency_balance").length) return;
		$('.select_currency_balance').removeClass('show');
		event.stopPropagation();
    });
	$('body').on('click', '.currency_list_balance li', function(){
		$(this).parent().find('li').removeClass('selected');
		$(this).addClass('selected');
		var btn = $(this).closest('.select_currency_balance').find('.currency_selected_balance');
		var ps = $(this).data();
		btn.find('[name="ps"]').val($(this).data('id'));
		btn.find('.icon').html($(this).find('.balance_icon').clone());
		btn.find('.name').html($(this).find('.list_name').html());
		btn.find('.name2').html($(this).find('.list_name2').html());
		$('.select_currency_balance').removeClass('show');
		if (ps.platform != "") {
			btn.find('.name').append(" <span>("+ ps.platform +")</span>");
			btn.find('.name').next('i').show();
		} else {
			btn.find('.name').next('i').hide();
		}
		if (ps.code == 'xrp' || ps.code == 'xlm' || ps.code == 'bnb_bep2') {
			$('.tag_field').show();
			$('.warning_text_xrp').show();
		} else {
			$('.tag_field').hide();
			$('.warning_text_xrp').hide();
		}
		$('.btnstep1').removeClass('disabled').removeAttr('disabled');
		return false;
	});
	$('body').delegate('.payment_search input', 'keyup', function(){
		var value = $(this).val().toLowerCase();
		$('.currency_list_balance li').each(function(){
			if ($(this).attr('data-search').toLowerCase().indexOf(value) < 0) {
				$(this).addClass('search_hide');
			} else {
				$(this).removeClass('search_hide');
			}
		});
	});
	$('body').delegate('.payment_search_reset', 'click', function(){
		$('.payment_search input').val('');
		$('.currency_list_balance li').removeClass('search_hide');
	});
	if ($('.currency_list_balance').length) {
		$('.currency_selected_balance').trigger('click');
	}
	$('body').delegate('.btnstep1', 'click', function(){
		$('#steps_in').addClass('loading');
		var code = $('input[name="order"]').val();
		var ps = $('input[name="ps"]').val();
		setCookie('payment' + code, ps, 999);
		$.get('/paymentstep2', {code: code}, function(data) {
			$('#steps_in').html(data).removeClass('loading');
			process();
			updateRate();
		});
		return false;
	});
	$('body').delegate('.btnstep2', 'click', function(){
		$('.RequisitesThree__main, .btnstep2').remove();
		$('.btn_check_trans').show();
		$('.transactionsearch__section').addClass('active');
		var code = $('input[name="order"]').val();
		setCookie('process' + code, true, 999);
		process();
		transactionsearchText();
		return false;
	});
	var t;
	function process(){
		clearTimeout(t);
		var code = $('input[name="order"]').val();
		$.get('/paymentstep3', {code: code}, function(data) {
			if (data == 0 || data == 3) {
				if (data == 3) {
					$('.transactionsearch__section').removeClass('active');
					$('.transactionfinish__section').addClass('active');
					$('.RequisitesThree__main').remove();
				}
				t = setTimeout(function(){
					process();
				}, 10000);
			} else {
				location.reload();
			}
		});
	}
	var interv;
	function updateRate(){
		clearTimeout(interv);
		if ($('.autorateinfo').length) {
			var s = 60;
			interv = setInterval(function(){
				s--;
				if ($('.autorateinfo').length) {
					$('.autoratetime span').html(('0' + s).slice(-2));
					if (s==0) {
						s = 60;
						var code = $('input[name="order"]').val();
						$.get('/paymentstep2', {code: code}, function(data) {
							if (data != 'Error 1') $('#steps_in').html(data).removeClass('loading');
						});
					}
				}
			}, 1000);
		}
	}
	if ($('.transactionsearch__section').hasClass('active')) {
		$('.RequisitesThree__main').remove();
		$('.transactionsearch__section').show();
	}
	process();
	updateRate();
	$('body').delegate('#paymentChangeBtn', 'click', function(){
		$('#steps_in').addClass('loading');
		$('#paymentChange').removeClass('show');
		$('body').removeClass('open_modal');
		var code = $('input[name="order"]').val();
		setCookie('payment' + code, 0, 999);
		setCookie('process' + code, false, 999);
		$.get('/paymentchange', {code: code}, function(data) {
			$('#steps_in').html(data).removeClass('loading');
		});
		return false;
	});
	$('body').delegate('.requisitesTwotextUpInputFormValueSum', 'click', function(event){
		var $tmp = $("<textarea>");
		$("body").append($tmp);
		$tmp.val($(this).find('.sum').text().replace(/[\t]+/g, '').trim()).select();
		document.execCommand("copy");
		$tmp.remove();
		copySuccess();
		return false;
	});
	if ($('[data-time]').length) {
		var distance = parseInt($('[data-time]').data('time'));
		var _second = 1;
		var _minute = _second * 60;
		var _hour = _minute * 60;
		var _day = _hour * 24;
		var timer;
		function showRemaining() {
			distance = distance - 1;
			if (distance < 0) {
				clearInterval(timer);
				return;
			}
			var hours = Math.floor((distance % _day) / _hour);
			var minutes = Math.floor((distance % _hour) / _minute);
			var seconds = Math.floor((distance % _minute) / _second);
			$('.stampTime').html(char2(hours) + ':' + char2(minutes) + ':' + char2(seconds));
		}
		timer = setInterval(showRemaining, 1000);
		function char2(num){
			return ((num < 10) ? '0' : '') + num;
		}
	}
	if ($('.transactionsearch__texth3').length) {
		transactionsearchText();
	}
	function transactionsearchText(){
		var c = $('.transactionsearch__texth3').length;
		setInterval(function(){
			var i = $('.transactionsearch__texth3.active').index() + 1;
			if (i == c) i = 0;
			$('.transactionsearch__texth3').removeClass('active');
			$('.transactionsearch__texth3').eq(i).addClass('active');
		}, 5000);
	}
	$('body').on('mousemove', '.btn_hover', function(e){
		var x = e.pageX - $(this).offset().left;
		var y = e.pageY - $(this).offset().top;
		$(this).css({'--x': `${ x }px`, '--y': `${ y }px`});
	});
	$('.link_anim_span').each(function(){
		$(this).html('<span>' + $(this).text().split(' ').join('&ensp;</span><span>') + '</span>');
	});
	$(document).on({
		mouseenter: function () {
			var top = $(this).offset().top;
			var left = $(this).offset().left + $(this).outerWidth() / 2;
			$('body').append('<div class="tooltipfixed" style="position:absolute;z-index:1000;top:'+ top +'px;left:'+ left +'px;">'+ $(this).data('title') +'</div>');
			var t = $('.tooltipfixed');
			if (t.offset().left + t.outerWidth() > $(window).width()) {
			t.css({left: $(window).width() - t.outerWidth() + t.outerWidth() / 2});
		}
		if (t.offset().left < 0) {
			t.css({left: t.outerWidth() / 2});
		}
		},
		mouseleave: function () {
			$('.tooltipfixed').remove();
		}
	}, '.tooltip');
});
