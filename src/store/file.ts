import { client, CreateFileRequset, DelFileRequset, DelFilesRequset } from '@/api';
import { instanceOfRequestError, UnkownRequestError } from '@/constants/error';

interface State {
    doing: boolean,
};

const state: State = {
    doing: false
}

const getters = {
    isDoing: (state: State): boolean => {
        return state.doing
    },
}

const actions = {
    // create 上传Content. Editor.vue save事件触发
    async create({ commit }, r: CreateFileRequset): Promise<any> {
        commit("begin")
        return new Promise<any>((resolved, reject) => {
            client.createFile(r).then(res => {
                resolved()
            }).catch(e => {
                if (instanceOfRequestError(e)) {
                    return reject(e)
                }
                console.log("请求服务器发生错误: ", e)
                reject(UnkownRequestError)
            }).finally(() => {
                commit("finish")
            })
        })
    },
    async delete({ commit }, fid: string): Promise<any> {
        commit("begin")
        return new Promise<any>((resolved, reject) => {
            let r: DelFileRequset = {
                fid: fid
            }
            client.delFile(r).then(res => {
                resolved()
            }).catch(e => {
                if (instanceOfRequestError(e)) {
                    return reject(e)
                }
                console.log("请求服务器发生错误: ", e)
                reject(UnkownRequestError)
            }).finally(() => {
                commit("finish")
            })
        })
    },
    async deleteFiles({ commit }, fids: string[]): Promise<any> {
        commit("begin")
        return new Promise<any>((resolved, reject) => {
            let r: DelFilesRequset = {
                fids: fids
            }
            client.delFiles(r).then(res => {
                resolved()
            }).catch(e => {
                if (instanceOfRequestError(e)) {
                    return reject(e)
                }
                console.log("请求服务器发生错误: ", e)
                reject(UnkownRequestError)
            }).finally(() => {
                commit("finish")
            })
        })
    },
}

const mutations = {
    begin(state: State) {
        state.doing = true
        console.log("file action begin")
    },
    finish(state: State) {
        state.doing = false
        console.log("file action done")
    }
}

export default ({
    namespaced: true,
    getters,
    state,
    actions,
    mutations,
});
