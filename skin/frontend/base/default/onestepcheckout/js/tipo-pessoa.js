/////////////////////////////////////////////////////////////////////////////////
/*TIPO PESSSOA*/
/////////////////////////////////////////////////////////////////////////////////
function setTipopessoaArea() {
}


!function ($) {    
    if(!document.body){
        var fn = arguments.callee;
        return setTimeout(function(){
            fn($);
        },100);
    }
    if ($('[data-tipo_pessoa_scope]').length) {        
        $(document).on('change', '[data-tipo_pessoa_scope] [name*=tipopessoa]', function (evt) {
            var $wrapper = $(this).parents('[data-tipo_pessoa_scope]').first();
            $wrapper.removeClass('pessoa-jurica')
                    .removeClass('pessoa-fisica');

            var val = $(this).val();
            val = ($.isNumeric(val)) ? this.options[this.selectedIndex].innerText : val;
            if (val.indexOf('Jurídica') > -1) {
                $wrapper.addClass('pessoa-jurica');
            } else {
                $wrapper.addClass('pessoa-fisica');
            }

        });
    }//length
}(jQuery);

