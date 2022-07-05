$(document).ready(function () {
	$('#subject').ikSelect(
	{
		ddFullWidth: false,
		autoWidth: false,
		dynamicWidth: false,
		equalWidths: false
	});
	
	$('input').focus(function () {
		if ($(this).val().length == 0) {
			$(this).val('');
		}
	})
	
	$('#phone').mask('(999) 999-9999');
	
	$('#username, #subjects, #phone, #email, #comment').keyup(function () {
		var flag = true;
		if ($(this).val.length == 0) {
			flag &= false;
		}
		if ($(this).attr('id') == 'phone' && $(this).val().indexOf('_') != -1) {
			flag &= false;
		} else if ($(this).attr('id') == 'email' && !checkmail($('#email').val())) {
			flag &= false;
		}
			
		if (flag) {
			$(this).removeClass('error');
		}
	});
	
	$('#submit').click(function () {
		var flag = true;
		if ($('#username').val().length == 0) {
			$('#username').addClass('error');
			flag &= false;
		} else {
			$('#username').removeClass('error');
			flag &= true;
		}
		
		if ($('#phone').val().length == 0) {
			$('#phone').addClass('error');
			flag &= false;
		} else {
			$('#phone').removeClass('error');
			flag &= true;
		}
		
		if ($('#subjects').val().length == 0) {
			$('#subjects').addClass('error');
			flag &= false;
		} else {
			$('#subjects').removeClass('error');
			flag &= true;
		}
		
		if (!checkmail($('#email').val()) || $('#email').val().length == 0) {
			$('#email').addClass('error');
			flag &= false;
		} else {
			$('#email').removeClass('error');
			flag &= true;
		}
		
		if ($('#comment').val().length == 0) {
			$('#comment').addClass('error');
			flag &= false;
		} else {
			$('#comment').removeClass('error');
			flag &= true;
		}
	
		if (flag) {
			$('#myForm').submit();
		} else {
			 $('html, body').animate({scrollTop:0}, 'slow');
		}
		
		return false;
	});
});

function checkmail(value) {
		reg = /^((([a-z]|[A-Z]|[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+(\.([a-z]|[A-Z]||[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+)*)@((((([a-z]|[A-Z]||[0-9])([a-z]|[A-Z]||[0-9]|\-){0,61}([a-z]|[A-Z]||[0-9])\.))*([a-z]|[A-Z]||[0-9])([a-z]|[A-Z]||[0-9]|\-){0,61}([a-z]|[A-Z]||[0-9])\.)[\w]{2,4}|(((([0-9]){1,3}\.){3}([0-9]){1,3}))|(\[((([0-9]){1,3}\.){3}([0-9]){1,3})\])))$/;
		if (!value.match(reg)) {
			return false;
		} else {
			return true;
		}
	}
