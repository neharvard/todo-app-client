<!-- Previous TODO which design is ok -->
 
<template>
    <div class="relative min-h-screen w-full overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img
          src="/public/q1.png"
          alt="Cozy cabin interior"
          class="w-full h-full object-cover"
        />
      </div>
  
      <!-- Todo List Container -->
      <div class="relative z-10 flex flex-col items-center justify-center mt-24 px-4">
        <!-- Todo List Card -->
        <div class="w-full max-w-md">
          <!-- Title -->
          <div class="flex justify-center mb-16">
            <h1 class="text-3xl font-bold text-red-700 bg-white/30 backdrop-blur-sm px-8 py-2 rounded-full">
              To-Do List
            </h1>
          </div>
  
          <!-- Input and Add Button -->
          <div class="flex items-center gap-2 mb-6">
            <div class="flex-1 border-2 backdrop-blur-sm rounded-lg">
              <input
                v-model="newTask"
                @keyup.enter="addTask"
                type="text"
                placeholder="Add a new task..."
                class="w-full px-4 py-3 bg-transparent text-white placeholder-white/70 outline-none"
              />
            </div>
            <button
              @click="addTask"
              class="bg-white/30 backdrop-blur-sm rounded-full p-2 w-12 h-12 flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              <PlusIcon class="w-6 h-6 text-white" />
            </button>
            <div class="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
              <span class="text-white mr-2">ALL</span>
              <ChevronDownIcon class="w-5 h-5 text-white" />
            </div>
          </div>
  
          <!-- Todo List -->
          <div class="space-y-3">
            <div
              v-for="(task, index) in tasks"
              :key="index"
              class="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-4 py-3 text-white"
            >
              <!-- Check Icon (Moved to left side) -->
              <button
                @click="toggleTask(index)"
                class="mr-3 flex-shrink-0"
              >
                <CircleIcon v-if="!task.completed" class="w-6 h-6 text-white" />
                <CheckCircleIcon v-else class="w-6 h-6 text-white" />
              </button>
  
              <!-- Task Text -->
              <span
                class="flex-1"
                :class="{ 'line-through': task.completed }"
              >
                {{ task.text }}
              </span>
  
              <!-- Action Icons -->
              <div class="flex items-center gap-2">
                <!-- Edit Icon -->
                <button @click="editTask(index)" class="text-white hover:text-gray-200">
                  <PencilIcon class="w-5 h-5" />
                </button>
  
                <!-- Delete Icon -->
                <button @click="deleteTask(index)" class="text-white hover:text-gray-200">
                  <TrashIcon class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
  
          <!-- Pomodoro Label -->
          <div class="absolute bottom-4 right-4 flex items-center text-white">
            <PlayIcon class="w-5 h-5 mr-1" />
            <span class="font-bold mr-1">POMODORO</span>
            <MusicIcon class="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import {
    PlusIcon,
    ChevronDownIcon,
    CircleIcon,
    CheckCircleIcon,
    TrashIcon,
    PencilIcon,
    PlayIcon,
    MusicIcon
  } from 'lucide-vue-next';
  
  // State
  const newTask = ref('');
  const tasks = ref([]);
  const editingIndex = ref(-1);
  
  // Load tasks from localStorage on mount
  onMounted(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      tasks.value = JSON.parse(savedTasks);
    } else {
      // Default tasks if none exist
      tasks.value = [
        { text: 'Go for walking', completed: false },
        { text: 'Do homework', completed: false },
        { text: 'Plan the party', completed: false }
      ];
    }
  });
  
  // Save tasks to localStorage whenever they change
  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  };
  
  // Add a new task
  const addTask = () => {
    if (newTask.value.trim()) {
      tasks.value.push({
        text: newTask.value.trim(),
        completed: false
      });
      newTask.value = '';
      saveTasks();
    }
  };
  
  // Toggle task completion
  const toggleTask = (index) => {
    tasks.value[index].completed = !tasks.value[index].completed;
    saveTasks();
  };
  
  // Delete a task
  const deleteTask = (index) => {
    tasks.value.splice(index, 1);
    saveTasks();
  };
  
  // Edit a task
  const editTask = (index) => {
    const newText = prompt('Edit task:', tasks.value[index].text);
    if (newText !== null && newText.trim()) {
      tasks.value[index].text = newText.trim();
      saveTasks();
    }
  };
  </script>
  
  <style>
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
  }
  
  input::placeholder {
    opacity: 0.7;
  }
  
  /* Ensure the app takes full height */
  html, body, #__nuxt {
    height: 100%;
  }
  </style>