// script.js

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();

    // Log the array of user names to the console
    console.log(
      "User names array:",
      users.map((user) => user.firstName + " " + user.lastName)
    );

    renderUsers(users);
  } catch (error) {
    console.error("Fetch error:", error);
  }
});

function renderUsers(users) {
  // Hämta befintliga ul-elementet istället för att skapa ett nytt
  const userList = document.getElementById("user-list");

  users.forEach((user) => {
    const userItem = document.createElement("li");
    userItem.className = "user-item"; // Använd klassen definierad i din CSS
    userItem.style.borderColor = user.color; // Använd användarens färg som ramfärg

    // Lägg till användarens information inuti li-elementet
    userItem.innerHTML = `
          <div style="color: ${user.color};"> <!-- Styla texten med användarens färg -->
              <h2>${user.firstName} ${user.lastName}</h2>
              <p><strong>Username:</strong> ${user.username}</p>
          </div>
      `;

    // Lägg till li-elementet i ul-elementet
    userList.appendChild(userItem);
  });
}
