(() => {
  const node = document.getElementById('project-copy-data');
  if (!node) return;
  const copy = JSON.parse(node.textContent);
  if (document.body.dataset.project !== copy.slug) return;
  const rows = document.querySelectorAll('.coffee-information-row');
  if (rows.length !== copy.exhibit.info.length) throw new Error('Project information card count mismatch');
  rows.forEach((row, i) => {
    row.querySelector('h3').textContent = copy.exhibit.labels[i][0];
    row.querySelector('.coffee-information-label small').textContent = copy.exhibit.labels[i][1];
    row.querySelector('p').innerHTML = copy.exhibit.info[i];
  });
})();
