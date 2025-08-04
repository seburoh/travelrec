document.getElementById('btnBook').addEventListener('click', function () {
    alert('Sorry, we do not read books!');
});

window.addEventListener('DOMContentLoaded', () => {
    const infoPanel = document.getElementById('info-panel');
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('search')) {
        const searchQuery = urlParams.get('search').toLowerCase();
        infoPanel.classList.remove('hidden');

        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                parseSearchResults(infoPanel, searchQuery, data);
            })
            .catch(err => {
                console.error('Failed to load country data:', err);
                infoPanel.innerHTML = `<p>Error loading data.</p>`;
            });
    } else {
        infoPanel.classList.add('hidden');
    }
});

function parseSearchResults(infoPanel, searchQuery, data) {
    switch (searchQuery) {
        case "temples":
        case "temple":
            renderResults(infoPanel, searchQuery, data.temples);
            break;
        case "beaches":
        case "beach":
            renderResults(infoPanel, searchQuery, data.beaches);
            break;
        default:
            const countries = data.countries || [];
            const matchedCountry = countries.find(country => country.name.toLowerCase() === searchQuery);
            renderResults(infoPanel, searchQuery, matchedCountry?.cities);
            break;
    }
}

/**
 * Renders city/temple/beach data or a no-results message.
 * @param {HTMLElement} infoPanel 
 * @param {string} searchQuery 
 * @param {Array} items - array of city objects or undefined/null
 */
function renderResults(infoPanel, searchQuery, items) {
    if (!items || items.length === 0) {
        infoPanel.innerHTML = `<p>No results found for: <strong>${searchQuery}</strong></p>`;
        return;
    }

    let html = `<p>Showing results for: <strong>${searchQuery}</strong></p><div class="city-list">`;

    items.forEach(item => {
        html += `
            <div class="city-card">
                <h3>${item.name}</h3>
                <img src="./images/${item.imageUrl}" alt="${item.name}" style="max-width: 100%; height: auto; border-radius: 10px; margin-bottom: 10px;" />
                <p>${item.description}</p>
            </div>
        `;
    });

    html += '</div>';
    infoPanel.innerHTML = html;
}
