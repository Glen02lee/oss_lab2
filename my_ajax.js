const apiURL = "http://localhost:3000/players";
let isPlayerListVisible = false;

function loadPlayers() {
    const playerList = document.getElementById("player-list");
    
    if (isPlayerListVisible) {
      playerList.style.display = "none";
      isPlayerListVisible = false;
    } else {
      fetch("http://localhost:3000/players")
        .then(response => response.json())
        .then(players => {
          playerList.innerHTML = "";
          players.forEach(player => {
            const playerItem = document.createElement("p");
            playerItem.textContent = `ID: ${player.id}, 이름: ${player.name}, 포지션: ${player.position}, 경력: ${player.career_start} - ${player.career_end}`;
            playerList.appendChild(playerItem);
          });
          playerList.style.display = "block"; 
          isPlayerListVisible = true;
        })
        .catch(error => console.error("선수 목록을 불러오는 중 오류 발생:", error));
    }
  }

  function addPlayer() {
    const name = document.getElementById("new-name").value;
    const position = document.getElementById("new-position").value;
    const careerStart = document.getElementById("new-career-start").value;
    const careerEnd = document.getElementById("new-career-end").value;
  
    const newPlayer = {
      name: name,
      position: position,
      career_start: careerStart,
      career_end: careerEnd,
    };
  
    fetch("http://localhost:3000/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    })
    .then(response => response.json())
    .then(data => {
      console.log("선수 추가 성공:", data);
      // 선수 추가 후 필드 초기화
      document.getElementById("new-name").value = "";
      document.getElementById("new-position").value = "";
      document.getElementById("new-career-start").value = "";
      document.getElementById("new-career-end").value = "";
    })
    .catch(error => console.error("선수 추가 중 오류 발생:", error));
  }

function updatePlayer() {
  const id = parseInt(document.getElementById("update-id").value);
  const updatedPlayer = {
    name: document.getElementById("update-name").value,
    position: document.getElementById("update-position").value,
    career_start: parseInt(document.getElementById("update-career-start").value),
    career_end: parseInt(document.getElementById("update-career-end").value),
  };

  fetch(`${apiURL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPlayer)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Player updated:", data);
      loadPlayers(); 
    })
    .catch(error => console.error("Error updating player:", error));
}

function deletePlayer() {
  const id = parseInt(document.getElementById("delete-id").value);

  fetch(`${apiURL}/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      console.log("Player deleted");
      loadPlayers(); 
    })
    .catch(error => console.error("Error deleting player:", error));
}
