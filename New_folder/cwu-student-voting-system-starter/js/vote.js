/**
 * Global variable to store selected candidate
 */
let selectedCandidate = null;

const electionId = "student-council-2026";

/**
 * Render candidates list and setup selection listeners
 */
function renderCandidates() {
  const list = document.querySelector("#candidateList");
  if (!list) return;

  // Check if user has already voted
  if (hasVoted(electionId)) {
    document.querySelector("#alreadyVotedNotice").style.display = "block";
    document.querySelector("#reviewVoteBtn").disabled = true;
  }

  // Filter candidates for this election
  const candidates = DEMO_CANDIDATES.filter(
    c => c.election_id === electionId
  );

  // Render candidate cards
  list.innerHTML = candidates
    .map(c => `
      <article class="candidate" data-id="${c.id}">
        <img src="${c.image}" alt="${c.name}">
        <div>
          <h3>${c.name}</h3>
          <strong style="color: var(--primary);">${c.position}</strong>
          <p style="color: var(--muted);">${c.manifesto}</p>
        </div>
        <div class="radio-dot"></div>
      </article>
    `)
    .join("");

  // Setup click listeners for candidate selection
  document.querySelectorAll(".candidate").forEach(card => {
    card.addEventListener("click", () => {
      if (hasVoted(electionId)) {
        showToast("You have already voted in this election.");
        return;
      }

      // Remove selected class from all candidates
      document
        .querySelectorAll(".candidate")
        .forEach(c => c.classList.remove("selected"));

      // Add selected class to clicked candidate
      card.classList.add("selected");

      // Update selected candidate
      selectedCandidate = DEMO_CANDIDATES.find(
        c => c.id === card.dataset.id
      );

      // Display selected candidate preview
      document.querySelector("#selectedPreview").innerHTML = `
        <h3>${selectedCandidate.name}</h3>
        <p>${selectedCandidate.position}</p>
        <small>${selectedCandidate.manifesto}</small>
      `;
    });
  });
}

/**
 * Initialize voting page
 */
document.addEventListener("DOMContentLoaded", () => {
  renderCandidates();

  const reviewBtn = document.querySelector("#reviewVoteBtn");
  const modal = document.querySelector("#voteModal");
  const closeModal = document.querySelector("#closeModal");
  const confirmVote = document.querySelector("#confirmVote");

  // Setup review vote button
  if (reviewBtn) {
    reviewBtn.addEventListener("click", () => {
      if (!selectedCandidate) {
        showToast("Please select a candidate first.");
        return;
      }

      document.querySelector("#modalCandidate").textContent =
        selectedCandidate.name;
      modal.classList.add("show");
    });
  }

  // Setup close modal button
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  // Setup confirm vote button
  if (confirmVote) {
    confirmVote.addEventListener("click", () => {
      if (hasVoted(electionId)) {
        modal.classList.remove("show");
        showToast("You have already voted in this election.");
        return;
      }

      // Save vote
      saveVote({
        election_id: electionId,
        candidate_id: selectedCandidate.id,
        student_id: CURRENT_STUDENT.id,
        created_at: new Date().toISOString()
      });

      modal.classList.remove("show");
      showToast("Vote submitted successfully.");

      setTimeout(() => {
        location.href = "dashboard.html";
      }, 1000);
    });
  }
});
