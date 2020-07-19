const registerBtn = document.getElementById('registerBtn');
const userNameInput = document.getElementById('userName');

registerBtn.addEventListener('click', login);
document.addEventListener('keyup', (e) => {
	if (e.key == 'ENTER' || e.keyCode == 13) {
		login();
	}
});

async function login() {
	let userName = userNameInput.value.toLowerCase();
	userName.replace(' ', '_');
	const res = await fetch('/data', {
		method: 'POST',
		mode: 'cors',
		redirect: 'follow',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userName }),
	});
	const data = await res.json();
	if (data.userName !== userName) return console.log(data.userName, userName);
	console.log('trying to redirect now');
	window.location.href = `/${userName}`;
}
