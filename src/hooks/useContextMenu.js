import { useState, useCallback, useEffect } from 'react';

export function useContextMenu() {
  const [contextMenu, setContextMenu] = useState({
    show: false,
    x: 0,
    y: 0,
    items: []
  });

  const showContextMenu = useCallback((event, menuItems) => {
    event.preventDefault();
    setContextMenu({
      show: true,
      x: event.pageX,
      y: event.pageY,
      items: menuItems
    });
  }, []);

  const hideContextMenu = useCallback(() => {
    setContextMenu(prev => ({
      ...prev,
      show: false
    }));
  }, []);

  useEffect(() => {
    const handleClick = () => hideContextMenu();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [hideContextMenu]);

  return {
    contextMenu,
    showContextMenu,
    hideContextMenu
  };
} 