$("#btnEnviar").click(function () {

	// Recupera o usuário.
	var user = $("#user").val();

	if(validaPreenchimentoUsuario(user)){
		$.post("http://www.angelito.com.br/webchat/user", {nickname: user} ,
				function(result){
					// if(result == "OK"){
					// 	alert("Deu certo!");


					// 	$(location).attr('href', 'chat.html');

					// }
					// else {
					// 	alert("Não está cadastrado");
					// }

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
}

function getAllConnectedUsers() {
	
	$.post("http://www.angelito.com.br/webchat/users",
		function(result){

			// Converte o resultado para JSON.
			var allUsersJSON = JSON.parse(result);

			var users = "Usuários conectados: ";

			for (var i = 0; i <= allUsersJSON.length; i++) {
				if(i == allUsersJSON.length){
					users += allUsersJSON[i];
				}
				else{
					users += " | " + allUsersJSON[i];
				}
			}

			$("#connectedUsers").html(users);		
		}
	)
}

