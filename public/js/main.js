$(function () {
    if ($('textarea#ta').length) {
        CKEDITOR.replace('ta');
    }

    $('a.confirmDelete').on('click', function () {
        if (!confirm('Confirm delete'))
            return false;
    });

    if ($("[data-fancybox]").length){
        $("[data-fancybox]").fancybox();
    }
});