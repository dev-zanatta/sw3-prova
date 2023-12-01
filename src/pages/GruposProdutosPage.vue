<template>
  <q-page class="">
    <div class="row q-px-md q-pt-md">
      <q-space/>
      <q-btn
        color="primary-3"
        label="Adicionar"
        @click="adicionar"
      />
    </div>

    <q-table
      :key="tableKey"
      :rows="gruposProdutos"
      :rows-per-page-options="[20,30,50]"
      :columns="columns"
      class="q-pa-md q-ma-md"
      open-item
      @row-click="editar"
    />
  </q-page>
</template>

<script setup>
import { format, parseISO } from 'date-fns';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue'
import GrupoProdutoAddEditDialog from 'src/components/cruds/GrupoProdutoAddEditDialog.vue'

const $q = useQuasar();
const gruposProdutos = ref([]);
const tableKey = ref(0);
const columns = [
  {
    name: 'descricao',
    label: 'Descrição',
    field: 'descricao',
    align: 'left',
    style: 'width:80%',
    sortable: true
  },
  {
    name: 'created_at',
    label: 'Criado em',
    field: 'created_at',
    format: (val) => format(parseISO(val), 'dd/MM/yyyy HH:mm:ss'),
    align: 'left',
    sortable: true
  },
]

const adicionar = () => {
  $q.dialog({
    component: GrupoProdutoAddEditDialog
    ,
    componentProps: {
      grupoProdutoId: null
    },

  }).onOk(async() => {
    await getGruposProdutos();
  })
}

const getGruposProdutos = async () => {
  const response = await api.get('/grupos-produtos');
  gruposProdutos.value = response.data.result;
  tableKey.value++;
}

const editar = (evt, row) => {
  $q.dialog({
    component: GrupoProdutoAddEditDialog,
    componentProps: {
      grupoProdutoId: row.id
    },

  }).onDismiss(async() => {
    await getGruposProdutos();
  })
}

onMounted( async () => {
  await getGruposProdutos();
})
</script>
