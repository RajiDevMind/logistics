import sublinks from "./src/data.js";

const nav = document.querySelector(".nav");
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const sidebar = document.querySelector(".sidebar-links");
const linkBtns = [...document.querySelectorAll(".link-btn")];
const submenu = document.querySelector(".submenu");
const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");

// hide/show sideabar
toggleBtn.addEventListener("click", () => {
  sidebarWrapper.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  sidebarWrapper.classList.remove("show");
});

// set sidebar
sidebar.innerHTML = sublinks
  .map((item) => {
    const { links, page } = item;
    return `<article >
<h4>${page}</h4>
<div class="sidebar-sublinks">
${links
  .map((link) => {
    return `<a href="${link.url}" target="${link.tag}"><i class="${link.icon}"></i>${link.label}</a>`;
  })
  .join("")}
</div>
</article>`;
  })
  .join("");

linkBtns.forEach((btn) => {
  btn.addEventListener("mouseover", function (e) {
    const text = e.currentTarget.textContent;
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;

    const tempPage = sublinks.find((link) => link.page === text);
    if (tempPage) {
      const { page, links } = tempPage;
      submenu.classList.add("show");
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;
      // OPTIONAL
      let columns = "col-2";
      if (links.length === 3) {
        columns = "col-3";
      }
      if (links.length > 3) {
        columns = "col-4";
      }
      submenu.innerHTML = `
        <section> 
        <h4>${page}</h4>
        <div class="submenu-center ${columns}">
        ${links
          .map((link) => {
            return `<a href="${link.url}"><i class="${link.icon}"></i>${link.label}</a>`;
          })
          .join("")}
        </div>
        </section>
        `;
    }
  });
});
nav.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("link-btn")) {
    submenu.classList.remove("show");
  }
});

// image slider

const nextEl = document.querySelector(".next");
const prevEl = document.querySelector(".prev");
const imgContEl = document.querySelector(".image-slider");
const imgEl = document.querySelectorAll("img");

let currentImg = 1;

let timeout;

nextEl.addEventListener("click", () => {
  currentImg++;
  clearTimeout(timeout);
  updateImg();
});
prevEl.addEventListener("click", () => {
  currentImg--;
  clearTimeout(timeout);
  updateImg();
});

updateImg();

function updateImg() {
  if (currentImg > imgEl.length) {
    return (currentImg = 1);
  } else if (currentImg < 1) {
    return (currentImg = imgEl.length);
  }
  imgContEl.style.transform = `translateX(-${(currentImg - 1) * 600}px)`;
  timeout = setTimeout(() => {
    currentImg++;
    updateImg();
  }, 2000);
}

// dynamically set Date in the footer
const printDate = document.querySelector(".copydate");
const getdate = new Date().getFullYear();
printDate.innerHTML = getdate;
