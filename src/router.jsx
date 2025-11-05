import { useState, useEffect } from 'react';

export const RouterContext = {
  currentPath: '/',
  navigate: (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  }
};

export function Router({ routes }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  RouterContext.currentPath = currentPath;

  const route = routes.find(r => r.path === currentPath) || routes[0];
  return <>{route.component}</>;
}

export function Link({ to, children, className }) {
  const handleClick = (e) => {
    e.preventDefault();
    RouterContext.navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
