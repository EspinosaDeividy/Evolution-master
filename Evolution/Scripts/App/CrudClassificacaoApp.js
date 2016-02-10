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