<template>

  <div class="mb-5 pl-5">
    <a href="" class="text-sm">Voltar</a>
    <h3 class="text-[#1F1283] font-semibold text-2xl">Novo Projeto</h3>
  </div>

  <form @submit.prevent="" class="border border-[#DCDCDC p-10 mx-5">
    <div class="max-w-2xl mx-auto flex flex-col justify-center]">
      <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-[#695CCD]">Nome do projeto
          <span class="text-xs text-[#717171] font-light">(Obrigatório)</span></label>
        <input type="text" id="name" required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
      </div>

      <div class="mb-6">
        <label for="client" class="block mb-2 text-sm font-medium text-[#695CCD]">Cliente
          <span class="text-xs text-[#717171] font-light">(Obrigatório)</span></label>
        <input type="text" id="client" required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
      </div>

      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="startDate" class="block mb-2 text-sm font-medium text-[#695CCD]">Data de Início
            <span class="text-xs text-[#717171] font-light">(Obrigatório)</span></label>
          <input type="date" id="startDate" required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
        </div>
        <div>
          <label for="endDate" class="block mb-2 text-sm font-medium text-[#695CCD]">Data Final
            <span class="text-xs text-[#717171] font-light">(Obrigatório)</span></label>
          <input type="date" id="endDate" required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
        </div>
      </div>

      <div>
        <span class="text-[#695CCD]">Capa do projeto</span>
        <div class="flex flex-col items-center space-y-4 border border-dotted border-[#717171] p-5 mt-2">
          <img src="" alt="" class="w-5 h-5">
          <span class="text-[#717171] text-sm">Escolha uma imagem .jpg ou .png no seu dispositivo</span>
          <input type="file" id="coverImage" accept="image/jpeg, image/png" class="bg-white" />
          <label for="coverImage"
            class="bg-white border border-[#695CCD] rounded-full px-8 py-2 text-[#695CCD]">Selecionar</label>

        </div>
      </div>

      <button disabled class="text-white py-2 rounded-full mt-10 disabled:bg-[#B2A8FF]" type="submit">Salvar
        projeto</button>
    </div>
  </form>

</template>

<style></style>
