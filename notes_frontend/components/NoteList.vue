<template>
  <ul class="note-list">
    <li
      v-for="note in notes"
      :key="note.id"
      @click="$emit('selectNote', note.id)"
      :class="{ active: note.id === selectedNoteId }"
    >
      <h3 class="note-title">{{ note.title || 'Untitled Note' }}</h3>
      <p class="note-excerpt">{{ getExcerpt(note.content) }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Note } from '~/composables/useNotes';

defineProps<{
  notes: Note[];
  selectedNoteId: string | null;
}>();

defineEmits(['selectNote']);

const getExcerpt = (content: string) => {
  if (!content) return 'No content';
  return content.substring(0, 50) + (content.length > 50 ? '...' : '');
};
</script>

<style scoped>
.note-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  height: 100%;
}

li {
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s;
}

li:hover {
  background-color: var(--background-color);
}

li.active {
  background-color: var(--secondary-color);
  color: white;
}

.note-title {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note-excerpt {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
