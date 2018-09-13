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

        if (!fields.email || !fields.password || !fields.autologin) {
            msg.html(generateAlert('Erreur rencontrée !', 'Des champs requis sont vides.', 'danger'))
                .fadeIn('slow');
            event.preventDefault();
            return;
        } else if (!isValidEpitechEmail(fields.email)) {
            msg.html(generateAlert('Erreur rencontrée !', 'L\'email n\'est pas une adresse Epitech.', 'danger'))
                .fadeIn('slow');
            event.preventDefault();
            return;
        } else if (!fields.autologin.startsWith('https://intra.epitech.eu/auth-')) {
            msg.html(generateAlert('Erreur rencontrée !', 'Lien d\'autologin invalide.', 'danger'))
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
                    msg.html(generateAlert('Erreur rencontrée !', data.error, 'danger'))
                        .fadeIn('slow');
                    return;
                }

                msg.html(generateAlert('Tout s\'est passé comme prévu !', '<i class="fa fa-spinner fa-spin"></i> Connexion en cours...', 'success'))
                    .fadeIn('slow');

                setTimeout(() => window.location.href = window.location.href = '/', 1300);
            },
            error: function() {
                $('#message').html(generateAlert('Erreur rencontrée !', 'Erreur lors de la connexion.', 'danger'))
                    .fadeIn('slow');
            }
        });

        event.preventDefault();
    });

})(jQuery);