export default {
        namespaced: true,
        // 保存要放在仓库中的数据
        state: {
                detail: {
                        name: '',
                        price: '',
                        banner: []
                }
        },
        // 存放仓库的计算属性
        getters: {},
        // 同步代码
        mutations: {
                _updateDetail(state, payload) {
                        state.detail = payload;
                },
        },
        //异步耗时代码
        actions: {
                updateDetail({ state,commit, rootState }) {
                        let params = window.location.href.substr(1).split('?');
                        let id =parseInt(params[1].split('=')[1]);
                        return rootState.http({
                                url: '/product/detail',
                                params: { id: id },
                        })
                                .then(data => {
                                        commit('_updateDetail', data);
                                        return data;
                                })

                },
                addCart({ rootState }) {
                        let params = window.location.href.substr(1).split('?');
                        let id =parseInt(params[1].split('=')[1]);
                        let pid = id;
                        rootState.http({
                                method: 'post',
                                url: '/cart/add',
                                data: { pid: pid },
                        })
                                .then(() => {
                                        alert('加入成功..');
                                        // window.location.href = '/app.html#/cart';
                                })
                }
        }
}

















