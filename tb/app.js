// ==============================
// ⚙️ Global Config & State
// ==============================
const biasFactor = 1.001;
let maxGuardsmenHealth = Infinity;
const debugMode = false;
let activeGuardsmen = [];
let activeSpecialists = [];

// ==============================
// 🧠 Squad Overrides
// ==============================
const squadOverrides = {
  guardsman: new Map(),
  specialist: new Map(),
  mercenary: new Map(),
  monster: new Map()
};

// ==============================
// 🎯 Icon Maps
// ==============================
const iconNameMap = {
  melee: 'sword',
  mount: 'horse',
  flying: 'bird',
  scout: 'binoculars',
  epic: 'sparkle',
  dragon: 'fire',
  giant: 'armchair',
  elemental: 'wind',
  beast: 'paw-print'
};

function getIconHTML(key, context = '') {
  if (typeof key === 'number' || !isNaN(+key)) return '';
  const safeKey = key.replace(/[^a-z0-9_-]/gi, '');
  const contextClass = context ? `context--${context}` : '';

  if (customIconMap[key]) {
    return `<span class="icon-wrapper icon--${safeKey} ${contextClass}">${customIconMap[key]}</span>`;
  }

  return `<i class="ph ph-${iconNameMap[key] || 'question'}" style="font-size:16px; color: rgba(255,255,255,0.7); margin-right:6px;"></i>`;
}

// ==============================
// 🎨 Level Colors
// ==============================
const levelColors = {
  1: '#a59c8f', 2: '#6c9200', 3: '#225a75',
  4: '#3a2299', 5: '#e37410', 6: '#b51002',
  7: '#fbd071', 8: '#a59c8f', 9: '#6c9200'
};

// ==============================
// 🧮 Filter Sets
// ==============================
const guardTypes = new Set(['mount']);
const guardLevels = new Set([5]);
const specTypes = new Set(['ranged', 'melee', 'mount', 'flying', 'scout']);
const specLevels = new Set([]);
const mercTypes = new Set(['epic', 'ranged', 'melee', 'mount', 'flying']);
const mercLevels = new Set([]);
const monsterTypes = new Set(['ranged', 'melee', 'mount', 'flying']);
const monsterKinds = new Set(['dragon', 'giant', 'elemental', 'beast']);
const monsterLevels = new Set([]);

// const guardTypes = new Set(['ranged', 'melee', 'mount', 'flying']);
// const guardLevels = new Set([7, 8, 9]);
// const specTypes = new Set(['ranged', 'melee', 'mount', 'flying', 'scout']);
// const specLevels = new Set([5, 6, 7, 8, 9]);
// const mercTypes = new Set(['epic', 'ranged', 'melee', 'mount', 'flying']);
// const mercLevels = new Set([5, 6, 7, 8, 9]);
// const monsterTypes = new Set(['ranged', 'melee', 'mount', 'flying']);
// const monsterKinds = new Set(['dragon', 'giant', 'elemental', 'beast']);
// const monsterLevels = new Set([3, 4, 5, 6, 7, 8, 9]);

const filterSets = {
  guard: { levels: guardLevels },
  spec: { levels: specLevels },
  merc: { levels: mercLevels },
  monster: { levels: monsterLevels }
};

document.querySelectorAll('.filter-label').forEach(label => {
  label.addEventListener('click', () => {
    const group = label.dataset.group;
    const sets = filterSets[group];

    if (!sets) return;

    sets.levels.clear(); // 👈 only clears the levels set

    setupFilterButtons();
    calculateGuardsmen();
    calculateMercenaries();
    calculateMonsters();
  });
});
document.addEventListener('click', e => {
  const header = e.target.closest('.breakdown-toggle');
  if (!header) return;

  const group = header.dataset.group;
  const filter = {
    guard: guardLevels,
    spec: specLevels,
    merc: mercLevels,
    monster: monsterLevels
  }[group];

  if (!filter) return;

  filter.clear();

  setupFilterButtons();
  calculateGuardsmen();
  calculateMercenaries();
  calculateMonsters();
});

// ==============================
// 🧠 Utility
// ==============================
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getTroopCount(group, name, countMap) {
  const id = `${group}-${name}`;
  return squadOverrides[group]?.get(id) === 0 ? 0 : (countMap.get(id) || 0);
}

// ==============================
// 🚀 App Bootstrap
// ==============================
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('leadership').addEventListener('input', calculateGuardsmen);
  document.getElementById('authority').addEventListener('input', calculateMercenaries);
  document.getElementById('dominance').addEventListener('input', calculateMonsters);
  document.getElementById('limit-by-authority')?.addEventListener('change', calculateMercenaries);
  document.getElementById('rider-cost')?.addEventListener('input', updateTrainingCosts);
  document.getElementById('rider-minutes')?.addEventListener('input', updateTrainingCosts);
  document.getElementById('rider-seconds')?.addEventListener('input', updateTrainingCosts);
  document.getElementById('training-cap')?.addEventListener('input', updateTrainingCosts);
  document.getElementById('marches')?.addEventListener('input', updateTrainingCosts);



  setupFilterButtons();
  calculateGuardsmen(); // this will call updateTrainingCosts internally
  calculateMercenaries();
  calculateMonsters();
});


// ==============================
// 🖼️ Troop Rendering
// ==============================
function renderResult(label, items) {
  const grouped = items.reduce((acc, t) => {
    acc[t.lvl] = acc[t.lvl] || [];
    acc[t.lvl].push(t);
    return acc;
  }, {});

  const levels = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return levels.map(level => {
    return grouped[level].map(t => {
      const group = t.group || label.toLowerCase();
      const id = `${group}-${t.name}`;
      const baseColor = levelColors[t.lvl] || '#444';
      const faded = `${baseColor}33`;

      const bgStyle = `
        background: linear-gradient(to left, transparent 0%, ${faded} 0%, transparent 75%);
        border-left: 4px solid ${baseColor}; padding-left: 10px;
      `.trim();

      const attackIcon = getIconHTML(t.attack || t.type || t.group, 'troop');
      const kindIcon = group === 'monster' ? getIconHTML(t.type, 'troop') : '';
      const iconHTML = `${kindIcon}${attackIcon}`;

      const override = squadOverrides[group]?.get(id);
      const shown = override === 0 ? 0 : t.count;
      const hp = (shown * t.health).toLocaleString();
      const overrideClass = override === 0 ? 'override' : '';

      return `
        <div class="troop-entry ${overrideClass}" data-id="${id}" data-group="${group}" style="${bgStyle}">
          <div class="troop-label">${iconHTML}<span>${t.name}</span></div>
          <div style="text-align: right;">
            <div>${shown.toLocaleString()}</div>
            <div style="font-size: 10px; color: #94a3b8;">${hp} HP</div>
          </div>
        </div>
      `;
    }).join('');
  }).join('');
}

// ==============================
// 🧩 Filter Button Setup
// ==============================
function setupFilterButtons() {
  const gTypes = ['melee', 'ranged', 'mount', 'flying'];
  const mTypes = ['melee', 'ranged', 'mount', 'flying'];
  const mKinds = ['dragon', 'elemental', 'giant', 'beast'];
  const mercT = ['epic', 'melee', 'ranged', 'mount', 'flying'];
  const specT = ['melee', 'ranged', 'mount', 'flying', 'scout'];

  const toggle = (set, val) => set.has(val) ? set.delete(val) : set.add(val);

  const filters = [
    { el: '#guard-type-filters', items: gTypes, set: guardTypes, cb: calculateGuardsmen },
    { el: '#guard-level-filters', items: [1,2,3,4,5,6,7,8,9], set: guardLevels, cb: calculateGuardsmen },
    { el: '#spec-type-filters', items: specT, set: specTypes, cb: calculateGuardsmen },
    { el: '#spec-level-filters', items: [1,2,3,4,5,6,7,8,9], set: specLevels, cb: calculateGuardsmen },
    { el: '#merc-type-filters', items: mercT, set: mercTypes, cb: calculateMercenaries },
    { el: '#merc-level-filters', items: [5,6,7,9], set: mercLevels, cb: calculateMercenaries },
    { el: '#monster-type-filters', items: mTypes, set: monsterTypes, cb: calculateMonsters },
    { el: '#monster-kind-filters', items: mKinds, set: monsterKinds, cb: calculateMonsters },
    { el: '#monster-level-filters', items: [3,4,5,6,7,8,9], set: monsterLevels, cb: calculateMonsters }
  ];

  filters.forEach(({ el, items, set, cb }) => {
    const container = document.querySelector(el);
    const row = [];

    items.forEach(item => {
      const val = typeof item === 'number' ? String(item) : item;
      const isNumber = typeof item === 'number';
      const iconHTML = getIconHTML(val, 'filter');
      const active = set.has(item);
      const classNames = [
        'filter-btn',
        isNumber ? 'level-btn' : 'type-btn',
        active ? 'active' : ''
      ].join(' ');
      const label = isNumber ? val : '';
      const buttonHTML = `<button data-val="${val}" class="${classNames}">${iconHTML}${label}</button>`;
      row.push(buttonHTML);
    });

    container.innerHTML = `<div style="margin-bottom: 4px;">${row.join('')}</div>`;

    container.querySelectorAll('button').forEach(btn => {
      btn.onclick = () => {
        const raw = btn.dataset.val;
        const val = isNaN(+raw) ? raw : +raw;
        toggle(set, val);
        btn.classList.toggle('active');
        cb();
      };
    });
  });
}

// ==============================
// 🔁 Toggle Squad Overrides
// ==============================
function bindToggleEvents() {
  document.querySelectorAll('.troop-entry').forEach(entry => {
    entry.onclick = () => {
      const id = entry.dataset.id;
      const group = entry.dataset.group;
      const isOff = squadOverrides[group]?.get(id) === 0;
      if (isOff) {
        squadOverrides[group].delete(id);
      } else {
        squadOverrides[group].set(id, 0);
      }
      calculateAll();
    };
  });
}

// ==============================
// 🧠 Calculate All Groups
// ==============================
function calculateAll() {
  calculateGuardsmen();
  calculateMercenaries();
  calculateMonsters();
}

// ==============================
// 🧠 Calculate Training Costs
// ==============================
const riderLevelMultipliers = {
  silver: {
    1: 0.60, 2: 1.00, 3: 1.40, 4: 1.80, 5: 2.20, 6: 2.59,
    7: 3.00, 8: 3.40, 9: 3.80
  },
  time: {
    1: 0.084, 2: 1.00, 3: 2.35, 4: 2.68, 5: 3.01, 6: 3.38,
    7: 3.75, 8: 4.10, 9: 4.50
  }
};



function updateTrainingCosts() {
  const trainingCap = Math.max(1, parseInt(document.getElementById('training-cap')?.value || 1));
  const marches = Math.max(1, parseInt(document.getElementById('marches')?.value || 1));
  const riderSilver = parseFloat(document.getElementById('rider-cost')?.value || 1000);
  const riderMinutes = parseInt(document.getElementById('rider-minutes')?.value || 0);
  const riderSeconds = parseInt(document.getElementById('rider-seconds')?.value || 0);
  const riderTime = (riderMinutes * 60) + riderSeconds;

  let totalSilver = 0;
  let totalTime = 0;
  let totalSpeedups = { d: 0, h: 0, m15: 0 };

  const troopGroups = ['guardsman', 'specialist'];

  troopGroups.forEach(group => {
    const troops = group === 'guardsman' ? activeGuardsmen : activeSpecialists;
    if (!troops || troops.length === 0 || typeof troops[0].count !== 'number') return;

    troops.forEach(t => {
      const id = `${group}-${t.name}`;
      const isOff = squadOverrides[group]?.get(id) === 0;
      if (isOff || typeof t.count !== 'number') return;

      // 🧮 Determine troop-type multipliers
      let silverMult = 1;
      let timeMult = 1;

      if (group === 'specialist') {
        switch (t.type) {
          case 'scout':
            silverMult = 5.1;
            timeMult = 3.15;
            break;
          case 'flying':
            silverMult = 20.4;
            timeMult = 11.0;
            break;
          case 'mount':
            silverMult = 2.04;
            timeMult = 1.10;
            break;
          default:
            silverMult = 1.02;
            timeMult = 0.55;
        }
      } else if (group === 'guardsman') {
        switch (t.type) {
          case 'flying':
            silverMult = 10;
            timeMult = 10;
            break;
          case 'mount':
            silverMult = 1;
            timeMult = 1;
            break;
          default:
            silverMult = 0.5;
            timeMult = 0.5;
        }
      }

      // 🧮 Apply level-based multipliers
      const level = t.lvl;
      const levelSilverMult = riderLevelMultipliers.silver[level] || 1;
      const levelTimeMult = riderLevelMultipliers.time[level] || 1;

      const costPerTroop = riderSilver * silverMult * levelSilverMult;
      const timePerTroop = riderTime * timeMult * levelTimeMult;

      const totalTroops = t.count * marches;

      // 🧮 Adjust training cap based on troop type
      let capMultiplier = 1;

      if (group === 'guardsman') {
        if (t.type === 'flying') capMultiplier = 0.1;
        else if (t.type === 'melee' || t.type === 'ranged') capMultiplier = 2.0;
      } else if (group === 'specialist') {
        switch (t.type) {
          case 'flying': capMultiplier = 0.1; break;
          case 'mount': capMultiplier = 1.0; break;
          case 'scout': capMultiplier = 0.4; break;
          case 'melee':
          case 'ranged':
            capMultiplier = 2.0;
            break;
        }
      }


      const adjustedCap = Math.max(1, Math.floor(trainingCap * capMultiplier));
      const batches = Math.ceil(totalTroops / adjustedCap);
      const timePerBatch = timePerTroop * adjustedCap;

      totalSilver += costPerTroop * totalTroops;
      totalTime += timePerBatch * batches;

      // ⏱️ Speedups per batch
      for (let i = 0; i < batches; i++) {
        let remaining = timePerBatch;
        totalSpeedups.d += Math.floor(remaining / 86400);
        remaining %= 86400;
        totalSpeedups.h += Math.floor(remaining / 3600);
        remaining %= 3600;
        totalSpeedups.m15 += Math.ceil(remaining / 900);
      }
    });
  });

  // 🧾 Update UI
  document.getElementById('bk-total-silver').textContent = Math.round(totalSilver).toLocaleString();
  document.getElementById('bk-total-time').textContent = formatTime(totalTime);
  document.getElementById('bk-speedups').innerHTML = `
  <span class="stat-label">1d:</span> ${totalSpeedups.d}
  <span class="stat-label">1h:</span> ${totalSpeedups.h}
  <span class="stat-label">15m:</span> ${totalSpeedups.m15}
`;

}



function formatTime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
}


// ==============================
// 🛡️ Guardsmen & Specialists
// ==============================
function calculateGuardsmen() {
  const leadership = +document.getElementById('leadership').value || 0;
  const guards = troopData.filter(t => guardLevels.has(t.lvl) && guardTypes.has(t.type));
  const specs = specialistData.filter(t => specLevels.has(t.lvl) && specTypes.has(t.type));
  const all = [...guards, ...specs];

  const activeTroops = all.filter(t => {
    const group = troopData.includes(t) ? 'guardsman' : 'specialist';
    const id = `${group}-${t.name}`;
    return !squadOverrides[group].has(id);
  });

  const totalRatio = activeTroops.reduce((sum, t) =>
    sum + ((t.leadership / t.health) * Math.pow(1 / biasFactor, t.lvl)), 0);

  const result = all.map(t => {
    const group = troopData.includes(t) ? 'guardsman' : 'specialist';
    const id = `${group}-${t.name}`;
    const bias = Math.pow(1 / biasFactor, t.lvl);
    const isOverridden = squadOverrides[group].get(id) === 0;
    const count = isOverridden
      ? 0
      : Math.floor((leadership * bias) / (totalRatio * t.health));
    return { ...t, count, group };
  });

  const gs = result.filter(t => t.group === 'guardsman');
  const specsOnly = result.filter(t => t.group === 'specialist');

  document.querySelector('#guardsmen-results').innerHTML =
    guardLevels.size > 0
      ? `<div class="level-header breakdown-toggle" data-group="guard">
           ${customHeaderIconMap.guard || ''} Guardsmen
         </div>` + renderResult('guardsman', gs)
      : '';

  document.querySelector('#specialist-results').innerHTML =
    specLevels.size > 0
      ? `<div class="level-header breakdown-toggle" data-group="spec">
           ${customHeaderIconMap.spec || ''} Specialists
         </div>` + renderResult('specialist', specsOnly)
      : '';

  activeGuardsmen = gs;
  activeSpecialists = specsOnly;

  updateLeadershipStats(result, leadership);
  bindToggleEvents();
  calculateMonsters();       // Monsters depend on squad HP
  calculateMercenaries();    // Mercs also need the HP constraint
  updateResourceStats();
  updateTrainingCosts();
}

// ==============================
// 💰 Mercenaries
// ==============================
function calculateMercenaries() {
  const limitByAuthority = document.getElementById('limit-by-authority')?.checked;
  const group = 'mercenary';
  const authorityCap = +document.getElementById('authority').value || 0;
  const healthCapPerSquad = window.maxGsHealth || Infinity;

  const eligible = mercenaryData.filter(m =>
    mercLevels.has(m.lvl) && mercTypes.has(m.type)
  );

  const active = eligible.filter(m =>
    !squadOverrides[group].has(`${group}-${m.name}`)
  );

  const allocation = active.map(m => {
    const maxByHealth = Math.floor(healthCapPerSquad / m.health);
    return {
      ...m,
      maxCount: maxByHealth,
      count: 0,
      group,
      squadHealth: 0,
      squadAuthority: 0
    };
  });

  if (limitByAuthority) {
    let remainingAuthority = authorityCap;
    let added = true;

    while (added) {
      added = false;
      for (const m of allocation) {
        if (
          m.squadHealth + m.health <= healthCapPerSquad &&
          remainingAuthority >= m.authority
        ) {
          m.count += 1;
          m.squadHealth += m.health;
          m.squadAuthority += m.authority;
          remainingAuthority -= m.authority;
          added = true;
        }
      }
    }
  } else {
    for (const m of allocation) {
      m.count = m.maxCount;
      m.squadHealth = m.count * m.health;
      m.squadAuthority = m.count * m.authority;
    }
  }

  const countMap = new Map();
  allocation.forEach(t => countMap.set(`${group}-${t.name}`, t.count));

  const result = eligible.map(m => {
    const count = getTroopCount(group, m.name, countMap);
    return {
      ...m,
      count,
      group,
      squadHealth: count * m.health
    };
  });

  document.querySelector('#mercenary-results').innerHTML =
    mercLevels.size > 0
      ? `<div class="level-header breakdown-toggle" data-group="merc">
           ${customHeaderIconMap.merc || ''} Mercenaries
         </div>` + renderResult(group, result)
      : '';

  bindToggleEvents();
  updateResourceStats();

  const totalAuthorityUsed = result.reduce((sum, t) => sum + t.count * t.authority, 0);
  const authorityRemaining = authorityCap - totalAuthorityUsed;

  document.getElementById('bk-auth-used').textContent = totalAuthorityUsed.toLocaleString();
  document.getElementById('bk-auth-left').textContent = Math.max(0, authorityRemaining).toLocaleString();

  if (debugMode) {
    console.group("🧪 Mercenary Allocation Debug");
    console.log("Authority Cap:", authorityCap);
    console.log("Used:", totalAuthorityUsed);
    console.log("Remaining:", authorityRemaining);
    console.groupEnd();
  }

  window.allocatedMercenaries = result;
}

// ==============================
// 🐉 Monsters
// ==============================
function calculateMonsters() {
  const group = 'monster';
  const dominanceCap = +document.getElementById('dominance').value || 0;
  const healthCapPerSquad = window.maxGsHealth || Infinity;

  const eligible = monsterData.filter(m =>
    monsterLevels.has(m.lvl) &&
    monsterTypes.has(m.attack) &&
    monsterKinds.has(m.type)
  );

  const active = eligible.filter(m =>
    !squadOverrides[group].has(`${group}-${m.name}`)
  );

  const allocation = active.map(m => {
    const maxCount = Math.floor(healthCapPerSquad / m.health);
    const maxHealth = maxCount * m.health;
    const maxDominance = maxCount * m.dominance;
    return {
      ...m,
      maxCount,
      maxHealth,
      maxDominance,
      count: 0,
      squadHealth: 0,
      squadDominance: 0
    };
  });

  const totalHealthPotential = allocation.reduce((sum, m) => sum + m.maxHealth, 0);
  let remainingDominance = dominanceCap;

  // Proportional fill
  for (const m of allocation) {
    const share = m.maxHealth / totalHealthPotential;
    const allowedDominance = Math.floor(share * dominanceCap);
    const maxAffordable = Math.floor(allowedDominance / m.dominance);
    const count = Math.min(m.maxCount, maxAffordable);

    m.count = count;
    m.squadHealth = count * m.health;
    m.squadDominance = count * m.dominance;
    remainingDominance -= m.squadDominance;
  }

  // Greedy fill
  const sorted = [...allocation].sort((a, b) =>
    (b.health / b.dominance) - (a.health / a.dominance)
  );

  for (const m of sorted) {
    while (
      m.count < m.maxCount &&
      remainingDominance >= m.dominance
    ) {
      m.count += 1;
      m.squadHealth += m.health;
      m.squadDominance += m.dominance;
      remainingDominance -= m.dominance;
    }
  }

  const countMap = new Map();
  allocation.forEach(t => countMap.set(`${group}-${t.name}`, t.count));

  const result = eligible.map(m => {
    const count = getTroopCount(group, m.name, countMap);
    return {
      ...m,
      count,
      group,
      squadHealth: count * m.health
    };
  });

  document.querySelector('#monster-results').innerHTML =
    monsterLevels.size > 0
      ? `<div class="level-header breakdown-toggle" data-group="monster">
           ${customHeaderIconMap.monster || ''} Monsters
         </div>` + renderResult('monster', result)
      : '';

  bindToggleEvents();
  updateResourceStats();

  const totalDominanceUsed = result.reduce((sum, t) => sum + t.count * t.dominance, 0);
  const dominanceRemaining = dominanceCap - totalDominanceUsed;

  document.getElementById('bk-dom-used').textContent = totalDominanceUsed.toLocaleString();
  document.getElementById('bk-dom-left').textContent = Math.max(0, dominanceRemaining).toLocaleString();

  if (debugMode) {
    console.group("🧪 Monster Allocation Debug");
    console.log("Dominance Cap:", dominanceCap);
    console.log("Used:", totalDominanceUsed);
    console.log("Remaining:", dominanceRemaining);
    console.groupEnd();
  }

  window.allocatedMonsters = result;
}

// ==============================
// 📊 Leadership Stats
// ==============================
function updateLeadershipStats(result, leadership) {
  const squads = result.map(t => {
    const id = `${t.group}-${t.name}`;
    const override = squadOverrides[t.group]?.get(id);
    const count = override === 0 ? 0 : t.count;
    return { ...t, count, squadHealth: count * t.health };
  });

  const top = squads.reduce((a, b) => a.squadHealth > b.squadHealth ? a : b, { squadHealth: 0 });
  const used = squads.reduce((sum, t) => sum + (t.leadership || 0) * t.count, 0);

  document.getElementById('bk-max-health').textContent = top.squadHealth.toLocaleString();
  document.getElementById('bk-leading').textContent = top.count > 0 ? top.name : '–';
  document.getElementById('bk-used').textContent = used.toLocaleString();
  document.getElementById('bk-left').textContent = Math.max(0, leadership - used).toLocaleString();

  window.maxGsHealth = top.squadHealth;

  if (debugMode) {
    console.log("Max squad health cap:", window.maxGsHealth.toLocaleString());
  }
}

// ==============================
// 📊 Resource Stats
// ==============================
function updateResourceStats() {
  const auth = +document.getElementById('authority').value || 0;
  const dom = +document.getElementById('dominance').value || 0;

  const usedAuthority = (window.allocatedMercenaries || []).reduce(
    (sum, m) => sum + m.count * m.authority, 0
  );

  const usedDominance = (window.allocatedMonsters || []).reduce(
    (sum, m) => sum + m.count * m.dominance, 0
  );

  document.getElementById('bk-auth-used').textContent = usedAuthority.toLocaleString();
  document.getElementById('bk-auth-left').textContent = Math.max(0, auth - usedAuthority).toLocaleString();
  document.getElementById('bk-dom-used').textContent = usedDominance.toLocaleString();
  document.getElementById('bk-dom-left').textContent = Math.max(0, dom - usedDominance).toLocaleString();
}
