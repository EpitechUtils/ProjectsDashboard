/* eslint-disable */
'use strict';

(function($) {

    // Remember Me checkbox
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%'
    });


    // Blih login form
    // TODO: No send password in brut
    $('#blih_login').submit(function(event) {
        let fields = $(this).serializeObject();
        let msg = $('#message');

        if (!fields.email || !fields.password) {
            msg.html(generateAlert(null, 'Des champs requis sont vides.', 'danger'))
                .fadeIn('slow');
            event.preventDefault();
            return;
        } else if (!isValidEpitechEmail(fields.email)) {
            msg.html(generateAlert(null, 'L\'email n\'est pas une adresse Epitech.', 'danger'))
                .fadeIn('slow');
            event.preventDefault();
            return;
        }

        // Call ajax login call and redirect to office365 url in new page
        // for epitech login
        $.ajax({
            url: '/login',
            type: 'POST',
            data: $(this).serializeObject(),
            success: function(data) {
                // Error occured on POST method
                if (!data.success) {
                    msg.html(generateAlert(null, data.error, 'danger'))
                        .fadeIn('slow');
                    return;
                }

                msg.html(generateAlert(null, '<i class="fa fa-spinner fa-spin"></i> Redirection vers Office365...', 'success'))
                    .fadeIn('slow');
                let opened = window.open(data.redirect, '', "height=750,width=1250,scrollbars=1,resizable=1,location=1");
                setTimeout(() => opened.close(), 5000); // TODO: onHashChangeEvent
            },
            error: function() {
                $('#message').html(generateAlert(null, 'Erreur lors de la connexion.', 'danger'))
                    .fadeIn('slow');
            }
        });

        event.preventDefault();
    });

})(jQuery);