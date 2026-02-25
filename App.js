
const API_BASE = "https://SEU-SERVICO.onrender.com/api";

async function loadLive() {
  try {
    const res = await fetch(`${API_BASE}/live`);
    const data = await res.json();

    const container = document.getElementById("live");
    container.innerHTML = "";

    if (!data.response || data.response.length === 0) {
      container.innerHTML = "<p>Nenhum jogo ao vivo no momento.</p>";
      return;
    }

    data.response.forEach(match => {
      container.innerHTML += `
        <div class="card">
          <strong>${match.teams.home.name}</strong>
          <br>
          ${match.goals.home ?? 0} x ${match.goals.away ?? 0}
          <br>
          <strong>${match.teams.away.name}</strong>
          <br>
          <small>Status: ${match.fixture.status.short}</small>
        </div>
      `;
    });

  } catch (error) {
    console.log(error);
  }
}

async function loadStandings() {
  try {
    const res = await fetch(`${API_BASE}/standings/71/2026`);
    const data = await res.json();

    const table = data.response[0].league.standings[0];
    const container = document.getElementById("standings");
    container.innerHTML = "";

    table.forEach(team => {
      container.innerHTML += `
        <div class="table-row">
          <span>${team.rank}. ${team.team.name}</span>
          <span>${team.points} pts</span>
        </div>
      `;
    });

  } catch (error) {
    console.log(error);
  }
}

loadLive();
loadStandings();
setInterval(loadLive, 60000);
