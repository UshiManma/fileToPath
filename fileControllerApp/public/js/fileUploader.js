
const input = document.querySelector('input');
const log = document.getElementById('values');

input.addEventListener('input', updateValue);

function updateValue(e) {
  log.textContent = e.target.value;
}

function updateFile(){
  fetch('/fileRator').then(res => 
    res.json()).then(result => {
    console.log(`result`, result);
  })
}