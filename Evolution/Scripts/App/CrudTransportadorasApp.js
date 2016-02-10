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
    if ($('#NomeRazaoSocial').val() == "") {
        Mensagem("danger", "Informe o Nome/Razão Social!");
        return false;
    }

    if ($('#Endereco').val() == "") {
        Mensagem("danger", "Informe o Endereço!");
        return false;
    }

    if ($('#numero').val() == "") {
        Mensagem("danger", "Informe o Número!");
        return false;
    }

    if ($('#Bairro').val() == "") {
        Mensagem("danger", "Informe o Bairro!");
        return false;
    }

    if ($('#Cidade').val() == "") {
        Mensagem("danger", "Informe a Cidade!");
        return false;
    }

    if ($('#Estado').val() == "") {
        Mensagem("danger", "Informe o Estado!");
        return false;
    }

    if ($('#UsuarioID').val() == 0) {
        Mensagem("danger", "Informe o Usuário");
        return false;
    }

    if ($('#ClassificacaoID').val() == 0) {
        Mensagem("danger", "Informe a Classificação");
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
            url: "/Transportadoras/Create",
            data: dadosSerializados,
            success: function (usuarioOK) {

                if (usuarioOK == "true") {
                    Listar();
                    Mensagem("success", "Cadastrado com Sucesso!");
                } else if (usuarioOK == "exists") {
                    Mensagem("danger", "Transportadora já cadastrada!");
                } else if (usuarioOK == "false") {
                    Mensagem("danger", "Usuário já vinculado a uma transportadora!");
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
        url: "/Transportadoras/Listar",
        success: function (dadosTransportadoras) {

            if (dadosTransportadoras.length == 0) {
                $('table').addClass('hidden');
            }
            else {
                $('table').removeClass('hidden');

                $('#tbody').children().remove();
                $(dadosTransportadoras).each(function (i) {
                    var tbody = $('#tbody');
                    var tr = "<tr>";
                    tr += "<td>" + dadosTransportadoras[i].TransportadoraID;
                    tr += "<td>" + dadosTransportadoras[i].NomeRazaoSocial;
                    tr += "<td>" + dadosTransportadoras[i].Endereco;
                    tr += "<td>" + dadosTransportadoras[i].numero;
                    tr += "<td>" + dadosTransportadoras[i].Bairro;
                    tr += "<td>" + dadosTransportadoras[i].Cidade;
                    tr += "<td>" + dadosTransportadoras[i].Estado;
                    tr += "<td>" + dadosTransportadoras[i].UsuarioID;
                    tr += "<td>" + dadosTransportadoras[i].ClassificacaoID;
                    tr += "<td>" + "<button class='btn btn-info' onclick=Editar(" + dadosTransportadoras[i].TransportadoraID + ")>" + "Editar";
                    tr += "<td>" + "<button class='btn btn-danger' onclick=Deletar(" + dadosTransportadoras[i].TransportadoraID + ")>" + "Remover";
                    tbody.append(tr);
                });
            }
        }
    });
}


function SearchList(carrierName) {
    $.ajax({
        type: 'GET',
        url: "/Transportadoras/SearchListJson",
        data: { NomeRazaoSocial: carrierName },
        success: function (dadosTransportadoras) {

            if (dadosTransportadoras.length == 0) {
                $('table').addClass('hidden');
            }
            else {
                $('table').removeClass('hidden');

                $('#tbody').children().remove();
                $(dadosTransportadoras).each(function (i) {
                    var tbody = $('#tbody');
                    var tr = "<tr>";
                    tr += "<td>" + dadosTransportadoras[i].TransportadoraID;
                    tr += "<td>" + dadosTransportadoras[i].NomeRazaoSocial;
                    tr += "<td>" + dadosTransportadoras[i].Endereco;
                    tr += "<td>" + dadosTransportadoras[i].numero;
                    tr += "<td>" + dadosTransportadoras[i].Bairro;
                    tr += "<td>" + dadosTransportadoras[i].Cidade;
                    tr += "<td>" + dadosTransportadoras[i].Estado;
                    tr += "<td>" + dadosTransportadoras[i].UsuarioID;
                    tr += "<td>" + dadosTransportadoras[i].ClassificacaoID;
                    tr += "<td>" + "<button class='btn btn-info' onclick=Editar(" + dadosTransportadoras[i].TransportadoraID + ")>" + "Editar";
                    tr += "<td>" + "<button class='btn btn-danger' onclick=Deletar(" + dadosTransportadoras[i].TransportadoraID + ")>" + "Remover";
                    tbody.append(tr);
                });
            }
        },
        error: function () {
            Mensagem("danger", "Erro ao Processar Filtro!");
        }
    });
}


function Deletar(TransportadoraID) {
    var confirmar = confirm("Deseja Realmente Remover esta Transportadora ?");
    if (confirmar) {
        $.ajax({
            type: 'POST',
            url: "/Transportadoras/Delete",
            data: { id: TransportadoraID },
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


function Editar(TransportadoraID) {
    $.ajax({
        type: 'GET',
        url: '/Transportadoras/Edit',
        data: { id: TransportadoraID },
        success: function (dadosTransportadoras) {
            $('#TransportadoraID').val(dadosTransportadoras.TransportadoraID);
            $('#NomeRazaoSocial').val(dadosTransportadoras.NomeRazaoSocial);
            $('#Endereco').val(dadosTransportadoras.Endereco);
            $('#numero').val(dadosTransportadoras.numero);
            $('#Bairro').val(dadosTransportadoras.Bairro);
            $('#Cidade').val(dadosTransportadoras.Cidade);
            $('#Estado').val(dadosTransportadoras.Estado);
            $('#UsuarioID').val(dadosTransportadoras.UsuarioID);
            $('#ClassificacaoID').val(dadosTransportadoras.ClassificacaoID);
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
            url: "/Transportadoras/Atualizar",
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