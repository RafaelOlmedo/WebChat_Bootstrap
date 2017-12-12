setInterval(getAllConnectedUsers, 50000);
setInterval(getAllMessages, 30000);

$("#btnEnviar").click(function () {

	// Recupera o usuário.
	var user = $("#user").val();

	if(validaPreenchimentoUsuario(user)){
		$.post("http://www.angelito.com.br/webchat/user", {nickname: user} ,
				function(result){					

					localStorage.setItem("userName", user);

					$(location).attr('href', 'chat.html');
				}
			)
	}
	else
	{
		alert('Favor preencher o usuário.');
		$("#user").removeClass('normalUser');
		$("#user").addClass('noUser');		
	}


}
) // button click

$("#btnDisconnectUsers").click(function() {
	$.get("http://www.angelito.com.br/webchat/reset_users",
		function(result){
			if (result == "Usuários desconectados!") {
				alert("Usuários desconectados com sucesso!");
			}
			else {
				alert("Ocorreu um erro ao desconectar os usuários. :(");
			}
		}
	)
} 
) // button btnDisconnectUsers

$("#btnClearAllMessages").click(function() {
	$.get("http://www.angelito.com.br/webchat/reset_messages",
		function(result){
			if (result == "Mensagens excluídas!") {
				alert("Mensagens excluídas com sucesso!");
			}
			else {
				alert("Ocorreu um erro ao excluir as mensagens. :(");
			}
		}
	)
} 
) // button btnClearAllMessages

$("#user").keydown(function() {

  // Recupera o usuário.
  var user = $("#user").val();

  // Caso não esteja preenchido altera a classe para 'normal'.
  if(user == ""){
  	$("#user").removeClass('noUser');
	$("#user").addClass('normalUser');	
  }
});

function validaPreenchimentoUsuario(user) {
	if(user == ''){
		return false;
	}
	else{
		return true;
	}
}

function loadPage(){

	// Recupera o usuário armazenado no Web Storage pela outra página.
	var connectedUser = localStorage.getItem("userName");

	// Atribui o valor ao span.
	$("#connectedUser").html(connectedUser);

	getAllConnectedUsers();

	getAllMessages();
}

// Recupera todos os usuários conectados.
function getAllConnectedUsers() {
	
	$.get("http://www.angelito.com.br/webchat/users",
		function(result){

			// Converte o resultado para JSON.
			var allUsersJSON = JSON.parse(result);

			var users = "Usuários conectados: ";

			for (var i = 0; i < allUsersJSON.length; i++) {
				if(i == (allUsersJSON.length - 1)){
					users += allUsersJSON[i];
				}
				else{
					users += allUsersJSON[i] + " | ";
				}
			}

			$("#connectedUsers").html(users);		
		}
	)
}

// Recupera todas as mensagens.
function getAllMessages(){

	// Recupera o usuário.
	var user = $("#connectedUser").html();

	$.get("http://www.angelito.com.br/webchat/messages" , {nickname: user} ,
			function(result){

				// Formata os retorno para JSON.
				var allMessagesJSON = JSON.parse(result);

				// Limpa as mensagens.
				$("#messages").html("");

				for (var i = 0; i < allMessagesJSON.length; i++) {
					
					var divClass;

					if (user == allMessagesJSON[i].user) {
						divClass = 'alert alert-info';
					}
					else
						divClass = 'alert alert-light';

					// Div que agrupa as informações de uma única mensagem.
					var divMessage = $(document.createElement('div')).attr('class', divClass).attr('role', 'alert');
					
					// Span para as informações da data e do usuário.
					var spanUser = $(document.createElement('span')).attr('class', 'spanUser');

					// Span para a mensagem.
					var spanMessage = $(document.createElement('span')).attr('class', 'spanMessage');

					// SPAN - DATA + USER.
					$(spanUser).html(" <b> [" +  allMessagesJSON[i].datetime + "] " + allMessagesJSON[i].user + " diz: </b> <br>");

					// SPAN - MESSAGE.
					$(spanMessage).html(allMessagesJSON[i].textmsg);

					// Adiciona os span na div da mensagem.					
					$(spanUser).appendTo(divMessage);
					$(spanMessage).appendTo(divMessage);


					$(divMessage).appendTo("#messages");
				}
			}
		)
}

// Envia a mensagem do usuário.
$("#btnSubmit").click(function (){

	// Recupera o usuário.
	var user = $("#connectedUser").html();

	// Recupera a mensagem.
	var message = $("#inputMessage").val();

	$.post("http://www.angelito.com.br/webchat/send", {nickname: user, textmsg: message} ,
		function(result){
			if(result == "OK"){
				$('#inputMessage').val("");
				
				getAllMessages();
			}
			else{
				alert("Deu ruim!");
			}
		}
		)
	}

	
)


