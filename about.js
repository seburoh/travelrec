fetch('./team.json')
    .then(response => response.json())
    .then(team => {
        const container = document.querySelector('.card-row');
        // Clear existing cards but keep the title (first child)
        while (container.children.length > 1) {
            container.removeChild(container.lastChild);
        }
        // Append cards dynamically
        team.forEach(member => {
            const card = document.createElement('div');
            card.className = 'dark-container team-member';
            card.innerHTML = `
        <div class="name">${member.name}</div>
        <div class="role">${member.role}</div>
        <div class="description">${member.description}</div>
        <div class="fact"><strong>Fun Fact:</strong> ${member.fact}</div>
      `;
            container.appendChild(card);
        });
    })
    .catch(err => console.error('Failed to load team data:', err));
