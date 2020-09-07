<template>
    <div class='mt-5'>
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th>Cidade</th>
                    <th>Estado</th>
                    <th class='text-center'>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Rio de Janeiro</td>
                    <td>RJ</td>
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

    export default {
        components: {
            TrashBtn,
            EditBtn
        }
    };
</script>