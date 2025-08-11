<template>
  <div class="note-editor" v-if="activeNote">
    <input
      class="title-input"
      type="text"
      v-model="activeNote.title"
      placeholder="Note Title"
      @input="update"
    />
    <textarea
      class="content-input"
      v-model="activeNote.content"
      placeholder="Start writing..."
      @input="update"
    ></textarea>
    <div class="editor-actions">
      <button @click="deleteActiveNote" class="delete-btn">Delete Note</button>
    </div>
  </div>
  <div v-else class="no-note-selected">
    <h2>Select a note to view or create a new one.</h2>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useNotes, type Note } from '~/composables/useNotes';
import { debounce } from '~/utils/debounce';

const props = defineProps<{
  noteId: string | null;
}>();

const emit = defineEmits(['noteDeleted']);

const { getNoteById, updateNote, deleteNote } = useNotes();
const activeNote = ref<Note | null>(null);

watch(() => props.noteId, (newId) => {
  if (newId) {
    const note = getNoteById(newId).value;
    // Create a deep copy for editing to avoid direct mutation before debounce
    activeNote.value = note ? { ...note } : null;
  } else {
    activeNote.value = null;
  }
}, { immediate: true });

const update = debounce(() => {
  if (activeNote.value && props.noteId) {
    updateNote(props.noteId, { 
        title: activeNote.value.title, 
        content: activeNote.value.content 
    });
  }
}, 500);


const deleteActiveNote = () => {
  if (props.noteId) {
    deleteNote(props.noteId);
    emit('noteDeleted');
  }
};
</script>

<style scoped>
.note-editor {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.title-input {
  border: none;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: transparent;
}

.title-input:focus {
  outline: none;
}

.content-input {
  flex: 1;
  border: none;
  font-size: 1rem;
  line-height: 1.6;
  resize: none;
  background: transparent;
}

.content-input:focus {
  outline: none;
}

.no-note-selected {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
}

.editor-actions {
  margin-top: 1rem;
}

.delete-btn {
  padding: 0.5rem 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
</style>
