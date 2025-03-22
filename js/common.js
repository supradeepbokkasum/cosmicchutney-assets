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
  const menuUrl = "/assets/common/html/menu.html";

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

