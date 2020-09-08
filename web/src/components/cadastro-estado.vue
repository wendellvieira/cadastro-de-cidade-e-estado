<template>
    <div class='row mt-4'>
        <div class="col-9">
            <input v-model='form.nome' type="text" placeholder="Nome" class="form-control">
        </div>
        <div class="col-3">
            <input v-model='form.abreviacao' type="text" placeholder="UF" class="form-control">

            <button 
                v-if='!!form.criado_em' 
                class="btn btn-primary btn-block mt-3"
                :disabled='disabled'
                @click='save'
            >
                Atualizar
            </button>
            <button 
                v-else 
                class="btn btn-success btn-block mt-3"
                :disabled='disabled'
                @click='save'
            >
                Cadastrar
            </button>
        </div>
    </div>
</template>
<script>
    const reset_data = { nome: "", abreviacao: "" }

    import { mapActions } from "vuex"
    import TratamentoDeErro from "@/assets/Error"

    export default {
        data(){
            return {
                form: {
                    ...reset_data
                },
                disabled: false
            }
        },
        methods: {
            ...mapActions([
                "$update_estados",
                "$create_estados"
            ]),
            setData(data){
                this.$set(this, "form", { ...data })
            },
            clearData(){
                this.$set(this, 'form', { ...reset_data })
            },
            async save(){
                try {
                    this.disabled = true
                    if( !!this.form.criado_em ) await this.$update_estados(this.form)
                    else await this.$create_estados(this.form)
                    this.clearData()
                    this.disabled = false
                    
                } catch ( error ) {
                    this.disabled = false
                    TratamentoDeErro(error)
                }
            }
            

        }
    };
</script>