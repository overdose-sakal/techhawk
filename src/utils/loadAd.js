export function loadAdScript(scriptUrl) {
  const script = document.createElement("script");
  script.src = scriptUrl;
  script.async = true;
  document.body.appendChild(script);
}
