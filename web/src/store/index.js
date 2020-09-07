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
		}
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
		async $create_estados( {dispatch}, estado ){
			try {
				const {data, status} = await instance.post(`/estados`, estado)
				if( status == 200 ) await dispatch('$load_estados')				
			} catch (error) {
				console.log(error)
				throw error
			}
			},
		async $update_estados( {dispatch}, estado ){
			try {
				const {data, status} = await instance.put(`/estados/${estado._id}`, estado)
				if( status == 200 ) await dispatch('$load_estados')				
			} catch (error) {
				console.log(error)
				throw error
			}
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
		
		async $load_cidades({commit}){
			try {
				const {data, status} = await instance.get('/cidades/all')
				commit('SET_CIDADES', data)				
			} catch (error) {
				console.log(error)
				throw error
			}
		},
		async $delete_cidades( {dispatch}, cidade_id ){
			try {
				const {data, status} = await instance.delete(`/cidades/${cidade_id}`)
				if( status == 200 ) await dispatch('$load_cidades')				
			} catch (error) {
				console.log(error)
				throw error
			}
		},
		async $create_cidades( {dispatch}, cidade ){
			try {
				const {data, status} = await instance.post(`/cidades`, cidade)
				if( status == 200 ) await dispatch('$load_cidades')				
			} catch (error) {
				console.log(error)
				throw error
			}
			},
		async $update_cidades( {dispatch}, cidade ){
			try {
				const {data, status} = await instance.put(`/estados/${cidade._id}`, cidade)
				if( status == 200 ) await dispatch('$load_cidades')				
			} catch (error) {
				console.log(error)
				throw error
			}
		},


	}
})
