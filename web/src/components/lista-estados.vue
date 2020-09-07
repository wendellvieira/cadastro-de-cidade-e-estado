<template>
    <div class='mt-5'>
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th>Estado</th>
                    <th>UF</th>
                    <th>Criado</th>
                    <th class='text-center'>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='estado in estados' :key='estado._id'>
                    <td>{{ estado.nome }}</td>
                    <td>{{ estado.abreviacao }}</td>
                    <td>{{ estado.criado_em | date }}</td>
                    <td class='text-center'>
                        <edit-btn 
                            @click.native='$emit("load-data", estado)'
                        />
                    
                        <trash-btn 
                            :fx='$delete_estados'
                            :item_id='estado._id'
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
                "estados"
            ])
        },
        methods: {
            ...mapActions([
                "$load_estados",
                "$delete_estados"
            ])
        },
        mounted() {
            this.$load_estados()
        },
    };
</script>