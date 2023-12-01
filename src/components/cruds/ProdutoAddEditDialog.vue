<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="column no-wrap"
    >

      <q-card-section class="row no-padding scroll full-height">
        <!-----inf------>
        <div class="col-xs-12 col-sm col-md q-px-md q-pt-md">
          <q-form
            ref="addProdutoForm_ref"
            class="row q-col-gutter-md"
            autocomplete="off"
            @submit.prevent
          >
            <!-- Descrição -->
            <q-input
              v-model="produto.descricao"
              outlined
              :class="add ? 'col-12' : 'col-8'"
              dense
              label="Descrição"
              hint="Campo obrigatório"
              lazy-rules
              color="secondary-3"
              :rules="[(val) => !!val || 'Campo obrigatório']"
              autofocus
            />
            <!--Ativo-->
            <q-input
              v-if="!add"
              label="Status"
              dense
              outlined
              color="secondary-3"
              class="col-4 q-input-remove-all-border"
              readonly
            >
              <q-toggle
                v-model="produto.ativo"
                color="secondary-3"
                class="col-6"
                size="sm"
                :item-true="true"
                :item-false="false"
                label="Ativo"
                dense
                outlined
              />
            </q-input>

            <!-- Valor -->
            <q-input
              v-model="produto.valor"
              outlined
              class="col-6"
              dense
              color="secondary-3"
              label="Valor"
              hint="Campo obrigatório"
              lazy-rules
              :rules="[(val) => !!val || 'Campo obrigatório']"
              type="number"
              step="0.01"
            />

            <!-- Quantidade -->
            <q-input
              v-model="produto.estoque"
              outlined
              class="col-6"
              dense
              color="secondary-3"
              label="Quantidade"
              hint="Campo obrigatório"
              lazy-rules
              :rules="[(val) => !!val || 'Campo obrigatório']"
              type="number"
            />

            <TipoProdutoSelect
              v-model="tipoProduto"
              class="col-12"
              @update:tipo-produto="tipoProduto = $event"
            />
            <GrupoProdutoSelect
              v-model="grupoProduto"
              class="col-12"
              @update:grupo-produto="grupoProduto = $event"
            />
            <div v-for="(grupo, index) in grupoProduto" :key="index">
              <q-chip
                removable
                class="col-12 q-pa-sm text-secondary-3"
                dense
                outlined
                :label="grupo.descricao"
                @remove="removeGrupoProduto(index)"
              />

            </div>
          </q-form>
        </div>
      </q-card-section>
      <div class="row q-pa-md self-end justify-end">
        <q-btn
          flat
          color="primary-5 button"
          padding="12px 16px"
          label="Cancelar"
          class="q-mr-md"
          @click="onDialogCancel"
        />
        <q-btn
          color="primary-3 text-black button-primary"
          padding="12px 16px"
          label="Salvar"
          @click="adicionar"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
s

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useDialogPluginComponent } from "quasar";
import { api } from "src/boot/axios.js";
import TipoProdutoSelect from 'src/components/cruds/TipoProdutoSelect.vue'
import GrupoProdutoSelect from 'src/components/cruds/GrupoProdutoSelect.vue'

defineEmits([...useDialogPluginComponent.emits]);

const addProdutoForm_ref = ref(null);
const produto = ref({
  descricao: null,
  valor: null,
  estoque: null,
  ativo: true,
});
const tipoProduto = ref(null);
const grupoProduto = ref(null);
const props = defineProps({
  produtoId: {
    type: [String, Number],
    required: false,
    default: null,
  },
});

const add = computed(() => {
  return props.produtoId ? false : true;
});

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const adicionar = async () => {
  let response = null;

  produto.value.grupos_produtos_ids = grupoProduto.value.map((grupo) => grupo.id);

  if (props.produtoId) {
    response = await api.put(`produtos/${props.produtoId}`, produto.value);
  } else {
    response = await api.post("produtos", produto.value);
  }

  if (response.data.success) {
    onDialogOK();
  }
};

const removeGrupoProduto = (index) => {
  grupoProduto.value.splice(index, 1);
};

watch(tipoProduto, () => {
  if(tipoProduto.value) {
    produto.value.tipo_produto_id = tipoProduto.value.id
  }
})

onMounted(async () => {
  if (props.produtoId) {
    const response = await api.get(`/produtos/${props.produtoId}`);
    produto.value = response.data.result;
    tipoProduto.value = produto.value.tipo_produto;
    grupoProduto.value = produto.value.grupos_produtos;
  }
});
</script>

<style>
</style>
