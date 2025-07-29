// item asylum kits :3

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
    if (statsParts.some(s => !/^-?\d+(\.\d+)?(x|%)?$/.test(s))) {
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
      common2: 'url(images/ia-kit-common3.png)',
      common3: 'url(images/ia-kit-common2.png)',
      rare1: 'url(images/ia-kit-rare1.png)',
      rare2: 'url(images/ia-kit-rare2.png)',
      rare3: 'url(images/ia-kit-rare3.png)',
      epic1: 'url(images/ia-kit-epic1.png)',
      epic2: 'url(images/ia-kit-epic2.png)',
      epic3: 'url(images/ia-kit-epic3.png)',
      legendary1: 'url(images/ia-kit-legendary1.png)',
      legendary2: 'url(images/ia-kit-legendary2.png)',
      legendary3: 'url(images/ia-kit-legendary3.png)'
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

// last updated (because it's fun lol)

async function iaShowLastUpdated() {
  const repoOwner = 'oksouhhhhhhhhh';
  const repoName = 'KIT-Builder';
  
  function formatFullDate(date) {
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function timeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=1`);
    if (!response.ok) throw new Error('Network response was not ok');

    const commits = await response.json();
    if (commits.length === 0) {
      document.getElementById('ia-last-updated').textContent = 'No commits found.';
      return;
    }

    const lastCommitDate = new Date(commits[0].commit.committer.date);
    const fullDate = formatFullDate(lastCommitDate);

    function updateText() {
      const ago = timeAgo(lastCommitDate);
      document.getElementById('ia-last-updated').textContent = `Last deployment: ${ago} (${fullDate})`;
    }
    updateText();
    setInterval(updateText, 10000);

  } catch (error) {
    console.error('Error fetching last commit:', error);
    document.getElementById('ia-last-updated').textContent = 'Could not load last updated date.';
  }
}

iaShowLastUpdated();
