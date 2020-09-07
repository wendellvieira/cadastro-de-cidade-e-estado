import Vue from 'vue'
import Vuex from 'vuex'

import { instance } from "@/assets/axios-instance"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		estados: [],
		cidades: []
	},
	mutations: {
		SET_ESTADOS(state, payload){
			state.estados = payload
		},
		SET_CIDADES(state, payload){
			state.cidades = payload
		},

	},
	actions: {
		async $load_estados({commit}){
			try {
				const {data} = await instance.get('/estados/all')
				commit('SET_ESTADOS', data)				
			} catch (error) {
				throw error
			}
		},
		async $save_estados( {dispatch}, data ){
			
		}
	}
})
