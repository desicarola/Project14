// slider
const items = document.querySelectorAll('.item:not(:first-child)');

const options = {
  threshold: 0.5
}

function addSlideIn(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-in');
    } else { // this else suggested by Tobi
      entry.target.classList.remove('slide-in');
    }
  });
}

const observer = new IntersectionObserver(addSlideIn, options)

items.forEach(item => {
  observer.observe(item);
})

/******************************************/
/*************** Project 11 ***************/
/******************************************/
const form = document.getElementById('contactForm');
const formElements = [ ...form.elements ];
const btnSubmit = document.getElementById('btnSubmit');
const txtSuccess = document.getElementById('contactSubmitted');

function errorMark(e) { 
  if(!e.checkValidity()){
    e.nextElementSibling.style.display = 'block';
    e.style.borderColor = '#ff0000';
  }
  else {
    validTxt(e); 
  }
}

function validTxt(e){
  e.nextElementSibling.style.display = 'none';
  e.style.borderColor= '#ced4da';
}

function allInputValid(){
  btnSubmit.removeAttribute('disabled', '');
  formElements.forEach((element) => {
    if (element.innerText !='Submit') {
      //console.log('allInputValid  ' + element.classList + ' ' + element.checkValidity() + ' ' + element.innerText);
      if(!element.checkValidity()){
        btnSubmit.setAttribute('disabled', '');
      }
      else {
        validTxt(element); 
      }
    }
  })
}

formElements.forEach((element) => {
  if(element.innerText !='Submit') {
    //console.log('CHANGEEEEE');
  element.addEventListener('keyup', allInputValid);
  }
})

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('BOTON SUBMIT');
  txtSuccess.style.display = 'block';
  btnSubmit.setAttribute('disabled', '');
  form.reset();
  setTimeout(messaggeOff, 5000);
}

form.addEventListener('submit', (e) => handleSubmit(e))

function messaggeOff(){
  txtSuccess.style.display = 'none';
}