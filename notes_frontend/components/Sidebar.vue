<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search notes..."
        class="search-input"
      />
      <button @click="handleNewNote" class="new-note-btn">+</button>
    </div>
    <note-list
      :notes="filteredNotes"
      :selected-note-id="selectedNoteId"
      @selectNote="selectNote"
    />
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import NoteList from './NoteList.vue';
import { useNotes, type Note } from '~/composables/useNotes';

const { notes, addNote } = useNotes();
const searchTerm = ref('');
const selectedNoteId = ref<string | null>(null);

const emit = defineEmits(['noteSelected']);

const filteredNotes = computed(() => {
  if (!searchTerm.value) {
    return notes.value;
  }
  return notes.value.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const handleNewNote = () => {
  const newNote = addNote();
  selectNote(newNote.id);
};

const selectNote = (noteId: string) => {
  selectedNoteId.value = noteId;
  emit('noteSelected', noteId);
};
</script>

<style scoped>
.sidebar {
  width: 300px;
  border-right: 1px solid var(--border-color);
  background-color: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.sidebar-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.search-input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--border-color);
}

.new-note-btn {
  margin-left: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 1.2rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  line-height: 1;
}

.new-note-btn:hover {
  background-color: #1565c0;
}
</style>
