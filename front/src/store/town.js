import axios from 'axios'

export default {
    actions: {
        async updateTown({commit}, {id, name, region, area}) {
            try {
                await axios.put(`${process.env.VUE_APP_BASE_URL}/api/town/${id}`,
                {
                    name,
                    region,
                    area
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateTownManagers({commit}, {id, manager_id, safemanager_id, securitymanager_id, second_security_manager_id, third_security_manager_id}) {
            try {
                await axios.put(`${process.env.VUE_APP_BASE_URL}/api/town/manager/${id}`,
                {
                    manager_id, 
                    safemanager_id, 
                    securitymanager_id,
                    second_security_manager_id,
                    third_security_manager_id
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createTown({commit}, {name, region, area}) {
            try {
                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/town`,
                {
                    name,
                    region,
                    area
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    }
}