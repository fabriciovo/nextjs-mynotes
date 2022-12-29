import CreateNote from '../components/CreateNotes';
import Note from '../components/Note';
import styles from './app.module.css';

async function getNotes() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30', { cache: 'no-store' });
    const data = await res.json();
    return data?.items as any[];
}

export default async function HomePage() {
    const notes = await getNotes();
    return (
        <section>
            <h1>Notes</h1>
            <div className={styles.grid}>
                {notes?.map((note) => {
                    return <Note key={note.id} note={note} />;
                })}
            </div>

            <CreateNote />
        </section>
    )
}