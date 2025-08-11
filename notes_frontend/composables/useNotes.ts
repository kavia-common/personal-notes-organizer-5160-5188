import { ref, computed } from 'vue';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

const notes = ref<Note[]>([]);

// Load notes from localStorage on startup
if (typeof window !== 'undefined' && window.localStorage) {
    const savedNotes = localStorage.getItem('notes-data');
    if (savedNotes) {
        notes.value = JSON.parse(savedNotes);
    } else {
        // Add some dummy data if no notes are saved
        notes.value = [
            { id: '1', title: 'First Note', content: 'This is the content of the first note.', createdAt: Date.now(), updatedAt: Date.now() },
            { id: '2', title: 'Second Note', content: 'This is a longer note to see how text wraps and excerpts are created.', createdAt: Date.now(), updatedAt: Date.now() },
        ];
    }
}


const saveNotesToLocalStorage = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('notes-data', JSON.stringify(notes.value));
    }
}


export function useNotes() {

  const getNoteById = (id: string) => {
    return computed(() => notes.value.find(note => note.id === id) || null);
  }

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    notes.value.unshift(newNote);
    saveNotesToLocalStorage();
    return newNote;
  }

  const updateNote = (id: string, payload: { title?: string, content?: string }) => {
    const note = notes.value.find(note => note.id === id);
    if (note) {
      if (payload.title !== undefined) {
        note.title = payload.title;
      }
      if (payload.content !== undefined) {
        note.content = payload.content;
      }
      note.updatedAt = Date.now();
      saveNotesToLocalStorage();
    }
  }

  const deleteNote = (id: string) => {
    notes.value = notes.value.filter(note => note.id !== id);
    saveNotesToLocalStorage();
  }

  return {
    notes: computed(() => notes.value.sort((a, b) => b.updatedAt - a.updatedAt)),
    getNoteById,
    addNote,
    updateNote,
    deleteNote
  }
}
