export const MOD_INFO = 'modinfo.xml';
export const GAME_ID = '7daystodie';
export const LO_FILE_NAME = 'loadOrder.json';
export const I18N_NAMESPACE = `game-${GAME_ID}`;
export const INVALID_LO_MOD_TYPES = ['collection', '7dtd-root-mod'];

export function modsRelPath() {
  return 'Mods';
}

export function gameExecutable() {
  return '7DaysToDie.exe';
}
