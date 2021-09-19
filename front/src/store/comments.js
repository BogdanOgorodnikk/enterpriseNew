import axios from 'axios'

export default {
    actions: {
        async createComment({commit}, {description, order_id}) {
            try {
                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/comment`,
                    {
                        description: description,
                        order_id: order_id,
                    },
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateComment({commit}, {description, id}) {
            try {
                await axios.put(`${process.env.VUE_APP_BASE_URL}/api/comment`,
                    {
                        description: description,
                        id: id
                    },
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async createPrepareOrderComment({commit}, {description, order_id}) {
            try {
                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/preparecomment`,
                    {
                        description: description,
                        order_id: order_id,
                    },
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updatePrepareOrderComment({commit}, {description, id}) {
            try {
                await axios.put(`${process.env.VUE_APP_BASE_URL}/api/preparecomment`,
                    {
                        description: description,
                        id: id
                    },
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}