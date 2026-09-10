const state = {
  categories: [],
  filter: "all",
  search: "",
};

const toolGrid = document.querySelector("#toolGrid");
const toolCount = document.querySelector("#toolCount");
const healthBadge = document.querySelector("#healthBadge");
const toast = document.querySelector("#toast");
const searchInput = document.querySelector("#toolSearch");
const segmentButtons = Array.from(document.querySelectorAll(".segment"));

function initials(name) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function flattenTools() {
  return state.categories.flatMap((category) =>
    category.tools.map((tool) => ({ ...tool, categoryId: category.id, categoryName: category.name }))
  );
}

function filteredTools() {
  const query = state.search.trim().toLowerCase();

  return flattenTools().filter((tool) => {
    const categoryMatches = state.filter === "all" || tool.categoryId === state.filter;
    const searchMatches = !query || [tool.name, tool.status, tool.detail, tool.categoryName]
      .join(" ")
      .toLowerCase()
      .includes(query);

    return categoryMatches && searchMatches;
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Command copied");
  } catch {
    showToast("Copy failed");
  }
}

function renderTools() {
  const tools = filteredTools();
  toolCount.textContent = `${tools.length} ${tools.length === 1 ? "tool" : "tools"}`;

  toolGrid.innerHTML = tools.map((tool) => `
    <article class="tool-card">
      <div class="tool-top">
        <div class="tool-icon" aria-hidden="true">${initials(tool.name)}</div>
        <span class="badge">${tool.status}</span>
      </div>
      <div>
        <h4>${tool.name}</h4>
        <p>${tool.detail}</p>
      </div>
      <button class="copy-command" data-copy="${tool.command.replace(/"/g, "&quot;")}">Copy command</button>
    </article>
  `).join("");
}

async function loadTools() {
  const response = await fetch("/api/tools");
  const data = await response.json();
  state.categories = data.categories;
  renderTools();
}

async function checkHealth() {
  try {
    const response = await fetch("/api/health");
    const data = await response.json();
    healthBadge.textContent = data.status === "ok" ? "Online" : "Check";
  } catch {
    healthBadge.textContent = "Offline";
  }
}

document.addEventListener("click", (event) => {
  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) {
    copyText(copyButton.dataset.copy);
  }
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderTools();
});

segmentButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    segmentButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderTools();
  });
});

loadTools();
checkHealth();
