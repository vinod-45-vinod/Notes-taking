export default class NotesAPI {
        static getAllNotes() {
            const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
            
            return notes.sort((a, b) => {
                return new Date(a.updated) > new Date(b.updated) ? -1 : 1;// to get most recent note on top 
            });

        }

        static saveNote(noteToSave) {
            const notes = NotesAPI.getAllNotes(); //   retrieve all node
            const existing = notes.find(note => note.id == noteToSave.id); // it search the id

            // Edit / update
            if (existing) {
                existing.title = noteToSave.title;
                existing.body = noteToSave.body;
                existing.updated = new Date().toISOString(); // update time and date
            } else {
                noteToSave.id = Math.floor(Math.random() * 1000000); // to create a random address
                noteToSave.updated = new Date().toISOString();
                notes.push(noteToSave);
            }

            localStorage.setItem("notesapp-notes", JSON.stringify(notes)); // store updated notes array and json over writes exisiting entry    

        }

        static deleteNote(id) {
            const notes = NotesAPI.getAllNotes();
            const newNotes = notes.filter(note => note.id != id); // to get every id that not pass in 
            localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
        } 
}
 