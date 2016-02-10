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
    if ($('#Nome').val() == "") {
        Mensagem("danger", "Informe um Nome!");
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
            url: "/Usuarios/Create",
            data: dadosSerializados,
            success: function (usuarioOK) {

                if (usuarioOK) {
                    Listar();
                    Mensagem("success", "Cadastrado com Sucesso!");
                } else {
                    Mensagem("danger", "Usuário já cadastrado!");
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
        url: "/Usuarios/Listar",
        success: function (dadosUsuarios) {

            if (dadosUsuarios.length == 0) {
                $('table').addClass('hidden');
            }
            else {
                $('table').removeClass('hidden');

                $('#tbody').children().remove();
                $(dadosUsuarios).each(function (i) {
                    var tbody = $('#tbody');
                    var tr = "<tr>";
                    tr += "<td>" + dadosUsuarios[i].UsuarioID;
                    tr += "<td>" + dadosUsuarios[i].Nome;
                    tr += "<td>" + "<button class='btn btn-info' onclick=Editar(" + dadosUsuarios[i].UsuarioID + ")>" + "Editar";
                    tr += "<td>" + "<button class='btn btn-danger' onclick=Deletar(" + dadosUsuarios[i].UsuarioID + ")>" + "Remover";
                    tbody.append(tr);
                });
            }
        }
    });
}


function Deletar(UsuarioID) {
    var confirmar = confirm("Deseja Realmente Remover este Usuário ?");
    if (confirmar) {
        $.ajax({
            type: 'POST',
            url: "/Usuarios/Delete",
            data: { id: UsuarioID },
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


function Editar(UsuarioID) {
    $.ajax({
        type: 'GET',
        url: '/Usuarios/Edit',
        data: { id: UsuarioID },
        success: function (dadosUsuarios) {
            $('#UsuarioID').val(dadosUsuarios.UsuarioID);
            $('#Nome').val(dadosUsuarios.Nome);
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
            url: "/Usuarios/Atualizar",
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