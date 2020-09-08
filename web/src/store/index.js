import Vue from 'vue'
import Vuex from 'vuex'
import {RequestError} from '@/assets/Error'

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
			const {data, status} = await instance.get('/estados/all')
			if( status == 200 ) commit('SET_ESTADOS', data)	
			else throw new RequestError(data)
		},
		async $create_estados( {dispatch}, estado ){			
			const {data, status} = await instance.post(`/estados`, estado)				
			if( status == 200 ) await dispatch('$load_estados')			
			else throw new RequestError(data)
		},
		async $update_estados( {dispatch}, estado ){
			const {data, status} = await instance.put(`/estados/${estado._id}`, estado)
			if( status == 200 ) await dispatch('$load_estados')	
			else throw new RequestError(data)			
			
		},
		async $delete_estados( {dispatch}, estado_id ){			
			const {data, status} = await instance.delete(`/estados/${estado_id}`)
			if( status == 200 ) await dispatch('$load_estados')				
			else throw new RequestError(data)			
		},

		
		async $load_cidades({commit}){
			const {data, status} = await instance.get('/cidades/all')
			if(status == 200) commit('SET_CIDADES', data)				
			else throw new RequestError(data)			
		},
		async $delete_cidades( {dispatch}, cidade_id ){
			const {data, status} = await instance.delete(`/cidades/${cidade_id}`)
			if( status == 200 ) await dispatch('$load_cidades')				
			else throw new RequestError(data)
			
		},
		async $create_cidades( {dispatch}, cidade ){		
			const {data, status} = await instance.post(`/cidades`, cidade)
			if( status == 200 ) await dispatch('$load_cidades')				
			else throw new RequestError(data)
			
		},
		async $update_cidades( {dispatch}, cidade ){
			const {data, status} = await instance.put(`/cidades/${cidade._id}`, cidade)
			if( status == 200 ) await dispatch('$load_cidades')				
			else throw new RequestError(data)
			
		},


	}
})
