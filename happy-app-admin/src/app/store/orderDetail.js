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
                getCartInfo({ commit, rootState }, payload) {
                        let temp = window.location.href.split('/');
                        let orderId = temp[temp.length -1];
                        return rootState.http({
                                method: 'post',
                                url: '/order/orderDetail',
                                data: { orderId: orderId },
                        })
                                .then(data => {
                                        commit('_getOrder', data);
                                        return data;
                                })
                }
        }
}