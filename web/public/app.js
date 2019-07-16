$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const users = JSON.parse(localStorage.getItem('users')) || [];
var isAuthenticated = localStorage.getItem('isAuthenticated');
//const devices = JSON.parse(localStorage.getItem('devices')) || [];
//const response = $.get('http://localhost:3001/devices');
//	console.log(response);

$.get('http://localhost:3001/devices')
.then(response => {
	response.forEach(device => {
		$('#devices tbody').append(`
			<tr>
				<td>${device.user}</td>
				<td>${device.name}</td>
			</tr>`
		);
	});
})
.catch(error => {
	console.error(`Error: ${error}`);
});



/*devices.forEach(function(device) {
	$('#devices tbody').append(`
		<tr>
			<td>${device.user}</td>
			<td>${device.name}</td>
		</tr>`
	);
});
*/


$('#add-device').on('click', () => {
const name = $('#name').val();
const user = $('#user').val();
const sensorData = [];

const body = {
	name,
	user,
	sensorData
};
	$.post('http://localhost:3001/devices', body)
	.then(response => {
		location.href = '/';
	})
	.catch(error => {
		console.error(`Error: ${error}`);
	});	
});

/*$('#add-device').on('click', function() {
	const user = $('#user').val();
	const name = $('#name').val();
	devices.push({ user, name });
	localStorage.setItem('devices', JSON.stringify(devices));
	location.href = '/';
});
*/

$('#add-user').on('click', function() {
	
	const username = $('#username').val();
	const passwordinput = $('#passwordinput').val();
	const confirmpassword = $('#confirmpassword').val();
	
	const exists = users.find(user => user.username === username);
	
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
	
	const exists = users.find(user => user.username === username);
	
	if(exists){
		users.find(user => {
			if(user.username===username && user.passwordinput === password){
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