import PouchDB from 'pouchdb';

const instancePool = {};

function instance(name) {
  if (instancePool[name] === undefined) {
    instancePool[name] = new PouchDB(name, { auto_compaction: true });
  }

  return instancePool[name];
}

function remoteInstance(name) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.couchDB && userInfo.couchDB[name]) {
    const { username, password, dbname } = userInfo.couchDB;
    const instanceName = `remote_${name}_${dbname}`;
    if (instancePool[instanceName] === undefined) {
      instancePool[instanceName] = new PouchDB(userInfo.couchDB[name], {
        skipSetup: true,
        auth: username && password ? { username, password } : undefined
      });
    }
    return instancePool[instanceName];
  }
}

function destroyInstance(name) {
  if (instancePool[name] !== undefined) {
    const instance = instancePool[name];
    delete instancePool[name];
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.couchDB && userInfo.couchDB[name]) {
      delete instancePool[`remote_${name}_${userInfo.couchDB.dbname}`];
    }
    return instance.destroy();
  }
}

export const settingsDB = () => instance('settings');
export const accountsDB = () => instance('accounts');
export const transactionsDB = () => instance('transactions');
export const tagsDB = () => instance('tags');
export const remoteSettingsDB = () => remoteInstance('settings');
export const remoteAccountsDB = () => remoteInstance('accounts');
export const remoteTransactionsDB = () => remoteInstance('transactions');
export const remoteTagsDB = () => remoteInstance('tags');
export const destroySettingsDB = () => destroyInstance('settings');
export const destroyAccountsDB = () => destroyInstance('accounts');
export const destroyTransactionsDB = () => destroyInstance('transactions');
export const destroyTagsDB = () => destroyInstance('tags');
