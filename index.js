// for ia kits

window.addEventListener('DOMContentLoaded', () => {
  const preview = document.getElementById('ia-kit-preview');
  const errorbox = document.getElementById('ia-kit-error-message');
  const tierSelect = document.getElementById('ia-tier');

  function sanitize(input) {
    return input.replace(/<[^>]*>?/gm, '').trim();
  }

  function parseSizes(input, count) {
    const parts = input.split(',').map(x => x.trim());
    while (parts.length < count) parts.push('');
    return parts.slice(0, count);
  }

  function updateColor() {
    const selectedOption = tierSelect.options[tierSelect.selectedIndex];
    const color = selectedOption.getAttribute('data-color') || '#fff';
    tierSelect.style.backgroundColor = color;
  }

  function updatePreview() {
    const title = sanitize(document.getElementById('ia-kit-title').value);
    const titleSize = sanitize(document.getElementById('ia-kit-title-size').value);
    const hp = sanitize(document.getElementById('ia-kit-hp').value);
    const hpSize = sanitize(document.getElementById('ia-kit-hp-size').value);
    const statisticsRaw = sanitize(document.getElementById('ia-kit-statistics').value);
    const statSizesRaw = sanitize(document.getElementById('ia-kit-statistics-sizes').value);
    const itemsRaw = sanitize(document.getElementById('ia-kit-items').value);
    const itemSizesRaw = sanitize(document.getElementById('ia-kit-items-sizes').value);
    const tier = tierSelect.value;

    const stats = statisticsRaw.split(',').map(s => s.trim());
    const items = itemsRaw.split(',').map(i => i.trim()).filter(i => i !== '');
    const statSizes = parseSizes(statSizesRaw, 4);
    const itemSizes = parseSizes(itemSizesRaw, 3);

    const statsParts = stats.filter(s => s.length > 0);
    if (statsParts.some(s => !/^[\d.]+(x|%)?$/.test(s))) {
      errorbox.innerHTML = 'Enter 4 numeric values for statistics: Walkspeed, Attack, Jump power, Defense.';
      preview.innerHTML = '';
      preview.style.backgroundImage = 'none';
      return;
    }

    const hpParts = hp.split('/').map(s => s.trim());
    if (hpParts.length !== 2 || !hpParts.every(part => /^[\d.]+$/.test(part))) {
      errorbox.innerHTML = 'Enter health points in the format "current/max", e.g. 100/100.';
      preview.innerHTML = '';
      preview.style.backgroundImage = 'none';
      return;
    }

    if (tier === 'common' && items.length === 1) {
      errorbox.innerHTML = 'Common KITs cannot have only one item, either add more items or change the tier.';
      preview.innerHTML = '';
      preview.style.backgroundImage = 'none';
      return;
    }

    errorbox.innerHTML = '';

    const backgrounds = {
      common2: 'url(images/common3.png)',
      common3: 'url(images/common2.png)',
      rare1: 'url(images/rare1.png)',
      rare2: 'url(images/rare2.png)',
      rare3: 'url(images/rare3.png)',
      epic1: 'url(images/epic1.png)',
      epic2: 'url(images/epic2.png)',
      epic3: 'url(images/epic3.png)',
      legendary1: 'url(images/legendary1.png)',
      legendary2: 'url(images/legendary2.png)',
      legendary3: 'url(images/legendary3.png)'
    };

    const countKey = Math.min(Math.max(items.length, 1), 3);
    const backgroundKey = tier + countKey;
    preview.style.backgroundImage = backgrounds[backgroundKey] || 'none';

    preview.innerHTML = `
<div class="ia-kit-title" style="${titleSize ? `font-size:${titleSize}` : ''}">${title || 'Title'}</div>
<div class="ia-kit-hp" style="${hpSize ? `font-size:${hpSize}` : ''}">${hp || '100/100'}</div>
<div class="ia-kit-middle">
  <div class="ia-kit-stats">
    <div class="ia-kit-stats-column-left">
      <div class="ia-kit-stat-walkspeed" style="${statSizes[0] ? `font-size:${statSizes[0]}` : ''}">${stats[0] || '16'}</div>
      <div class="ia-kit-stat-attack" style="${statSizes[1] ? `font-size:${statSizes[1]}` : ''}">${stats[1] || '1x'}</div>
    </div>
    <div class="ia-kit-stats-column-right">
      <div class="ia-kit-stat-jumppower" style="${statSizes[2] ? `font-size:${statSizes[2]}` : ''}">${stats[2] || '50'}</div>
      <div class="ia-kit-stat-defense" style="${statSizes[3] ? `font-size:${statSizes[3]}` : ''}">${stats[3] || '0%'}</div>
    </div>
  </div>
  <div class="ia-kit-item1-name" style="${itemSizes[0] ? `font-size:${itemSizes[0]}` : ''}">${items[0] || ''}</div>
  <div class="ia-kit-item2-name" style="${itemSizes[1] ? `font-size:${itemSizes[1]}` : ''}">${items[1] || ''}</div>
  <div class="ia-kit-item3-name" style="${itemSizes[2] ? `font-size:${itemSizes[2]}` : ''}">${items[2] || ''}</div>
</div>`;
  }

  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', updatePreview);
    el.addEventListener('change', updatePreview);
  });

  document.getElementById('ia-funnydownloadbuttonlolol').addEventListener('click', () => {
    html2canvas(preview, { backgroundColor: null }).then(canvas => {
      const link = document.createElement('a');
      const title = sanitize(document.getElementById('ia-kit-title').value.trim() || 'ia-kit-preview');
      link.download = `${title.replace(/[\\/:*?"<>|]/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });

  updateColor();
  updatePreview();
  tierSelect.addEventListener('change', updateColor);
});

// for ar kits

window.addEventListener('DOMContentLoaded', () => {
  const preview = document.getElementById('ar-kit-preview');
  const errorbox = document.getElementById('ar-kit-error-message');
  const tierSelect = document.getElementById('ar-tier');

  const backgrounds = {
    common: 'url(images/ar-kit-common.png)',
    rare: 'url(images/ar-kit-rare.png)',
    epic: 'url(images/ar-kit-epic.png)',
    legendary: 'url(images/ar-kit-legendary.png)',
    mythical: 'url(images/ar-kit-common.png)'
  };

  function sanitize(input) {
    return String(input).replace(/<[^>]*>?/gm, '').trim();
  }

  function parseSizes(input, count) {
    if (!input) return Array(count).fill('');
    const parts = input.split(',').map(x => sanitize(x));
    while (parts.length < count) parts.push('');
    return parts.slice(0, count);
  }

  function updateColor() {
    const selectedOption = tierSelect.options[tierSelect.selectedIndex];
    const color = selectedOption ? selectedOption.getAttribute('data-color') : '#fff';
    tierSelect.style.backgroundColor = color || '#fff';
  }

  function adjustButtonPosition() {
    const cooldown = document.querySelector('.ar-kit-cooldown');
    const button = document.getElementById('ar-funnydownloadbuttonlolol');
    const preview = document.getElementById('ar-kit-preview');

    if (cooldown && button && preview) {
      const previewRect = preview.getBoundingClientRect();
      const cooldownRect = cooldown.getBoundingClientRect();

      // Calculate cooldown bottom relative to preview top
      const cooldownBottomRelative = cooldownRect.bottom - previewRect.top;

      // Add some margin (e.g., 10px) below cooldown
      const newButtonTop = cooldownBottomRelative + 10;

      // Set button style to position absolute relative to preview
      button.style.position = 'absolute';
      button.style.left = '50%'; // center horizontally
      button.style.transform = 'translateX(-50%)';
      button.style.top = `${newButtonTop}px`;
    }
  }

  function updatePreview() {
    const title = sanitize(document.getElementById('ar-kit-title').value);
    const titleSize = sanitize(document.getElementById('ar-kit-title-size').value);
    const desc = sanitize(document.getElementById('ar-kit-desc').value);
    const descSize = sanitize(document.getElementById('ar-kit-desc-size').value);
    const hp = sanitize(document.getElementById('ar-kit-hp').value);
    const hpSize = sanitize(document.getElementById('ar-kit-hp-size').value);

    const statisticsRaw = document.getElementById('ar-kit-statistics').value;
    const statSizesRaw = document.getElementById('ar-kit-statistics-sizes').value;
    const itemsRaw = document.getElementById('ar-kit-items').value;
    const itemSizesRaw = document.getElementById('ar-kit-items-sizes').value;
    const cooldownRaw = document.getElementById('ar-kit-cooldown-input').value;
    const cooldownSizesRaw = document.getElementById('ar-kit-cooldown-sizes').value;

    const tier = tierSelect.value;

    // Process stats: split and sanitize but DO NOT filter empty strings
    let stats = statisticsRaw.split(',').map(s => sanitize(s));
    while (stats.length < 4) stats.push(''); // ensure length 4
    stats = stats.slice(0, 4);

    // Validate stats format: allow empty or valid number
    if (stats.some(s => s && !/^\d*\.?\d+(x|%)?$/.test(s))) {
      errorbox.textContent = 'Enter 4 numeric values for statistics: Walkspeed, Attack, Jump power, Defense.';
      preview.innerHTML = '';
      preview.style.backgroundImage = 'none';
      return;
    }

    // Process items: split and sanitize, slice to 3, DO NOT filter empties
    let items = itemsRaw.split(',').map(i => sanitize(i));
    while (items.length < 3) items.push('');
    items = items.slice(0, 3);

    // Process cooldown parts similarly
    let cooldownParts = cooldownRaw.split(',').map(s => sanitize(s));
    while (cooldownParts.length < 1) cooldownParts.push('');
    cooldownParts = cooldownParts.filter(s => s !== ''); // cooldown can be empty, so filter here to skip empty cooldowns

    // Parse sizes
    const statSizes = parseSizes(statSizesRaw, 4);
    const itemSizes = parseSizes(itemSizesRaw, 3);
    const cooldownSizes = parseSizes(cooldownSizesRaw, cooldownParts.length);

    // Validate HP format "current/max"
    const hpParts = hp.split('/').map(s => s.trim());
    if (hpParts.length !== 2 || !hpParts.every(part => /^\d*\.?\d+$/.test(part))) {
      errorbox.textContent = 'Enter health points in the format "current/max", e.g. 100/100.';
      preview.innerHTML = '';
      preview.style.backgroundImage = 'none';
      return;
    }

    // Clear error
    errorbox.textContent = '';

    // Clear preview and set background
    preview.innerHTML = '';
    preview.style.backgroundImage = backgrounds[tier] || '';

    // Build container
    const container = document.createElement('div');
    container.className = `ar-kit-container ar-kit-${tier}`;
    container.innerHTML = `
      <div class="ar-kit-title" style="${titleSize ? `font-size:${titleSize}` : ''}">${title || 'Title'}</div>
      <div class="ar-kit-desc" style="${descSize ? `font-size:${descSize}` : ''}">${desc || ''}</div>
      <div class="ar-kit-middle">
        <div class="ar-kit-hp" style="${hpSize ? `font-size:${hpSize}` : ''}">HP: ${hp || '100/100'}</div>
        <div class="ar-kit-stats">
          <div class="ar-kit-stats-column-left">
            <div class="ar-kit-stat-walkspeed" style="font-size:${statSizes[0] || '45px'}">${stats[0] || '16'}</div>
            <div class="ar-kit-stat-attack" style="font-size:${statSizes[1] || '45px'}">${stats[1] || '1x'}</div>
          </div>
          <div class="ar-kit-stats-column-right">
            <div class="ar-kit-stat-jumppower" style="font-size:${statSizes[2] || '45px'}">${stats[2] || '50'}</div>
            <div class="ar-kit-stat-defense" style="font-size:${statSizes[3] || '45px'}">${stats[3] || '0%'}</div>
          </div>
        </div>
      </div>
      <div class="ar-kit-item1-name" style="${itemSizes[0] ? `font-size:${itemSizes[0]}` : ''}">${items[0]}</div>
      <div class="ar-kit-item2-name" style="${itemSizes[1] ? `font-size:${itemSizes[1]}` : ''}">${items[1]}</div>
      <div class="ar-kit-item3-name" style="${itemSizes[2] ? `font-size:${itemSizes[2]}` : ''}">${items[2]}</div>
     ${cooldownParts.length > 0 ? `<div class="ar-kit-cooldown" style="display:flex; flex-direction: column; gap: 4px;">${
  cooldownParts.map((part, idx) => 
    `<div style="font-size:${cooldownSizes[idx] || '20px'}; white-space: normal;">${part}</div>`
  ).join('')
}</div>` : ''}

    `;

    preview.appendChild(container);
  }

  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', updatePreview);
    el.addEventListener('change', updatePreview);
  });

  document.getElementById('ar-funnydownloadbuttonlolol').addEventListener('click', () => {
    html2canvas(preview, { backgroundColor: null }).then(canvas => {
      const link = document.createElement('a');
      link.download = `kit-preview-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });

  tierSelect.addEventListener('change', updateColor);

  // Initialize color & preview on load
  updateColor();
  updatePreview();

});


document.getElementById("right-arrow").addEventListener("click", function () {
  document.getElementById("ia-kit-view").style.display = "none";
  document.getElementById("ar-kit-view").style.display = "block";
  document.getElementById("left-arrow").style.display = "inline-block";
  document.getElementById("right-arrow").style.display = "none";
  document.body.classList.add("ar-mode");
});

document.getElementById("left-arrow").addEventListener("click", function () {
  document.getElementById("ia-kit-view").style.display = "block";
  document.getElementById("ar-kit-view").style.display = "none";
  document.getElementById("left-arrow").style.display = "none";
  document.getElementById("right-arrow").style.display = "inline-block";
  document.body.classList.remove("ar-mode");
});
