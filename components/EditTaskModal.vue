<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Edit Task</h2>
        <input
          v-model="editTitle"
          type="text"
          placeholder="Edit task..."
          class="w-full px-4 py-2 border rounded-lg mb-4"
        />
        <div class="flex justify-end gap-2">
          <button
            @click="closeModal"
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            @click="saveChanges"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    isOpen: Boolean,
    taskTitle: String,
  });
  
  const emit = defineEmits(['save', 'close']);
  
  const editTitle = ref(props.taskTitle);
  
  const saveChanges = () => {
    emit('save', editTitle.value);
    closeModal();
  };
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
 
  </style>