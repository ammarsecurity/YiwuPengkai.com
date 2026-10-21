(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");
  var toggleLabel = toggle ? toggle.querySelector(".visually-hidden") : null;

  function setOpen(open) {
    if (!header || !toggle) {
      return;
    }
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (toggleLabel) {
      toggleLabel.textContent = open ? "Close menu" : "Menu";
    }
  }

  if (toggle && nav && header) {
    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-open"));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) {
        setOpen(false);
      }
    });
  }

  var dialog = document.querySelector(".lightbox");
  if (dialog && typeof dialog.showModal === "function") {
    var full = dialog.querySelector("img");
    var closeButton = dialog.querySelector("[data-close]");

    document.querySelectorAll(".gallery-item").forEach(function (button) {
      button.addEventListener("click", function () {
        var image = button.querySelector("img");
        full.src = image.currentSrc || image.src;
        full.alt = image.alt;
        dialog.showModal();
      });
    });

    closeButton.addEventListener("click", function () {
      dialog.close();
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    dialog.addEventListener("close", function () {
      full.removeAttribute("src");
    });
  }

  var form = document.querySelector("#inquiry");
  if (!form) {
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var interest = params.get("interest");
  var select = form.querySelector("[name='interest']");
  if (interest && select) {
    Array.prototype.forEach.call(select.options, function (option) {
      if (option.value === interest) {
        select.value = interest;
      }
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var data = new FormData(form);
    var interestLabel = select && select.selectedIndex > 0
      ? select.options[select.selectedIndex].text
      : (data.get("interest") || "Yiwu Pengkai");
    var subject = "Equipment inquiry — " + interestLabel;
    var lines = [
      "Name: " + data.get("name"),
      "Company: " + (data.get("company") || "-"),
      "Email: " + data.get("email"),
      "Phone: " + (data.get("phone") || "-"),
      "Equipment: " + interestLabel,
      "",
      String(data.get("message") || "")
    ];

    window.location.href =
      "mailto:1228361226@qq.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(lines.join("\n"));

    var status = document.querySelector("#form-status");
    if (status) {
      status.hidden = false;
      status.textContent =
        "Your email application should open with this inquiry. If it does not, write directly to 1228361226@qq.com.";
    }
  });
})();
