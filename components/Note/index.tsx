'use client';
import { useEffect, useState } from 'react';
import styles from './Notes.module.css';

type Vector2 = {
    x: number;
    y: number;
}

export default function Note({ note }: any) {
    const { id, title, content, created } = note || {};
    const [drag, setDrag] = useState<boolean>(false);
    const [position, setPosition] = useState<Vector2>({ x: 0, y: 0 });
    const [mousePosition, setMousePosition] = useState<Vector2>({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: any) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

    return (
        <div 
        onDoubleClick={(e:any) => { 
            setDrag(prev => !prev) 
            setPosition({x:mousePosition.x,y:mousePosition.y})
        }} style={{
            position: drag ? 'absolute' : 'fixed',
            top: drag ? mousePosition.y - 20 : position.y,
            left: drag ? mousePosition.x - 40 : position.x,
        }} className={styles.note}>
            <h2>{title}</h2>
            <h5>{content}</h5>
            <p>{created}</p>
        </div>
    );
}