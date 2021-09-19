import axios from 'axios'

export default {
    actions: {
        async createClient({commit}, {townId, name, phone, shopStreet, shopName, reserveName, reservePhone}) {
            try {
                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/client/${townId}`,
                {
                    name,
                    phone, 
                    shopStreet, 
                    shopName, 
                    reserveName, 
                    reservePhone
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateClient({commit}, {id, name, phone, shopStreet, shopName, reserveName, reservePhone}) {
            try {
                await axios.put(`${process.env.VUE_APP_BASE_URL}/api/client/${id}`,
                {
                    name,
                    phone, 
                    shopStreet, 
                    shopName, 
                    reserveName, 
                    reservePhone
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}