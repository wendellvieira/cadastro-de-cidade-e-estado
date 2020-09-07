<template>
    <div class='mt-5'>
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th>Cidade</th>
                    <th>Estado</th>
                    <th>Criado</th>
                    <th class='text-center'>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='cidade in cidades' :key='cidade._id'>
                    <td>{{ cidade.nome }}</td>
                    <td> {{ nomeDoEstado(cidade.estado_id) }} </td>
                    <td> {{ cidade.criado_em | date }} </td>
                    <td class='text-center'>
                        <edit-btn 
                            @click.native='$emit("load-data", cidade)' 
                        />
                    
                        <trash-btn 
                            :fx='$delete_cidades'
                            :item_id='cidade._id'
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import TrashBtn from "@/components/trash-btn"
    import EditBtn from "@/components/edit-btn"
    import { mapActions, mapState } from "vuex"
    import { DateMixin } from "@/assets/utils"

    export default {
        components: {
            TrashBtn,
            EditBtn
        },
        mixins: [
            DateMixin
        ],
        computed: {
            ...mapState([
                'cidades',
                'estados'
            ])
        },
        methods: {
            ...mapActions([
                "$load_cidades",
                "$delete_cidades"
            ]),
            nomeDoEstado(id_estado){
                const estado = this.estados.find( ({_id}) => _id == id_estado )
                if( !!estado ) return estado.abreviacao
                return "--" 
            }
        },
        mounted(){
            this.$load_cidades()
        }
    };
</script>