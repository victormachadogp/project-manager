<template>

  <div class="mb-5 pl-5">
    <RouterLink to="/" class="text-sm text-[#695CCD] hover:underline flex items-center gap-2">
      <IconArrowLeft />
      Voltar
    </RouterLink>
    <h3 class="text-[#1F1283] font-semibold text-2xl mt-2">
      {{ isEditing ? 'Editar Projeto' : 'Novo Projeto' }}
    </h3>
  </div>

  <form @submit.prevent="handleSubmit" class="border border-[#DCDCDC p-10 mx-5">
    <div class="max-w-2xl mx-auto flex flex-col justify-center]">
      <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-[#695CCD]">Nome do projeto
          <span class="text-xs text-[#717171] font-light">(Obrigatório)</span></label>
        <input v-model="form.name" type="text" id="name" required
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
      </div>

      <div class="mb-6">
        <label for="client" class="block mb-2 text-sm font-medium text-[#695CCD]">Cliente
          <span class="text-xs text-[#717171] font-light">(Obrigatório)</span></label>
        <input v-model="form.client" type="text" id="client" required
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
      </div>

      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="startDate" class="block mb-2 text-sm font-medium text-[#695CCD]">Data de Início
            <span class="text-xs text-[#717171] font-light">(Obrigatório)</span></label>
          <input v-model="form.startDate" type="date" id="startDate" required
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
        </div>
        <div>
          <label for="endDate" class="block mb-2 text-sm font-medium text-[#695CCD]">Data Final
            <span class="text-xs text-[#717171] font-light">(Obrigatório)</span></label>
          <input v-model="form.endDate" type="date" id="endDate" required
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
        </div>
      </div>

      <div>
        <span class="text-[#695CCD]">Capa do projeto</span>
        <div class="flex flex-col items-center space-y-4 border border-dotted border-[#717171] p-5 mt-2">

          <IconUpload />

          <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="max-w-xs max-h-48 object-contain mb-4">
          <span class="text-[#717171] text-sm">Escolha uma imagem .jpg ou .png no seu dispositivo</span>
          <input type="file" id="coverImage" accept="image/jpeg, image/png" class="hidden"
            @change="handleImageUpload" />
          <label for="coverImage"
            class="bg-white border border-[#695CCD] rounded-full px-8 py-2 text-[#695CCD] cursor-pointer hover:bg-[#695CCD] hover:text-white transition-colors">
            Selecionar
          </label>
        </div>
      </div>

      <button :disabled="!isFormValid || loading" class="text-white py-2 rounded-full mt-10"
        :class="[isFormValid ? 'bg-[#695CCD] hover:bg-[#5648B0]' : 'bg-[#B2A8FF]']" type="submit">
        {{ loading ? 'Salvando...' : 'Salvar projeto' }}
      </button>
    </div>
  </form>

</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProjectStore } from '../stores/projectStore';
import { imageApi } from '../services/imageApi';
import IconUpload from '@/components/icons/IconUpload.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';


const route = useRoute();
const router = useRouter();
const store = useProjectStore();

const isEditing = ref(false);
const loading = ref(false);
const imagePreview = ref<string>('');

interface FormErrors {
  name?: string;
  client?: string;
  startDate?: string;
  endDate?: string;
}

const form = ref({
  name: '',
  client: '',
  startDate: '',
  endDate: '',
  coverImage: ''
});

const errors = ref<FormErrors>({});

const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.client &&
    form.value.startDate &&
    form.value.endDate &&
    !Object.keys(errors.value).length
  );
});


function validateForm(): boolean {
  errors.value = {};

  if (!form.value.name.trim()) {
    errors.value.name = 'Nome do projeto é obrigatório';
  }

  if (!form.value.client.trim()) {
    errors.value.client = 'Cliente é obrigatório';
  }

  if (!form.value.startDate) {
    errors.value.startDate = 'Data de início é obrigatória';
  }

  if (!form.value.endDate) {
    errors.value.endDate = 'Data final é obrigatória';
  }

  if (form.value.startDate && form.value.endDate &&
    new Date(form.value.startDate) > new Date(form.value.endDate)) {
    errors.value.endDate = 'Data final deve ser posterior à data de início';
  }

  return Object.keys(errors.value).length === 0;
}

async function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    // Validações
    if (!file.type.match(/image\/(jpeg|png)/)) {
      alert('Por favor, selecione apenas imagens JPG ou PNG');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB');
      return;
    }

    try {
      // Upload da imagem e obtenção do caminho
      const imagePath = await imageApi.upload(file);

      // Atualizar preview e form com o caminho retornado
      imagePreview.value = imagePath;
      form.value.coverImage = imagePath;

    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload da imagem. Tente novamente.');
    }
  }
}


async function handleSubmit() {
  if (!validateForm()) return;

  loading.value = true;
  try {
    if (isEditing.value) {
      await store.updateProject({
        id: route.params.id,
        ...form.value,
        isFavorite: false
      });
    } else {
      await store.createProject(form.value);
    }
    router.push('/');
  } catch (error) {
    console.error('Error saving project:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  const projectId = route.params.id;
  if (projectId) {
    const project = await store.fetchProjectById(projectId);
    if (project) {
      form.value = {
        name: project.name,
        client: project.client,
        startDate: project.startDate,
        endDate: project.endDate,
        coverImage: project.coverImage
      };
      imagePreview.value = project.coverImage;
    }
    isEditing.value = true;
  }
});

watch(
  () => route.params.id,
  (newId) => {
    isEditing.value = !!newId;
  },
  { immediate: true }
);
</script>

<style></style>
