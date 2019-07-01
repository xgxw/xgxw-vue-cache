export enum TokenType {

}
export interface TokenInfo {
    tokenType: TokenType
    expiresIn: number
    scope: string
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
            return resolve(true)
        })
    }

    hasTokenInfo(): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
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
                let str = window.localStorage.getItem(this.localStoreKey)
                if (str == null) {
                    reject("json parse fail")
                }
                let tokenInfo = JSON.parse(<string>str)
                if (tokenInfo && tokenInfo.accessToken) {
                    return resolve(tokenInfo)
                }
                reject("json parse fail")
            }).catch(reject)
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
