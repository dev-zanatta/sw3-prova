<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="column no-wrap"
    >
      <q-card-section class="row no-padding scroll full-height">
        <!-----inf------>
        <div class="col-xs-12 col-sm col-md q-px-md q-pt-md">
          <q-form
            ref="addUsuarioForm_ref"
            class="row q-col-gutter-md"
            autocomplete="off"
            @submit.prevent
          >
            <!-- Descrição -->
            <q-input
              v-model="usuario.name"
              outlined
              class="col-12"
              dense
              label="Nome"
              hint="Campo obrigatório"
              lazy-rules
              color="secondary-3"
              :rules="[(val) => !!val || 'Campo obrigatório']"
              autofocus
            />

            <!-- Valor -->
            <q-input
              v-model="usuario.email"
              outlined
              class="col-12"
              dense
              color="secondary-3"
              label="E-mail"
              hint="Campo obrigatório"
              lazy-rules
              :rules="[(val) => !!val || 'Campo obrigatório']"
            />

            <!-- Senha -->
            <q-input
              v-if="!props.usuarioId"
              v-model="usuario.password"
              outlined
              class="col-12"
              dense
              color="secondary-3"
              label="Senha"
              hint="Campo obrigatório"
              lazy-rules
              :rules="[(val) => !!val || 'Campo obrigatório']"
              type="password"
            />

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
import { onMounted, ref, computed } from "vue";
import { useDialogPluginComponent } from "quasar";
import { api } from "src/boot/axios.js";

defineEmits([...useDialogPluginComponent.emits]);

const addUsuarioForm_ref = ref(null);
const usuario = ref({
  name: null,
  email: null,
  password: null,
});

const props = defineProps({
  usuarioId: {
    type: [String, Number],
    required: false,
    default: null,
  },
});

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const adicionar = async () => {
  let response = null;



  if (props.usuarioId) {
    response = await api.put(`usuarios/${props.usuarioId}`, usuario.value);
  } else {
    response = await api.post("/usuarios", usuario.value);
  }

  if (response.data) {
    onDialogOK();
  }
};

onMounted(async () => {
  if (props.usuarioId) {
    const response = await api.get(`/usuarios/${props.usuarioId}`);
    usuario.value = response.data.result;
  }
});
</script>

<style>
</style>
