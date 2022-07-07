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
}

function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
}

function checkEmail(input) {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	//return re.test(String(email).toLowerCase()); //マッチすればtrueを返す、小文字に変換

	//正規表現でチェック
	if (re.test(input.value.trim())) {
		//input欄に入力された値が先頭半角入っていても大丈夫なように
		showSuccess(input);
	} else {
		showError(input, `Email is not valid`);
	}
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
//check input length
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		);
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
		);
	} else {
		showSuccess(input);
	}
}

//Check passwords match
function checkPasswordsMatch(input1, input2) {
	if (input1.value != input2.value) {
		showError(input2, "Passwords do not match");
	}
}

//Get fieldName
function getFieldName(input) {
	//テキストの最初の文字だけ大文字にしたい場合、charAtとtoUpperCaseとsliceを組み合わせる
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
	e.preventDefault();

	checkRequired([username, email, password, password2]);
	checkLength(username, 3, 15);
	checkLength(password, 6, 25);
	checkEmail(email);
	checkPasswordsMatch(password, password2);
});
