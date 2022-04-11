const Promise = require('bluebird');
const path = require('path');
const { actions, selectors, util } = require('vortex-api');
const winapi = require('winapi-bindings');

const walk = require('turbowalk').default;

const { validate, deserializeLoadOrder, serializeLoadOrder } = require('./loadorder');
const { MORROWIND_ID } = require('./constants');

const { migrate103 } = require('./migrations');

const STEAMAPP_ID = '22320';
const GOGAPP_ID = '1435828767';
const MS_ID = 'BethesdaSoftworks.TESMorrowind-PC';

const tools = [
  {
    id: 'tes3edit',
    name: 'TES3Edit',
    executable: () => 'TES3Edit.exe',
    requiredFiles: []
  },
  {
    id: 'mw-construction-set',
    name: 'Construction Set',
    logo: 'constructionset.png',
    executable: () => 'TES Construction Set.exe',
    requiredFiles: [
      'TES Construction Set.exe',
    ],
    relative: true,
    exclusive: true
  }
];

function findGame() {
  return util.GameStoreHelper.findByAppId([STEAMAPP_ID, GOGAPP_ID, MS_ID])
    .then(game => {
      const isXbox = game.gameStoreId === 'xbox';
      // The xbox pass variant has a different file structure; we're naively
      //  assuming that all XBOX copies (regardless of locale) will contain
      //  the English variant as well (fingers crossed)
      return (isXbox)
        ? Promise.resolve(path.join(game.gamePath, 'Morrowind GOTY English'))
        : Promise.resolve(game.gamePath);
    })
    .catch(() => {
      const instPath = winapi.RegGetValue(
        'HKEY_LOCAL_MACHINE',
        'Software\\Wow6432Node\\Bethesda Softworks\\Morrowind',
        'Installed Path'
      );

      if (!instPath) throw new Error('empty registry key');
      return Promise.resolve(instPath.value);
    });
}

function requiresLauncher(gamePath) {
  return util.GameStoreHelper.findByAppId([MS_ID], 'xbox')
    .then(() => Promise.resolve({
      launcher: 'xbox',
      addInfo: {
        appId: MS_ID,
        parameters: [
          { appExecName: 'Game' },
        ],
      }
    }))
    .catch(err => Promise.resolve(undefined));
}

function main(context) {
  context.registerGame({
    id: MORROWIND_ID,
    name: 'Morrowind',
    mergeMods: true,
    queryPath: findGame,
    supportedTools: tools,
    queryModPath: () => 'Data Files',
    logo: 'gameart.jpg',
    executable: () => 'morrowind.exe',
    requiredFiles: [
      'morrowind.exe',
    ],
    requiresLauncher,
    environment: {
      SteamAPPId: STEAMAPP_ID,
    },
    details: {
      steamAppId: parseInt(STEAMAPP_ID, 10),
      gogAppId: GOGAPP_ID
    },
  });

  context.registerLoadOrder({
    gameId: MORROWIND_ID,
    deserializeLoadOrder: () => deserializeLoadOrder(context.api),
    serializeLoadOrder: (loadOrder) => serializeLoadOrder(context.api, loadOrder),
    validate,
    toggleableEntries: true,
    usageInstructions: (() => 'Drag your plugins as needed - the game will load '
                            + 'load them from top to bottom.'),
  });

  context.registerMigration(old => migrate103(context.api, old));
  context.once(() => {
    context.api.events.on('did-install-mod', async (gameId, archiveId, modId) => {
      if (gameId !== MORROWIND_ID) {
        return;
      }

      const state = context.api.getState();
      const installPath = selectors.installPathForGame(state, MORROWIND_ID);
      const mod = util.getSafe(state, ['persistent', 'mods', MORROWIND_ID, modId], undefined);
      if (installPath === undefined || mod === undefined) {
        return;
      }
      const modPath = path.join(installPath, mod.installationPath);
      const plugins = [];
      await walk(modPath, entries => {
        for (let entry of entries) {
          if (['.esp', '.esm'].includes(path.extname(entry.filePath.toLowerCase()))) {
            plugins.push(path.basename(entry.filePath));
          }
        }
      }, { recurse: true, skipLinks: true, skipInaccessible: true });
      if ( plugins.length > 0) {
        context.api.store.dispatch(actions.setModAttribute(MORROWIND_ID, mod.id, 'plugins', plugins));
      }
    });
  });

  return true;
}

module.exports = {
  default: main
};
