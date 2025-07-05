class ForcesOverview {
  constructor() {
    this.forces = [];
  }
  
  addForce(force) {
    this.forces.push(force);
    this.render();
  }
  
  removeForce(forceId) {
    this.forces = this.forces.filter(f => f.id !== forceId);
    this.render();
  }
  
  render() {
    const container = document.getElementById('forces-container');
    if (!container) return;
    
    container.innerHTML = this.forces.map(force => `
      <div class="force-card" data-id="${force.id}">
        <h4>${force.type} - ${force.name}</h4>
        <p>Location: ${force.location}</p>
        <p>Strength: ${force.strength}</p>
        <p>Status: ${force.status}</p>
        <button class="recall-btn" data-id="${force.id}">Recall</button>
      </div>
    `).join('');
    
    // Add event listeners to recall buttons
    document.querySelectorAll('.recall-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.removeForce(e.target.dataset.id);
      });
    });
  }
}

// Example usage:
// const forcesOverview = new ForcesOverview();
// forcesOverview.addForce({
//   id: '1',
//   type: 'Army',
//   name: '1st Infantry Division',
//   location: 'Kabul, Afghanistan',
//   strength: 5000,
//   status: 'Deployed'
// });