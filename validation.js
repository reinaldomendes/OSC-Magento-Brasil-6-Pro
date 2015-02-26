jQuery.noConflict();
function mascara(o, f) {
//    v_obj = o
//    v_fun = f
//    setTimeout("execmascara()", 1)
}
//function execmascara() {
//    v_obj.value = v_fun(v_obj.value)
//}
function mdocumento(v) {
    v = v.replace(/\D/g, "");
    if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
        v = v.replace(/^(\d{2})(\d)/, "$1.$2");
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
        v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }
    return v;
}
function mdata(v) {
    v = v.replace(/\D/g, "")
    v = v.replace(/(\d{2})(\d)/, "$1/$2")
    v = v.replace(/(\d{2})(\d)/, "$1/$2")
    return v
}
function mtel(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v;
}
function sonumeros(v) {
    v = v.replace(/\D/g, "");
    return v;
}
function checkMail(mail) {
    var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if (typeof (mail) == "string") {
        if (er.test(mail)) {
            return true;
        }
    } else if (typeof (mail) == "object") {
        if (er.test(mail.value)) {
            return true;
        }
    }
    return false;
}
function PulaCampo(fields) {
    if (fields.value.length == fields.maxLength) {
        for (var i = 0; i < fields.form.length; i++) {
            if (fields.form[i] == fields && fields.form[(i + 1)] && fields.form[(i + 1)].type != "hidden") {
                fields.form[(i + 1)].focus();
                break;
            }
        }
    }
}
function validaCPF(cpf, pType) {
    var cpf_filtrado = "", valor_1 = " ", valor_2 = " ", ch = "";
    var valido = false;
    for (i = 0; i < cpf.length; i++) {
        ch = cpf.substring(i, i + 1);
        if (ch >= "0" && ch <= "9") {
            cpf_filtrado = cpf_filtrado.toString() + ch.toString()
            valor_1 = valor_2;
            valor_2 = ch;
        }
        if ((valor_1 != " ") && (!valido))
            valido = !(valor_1 == valor_2);
    }
    if (!valido)
        cpf_filtrado = "12345678912";
    if (cpf_filtrado.length < 11) {
        for (i = 1; i <= (11 - cpf_filtrado.length); i++) {
            cpf_filtrado = "0" + cpf_filtrado;
        }
    }
    if (pType <= 1) {
        if ((cpf_filtrado.substring(9, 11) == checkCPF(cpf_filtrado.substring(0, 9))) && (cpf_filtrado.substring(11, 12) == "")) {
            return true;
        }
    }
    if ((pType == 2) || (pType == 0)) {
        if (cpf_filtrado.length >= 14) {
            if (cpf_filtrado.substring(12, 14) == checkCNPJ(cpf_filtrado.substring(0, 12))) {
                return true;
            }
        }
    }
    return false;
}
function checkCNPJ(vCNPJ) {
    var mControle = "";
    var aTabCNPJ = new Array(5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
    for (i = 1; i <= 2; i++) {
        var mSoma = 0;
        for (j = 0; j < vCNPJ.length; j++)
            mSoma = mSoma + (vCNPJ.substring(j, j + 1) * aTabCNPJ[j]);
        if (i == 2)
            mSoma = mSoma + (2 * mDigito);
        var mDigito = (mSoma * 10) % 11;
        if (mDigito == 10)
            mDigito = 0;
        var mControle1 = mControle;
        mControle = mDigito;
        aTabCNPJ = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3);
    }
    return((mControle1 * 10) + mControle);
}
function checkCPF(vCPF) {
    var mControle = ""
    var mContIni = 2, mContFim = 10, mDigito = 0;
    for (j = 1; j <= 2; j++) {
        var mSoma = 0;
        for (i = mContIni; i <= mContFim; i++)
            mSoma = mSoma + (vCPF.substring((i - j - 1), (i - j)) * (mContFim + 1 + j - i));
        if (j == 2)
            mSoma = mSoma + (2 * mDigito);
        mDigito = (mSoma * 10) % 11;
        if (mDigito == 10)
            mDigito = 0;
        var mControle1 = mControle;
        mControle = mDigito;
        mContIni = 3;
        mContFim = 11;
    }

    return((mControle1 * 10) + mControle);
}
function buscaCep(quale) {

    if (!quale) {
        var cep = jQuery('input[name*="postcode"]').val();
        if (cep != '' && cep.length == 8) {
            // loadposthideshow(true, '.postcod-process');
            jQuery.getScript("/onestepcheckout/ajax/busca_cep?cep=" + cep + "", function () {
                //loadposthideshow(false, '.postcod-process');
                if (resultadoCEP["resultado"] != 0) {
                    jQuery('input[name*="street[]"]').val(unescape(resultadoCEP["tipo_logradouro"]) + " " + unescape(resultadoCEP["logradouro"]));
                    jQuery('input[name*="street[4]"]').val(unescape(resultadoCEP["bairro"]));
                    jQuery('input[name*="city"]').val(unescape(resultadoCEP["cidade"]));
                    jQuery('select[name*="region_id"]').find('option').each(function () {
                        if (this.text == estadoBR(unescape(resultadoCEP["uf"]))) {
                            this.selected = true;
                        }
                    });
                    jQuery('input[name*="street[2]"]').focus();
                } else {
                    alert("Endereço não encontrado para o cep ");
                }
            });
        }
    } else {
        var cep = jQuery('input[name*="' + quale + '[postcode]"]').val();
        if (cep != '' && cep.length == 8) {
            // loadposthideshow(true, '.postcod-process');
            jQuery.getScript("/onestepcheckout/ajax/busca_cep?cep=" + cep + "", function () {
                //loadposthideshow(false, '.postcod-process');
                if (resultadoCEP["resultado"] != 0) {
                    jQuery('input[name*="' + quale + '[street][]"]').val(unescape(resultadoCEP["tipo_logradouro"]) + " " + unescape(resultadoCEP["logradouro"]));
                    jQuery('input[name*="' + quale + '[street][4]"]').val(unescape(resultadoCEP["bairro"]));
                    jQuery('input[name*="' + quale + '[city]"]').val(unescape(resultadoCEP["cidade"]));
                    jQuery('select[name*="' + quale + '[region_id]"]').find('option').each(function () {
                        if (this.text == estadoBR(unescape(resultadoCEP["uf"]))) {
                            this.selected = true;
                        }
                    });
                    jQuery('input[name*="' + quale + '[street][2]"]').focus();
                } else {
                    alert("Endereço não encontrado para o cep ");
                }
            });
        }
    }
}
function estadoBR(uf) {
    var estado;
    var obj = {
        'AC': 'Acre',
        'AL': 'Alagoas',
        'AM': 'Amazonas',
        'AP': 'Amapá',
        'BA': 'Bahia',
        'CE': 'Ceará',
        'DF': 'Distrito Federal',
        'ES': 'Espírito Santo',
        'GO': 'Goiás',
        'MA': 'Maranhão',
        'MT': 'Mato Grosso',
        'MS': 'Mato Grosso do Sul',
        'MG': 'Minas Gerais',
        'PA': 'Pará',
        'PB': 'Paraíba',
        'PR': 'Paraná',
        'PE': 'Pernambuco',
        'PI': 'Piauí',
        'RJ': 'Rio de Janeiro',
        'RN': 'Rio Grande do Norte',
        'RO': 'Rondônia',
        'RS': 'Rio Grande do Sul',
        'RR': 'Roraima',
        'SC': 'Santa Catarina',
        'SE': 'Sergipe',
        'SP': 'São Paulo',
        'TO': 'Tocantins'
    };
    jQuery.each(obj, function (key, value) {
        if (key == uf) {
            estado = value;
        }
    });

    return estado;
}
function loadposthideshow(show, classe, eq) {
    if (show) {
        if (eq >= 0) {
            jQuery(classe).eq(eq).show();
        } else {
            jQuery(classe).show();
        }
    } else {
        jQuery(classe).hide();
    }
}


  
////////////////////////////////////////////////////////////////////////////////////////////////
setTimeout(function() {    
    var VALIDATE_EMAIL_EXISTS_ERROR = 'Por favor informe um email válido. Ex: joao@dominio.com.';
    var VALIDATE_TAXVAT_ERROR = 'Este campo é obrigatório';

    Validation.add('validate-email-exist', VALIDATE_EMAIL_EXISTS_ERROR, function (value) {
        if (checkMail(value)) {
            var ok = false;
            var url = BASE_URL + '/onestepcheckout/ajax/check_email/';
            new Ajax.Request(url, {
                method: 'post',
                asynchronous: false,
                parameters: 'email=' + encodeURIComponent(value),
                onSuccess: function (transport) {
                    var obj = response = eval('(' + transport.responseText + ')');
                    validateTrueEmailMsg = obj.status_desc;
                    if (obj.result !== 'clean') {
                        Validation.get('validate-email-exist').error = 'Email já cadastrado';
                        ok = false;
                    } else {
                        ok = true;
                    }
                },
                onComplete: function () {
                    if ($('advice-validate-email-exist-email')) {
                        $('advice-validate-email-exist-email').remove();
                    }
                }
            });
            return ok;
        } else {
            Validation.get('validate-email').error = VALIDATE_EMAIL_EXISTS_ERROR;
        }
    });

    Validation.add('validate-taxvat', VALIDATE_TAXVAT_ERROR, function (value) {
        if (validaCPF(value, 0)) {
            var ok = false;
            var url = BASE_URL + '/onestepcheckout/ajax/check_taxvat/';
            new Ajax.Request(url, {
                method: 'post',
                asynchronous: false,
                parameters: 'taxvat=' + encodeURIComponent(value),
                onSuccess: function (transport) {
                    var obj = response = eval('(' + transport.responseText + ')');
                    validateTrueEmailMsg = obj.status_desc;
                    if (obj.result !== 'clean') {
                        Validation.get('validate-taxvat').error = 'CPF/CNPJ já cadastrado';
                        ok = false;
                    } else {
                        ok = true;
                    }
                },
                onComplete: function () {
                    if ($('advice-validate-taxvat-taxvat')) {
                        $('advice-validate-taxvat-taxvat').remove();
                    }
                }
            });
            return ok;
        } else {
            Validation.get('validate-taxvat').error = 'O CPF/CNPJ informado \xE9 inválido';
        }
    });


    Validation.add('validate-zip-br', 'Por favor insira um CEP válido. por exemplo 12345678.', function (v) {
        return Validation.get('IsEmpty').test(v) || /(^\d{8}$)|(^\d{5}-\d{3}$)/.test(v);
    });
    Validation.add('validate-phone-br', 'Por favor insira um número de telefone válido. por exemplo (xx) x4567-8900.', function (v) {
        return Validation.get('IsEmpty').test(v) || /^(\()?\d{2}(\))?(-|\s)?\d{5}(-|\s)\d{4}|(\()?\d{2}(\))?(-|\s)?\d{4}(-|\s)\d{4}$/.test(v);
    }
    );
});