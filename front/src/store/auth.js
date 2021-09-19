import axios from 'axios'

export default {
    state: {
        newuser: {},
        isAuth: false
    },
    mutations: {
        SET_USER(state, payload) {
            state.newuser = payload
            state.isAuth = true
        },
        LOGOUT(state) {
            localStorage.removeItem('token')
            state.newuser = {}
            state.isAuth = false
        }
    },
    actions: {
        async register({commit},{login,password}){
            try {
               await axios.post(`${process.env.VUE_APP_BASE_URL}/api/register`,{
                    login,
                    password
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async login({commit},{login,password}){
            try {
                const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/login`,{
                    login,
                    password
                })
                localStorage.setItem('token', response.data.token)
                commit('SET_USER', response.data)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async logout({commit}){
            try {
                commit('LOGOUT')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async auth({commit}) {
            try {
                const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
                )
                localStorage.setItem('token', response.data.token)
                commit('SET_USER', response.data)
            } catch (e) {
                localStorage.removeItem('token')
            }
        }
    }
}