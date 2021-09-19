import axios from 'axios'

export default {
    actions: {
        async createPithName({commit}, {name}) {
            try {
                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/pithname`,
                    {
                        name
                    },
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updatePithName({commit}, {id, name}) {
            try {
                await axios.put(`${process.env.VUE_APP_BASE_URL}/api/pithname/${id}`,
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