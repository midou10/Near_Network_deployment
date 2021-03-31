import * as nearAPI from 'near-api-js'
import getConfig from './config.js';



class Nearnetwork{

  const nearConfig;
  const near;
  const walletConnection;
  let currentUser;

  
    constructor(){
     
      return (async () => {
        this.nearConfig = getConfig(process.env.NODE_ENV || 'testnet')
        this.near = await nearAPI.connect({
          deps: {
            keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()
          },
          ...nearConfig
        })
        const walletConnection = new nearAPI.WalletConnection(near)
        if (walletConnection.getAccountId()) {
          currentUser = {
            accountId: walletConnection.getAccountId(),
            balance: (await walletConnection.account().state()).amount
          }
        }
        return this; // when done
    })();
    }


}

