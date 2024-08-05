document.getElementById('fetch-activity-button').addEventListener('click', fetchActivity);
document.getElementById('fetch-user-button').addEventListener('click', fetchUserData);
document.getElementById('clear-button').addEventListener('click', clearData);
document.getElementById('fetch-anime-button').addEventListener('click', fetchAnimeData);
document.getElementById('clear-anime-button').addEventListener('click', clearAnimeData);

// API Bored
async function fetchActivity() {
	renderLoadingState('data-container');
	try {
		const response = await fetch('https://bored.api.lewagon.com/api/activity/');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		renderActivity(data);
	} catch (error) {
		renderErrorState('data-container');
	}
}

// API Usuarios
async function fetchUserData() {
	renderLoadingState('user-container');
	try {
		const response = await fetch('https://randomuser.me/api/');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		renderUserData(data);
	} catch (error) {
		renderErrorState('user-container'); // aquí mostramos un estado de error en caso de fallo
	}
}

// API Anime
async function fetchAnimeData() {
	const limit = document.getElementById('limit').value;
	const query = document.getElementById('query').value;
	const type = document.getElementById('type').value;

	if (!limit || !query || !type) {
		alert('Please fill out all fields');
		return;
	}

	renderLoadingState('anime-container');

	try {
		const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=${limit}&type=${type}`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		if (data.data.length === 0) {
			renderEmptyState('anime-container');
		} else {
			renderAnimeData(data);
		}
	} catch (error) {
		renderErrorState('anime-container');
	}
}

// Error State
function renderErrorState(containerId) {
	const container = document.getElementById(containerId);
	container.innerHTML = '<p>Failed to load data</p>';
	console.log('Failed to load data');
}

// Loading State
function renderLoadingState(containerId) {
	const container = document.getElementById(containerId);
	container.innerHTML = '<p>Loading...</p>';
	console.log('Loading...');
}

// Not Found State
function renderEmptyState(containerId) {
	const container = document.getElementById(containerId);
	container.innerHTML = '<p>No results found</p>';
	console.log('No results found');
}

// Render Activity
function renderActivity(data) {
	const container = document.getElementById('data-container');
	container.innerHTML = '';

	const div = document.createElement('div');
	div.className = 'item';
	div.innerHTML = `<p>${data.activity}</p>`;
	container.appendChild(div);
}

// Render User Data
function renderUserData(data) {
	const container = document.getElementById('user-container');
	container.innerHTML = '';

	const user = data.results[0];
	const div = document.createElement('div');
	div.className = 'item';
	div.innerHTML = `
        <img src="${user.picture.medium}" alt="User Picture">
        <p>Name: ${user.name.first} ${user.name.last}</p>
        <p>Email: ${user.email}</p>
    `;
	container.appendChild(div);
}

// Render Anime Data
function renderAnimeData(data) {
	const container = document.getElementById('anime-container');
	container.innerHTML = '';

	data.data.forEach((anime) => {
		const div = document.createElement('div');
		div.className = 'anime-item';
		div.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="Anime Image" style="width: 100%;">
            <h4>Title: ${anime.title}</h4>
            <h4>Type: ${anime.type}</h4>
            <h4>Episodes: ${anime.episodes}</h4>
            <h4>Score: ${anime.score}</h4>
        `;
		container.appendChild(div);
	});
}

// Clear Data
function clearData() {
	const dataContainer = document.getElementById('data-container');
	const userContainer = document.getElementById('user-container');
	const animeContainer = document.getElementById('anime-container');
	dataContainer.innerHTML = '';
	userContainer.innerHTML = '';
	animeContainer.innerHTML = '';
}

// Clear Anime Data
function clearAnimeData() {
	const animeContainer = document.getElementById('anime-container');
	animeContainer.innerHTML = '';
}
