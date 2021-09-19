import axios from 'axios'

export default {
    actions: {
        async createOptPrice({commit}, {number, firm_name, firm_id}) {
            try {
                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/optprice`,
                {
                    number,
                    firm_name,
                    firm_id
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateOptPrice({commit}, {id, number, firm_name, firm_id}) {
            try {
                await axios.put(`${process.env.VUE_APP_BASE_URL}/api/optprice/${id}`,
                {
                    number,
                    firm_name,
                    firm_id
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}