import React, { useState, useEffect, useRef } from 'react'

export function useWindowSearchParameter(parameter) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(parameter);
}

export function useIsGameOwner(player, players) {
  if (!players) return false;
  let gameOwner = players.find(player => {
    return player.gameOwner;
  });
  if (!gameOwner) return false;
  return gameOwner.id === player;
}

export function useShareLink(gameUUID) {
  return window.location.protocol + "//" + window.location.host + "/?join=" + gameUUID;
}

// https://usehooks.com/useHover/
export function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);

        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}