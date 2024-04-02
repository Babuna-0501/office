const Link = ({ href, children, className, style, clickHandler = () => undefined }) => {
  const onClick = (e) => {
    // if ctrl or meta key are held on click, allow default behavior of opening link in new tab
    if (e.metaKey || e.ctrlKey) {
      return;
    }

    // prevent full page reload
    e.preventDefault();
    // changing route
    window.history.pushState({}, "", href);

    // custom click handler
    clickHandler();

    // communicate to Routes that url has changed
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <a href={href} className={className} onClick={onClick} style={style}>
      {children}
    </a>
  );
};

export default Link;
