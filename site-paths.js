(() => {
  // This script lives at the site root, including when the site is in a subfolder.
  const siteRoot = new URL('.', document.currentScript.src);

  window.kalinaSiteURL = value => {
    if (!value.startsWith('/') || value.startsWith('//')) return value;
    return new URL(value.slice(1), siteRoot).href;
  };

  // Resolve generated markup before insertion so media never requests the domain root.
  window.kalinaSiteHTML = html => html.replace(
    /(\b(?:href|src|poster)\s*=\s*)(["'])(\/(?!\/)[^"']*)\2/g,
    (match, attribute, quote, value) => attribute + quote + window.kalinaSiteURL(value) + quote
  );
})();
