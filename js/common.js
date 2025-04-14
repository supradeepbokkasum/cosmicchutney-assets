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
// Load the menu HTML
fetch("https://assets.cosmicchutney.space/html/menu.html")
  .then(res => res.text())
  .then(html => {
    const menuContainer = document.getElementById("menu-container");
    if (menuContainer) {
      menuContainer.innerHTML = html;

      // Attach event listeners after insertion
      const backdrop = document.getElementById("menuBackdrop");
      if (backdrop) backdrop.addEventListener("click", toggleMenu);

      const menu = document.getElementById("menu");
      if (menu) menu.addEventListener("click", collapseMenu);
    }
  })
  .catch(err => {
    console.error("Failed to load menu:", err);
  });


  // Load modals HTML
  fetch("https://assets.cosmicchutney.space/html/common-modals.html")
    .then(res => res.text())
    .then(html => {
      const modalContainer = document.getElementById("modal-container");
      if (modalContainer) modalContainer.innerHTML = html;
    })
    .catch(err => console.error("Failed to load modals:", err));

  // Initialize form handlers
  handleFormSubmit("contactForm", "contactStatus", "https://formspree.io/f/xaneoedq");
  handleFormSubmit("ideaForm", "ideaStatus", "https://formspree.io/f/xdkegelk");
});

function toggleMenu() {
  const menu = document.getElementById('menu');
  const backdrop = document.getElementById('menuBackdrop');
  if (menu && backdrop) {
    menu.classList.toggle('show');
    backdrop.classList.toggle('show');
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


// Dynamically load tool-intros.js and insert the toolIntro div after it's ready
const introScript = document.createElement("script");
introScript.src = "https://assets.cosmicchutney.space/js/tool-intros.js";
introScript.defer = true;

introScript.onload = () => {
  const subdomain = window.location.hostname.split('.')[0];
  const intro = window.TOOL_INTROS?.[subdomain];

  if (intro) {
    const introDiv = document.createElement("div");
    introDiv.id = "toolIntro";

    // ✨ Slim, clean styling
    introDiv.style.margin = "12px auto 8px";
    introDiv.style.padding = "0";
    introDiv.style.maxWidth = "720px";
    introDiv.style.fontSize = "0.92rem";
    introDiv.style.color = "#334155"; // slate-700
    introDiv.style.lineHeight = "1.4";
    introDiv.style.borderLeft = "3px solid #0f172a";
    introDiv.style.paddingLeft = "10px";

    introDiv.innerHTML = `
      <div style="font-weight: 600; font-size: 1rem;">${intro.title}</div>
      <div>${intro.description}</div>
    `;

    const target = document.querySelector(".content-wrapper") || document.getElementById("pageFrame");
    if (target && target.parentNode) {
      target.parentNode.insertBefore(introDiv, target);
    }
  } else {
    console.warn("No intro found for subdomain:", subdomain);
  }
};


document.head.appendChild(introScript);


