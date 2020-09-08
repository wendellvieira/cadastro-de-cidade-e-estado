<template>
    <div class='row mt-4 align-items-end'>
        <div class="col-6">
            <input v-model='cidade.nome' type="text" placeholder="Nome" class="form-control">
        </div>
        <div class="col-6">
            <select v-model='cidade.estado_id' placeholder="Estado" class="form-control">
                <option value="">Estado</option>
                <option 
                    v-for='estado in estados' 
                    :key='estado._id' 
                    :value="estado._id">
                    {{ estado.nome }} ({{estado.abreviacao}})    
                </option>
            </select>
        </div>

        <div class="col-9"></div>
        <div class='mt-3 col-3'>
            <button 
                v-if='!!cidade.criado_em' 
                class="btn btn-primary btn-block"
                :disabled='disabled'
                @click='save'
            >
                Atualizar
            </button>
            <button 
                v-else 
                class="btn btn-success btn-block"
                :disabled='disabled'
                @click='save'
            >
                Cadastrar
            </button>
        </div>
    </div>
</template>
<script>
    const reset_data = { nome: "", estado_id: ""}

    import { mapState, mapActions } from "vuex"
    import TratamentoDeErro from "@/assets/Error"

    export default {
        data(){
            return {
                cidade: {
                    ...reset_data
                },
                disabled: false
            }
        },
        methods: {
            ...mapActions([
                "$create_cidades",
                "$update_cidades"
            ]),
            clearData(){
                this.$set(this, 'cidade', { ...reset_data })
            },
            setData(data){
                this.$set(this, "cidade", { ...data })
            },
            async save(){
                try {
                    this.disabled = true
                    if( !!this.cidade.criado_em ) await this.$update_cidades(this.cidade)
                    else await this.$create_cidades(this.cidade)
                    this.clearData()
                    this.disabled = false
                    
                } catch ( error ) {
                    this.disabled = false
                    TratamentoDeErro(error)
                }
            }
        },
        computed: {
            ...mapState([
                'estados'
            ])
        }
        
    };
</script>