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
				const {data, status} = await instance.get('/estados/all')
				commit('SET_ESTADOS', data)				
			} catch (error) {
				console.log(error)
				throw error
			}
		},
		async $save_estados( {dispatch}, data ){

		},
		async $delete_estados( {dispatch}, estado_id ){
			try {
				const {data, status} = await instance.delete(`/estados/${estado_id}`)
				if( status == 200 ) await dispatch('$load_estados')				
			} catch (error) {
				console.log(error)
				throw error
			}
		},

	}
})
