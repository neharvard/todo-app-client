<!-- Previous TODO which design is ok -->
 
<template>
  <div v-if="!checkingAuth" class="relative min-h-screen w-full overflow-hidden">
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
        <div class="flex justify-center mb-6">
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
        </div>

        <!-- Todo List -->
        <div class="space-y-3">
          <div
            v-for="(task, index) in tasks"
            :key="task._id"
            class="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-4 py-3 text-white"
          >
            <!-- Check Icon -->
            <button
              @click="toggleTask(task._id, task.completed)"
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
              {{ task.title }}
            </span>

            <!-- Action Icons -->
            <div class="flex items-center gap-2">
              <!-- Edit Icon -->
              <button @click="editTask(task._id)" class="text-white hover:text-gray-200">
                <PencilIcon class="w-5 h-5" />
              </button>

              <!-- Delete Icon -->
              <button @click="deleteTask(task._id)" class="text-white hover:text-gray-200">
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  PlusIcon,
  CircleIcon,
  CheckCircleIcon,
  TrashIcon,
  PencilIcon,
} from 'lucide-vue-next';

// State
const newTask = ref('');
const tasks = ref([]);
const router = useRouter();
const checkingAuth = ref(true);

// Fetch tasks from the backend
const fetchTasks = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (!token) {
      console.error('No token found');
      router.push('/auth/login');
      return;
    }

    const response = await fetch('http://localhost:5000/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Response Status:', response.status);

    if (response.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('token');
      router.push('/auth/login');
      return;
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching tasks:', errorData.msg || 'Unknown error');
      return;
    }

    const data = await response.json();
    console.log('Tasks Data:', data);

    tasks.value = data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

// Add a new task
const addTask = async () => {
  if (newTask.value.trim()) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTask.value.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error adding task:', errorData.msg || 'Unknown error');
        return;
      }

      const data = await response.json();
      if (data && data._id) {
        tasks.value.push(data);
        newTask.value = '';
      } else {
        console.error('Invalid response format:', data);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
};

// Toggle task completion
const toggleTask = async (taskId, completed) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !completed }),
    });
    const data = await response.json();
    const taskIndex = tasks.value.findIndex((task) => task._id === taskId);
    tasks.value[taskIndex].completed = data.completed;
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

// Delete a task
const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    tasks.value = tasks.value.filter((task) => task._id !== taskId);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

// Edit a task
const editTask = async (taskId) => {
const task = tasks.value.find((task) => task._id === taskId);
if (!task) {
  console.error('Task not found');
  return;
}

const newTitle = prompt('Edit task:', task.title);
if (newTitle !== null && newTitle.trim()) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTitle.trim() }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error editing task:', errorData.msg || 'Unknown error');
      return;
    }

    const updatedTask = await response.json();
    const taskIndex = tasks.value.findIndex((task) => task._id === taskId);
    if (taskIndex !== -1) {
      tasks.value[taskIndex].title = updatedTask.title; // Update the task in the frontend state
    }
  } catch (err) {
    console.error('Error editing task:', err);
  }
}
};

// Fetch tasks on mount
onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    } else {
      checkingAuth.value = false;
      fetchTasks();
    }
  }
});

definePageMeta({
  middleware: 'auth',
});
</script>