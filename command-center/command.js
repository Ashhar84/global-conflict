// Main game controller
class GameController {
  constructor() {
    this.nations = [];
    this.selectedNation = null;
    this.cities = [];
    this.forces = [];
    
    this.init();
  }
  
  async init() {
    await this.loadNations();
    this.setupEventListeners();
    this.renderNationSelector();
  }
  
  async loadNations() {
    try {
      const response = await fetch('../data/nations.json');
      if (!response.ok) throw new Error('Failed to load nations');
      const data = await response.json();
      this.nations = data.nations;
    } catch (error) {
      console.error('Error loading nations:', error);
    }
  }
  
  async loadCities(countryName) {
    try {
      const filename = countryName.toLowerCase().replace(/\s+/g, '-');
      const response = await fetch(`../data/cities/${filename}.json`);
      if (!response.ok) throw new Error(`Failed to load cities for ${countryName}`);
      const data = await response.json();
      this.cities = data.cities;
      this.renderCities();
    } catch (error) {
      console.error(`Error loading cities for ${countryName}:`, error);
    }
  }
  
  renderNationSelector() {
    const selector = document.getElementById('nation-selector');
    selector.innerHTML = this.nations.map(nation => 
      `<option value="${nation.name}">${nation.flag} ${nation.name}</option>`
    ).join('');
  }
  
  renderCities() {
    const citiesContainer = document.getElementById('cities-container');
    citiesContainer.innerHTML = this.cities.map(city => `
      <div class="city-card" data-lat="${city.lat}" data-lng="${city.lng}">
        <h3>${city.name} ${city.isCapital ? '⭐' : ''}</h3>
        <p>Population: ${city.population.toLocaleString()}</p>
        <p>Coordinates: ${city.lat.toFixed(4)}, ${city.lng.toFixed(4)}</p>
      </div>
    `).join('');
  }
  
  setupEventListeners() {
    document.getElementById('nation-selector').addEventListener('change', (e) => {
      this.selectedNation = this.nations.find(n => n.name === e.target.value);
      this.loadCities(this.selectedNation.name);
    });
    
    document.getElementById('deploy-forces').addEventListener('click', () => {
      if (this.selectedNation) {
        this.deployForces();
      }
    });
  }
  
  deployForces() {
    // Implementation for deploying forces
    console.log(`Deploying forces to ${this.selectedNation.name}`);
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.gameController = new GameController();
});