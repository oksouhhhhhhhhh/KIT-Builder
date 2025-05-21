window.addEventListener('DOMContentLoaded', () => {
  const preview = document.getElementById('kit-preview');
  const errorbox = document.getElementById('kit-error-message');
  const tierSelect = document.getElementById('tier');

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
    const title = sanitize(document.getElementById('kit-title').value);
    const titleSize = sanitize(document.getElementById('kit-title-size').value);
    const hp = sanitize(document.getElementById('kit-hp').value);
    const hpSize = sanitize(document.getElementById('kit-hp-size').value);
    const statisticsRaw = sanitize(document.getElementById('kit-statistics').value);
    const statSizesRaw = sanitize(document.getElementById('kit-statistics-sizes').value);
    const itemsRaw = sanitize(document.getElementById('kit-items').value);
    const itemSizesRaw = sanitize(document.getElementById('kit-items-sizes').value);
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
<div class="kit-title" style="${titleSize ? `font-size:${titleSize}` : ''}">${title || 'Title'}</div>
<div class="kit-hp" style="${hpSize ? `font-size:${hpSize}` : ''}">${hp || '100/100'}</div>
<div class="kit-middle">
  <div class="kit-stats">
    <div class="kit-stats-column-left">
      <div class="kit-stat-walkspeed" style="${statSizes[0] ? `font-size:${statSizes[0]}` : ''}">${stats[0] || '16'}</div>
      <div class="kit-stat-attack" style="${statSizes[1] ? `font-size:${statSizes[1]}` : ''}">${stats[1] || '1x'}</div>
    </div>
    <div class="kit-stats-column-right">
      <div class="kit-stat-jumppower" style="${statSizes[2] ? `font-size:${statSizes[2]}` : ''}">${stats[2] || '50'}</div>
      <div class="kit-stat-defense" style="${statSizes[3] ? `font-size:${statSizes[3]}` : ''}">${stats[3] || '0%'}</div>
    </div>
  </div>
  <div class="kit-item1-name" style="${itemSizes[0] ? `font-size:${itemSizes[0]}` : ''}">${items[0] || ''}</div>
  <div class="kit-item2-name" style="${itemSizes[1] ? `font-size:${itemSizes[1]}` : ''}">${items[1] || ''}</div>
  <div class="kit-item3-name" style="${itemSizes[2] ? `font-size:${itemSizes[2]}` : ''}">${items[2] || ''}</div>
</div>`;
  }

  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', updatePreview);
    el.addEventListener('change', updatePreview);
  });

  document.getElementById('funnydownloadbuttonlolol').addEventListener('click', () => {
    html2canvas(preview, { backgroundColor: null }).then(canvas => {
      const link = document.createElement('a');
      const title = sanitize(document.getElementById('kit-title').value.trim() || 'kit-preview');
      link.download = `${title.replace(/[\\/:*?"<>|]/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });

  updateColor();
  updatePreview();
  tierSelect.addEventListener('change', updateColor);
});
