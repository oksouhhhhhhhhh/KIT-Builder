window.addEventListener('DOMContentLoaded', () => {
  const preview = document.getElementById('kit-preview');
  const downloadBtn = document.getElementById('download-btn');

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

  function updatePreview() {
    const tier = document.getElementById('tier').value;
    const errorbox = document.getElementById('kit-error-message');
    const itemInputs = document.querySelectorAll('.kit-items');

    const items = Array.from(itemInputs).map(input => input.value.trim());
    const filledCount = items.filter(item => item !== '').length;

    if (tier === 'common' && filledCount === 1) {
      errorbox.textContent = 'Common KITs cannot have only one item, either add more items or change the tier.';
      preview.style.backgroundImage = 'none';
      preview.innerHTML = '';
      return;
    } else {
      errorbox.textContent = '';
    }

    const countKey = Math.min(Math.max(filledCount, 1), 3);
    const backgroundKey = tier + countKey;

    preview.style.backgroundImage = backgrounds[backgroundKey] || 'none';

    preview.innerHTML = `<div class="kit-title">${document.getElementById('kit-title').value || 'Title'}</div>
<div class="kit-hp">${document.getElementById('kit-hp').value || '100/100'}</div>
<div class="kit-middle">
<div class="kit-stats">
<div class="kit-stats-column-left">
<div class="kit-stat-walkspeed">${document.getElementById('kit-walkspeed').value || '16'}</div>
<div class="kit-stat-attack">${document.getElementById('kit-attack').value || '1x'}</div>
</div>
<div class="kit-stats-column-right">
<div class="kit-stat-jumppower">${document.getElementById('kit-jumppower').value || '50'}</div>
<div class="kit-stat-defense">${document.getElementById('kit-defense').value || '0%'}</div>
</div>
</div>
<div class="kit-item1-name">${items[0] || ''}</div>
<div class="kit-item2-name">${items[1] || ''}</div>
<div class="kit-item3-name">${items[2] || ''}</div>
</div>`;
  }

  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', updatePreview);
    el.addEventListener('change', updatePreview);
  });
  
  document.getElementById('funnydownloadbuttonlolol').addEventListener('click', () => {
    html2canvas(preview, { backgroundColor: null }).then(canvas => {
      const link = document.createElement('a');
      const title = document.getElementById('kit-title').value.trim() || 'kit-preview';
      link.download = `${title.replace(/[\\/:*?"<>|]/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });
  updatePreview();
  });
