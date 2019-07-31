export default {
        namespaced: true,
        state: {
                list: []
        },
        getters: {},
        mutations: {
                _getOrder(state, payload) {
                        state.list = payload;
                }
        },
        actions: {
                getOrder({ commit, rootState }, payload) {
                        return rootState.http({
                                method: 'post',
                                url: '/order/orderList',
                        })
                                .then(data => {
                                        commit('_getOrder', data);
                                        return data;
                                })
                }
        }
}