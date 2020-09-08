<template>
    <svg @click="handle_click" :class='{disabled}' class="bi bi-trash btn-trash ml-2" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>
</template>
<script>
    import TratamentoDeErro from "@/assets/Error"

    export default {
        data(){
            return {
                disabled: false
            }
        },
        props: {
            item_id: {
                type: String,
            },
            fx: {
                type: Function,
            }
        },
        methods: {
            async handle_click(){
                try {
                    if( this.disabled ) return;
                    
                    this.disabled = true
                    await this.fx( this.item_id )
                    this.disabled = false
                    
                } catch (error) {
                    this.disabled = false
                    TratamentoDeErro(error)                    
                }
            }
        }        
    };
</script>
<style scoped>
    .btn-trash {
        fill: var(--danger);
        cursor: pointer;
    }
    .disabled {
        opacity: 0.5;
        cursor: no-drop
    }
</style>