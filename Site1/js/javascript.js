jQuery(document).ready(function($){
	var body = $("html, body");

    $("#top_menu .logo").click(function(){
		body.animate({scrollTop:0}, '400', 'swing', function() {});
		return false;
	});

	$("#top_menu .menu li a").click(function(){
		block = $(this).attr('id').split('-').pop();
		body.animate({
			scrollTop: $("#" + block).offset().top
		},
		'400', 'swing', function() {});
		return false;
	});
    $('.jcarousel')
        .jcarousel({
            wrap: 'circular'
        })
        .jcarouselAutoscroll({
            interval: 5000,
            target: '+=1',
            autostart: true
        });
    $('.jcarousel-pagination')
    .on('jcarouselpagination:active', 'a', function() {
        $(this).addClass('active');
    })
    .on('jcarouselpagination:inactive', 'a', function() {
        $(this).removeClass('active');
    })
    .jcarouselPagination({
        item: function(page) {
            return '<a href="#' + page + '" class="scrollPagination"></a>';
        }
    });

    $('.brands').jcarousel({
        wrap: 'circular'
    });
    $('.brands .prev').jcarouselControl({
        target: '-=1'
    });

    $('.brands .next').jcarouselControl({
        target: '+=1'
    });

    $(document).on('mouseover', '.brands .item', function() {
        var newBgImage = $(this).find('.hidden').css('background-image');
        var oldBgImage = $(this).css('background-image');
        var id = $(this).attr('data-id');
        $(this).css('background-image', newBgImage);
        $(this).find('.hidden').css('background-image', oldBgImage);
        $(this).find('.hidden').css('background-image', oldBgImage);
        $('#cover_0').stop(true, true).fadeOut('fast');
        $('#cover_'+id).stop(true, true).fadeIn('fast');
    })
    .on('mouseout', '.brands .item', function() {
        var newBgImage = $(this).find('.hidden').css('background-image');
        var oldBgImage = $(this).css('background-image');
        var id = $(this).attr('data-id');
        $(this).css('background-image', newBgImage);
        $(this).find('.hidden').css('background-image', oldBgImage);
        $('#cover_' + id).stop(true, true).fadeOut('fast');
        $('#cover_0').stop(true, true).fadeIn('fast');
    });

    $('#orderPopup').dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        draggable: false,
        width: '380px',
        closeText: '',
        open: function () {
            $('body').css({'overflow':'hidden', 'margin-right':'17px'})
        },
        close: function () {
            $('body').css({'overflow':'auto', 'margin-right':'0'})
        }
    });

    $('.orderPopupView').click(function (e) {
        e.preventDefault();
        $('#orderPopup').dialog('open');
    });

    jQuery.validator.addMethod(
        'regexp',
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );
    var validate = {
        rules: {
            name: {
                required: true,
                regexp: '^[а-яА-Я]+$'
            },
            company: {
                required: true
            },
            phone: {
                required: true,
                regexp: '^[0-9-\(\)\+]+$'
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: 'Пожалуйста введите имя',
                regexp: 'Допустимы лишь русские буквы'
            },
            company: {
                required: 'Пожалуйста введите название компании'
            },
            phone: {
                required: 'Пожалуйста введите номер телефона',
                regexp: 'Допустимы лишь цифры и символы: ( ) + -'
            },
            email: {
                required: 'Пожалуйста введите e-mail',
                email: 'Не корректный e-mail'
            }
        }
    };
    $('.validate').validate(validate);
    $('.validate2').validate(validate);
    $('.validate3').validate(validate);

    $('.submit').click(function (e){
        e.preventDefault();
        var form = $(this).parents('.form').find('form');
        if ($(form).valid()) {
            $.ajax({
                type: 'POST',
                url: '/ajaxOrder.php',
                data: $(form).serialize(),
                success: function (data){
                    console.info(data);
                }
            });
        }
    });
});
