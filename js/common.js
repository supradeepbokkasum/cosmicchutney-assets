document.addEventListener("DOMContentLoaded", () => {
  const config = window.pageConfig || {};

  // Set <title>
  if (config.title) document.title = config.title;

  // Set iframe source
  const iframe = document.getElementById("pageFrame");
  if (iframe && config.iframeUrl) iframe.src = config.iframeUrl;

  // Set header title beside logo
  const headerTitle = document.getElementById("headerTitle");
  if (headerTitle && config.headerTitle) headerTitle.textContent = `Cosmic Chutney - ${config.headerTitle}`;

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

// Load the menu from external file
function loadMenu() {
  const container = document.getElementById("menu-container");
  if (!container) return;

  // ✅ CHANGE THIS to the full URL if using shared GitHub repo
  const menuUrl = "https://supradeepbokkasum.github.io/cosmicchutney-assets/html/menu.html";

  fetch(menuUrl)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    })
    .then((html) => {
      container.innerHTML = html;
    })
    .catch((err) => {
      console.error("Failed to load menu:", err);
      container.innerHTML = "<div style='color:red;'>Failed to load menu</div>";
    });
}

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", loadMenu);

