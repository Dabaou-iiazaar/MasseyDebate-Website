var sections = ["cover", "about", "faq", "schedule", "sponsors", "team"];

$(document).ready(function(){

    $('a.scrollLink').click(function(){
        var href = $(this).attr('href');
        var anchor = $(href).offset();
        $('body').animate({ scrollTop: anchor.top-50 });
        return false;
    });

    $('#mc-embedded-subscribe').click(function() {
        var email = $('#mce-EMAIL').val()
        $.ajax({
            url: './php/emailSub.php',
            type: 'POST',
            data: {
                email: email
            },
            success: function (msg) {
                swal({
                    title: '<svg class=\"checkmark\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 52 52\"><circle class=\"checkmark__circle\" cx=\"26\" cy=\"26\" r=\"25\" fill=\"none\"/><path class=\"checkmark__check\" fill=\"none\" d=\"M14.1 27.2l7.1 7.2 16.7-16.8\"/></svg>',
                    text: '<big>Subscribed!</big>',
                    html: true
                });

            }
        });
    });

    function updateScroll() {

        $(".right-nav").css("margin-right", $("#mlh-trust-badge-cover").width() + 5 + "px");

        var opacity;
        var dist = $("#about").offset().top - $(window).scrollTop();

        if (dist > 0) {
            opacity = 0.8 * (1 - dist / $("#about").offset().top);
        }
        else  {
            opacity = 0.8;
        }

        $("#mainnav").css("background", "rgba(49, 60, 75, " + opacity + ")");


        // Time for the noice background changer
        for (var i = 0; i < sections.length; i++)
        {
            if ((true) && ($(window).scrollTop() >= $("#" + sections[i]).offset().top)) {
                $("#cover").removeClass();
                $("#cover").addClass(sections[i] + "-image");
                $("#cover").css("background-position-y", $("#" + sections[i]).offset().top - 1 * ($(window).scrollTop() - $("#" + sections[i]).offset().top) / 2);
            }
        }
    }

    $(".navsocial").css("height", $("#mainnav").height() / 2);

    $(document).on('resize', updateScroll);
    $(document).scroll(updateScroll);
    updateScroll();
});