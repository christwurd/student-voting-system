document.addEventListener("DOMContentLoaded", () => {
  // Display student name
  const nameEl = document.querySelector("[data-student-name]");
  if (nameEl) {
    nameEl.textContent = CURRENT_STUDENT.name.split(" ")[0];
  }

  // Display voted elections count
  const votedCount = getVotes()
    .filter(v => v.student_id === CURRENT_STUDENT.id)
    .length;
  const votedEl = document.querySelector("[data-voted-count]");
  if (votedEl) {
    votedEl.textContent = votedCount;
  }

  // Display active elections count
  const activeCount = DEMO_ELECTIONS
    .filter(e => e.status === "active")
    .length;
  const activeEl = document.querySelector("[data-active-count]");
  if (activeEl) {
    activeEl.textContent = activeCount;
  }
});