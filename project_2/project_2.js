const abacus = document.getElementById('abacus');
const phoneDisplay = document.getElementById('phone-number');

const BEAD_GAP = 4;
const BEAD_HEIGHT = 20;
const TOP_OFFSET = 10;

// Create 10 columns
for (let col = 0; col < 10; col++) {
  const column = document.createElement('div');
  column.classList.add('column');
  column.dataset.index = col;

  const track = document.createElement('div');
  track.classList.add('track');
  column.appendChild(track);

  // Add upper bead (5)
  const upperBead = document.createElement('div');
  upperBead.classList.add('bead', 'upper');
  upperBead.dataset.value = 5;
  upperBead.dataset.active = "0";
  track.appendChild(upperBead);

  // Add 4 lower beads
  for (let i = 0; i < 4; i++) {
    const bead = document.createElement('div');
    bead.classList.add('bead', 'lower');
    bead.dataset.value = 1;
    bead.dataset.index = i;
    bead.dataset.active = "0";
    track.appendChild(bead);
  }

  abacus.appendChild(column);
}

function updateBeadPositions() {
  const columns = document.querySelectorAll('.column');

  columns.forEach(column => {
    const track = column.querySelector('.track');
    const beads = Array.from(track.querySelectorAll('.bead'));
    const upperBead = beads.find(b => b.classList.contains('upper'));
    const lowerBeads = beads.filter(b => b.classList.contains('lower'));

    // Move upper bead (5) - either up or down
    const upperActive = upperBead.dataset.active === "1";
    upperBead.style.top = upperActive ? '60px' : '10px';

    // Position lower beads based on how many are active
    lowerBeads.forEach((bead, i) => {
      const activeCount = lowerBeads.filter(b => b.dataset.active === "1").length;
      const isActive = i < activeCount;
      const positionIndex = isActive ? 3 - i : 3 + (3 - i); // stack downwards

      bead.style.top = isActive
        ? `${120 + positionIndex * (BEAD_HEIGHT + BEAD_GAP)}px`
        : `${200 + i * (BEAD_HEIGHT + BEAD_GAP)}px`;
    });
  });
}

function updateDisplay() {
  const columns = document.querySelectorAll('.column');
  let phoneNumber = '';

  columns.forEach(col => {
    const beads = Array.from(col.querySelectorAll('.bead'));
    const upperBead = beads.find(b => b.classList.contains('upper'));
    const lowerBeads = beads.filter(b => b.classList.contains('lower'));

    const upper = upperBead.dataset.active === "1" ? 5 : 0;
    const lower = lowerBeads.filter(b => b.dataset.active === "1").length;

    phoneNumber += (upper + lower).toString();
  });

  phoneDisplay.textContent = phoneNumber;
}

// Event listener for bead clicks
abacus.addEventListener('click', (e) => {
  if (!e.target.classList.contains('bead')) return;

  const bead = e.target;
  const track = bead.parentElement;
  const isUpper = bead.classList.contains('upper');
  const lowerBeads = Array.from(track.querySelectorAll('.bead.lower'));

  if (isUpper) {
    bead.dataset.active = bead.dataset.active === "1" ? "0" : "1";
  } else {
    const index = parseInt(bead.dataset.index, 10);
    lowerBeads.forEach((b, i) => {
      b.dataset.active = i <= index ? "1" : "0";
    });
  }

  updateBeadPositions();
  updateDisplay();
});

// Initial position
updateBeadPositions();