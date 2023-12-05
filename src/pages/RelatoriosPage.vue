<template>
  <q-page class="">
    <div class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div>
          <q-btn label="Vendedor com maior número de vendas" @click="openRelatorio('vendedorVendas')"/>
        </div>
        <div>
          <q-btn label="Cliente com maior número de compras" @click="openRelatorio('clienteCompras')"/>
        </div>
        <div>
          <q-btn label="Produto mais vendido" @click="openRelatorio('produtoMaisVendido')"/>
        </div>
        <div>
          <q-btn label="Produto menos vendido" @click="openRelatorio('produtoMenosVendido')"/>
        </div>
        <div>
          <q-btn label="Média do valor das vendas" @click="openRelatorio('mediaValor')"/>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { onMounted } from 'vue'
import RelatorioDialog from 'src/components/RelatorioDialog.vue';
import { format, parseISO } from 'date-fns';

const $q = useQuasar();
const colunas = [
  {
    name: 'nome_vendedor',
    label: 'Vendedor',
    field: 'nome_vendedor',
    align: 'left',
    sortable: true
  },
  {
    name: 'nome_cliente',
    label: 'Cliente',
    field: 'nome_cliente',
    align: 'left',
    sortable: true
  },
  {
    name: 'nome_produto',
    label: 'Produto',
    field: 'nome_produto',
    align: 'left',
    sortable: true
  },
  {
    name: 'quantidade',
    label: 'Quantidade',
    field: 'quantidade',
    align: 'left',
    sortable: true
  },
  {
    name: 'valor_total',
    label: 'Valor Total',
    field: 'valor_total',
    format: (val) => val,
    align: 'left',
    sortable: true
  },
  {
    name: 'data_venda',
    label: 'Data Venda',
    format: (val) => format(parseISO(val), 'dd/MM/yyyy HH:mm:ss'),
    field: 'data_venda',
    align: 'left',
    sortable: true
  },
];

const openRelatorio = async (relatorio) => {
  let response = null;
  let data = null;
  switch (relatorio) {
    case 'vendedorVendas':
      response = await api.get(`/relatorio-melhor-vendedor`);
      let dados = response.data.result;

      $q.dialog({
        component: RelatorioDialog,
        componentProps: {
          dadosRelatorio: dados,
          colunas: colunas,
          resumo: dados.resumo,
        }
      })
      break;
    case 'clienteCompras':
      response = await api.get(`/relatorio-melhor-cliente`);
      data = response.data.result;
      $q.dialog({
        component: RelatorioDialog,
        componentProps: {
          dadosRelatorio: data,
          colunas: colunas,
          resumo: data.resumo,
        }
      })
      break;
    case 'produtoMaisVendido':
      response = await api.get(`/relatorio-produto-mais-vendido`);
      data = response.data.result;
      $q.dialog({
        component: RelatorioDialog,
        componentProps: {
          dadosRelatorio: data,
          colunas: colunas,
        }
      })
      break;
    case 'produtoMenosVendido':
      response = await api.get(`/relatorio-produto-menos-vendido`);
      data = response.data.result;
      $q.dialog({
        component: RelatorioDialog,
        componentProps: {
          dadosRelatorio: data,
          colunas: colunas,
        }
      })
      break;
    case 'mediaValor':
      response = await api.get(`/relatorio-media-valor-vendas`);
      data = response.data.result;
      $q.dialog({
        component: RelatorioDialog,
        componentProps: {
          dadosRelatorio: data,
          colunas: [
            {
              name: 'produto',
              label: 'Produto',
              field: 'produto',
              align: 'left',
              sortable: true
            },
            {
              name: 'valor_produto',
              label: 'Produto',
              field: 'valor_produto',
              align: 'left',
              sortable: true
            },
            {
              name: 'total_vendido',
              label: 'Total do valor das vendas',
              field: 'total_vendido',
              format: (val) => val,
              align: 'left',
              sortable: true
            },
            {
              name: 'media_vendido',
              label: 'Média do valor das vendas',
              format: (val) => val,
              field: 'media_vendido',
              align: 'left',
              sortable: true
            },
          ]
        }
      })
      break;
  }
}

onMounted( async () => {

})
</script>
