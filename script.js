// Add games here. Use games you created, have permission to use, or that provide an official embed.
const games = [
  { name: "Your First Game", category: "Arcade", symbol: "01", description: "Replace this sample with a game you are allowed to share.", url: "", glow: "#2868b7" },
  { name: "Puzzle Challenge", category: "Puzzle", symbol: "?", description: "Add a puzzle game link or your own game file.", url: "", glow: "#7250b8" },
  { name: "Sports Zone", category: "Sports", symbol: "★", description: "Add a sports game link or your own game file.", url: "", glow: "#167d70" }
];

const grid = document.getElementById("gameGrid");
const searchInput = document.getElementById("searchInput");
const count = document.getElementById("gameCount");
const empty = document.getElementById("emptyState");
let activeCategory = "All";

function renderGames() {
  const term = searchInput.value.trim().toLowerCase();
  const visible = games.filter(game =>
    (activeCategory === "All" || game.category === activeCategory) &&
    (game.name.toLowerCase().includes(term) || game.description.toLowerCase().includes(term))
  );

  count.textContent = `${visible.length} GAME${visible.length === 1 ? "" : "S"}`;
  empty.hidden = visible.length !== 0;
  grid.innerHTML = visible.map(game => `
    <article class="game-card">
      <div class="art" style="--glow:${game.glow}"><span>${escapeHTML(game.symbol)}</span></div>
      <div class="card-info">
        <div class="card-top"><h3>${escapeHTML(game.name)}</h3><span class="tag">${escapeHTML(game.category)}</span></div>
        <p>${escapeHTML(game.description)}</p>
        <a class="play" href="${game.url ? escapeAttribute(game.url) : "#"}"
           ${game.url ? 'target="_blank" rel="noopener noreferrer"' : 'aria-disabled="true" onclick="event.preventDefault(); alert(\\'Add a game URL in script.js first.\\')"'}>
          ${game.url ? "PLAY GAME ↗" : "ADD GAME LINK"}
        </a>
      </div>
    </article>
  `).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
}
function escapeAttribute(value) { return escapeHTML(value); }

searchInput.addEventListener("input", renderGames);
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");
    activeCategory = button.dataset.category;
    renderGames();
  });
});
document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});
renderGames();
