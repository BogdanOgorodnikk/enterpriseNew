import axios from 'axios'

export default {
    actions: {
        async createMasNumber({commit}, {number}) {
            try {
                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/masnumber`,
                {
                    number
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateMasNumber({commit}, {id, number}) {
            try {
                await axios.put(`${process.env.VUE_APP_BASE_URL}/api/masnumber/${id}`,
                {
                    number
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}