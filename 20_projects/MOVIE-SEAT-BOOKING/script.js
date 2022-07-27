const container = document.querySelector(".container");
//スクリーン上の席は対象外にしたいので.row配下の、と指定する。また、取られた席も対象外なのでnotで除外する
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

//string型からnumber型に変えるために+つける(parseIntよりも簡単だよ)
const ticketPrice = +movieSelect.value;
//console.log(typeof ticketPrice);

container.addEventListener("click", (e) => {
	if (
		e.target.classList.contains("seat") &&
		!e.target.classList.contains("occupied")
	) {
		e.target.classList.toggle("selected");

		updateSelectedCount();
	}
});
