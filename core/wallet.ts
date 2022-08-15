// IBYRNE - 8/15/16
// This is a basic local storage wallet that
// is hooked up to the chapi pages. This allows us
// to select credentials to present and view credentials
// we have added to our wallet.
const key = 'walletContents'
export const initWalletContent = () => {
    if (typeof window === "undefined") return;
    const walletContents =  JSON.parse(localStorage.getItem(key) as string);
    if(!walletContents) {
        localStorage.setItem(key, JSON.stringify([]));
    }
}

export const getWalletContents = () => {
    if (typeof window === "undefined") return [];
    const walletContents =  JSON.parse(localStorage.getItem(key) as string);
    if(!walletContents) {
        initWalletContent();
        return [];
    }
    return walletContents;
}

export const addToWallet = (item: any) => {
    if (typeof window === "undefined") return;
    const walletContents = getWalletContents();
    walletContents.push(item);
    localStorage.setItem(key, JSON.stringify(walletContents))
}

export const removeFromWallet = (indexOfItem: any) =>  {
    if (typeof window === "undefined") return;
    const walletContents = getWalletContents();
    walletContents.splice(indexOfItem, 1)
    localStorage.setItem(key, JSON.stringify(walletContents))
}