export const DateMixin = {
    filters: {
        date(val){
            return (new Date(val)).toLocaleDateString('pt-BR')
        }
    }
}