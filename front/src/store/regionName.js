import axios from 'axios'

export default {
    actions: {
        async createRegionName({commit}, {name}) {
            try {
                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/region`,
                {
                    name
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateRegionName({commit}, {id, name}) {
            try {
                await axios.put(`${process.env.VUE_APP_BASE_URL}/api/region/${id}`,
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