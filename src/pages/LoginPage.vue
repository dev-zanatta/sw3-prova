<template>
  <q-page class="flex flex-center column">
    <q-btn
      label="< Voltar"
      flat
      class="absolute-top-left"
      @click="voltar"
    />
    <div class="column">
      <div class="text-h4 text-center">Logar</div>
      <q-input
        filled
        dense
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[(val) => !!val || 'Campo obrigatório']"
      />
      <q-input
        filled
        dense
        v-model="senha"
        label="Senha"
        lazy-rules
        :rules="[(val) => !!val || 'Campo obrigatório']"
      />

      <q-btn color="secondary-1" label="Logar" @click="login" />
    </div>
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { Cookies } from "quasar";
import { useRouter } from "vue-router";

const email = ref("");
const senha = ref("");
const router = useRouter();

const login = async () => {
  const response = await api.post("/login", {
    email: email.value,
    password: senha.value,
  });

  if (response.data) {
    Cookies.set("token", `Bearer ${response.data.token}`, {
      path: "/",
      sameSite: "Lax",
    });

    router.push({ name: 'IndexPage' })
  }
};

const voltar = () => {
  router.push({ name: 'OpcoesLoginPage' })
}

onMounted(async () => {});
</script>
