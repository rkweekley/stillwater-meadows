/* Stillwater Meadows — site interactions (vanilla JS, no dependencies) */
(function () {
  "use strict";

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Lightbox ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll("a.lb"));
  if (links.length) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML =
      '<img src="" alt="Enlarged venue photo">' +
      '<p class="cap"></p>' +
      '<button class="close" aria-label="Close">&times;</button>' +
      '<button class="prev" aria-label="Previous photo">&#8249;</button>' +
      '<button class="next" aria-label="Next photo">&#8250;</button>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".cap");
    var idx = 0;
    function show(i) {
      idx = (i + links.length) % links.length;
      var a = links[idx];
      lbImg.src = a.href;
      lbImg.alt = (a.querySelector("img") || {}).alt || "Venue photo";
      lbCap.textContent = a.getAttribute("data-cap") || "";
    }
    function open(i) {
      show(i);
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
      lbImg.src = "";
    }
    links.forEach(function (a, i) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        open(i);
      });
    });
    lb.querySelector(".close").addEventListener("click", close);
    lb.querySelector(".prev").addEventListener("click", function () { show(idx - 1); });
    lb.querySelector(".next").addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------- Contact form → mailto composer ---------- */
  var form = document.getElementById("contactForm");
  var sent = document.getElementById("formSent");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (document.getElementById("f-name").value || "").trim();
      var email = (document.getElementById("f-email").value || "").trim();
      var phone = (document.getElementById("f-phone").value || "").trim();
      var date = (document.getElementById("f-date").value || "").trim();
      var type = (document.getElementById("f-type").value || "").trim();
      var guests = (document.getElementById("f-guests").value || "").trim();
      var msg = (document.getElementById("f-msg").value || "").trim();

      if (!name || !email || !msg) {
        alert("Please fill in your name, email, and a short message.");
        return;
      }

      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        (phone ? "Phone: " + phone + "\n" : "") +
        (date ? "Preferred date: " + date + "\n" : "") +
        "Event type: " + type + "\n" +
        "Guests: " + guests + "\n\n" +
        msg;

      var mailto = "mailto:1244laf@gmail.com" +
        "?subject=" + encodeURIComponent("Inquiry from the Stillwater Meadows website — " + type) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;
      if (sent) sent.classList.add("show");
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();