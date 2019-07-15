export interface TokenInfo {
    expiresAt: number
    token: string
}

var tokenInfo: TokenInfo = {
    expiresAt: 0,
    token: ""
}

export class TokenClient {
    private readonly localStoreKey: string
    constructor(localStoreKey: string) {
        this.localStoreKey = localStoreKey;
    }
    setTokenInfo(info: TokenInfo): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            this.delTokenInfo()
            window.localStorage.setItem(this.localStoreKey, JSON.stringify(info))
            tokenInfo = info
            return resolve(true)
        })
    }

    hasTokenInfo(): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            if (tokenInfo && tokenInfo.token) {
                return resolve(true)
            }
            let str = window.localStorage.getItem(this.localStoreKey)
            if (str && str.startsWith("{") && str.endsWith("}")) {
                return resolve(true)
            }
            return reject(false)
        })
    }

    getTokenInfo(): Promise<TokenInfo> {
        return new Promise<TokenInfo>((resolve, reject) => {
            this.hasTokenInfo().then((res) => {
                if (tokenInfo && tokenInfo.token) {
                    return resolve(tokenInfo)
                }
                let str = window.localStorage.getItem(this.localStoreKey)
                if (str == null) {
                    reject("json parse fail")
                }
                let _tokenInfo = JSON.parse(<string>str)
                if (_tokenInfo && _tokenInfo.token) {
                    tokenInfo = _tokenInfo
                    return resolve(tokenInfo)
                }
                reject("json parse fail")
            }).catch(e => reject("找不到token"))
        })
    }

    delTokenInfo(): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            window.localStorage.removeItem(this.localStoreKey)
            return resolve(true)
        })
    }
}

export const client = new TokenClient("tokenInfo")
