// option box
let toggleOption = document.querySelector(".option-box");
let settingIcon = document.querySelector(".setting");
settingIcon.addEventListener("click", () => {
  toggleOption.classList.toggle("open");
  document.querySelector(".setting i").classList.toggle("fa-spin");
});

// header links and bullets link
let links = document.querySelectorAll(".links");
let bullets = document.querySelectorAll(".bullets");
function goToSection(el) {
  el.forEach((el) => {
    el.addEventListener("click", (el) => {
      document
        .querySelector(el.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}
goToSection(links);
goToSection(bullets);

// handle the active class
function active(ele) {
  ele.target.parentElement.querySelectorAll(".active").forEach((span) => {
    span.classList.remove("active");
  });
  ele.target.classList.add("active");
}

// customize click settings in option box to change colors
let colors = document.querySelectorAll(".colors .colors-content span");
colors.forEach((color) => {
  color.addEventListener("click", (color) => {
    active(color);
    document.documentElement.style.setProperty(
      "--main-color",
      color.target.dataset.color
    );
    window.localStorage.setItem("color", color.target.dataset.color);
  });
});
// colors local storage
if (localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );
  colors.forEach((color) => {
    color.parentElement.querySelectorAll(".active").forEach((span) => {
      span.classList.remove("active");
    });
  });
  colors.forEach((span) => {
    if (span.dataset.color === localStorage.getItem("color")) {
      span.classList.add("active");
    }
  });
}

// random background image and option stop it
// function to make a random background with option not work
let changeBackground = true;
let changeBack;
function customize() {
  if (changeBackground === true) {
    changeBack = setInterval(() => {
      let landing = document.querySelector(".landing");
      landing.style.backgroundImage = `url(imgs/${
        imgArray[Math.floor(Math.random() * 10)]
      })`;
    }, 10000);
  } else {
    clearInterval(changeBack);
  }
}

let imgArray = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.png",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
];

let background = document.querySelectorAll(".background .option-content span");
customize();
background.forEach((span) => {
  span.addEventListener("click", (span) => {
    active(span);
    if (span.target.dataset.back === "yes") {
      changeBackground = true;
    } else {
      changeBackground = false;
    }
    customize();
    window.localStorage.setItem("background-option", changeBackground);
  });
});
// background option local storage
if (window.localStorage.getItem("background-option")) {
  if (window.localStorage.getItem("background-option") === "true") {
    changeBack = setInterval(() => {
      let landing = document.querySelector(".landing");
      landing.style.backgroundImage = `url(imgs/${
        imgArray[Math.floor(Math.random() * 10)]
      })`;
    }, 10000);
  } else {
    clearInterval(changeBack);
  }

  background.forEach((span) => {
    span.parentElement.querySelectorAll(".active").forEach((span) => {
      span.classList.remove("active");
    });
  });
  background.forEach((span) => {
    if (window.localStorage.getItem("background-option") === "true") {
      document
        .querySelector(".option-content span:first-of-type")
        .classList.add("active");
    } else {
      document
        .querySelector(".option-content span:last-of-type")
        .classList.add("active");
    }
  });
}

// customize click settings in option box to show bullets
let showBullets = document.querySelectorAll(
  ".show-bullet .option-content span"
);
showBullets.forEach((span) => {
  span.addEventListener("click", (span) => {
    active(span);
    if (span.target.dataset.bullet === "yes") {
      document.querySelector(".bullets").classList.remove("hidden");
    } else {
      document.querySelector(".bullets").classList.add("hidden");
    }
    window.localStorage.setItem("bullet-option", span.target.dataset.bullet);
  });
});
// bullets local storage
if (window.localStorage.getItem("bullet-option")) {
  if (window.localStorage.getItem("bullet-option") === "yes") {
    document.querySelector(".bullets").classList.remove("hidden");
  } else {
    document.querySelector(".bullets").classList.add("hidden");
  }
  showBullets.forEach((span) => {
    span.parentElement.querySelectorAll(".active").forEach((span) => {
      span.classList.remove("active");
    });
  });
  showBullets.forEach((span) => {
    if (localStorage.getItem("bullet-option") === span.dataset.bullet) {
      span.classList.add("active");
    }
  });
}

// reset option button
let reset = document.querySelector(".reset");
reset.onclick = () => {
  window.localStorage.clear();
  document.location.reload();
};

// customize bar menu
let ul = document.querySelector(".menu .links");
document.addEventListener("click", (ele) => {
  if (ele.target.classList.contains("fas")) {
    ul.classList.toggle("hide");
    document.querySelector(".menu .arrow").classList.toggle("hide");
  } else if (ele.target.getAttribute("data-section")) {
  } else {
    ul.classList.add("hide");
    document.querySelector(".menu .arrow").classList.add("hide");
  }
});

// skill-box animation
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // let skillsOffsetTop = ourSkills.offsetTop;
  // let skillsOuterHeight = ourSkills.offsetHeight;
  // let windowHeight = this.innerHeight;
  // let windowScrollTop = this.pageYOffset;
  // if (
  //   windowScrollTop >
  //   skillsOffsetTop + skillsOuterHeight - windowHeight - 100
  // ) {
  //   document
  //     .querySelectorAll(".skills .skills-content span")
  //     .forEach((span) => {
  //       span.style.width = span.dataset.progress;
  //     });
  // }
  if (
    window.scrollY >= ourSkills.offsetTop &&
    window.scrollY <= ourSkills.offsetTop + 600
  ) {
    document
      .querySelectorAll(".skills .skills-content span")
      .forEach((span) => {
        span.style.width = span.dataset.progress;
      });
  } else {
    document
      .querySelectorAll(".skills .skills-content span")
      .forEach((span) => {
        span.style.width = 0;
      });
  }
};

// gallery section
let galleries = document.querySelectorAll(".gallery-content .img");
galleries.forEach((gallery) => {
  gallery.addEventListener("click", (gallery) => {
    let div = document.createElement("div");
    div.className = "popup";
    let imgBox = document.createElement("div");
    imgBox.className = "img-box";
    let img = document.createElement("img");
    img.src = gallery.target.src;
    let txt = document.createElement("h3");
    txt.className = "txt";
    txt.append(gallery.target.alt);
    let icon = document.createElement("i");
    icon.className = "fa-regular fa-circle-xmark";
    icon.classList.add("close-mark");
    imgBox.append(img);
    imgBox.prepend(txt);
    imgBox.append(icon);
    div.append(imgBox);
    document.body.append(div);
    let closeMark = document.querySelector(".fa-regular");
    closeMark.addEventListener("click", (x) => {
      div.remove();
    });
  });
});

// validation contact section
let name1 = document.querySelector(
  ".contact .contact-content .contact-box input.name"
);
let phone = document.querySelector(
  ".contact .contact-content .contact-box input.phone"
);
let email = document.querySelector(
  ".contact .contact-content .contact-box input.email"
);
let subject = document.querySelector(
  ".contact .contact-content .contact-box input.subject"
);
let msg = document.querySelector(
  ".contact .contact-content .contact-box textarea"
);
let btn = document.querySelector("input[value='send']");

let nameRe = /\w+/gi;
let phoneRe = /\d{10,11}/gi;
let emailRe = /(\w+|\d+)@\w+.(com|org|net)/gi;

let form = document.getElementById("send");

let inputs = document.querySelectorAll(
  ".contact .contact-content .contact-box input:not(:last-child)"
);

inputs.forEach((input) => {
  input.onfocus = function (e) {
    e.target.nextElementSibling.classList.remove("disappear");
  };
});

inputs.forEach((input) => {
  input.onblur = function (e) {
    if (e.target.classList.contains("name")) {
      if (nameRe.test(e.target.value)) {
        e.target.nextElementSibling.classList.add("disappear");
      } else {
        e.target.nextElementSibling.classList.remove("disappear");
      }
    } else if (e.target.classList.contains("phone")) {
      if (phoneRe.test(e.target.value)) {
        e.target.nextElementSibling.classList.add("disappear");
      } else {
        e.target.nextElementSibling.classList.remove("disappear");
      }
    } else if (e.target.classList.contains("email")) {
      if (emailRe.test(e.target.value)) {
        e.target.nextElementSibling.classList.add("disappear");
      } else {
        e.target.nextElementSibling.classList.remove("disappear");
      }
    } else if (e.target.classList.contains("subject")) {
      if (e.target.value !== "") {
        e.target.nextElementSibling.classList.add("disappear");
      } else {
        e.target.nextElementSibling.classList.remove("disappear");
      }
    }
    // else {
    //   e.target.nextElementSibling.classList.remove("disappear");
    // }
  };
});

msg.onfocus = () => {
  msg.nextElementSibling.classList.remove("disappear");
};

msg.onblur = () => {
  if (msg.value != "") {
    msg.nextElementSibling.classList.add("disappear");
  } else {
    msg.nextElementSibling.classList.remove("disappear");
  }
};

btn.onclick = function (e) {
  if (
    nameRe.test(name1.value) &
    phoneRe.test(Number(phone.value)) &
    emailRe.test(email.value) &
    (msg.value != "") &
    (subject.value != "")
  ) {
    return true;
  } else {
    console.log("not allowed");
    e.preventDefault();
  }
};
