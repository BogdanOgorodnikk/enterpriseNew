import axios from 'axios'

export default {
    actions: {
        async createNoteName({commit}, {name}) {
            try {
                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/note`,
                    {
                        name
                    },
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateNoteName({commit}, {id, name}) {
            try {
                await axios.put(`${process.env.VUE_APP_BASE_URL}/api/note/${id}`,
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