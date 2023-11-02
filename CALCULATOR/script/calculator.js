function display (char) {
  if(char === "="){
    document.querySelector("p").innerHTML = `${calculation()}`;
  }
  else if(char === "clr") {
    document.querySelector("p").innerHTML = "";
  }
  else {
    const oldData = document.querySelector("p").innerHTML;
    document.querySelector("p").innerHTML = `${oldData}${char}`;
  }
  
}

function calculation () {
  const value = eval(document.querySelector("p").innerText);
  return value;
}