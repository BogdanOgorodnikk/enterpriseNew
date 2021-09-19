import axios from 'axios'

export default {
    actions: {
        async createProductName({commit}, {name}) {
            try {
                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/productname`,
                {
                    name
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateProductName({commit}, {id, name}) {
            try {
                await axios.put(`${process.env.VUE_APP_BASE_URL}/api/productname/${id}`,
                {
                    name
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}