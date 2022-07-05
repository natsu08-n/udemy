const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = "form-control error"; //クラス名を上書き
	const small = formControl.querySelector("small"); //smallタグ
	small.innerText = message;
	console.log(formControl);
}

function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
	console.log(formControl);
}

function isValidEmail(email) {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	return re.test(String(email).toLowerCase()); //マッチすればtrueを返す、小文字に変換
}

//Check required fields
function checkRequired(inputArr) {
	inputArr.forEach(function (input) {
		if (input.value.trim() === "") {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
}

//Get fieldName
function getFieldName(input) {
	//テキストの最初の文字だけ大文字にしたい場合、charAtとtoUpperCaseとsliceを組み合わせる
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
	e.preventDefault();

	checkRequired([username, email, password, password2]);
});
