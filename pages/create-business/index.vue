<template>
  <div class="card flex justify-center items-center h-screen p-4">
    <div class="text-left w-full max-w-md"> 
      <Toast />

      <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit"
        class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <DynamicFormLabel>Business name</DynamicFormLabel>
          <InputText v-model="businessName" type="text" placeholder="Ex. Williamson" class="w-full" />
          <Message v-if="$form.businessName?.invalid" severity="error" size="small" variant="simple">{{
            $form.businessName.error?.message }}</Message>
        </div>
        <DynamicFormLabel>This is your public business name.</DynamicFormLabel>
        <Button type="submit" severity="primary" :disabled="!businessName.trim()" label="Submit"
          @click="onCreateBusiness" class="mt-4 w-full sm:w-auto" /> 
      </Form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from '../config/firebaseConfig';
import { useToast } from 'primevue/usetoast';
const { $auth } = useNuxtApp(); 

const businessName = ref("");
const toast = useToast();
const router = useRouter();
const { user } = useNuxtApp().$auth;
const db = getFirestore(app);

const fetchToken = async () => {
  try {
    const token = await $auth.getAccessToken();
    console.log("Access Token:", token);
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};

onMounted(() => {
  fetchToken();
});
const onCreateBusiness = async () => {
  try {
    
    const token = await $auth.getAccessToken();
    console.log("Kinde Access Token:", token);
    await setDoc(doc(db, "Business", user.email), {
      businessName: businessName.value.trim().replace(/\s+/g, "_"),
      email: user.email,
      userName: `${user.given_name} ${user.family_name}`,
    });

    router.replace("/dashboard");

  } catch (error) {
    console.error("Error creating business:", error);
  };
};
const initialValues = reactive({
  businessName: ''
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.businessName) {
    errors.businessName = [{ message: 'Busines name is required.' }];
  }

  return {
    values,
    errors
  };
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({
      severity: 'success',
      summary: 'Business created.',
      life: 3000
    });
  }
};

definePageMeta({
  layout: 'home',
});
</script>

<style scoped>
.label-bold {
  font-weight: 600;
}
</style>