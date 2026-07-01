/**
 * Create election card HTML
 */
function electionCard(election) {
  const statusLabel = election.status[0].toUpperCase() + election.status.slice(1);
  const canVote = election.status === "active";
  
  const progressWidth = 
    election.status === "active" ? 62 : 
    election.status === "upcoming" ? 12 : 
    100;

  return `
    <article class="election-card card-hover" data-status="${election.status}">
      <div class="election-img">
        <span>${election.title}</span>
      </div>
      <div>
        <span class="badge">${statusLabel}</span>
        <h3 style="margin: 10px 0 6px;">${election.title}</h3>
        <p style="color: var(--muted);">${election.description}</p>
        <div class="progress">
          <span style="width: ${progressWidth}%"></span>
        </div>
        <small style="color: var(--muted);">
          Start: ${election.starts} • End: ${election.ends} • Eligible voters: ${election.eligible}
        </small>
      </div>
      <div>
        <a 
          class="btn ${canVote ? "btn-primary" : "btn-outline-dark"}" 
          href="${canVote ? "vote.html" : "results.html"}"
        >
          ${canVote ? "Vote Now" : "View"}
        </a>
      </div>
    </article>
  `;
}

/**
 * Render elections list with filter
 */
function renderElections(filter = "all") {
  const list = document.querySelector("#electionList");
  if (!list) return;

  const elections = 
    filter === "all" 
      ? DEMO_ELECTIONS 
      : DEMO_ELECTIONS.filter(e => e.status === filter);

  list.innerHTML = elections.map(electionCard).join("");
}

/**
 * Initialize elections page
 */
document.addEventListener("DOMContentLoaded", () => {
  renderElections("all");

  // Setup filter tabs
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      
      // Add active class to clicked tab
      tab.classList.add("active");
      
      // Render elections with selected filter
      renderElections(tab.dataset.filter);
    });
  });
});