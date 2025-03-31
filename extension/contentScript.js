
console.log("Conteúdo da página detectado!");

let elements = document.querySelectorAll('*');

elements.forEach(element => {
  console.log(element.tagName);
});
