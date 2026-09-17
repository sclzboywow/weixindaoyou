// Compatibility entry for WeChat DevTools worker-package compilation.
// The game never creates this worker; its valid path prevents DevTools 2.02
// from trying to compile an empty worker package.
if (typeof worker !== 'undefined') {
  worker.onMessage(() => {});
}
