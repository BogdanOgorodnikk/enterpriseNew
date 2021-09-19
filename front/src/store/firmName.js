import axios from 'axios'

export default {
    actions: {
        async createFirmName({commit}, {name}) {
            try {
                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/firmname`,
                {
                    name
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateFirmName({commit}, {id, name}) {
            try {
                await axios.put(`${process.env.VUE_APP_BASE_URL}/api/firmname/${id}`,
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