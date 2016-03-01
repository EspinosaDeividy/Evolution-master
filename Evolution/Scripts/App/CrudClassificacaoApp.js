$(function () {
    Listar();
});


function LimparFormulario() {
    $('#formDados').each(function () {
        this.reset();
    });
}

function Mensagem(stringCss, mensagem) {
    $("#mensagem").remove();

    setTimeout(function () {
        $('#formDados').append("<div class='alert alert-" + stringCss + "' id=mensagem role=alert>" + mensagem + "</div>");
    }, 10);
}

function ValidaDados() {
    if ($('#Descricao').val() == "") {
        Mensagem("danger", "Informe uma descrição!");
        return false;
    }
    return true;
}


/*var objectController = new XMLHttpRequest();
objectController.addEventListener("progress", updateProgress, false);
objectController.addEventListener("load", transferComplete, false);
objectController.addEventListener("error", transferFailed, false);
objectController.addEventListener("abort", transferCanceled, false);
objectController.open();

function updateProgress(oEvent) {
    if (oEvent.lengthComputable) {
        var percentComplete = oEvent.loaded / oEvent.total;
        $("#progress-bar").progress
    } else {
        // Não é possível calcular informações de progresso uma vez que a dimensão total é desconhecida
    }
}

function transferComplete(evt) {
    alert("A transferência foi concluída.");
}

function transferFailed(evt) {
    alert("Um erro ocorreu durante a transferência do arquivo.");
}

function transferCanceled(evt) {
    alert("A transferência foi cancelada pelo usuário.");
}*/



//function Cadastrar() {
//    var validacaoOK = ValidaDados();
//    if (validacaoOK) {
//        var dadosSerializados = $('#formDados').serialize();
//        $.ajax({
//            url: '/Classificacao/Create',
//            type: 'POST',
//            xhr: function () {
//                var xhr = $.ajaxSettings.xhr();
//                if (xhr.upload) {
//                    xhr.upload.addEventListener('progress', function (evt) {
//                        var percent = (evt.loaded / evt.total) * 100;
//                        $(".progress-bar").width(percent + "%");
//                    }, false);
//                }
//                return xhr;
//            },
//            success: function (data) {
//                $('.progress-bar').removeClass('progress-bar-striped').addClass('progress-bar-success');
//                $('.current-value').text('DONE');
//            },
//            error: function () {
//                $('.progress-bar').removeClass('progress-bar-striped').addClass('progress-bar-danger');
//                $('.current-value').text('Fail');
//            },
//            data: dadosSerializados,
//            cache: false,
//            contentType: false,
//            processData: false
//        }, 'json');
//    }
//}



function Cadastrar() {
    var validacaoOK = ValidaDados();
    if (validacaoOK) {
        var dadosSerializados = $('#formDados').serialize();
        $.ajax({
            type: "POST",
            url: "/Classificacao/Create",
            data: dadosSerializados,
            success: function (classificacaoOK) {
                if (classificacaoOK) {
                    Listar();
                    Mensagem("success", "Cadastrado com Sucesso!");
                } else {
                    Mensagem("danger", "Classificação já cadastrada!");
                }
            },
            error: function () {
                Mensagem("danger", "Erro ao cadastrar!");
            }
            //},
            //progress: function (e) {
            //    //make sure we can compute the length
            //    if (e.lengthComputable) {
            //        //calculate the percentage loaded
            //        var pct = (e.loaded / e.total) * 100;

            //        //log percentage loaded
            //        alert(pct);
            //    }
            //        //this usually happens when Content-Length isn't set
            //    else {
            //        console.warn('Content Length not reported!');
            //    }
            //}
        });
    }
}


function Listar() {
    LimparFormulario();
    $.ajax({
        type: "GET",
        url: "/Classificacao/Listar",
        success: function (dadosClassificacao) {

            if (dadosClassificacao.length == 0) {
                $('table').addClass('hidden');
            }
            else {
                $('table').removeClass('hidden');

                $('#tbody').children().remove();
                $(dadosClassificacao).each(function (i) {
                    var tbody = $('#tbody');
                    var tr = "<tr>";
                    tr += "<td>" + dadosClassificacao[i].ClassificacaoID;
                    tr += "<td>" + dadosClassificacao[i].Descricao;
                    tr += "<td>" + "<button class='btn btn-info' onclick=Editar(" + dadosClassificacao[i].ClassificacaoID + ")>" + "Editar";
                    tr += "<td>" + "<button class='btn btn-danger' onclick=Deletar(" + dadosClassificacao[i].ClassificacaoID + ")>" + "Remover";
                    tbody.append(tr);
                });
            }
        }
    });
}


function Deletar(ClassificacaoID) {
    var confirmar = confirm("Deseja Realmente Remover esta Classificação ?");
    if (confirmar) {
        $.ajax({
            type: 'POST',
            url: "/Classificacao/Delete",
            data: { id: ClassificacaoID },
            success: function () {
                Listar();
                Mensagem("success", "Removido com sucesso!");
            },
            error: function () {
                Mensagem("danger", "Erro ao Deletar!");
            }
        });
    }
}


function Editar(ClassificacaoID) {
    $.ajax({
        type: 'GET',
        url: '/Classificacao/Edit',
        data: { id: ClassificacaoID },
        success: function (dadosClassificacao) {
            $('#ClassificacaoID').val(dadosClassificacao.ClassificacaoID);
            $('#Descricao').val(dadosClassificacao.Descricao);
            $("#salvar").addClass("hidden");
            $("#atualizar").removeClass("hidden");
        }
    });
}


function Atualizar() {
    var validacaoOK = ValidaDados();
    if (validacaoOK) {
        var dadosSerializados = $('#formDados').serialize();
        $.ajax({
            type: "POST",
            url: "/Classificacao/Atualizar",
            data: dadosSerializados,
            success: function () {
                $("#salvar").removeClass("hidden");
                $("#atualizar").addClass("hidden");
                Listar();
            },

            error: function myfunction() {
                alert("Erro!");
            }
        });
    }
}