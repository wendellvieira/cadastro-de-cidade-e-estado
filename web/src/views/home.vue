<template>
    <div class="container">
        <div class='row pt-3'>
            <div class="col-6">
                <h4>Cadastro de estados</h4>

                <cadastro-estado ref='cadastroEstados' />
                
                <lista-estados 
                    @load-data='$refs.cadastroEstados.setData($event)'
                />
                
            </div>
            <div class="col-6">
                <h4>Cadastro de cidade</h4>
                
                <cadastro-cidade />

                <lista-cidades />

            </div>
        </div>
    </div>
</template>
<script>
    import CadastroCidade from "@/components/cadastro-cidade"
    import ListaCidades from "@/components/lista-cidades"
    import CadastroEstado from "@/components/cadastro-estado"
    import ListaEstados from "@/components/lista-estados"
    
    export default {
        components: {
            CadastroCidade,
            ListaCidades,
            CadastroEstado,
            ListaEstados
        }    
    };
</script>