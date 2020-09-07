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
                <tr v-for='item in estados' :key='item._id'>
                    <td>{{ item.nome }}</td>
                    <td>{{ item.abreviacao }}</td>
                    <td>{{ item.criado_em | date }}</td>
                    <td class='text-center'>
                        <edit-btn />
                    
                        <trash-btn />
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
                "$load_estados"
            ])
        },
        mounted() {
            this.$load_estados()
        },
    };
</script>