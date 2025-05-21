/* menu icon navbar */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* navigation */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /* sticky nav bar */
    let header = document.querySelector('header');

    header.classList.toggle('sticky',window.scrollY > 100);

    /* remove menu icon and navbar when click navbar link */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* scroll reveal (slide animation) */
ScrollReveal({
    //reset: true,
    distance : '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, #heading', { origin: 'top' });
ScrollReveal().reveal('home-img, .certificate-box', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* about section read more button */
const ReadMoreBtn = document.querySelector('#read-more-btn');
const text = document.querySelector('.about-content p');

ReadMoreBtn.addEventListener('click', (e) => {
    text.classList.toggle('show-more');
    if(ReadMoreBtn.innerText === 'Read More') {
        ReadMoreBtn.innerText = 'Read Less';
    } else {
        ReadMoreBtn.innerText = 'Read More'
    }
});

/* project section right/left buttons */
const arrowRight = document.querySelector('.projects-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.projects-box .navigation .arrow-left');

let index = 0;

const activeProjects = () => {
    const imgSlide = document.querySelector('.projects-carousel .img-slide');
    const projectsDetails = document.querySelectorAll('.projects-detail');

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    projectsDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    projectsDetails[index].classList.add('active');
}

arrowRight.addEventListener('click', () => {
    if (index < 5) {
        index++;
        arrowLeft.classList.remove('disabled');
    }
    else {
        index = 6;
        arrowRight.classList.add('disabled');
    }

    activeProjects();
});

arrowLeft.addEventListener('click', () => {
    if (index > 1) {
        index--;
        arrowRight.classList.remove('disabled');
    }
    else {
        index = 0;
        arrowLeft.classList.add('disabled');
    }

    activeProjects();
});

/* resume section buttons */
const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active');
    });
});

/* contact section button */

/* contact button success popup*/
function showSuccessPopup() {
  const alert = document.getElementById("check-custom-alert");
  alert.classList.remove("hidden-check");

  const check = alert.querySelector(".check");
  check.style.opacity = 0;
  check.style.strokeDashoffset = 48;
  check.style.animation = "none";
  void check.offsetWidth;
  check.style.animation = "draw 0.6s ease forwards";
  check.style.animationDelay = "1.2s";
}

/* contact button fail popup*/
function showErrorPopup() {
  const alert = document.getElementById("cross-custom-alert");
  alert.classList.remove("hidden-cross");

  const cross = alert.querySelector(".cross");
  cross.style.opacity = 0;
  cross.style.strokeDashoffset = 68;
  cross.style.animation = "none";
  void cross.offsetWidth;
  cross.style.animation = "draw 0.6s ease forwards";
  cross.style.animationDelay = "1.2s";
}

function closeSuccessPopup() {
  document.getElementById("check-custom-alert").classList.add("hidden-check");
}

function closeErrorPopup() {
  document.getElementById("cross-custom-alert").classList.add("hidden-cross");
}

/* contact mail*/
function sendMail() {
  const button = document.querySelector("#send-btn");
  const form = document.getElementById("contact-form");

  if (!button || !form) return;

  button.disabled = true;
  button.innerText = "Sending...";

  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email-address").value,
    phone: document.getElementById("phone-no").value,
    subject: document.getElementById("email-subject").value,
    message: document.getElementById("message").value,
  };

  emailjs.send("service_wbawc4k", "template_3fu2y1x", params)
    .then(function (response) {
      showSuccessPopup();
      form.reset();
      button.disabled = false;
      button.innerText = "Send Message";
    })
    .catch(function (error) {
      showErrorPopup();
      button.disabled = false;
      button.innerText = "Send Message";
    });
}


