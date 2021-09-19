import axios from 'axios'

export default {
    actions: {
        async createExpense({commit}, {name,number,data}) {
            try {
                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/personalexpense`,
                {
                    name,
                    number,
                    data
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createCheckExpense({commit}, {creater,number,data}) {
            try {
                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/checkexpensesmoney/${creater}`,
                {
                    number,
                    data
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateExpenses({commit}, {id, name, number, data}) {
            try {
                await axios.put(`${process.env.VUE_APP_BASE_URL}/api/personalexpense/${id}`,
                {
                    name,
                    number,
                    data
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    }
}