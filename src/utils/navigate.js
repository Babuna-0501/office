export const navigate = ({ e, href }) => {
  // if ctrl or meta key are held on click, allow default behavior of opening link in new tab
  if (e) {
    if (e.metaKey || e.ctrlKey) {
      return;
    }

    // prevent full page reload
    e.preventDefault();
  }
  // changing route
  window.history.pushState({}, "", href);

  // communicate to Routes that url has changed
  const navEvent = new PopStateEvent("popstate");
  window.dispatchEvent(navEvent);
};
