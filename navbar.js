// Load the navbar HTML and bind events once it's in the DOM
fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;

        const searchButton = document.getElementById("btnSearch");
        const resetButton = document.getElementById("btnReset");
        const searchInput = document.getElementById("conditionInput");

        // Fill input if search param is present
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('search') && searchInput) {
            searchInput.value = urlParams.get('search');
        }

        searchButton?.addEventListener("click", () => submitSearch(searchInput));
        resetButton?.addEventListener("click", () => resetNav(searchInput));
    });

function submitSearch(input) {
    if (!input) return;

    const query = input.value.trim().toLowerCase();
    if (query) {
        window.location.href = `index.html?search=${encodeURIComponent(query)}`;
    }
}

function resetNav(input) {
    if (input) input.value = "";

    const url = new URL(window.location);
    url.searchParams.delete('search');
    window.history.replaceState({}, '', url);

    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        window.location.reload();
    }
}
