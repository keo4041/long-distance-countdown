// src/components/MessageBottle.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { onSnapshot, addDoc, collection, query, orderBy, limit } from "firebase/firestore"; 

const MessageBottle = () => {
    const [message, setMessage] = useState('');
    const [currentNote, setCurrentNote] = useState('Loading message...');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Listen for real-time updates from Firestore get last doc

    // In a real app, you might fetch the *latest* message instead of a specific doc.
        // For simplicity, we'll use a single document for now.
        // To get the latest message, you'd query the collection, order by timestamp, and limit to 1.
        // Example: 
        const q = query(collection(db, "messages"), orderBy("timestamp", "desc"), limit(1));
        const unsub = onSnapshot(q, (snapshot) => {
            const latestMessage = snapshot.docs[0]?.data();
            setCurrentNote(latestMessage ? latestMessage.text : "No message yet. Leave one!");
        });
        
        return () => unsub(); // Cleanup subscription on unmount
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await addDoc(collection(db, "messages"), { text: message, timestamp: new Date() });
        setMessage('');
        setShowForm(false);
    };

    return (
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg text-center">
            <p className="font-script text-2xl mb-2 text-rose-gold">Message in a Bottle</p>
            <p className="italic text-slate-300">"{currentNote}"</p>
            <button onClick={() => setShowForm(!showForm)} className="text-sm mt-4 text-rose-gold/70 hover:text-rose-gold">
                {showForm ? 'Cancel' : 'Leave a new message...'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className="mt-4 flex">
                    <input 
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-grow bg-slate-900 text-white p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-rose-gold"
                        placeholder="Write something sweet..."
                    />
                    <button type="submit" className="bg-rose-gold text-white p-2 rounded-r-md">Send</button>
                </form>
            )}
        </div>
    );
};

export default MessageBottle;