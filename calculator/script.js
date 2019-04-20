const input = document.getElementById("input");
const input1 = document.getElementById("input1");

const numbers = document.querySelectorAll(".inputValues");
const plus = document.getElementById("plus");
const actions = document.querySelectorAll(".actions");
const actionclear = document.querySelector(".actionclear");


actionclear.addEventListener("click", clearFields);

function clearFields() {
  input.value = "";
  input1.value = "";
}

let values = [];

numbers.forEach(function (element) {
  element.addEventListener("click", addValue)
})

function addValue() {
  values.push(this.value);
  console.log(this.value);
  input1.value = values.join("");

}
// arithmetics
actions.forEach(doingArithmetics)
console.log(actions);

function doingArithmetics(element) {

  element.addEventListener("click", arithmetics)
}

function arithmetics() {

  input.value = "";




}