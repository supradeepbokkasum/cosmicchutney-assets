document.addEventListener("DOMContentLoaded", () => {
  const config = window.pageConfig || {};

  // Set <title>
  if (config.title) document.title = config.title;

  // Set iframe source
  const iframe = document.getElementById("pageFrame");
  if (iframe && config.iframeUrl) iframe.src = config.iframeUrl;

  // Set header title beside logo
  const headerTitle = document.getElementById("headerTitle");
  if (headerTitle && config.headerTitle) {
    headerTitle.textContent = `Cosmic Chutney - ${config.headerTitle}`;
  }

  // Load the menu HTML
  fetch("https://supradeepbokkasum.github.io/cosmicchutney-assets/html/menu.html")
    .then(res => res.text())
    .then(html => {
      const menuContainer = document.getElementById("menu-container");
      if (menuContainer) menuContainer.innerHTML = html;
    })
    .catch(err => {
      console.error("Failed to load menu:", err);
    });

  // Initialize form handlers
  handleFormSubmit("contactForm", "contactStatus", "https://formspree.io/f/xaneoedq");
  handleFormSubmit("ideaForm", "ideaStatus", "https://formspree.io/f/xdkegelk");
});

function toggleMenu() {
  const menu = document.getElementById('menu');
  if (menu) {
    menu.classList.toggle('show');
  }
}

function collapseMenu(event) {
  const menu = document.getElementById('menu');
  if (menu && event.target.tagName !== 'A') {
    menu.classList.remove('show');
  }
}

function loadPage(url) {
  const iframe = document.getElementById('pageFrame');
  if (iframe) {
    iframe.src = url;
  }
}

function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Close modal on outside click
window.addEventListener("click", function(event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});

function handleFormSubmit(formId, statusId, endpoint) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form || !status) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      status.textContent = "✅ Submitted successfully!";
      form.reset();
    } else {
      status.textContent = "❌ Submission failed. Please try again.";
    }
  });
}
