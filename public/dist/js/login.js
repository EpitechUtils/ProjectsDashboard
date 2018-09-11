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
    $('#blih_login').submit(function(event) {
        let fields = $(this).serializeObject();
        if (!fields.email || !fields.password) {
            $('#message')
                .html(generateAlert(null, 'Des champs requis sont vides.', 'danger'))
                .fadeIn('slow');
            event.preventDefault();
            return;
        } else if (!isValidEpitechEmail(fields.email)) {
            $('#message')
                .html(generateAlert(null, 'L\'email n\'est pas une adresse Epitech.', 'danger'))
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
            success: function(res) {
                let data = JSON.parse(res);
                let messageElement = $('#message');

                // Error occured on POST method
                if (data.error) {
                    messageElement
                        .html(generateAlert(null, data.error, 'danger'))
                        .fadeIn('slow');
                    event.preventDefault();
                    return;
                }

                messageElement
                    .html(generateAlert(null, '<i class="fa fa-spinner fa-spin"></i> Redirection vers Office365...', 'success'))
                    .fadeIn('slow');
            },
            error: function(err) {
                $('#message')
                    .html(generateAlert(null, 'Erreur lors de la connexion: ' + err + '.', 'danger'))
                    .fadeIn('slow');
            }
        });
        event.preventDefault();
    });

})(jQuery);