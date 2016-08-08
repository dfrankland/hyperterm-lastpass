import Lastpass from 'lastpass';

export default async ({ updateStatus, username, password, twoFactor } = {}) => {
  let log = () => undefined;
  if (updateStatus) log = updateStatus;

  let accounts;

  const lpass = new Lastpass(username);
  try {
    log('Trying to load a vault file.');
    await lpass.loadVaultFile();
    log('Loaded vault file successfully!');
  } catch (err) {
    log('Could not load vault file...');
    try {
      log('Trying to get a new vault from Lastpass.');
      await lpass.loadVault(username, password, twoFactor);
      log('Got a new vault from Lastpass successfully!');
    } catch (errLoad) {
      const twoFactorError = (
        errLoad &&
        errLoad.body &&
        errLoad.body.cause === 'googleauthrequired'
      );

      log(
        `Couldn\'t get new vault. ${
          twoFactorError ?
            'Maybe you need to enter your 2 factor authentication?' :
            'Try again?'
        }`
      );

      return {
        success: false,
        error: err,
        twoFactorError,
      };
    }
  }

  try {
    log('Double checking that the vault is loaded.');
    lpass.getVault();
    log('Vault is indeed loaded!');
  } catch (err) {
    log('Vault is still not loaded. Try again?');
    return {
      success: false,
      error: err,
    };
  }

  try {
    log('Trying to decrypt accounts.');
    accounts = await lpass.getAccounts(username, password);
    log('Accounts decrypted successfully!');
  } catch (err) {
    log('Accounts could not be decrypted...');
    return {
      success: false,
      error: err,
    };
  }

  if (accounts) {
    setTimeout(
      async () => {
        try {
          log('Trying to save vault file.');
          await lpass.saveVaultFile();
          log('Vault file saved!');
        } catch (err) {
          log('Could not save vault file...');
        }
      }, 2000
    );
  }

  return {
    success: true,
    accounts,
  };
};
