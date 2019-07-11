$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const devices = JSON.parse(localStorage.getItem('devices')) || [];
const users = JSON.parse(localStorage.getItem('users')) || [];
var isAuthenticated = localStorage.getItem('isAuthenticated');

devices.forEach(function(device) {
	$('#devices tbody').append(`
		<tr>
			<td>${device.user}</td>
			<td>${device.name}</td>
		</tr>`
	);
});

$('#add-device').on('click', function() {
	const user = $('#user').val();
	const name = $('#name').val();
	devices.push({ user, name });
	localStorage.setItem('devices', JSON.stringify(devices));
	//console.log(devices);
	location.href = '/';
});

$('#add-user').on('click', function() {
	
	const username = $('#username').val();
	const passwordinput = $('#passwordinput').val();
	const confirmpassword = $('#confirmpassword').val();
	
	const exists = users.find(users => users.username === username);
	
	//const exists = users.find((user) => {
	//	return user.username === username;
	//});
	
	if(exists){
		alert("User exists");
		location.reload();
	}else{
		if (passwordinput === confirmpassword){
			users.push({ username, passwordinput });
			localStorage.setItem('users', JSON.stringify(users));
			alert("User added");
			location.href = '/login';
		} else{
			alert("Passwords did not match");
			location.reload();
		}
	}

});

$('#login').on('click', function() {
	
	const username = $('#username').val();
	const password = $('#password').val();
	
	var passwordMatch=false;
	
	const exists = users.find(users => users.username === username);
	
	if(exists){
		users.find(users => {
			if(users.username===username && users.passwordinput === password){
				passwordMatch=true;
			}
		});
		
		if(passwordMatch){
			localStorage.setItem('isAuthenticated', true);
			location.href = '/';
		}else{
			localStorage.removeItem('isAuthenticated');  //testing
			alert("Incorrect Password");
		}
	}else{
		alert("User does not exist");
	}
});

$('#send-command').on('click', function() {
	const command = $('#command').val();
	console.log(`command is: ${command}`);
});

const logout = () => {
	localStorage.removeItem('isAuthenticated');
	location.href = '/login';
}