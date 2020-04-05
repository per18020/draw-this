import { useSelector } from 'react-redux'

export function useWindowSearchParameter(parameter) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(parameter);
}

export function useIsGameOwner() {
  const player = useSelector(state => state.gameReducer.player);
  const players = useSelector(state => state.gameReducer.players);
  if (!players) return false;
  let gameOwner = players.find(player => {
    return player.gameOwner;
  });
  if (!gameOwner) return false;
  return gameOwner.id === player;
}

export function usePlayerInfo(playerID) {
  const player = (playerID) ? playerID : useSelector(state => state.gameReducer.player);
  const players = useSelector(state => state.gameReducer.players);
  return players.find(item => {
    return item.id === player;
  });
}

export function useShareLink(gameUUID) {
  return window.location.protocol + "//" + window.location.host + "/?join=" + gameUUID;
}