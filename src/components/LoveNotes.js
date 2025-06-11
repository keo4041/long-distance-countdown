// src/components/LoveNotes.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notes = [
    "Counting down every single moment... ⏳",
    "Je compte chaque instant avant de te revoir... ⏳",
    "Soon, my favorite place will be right next to you. ❤️",
    "Bientôt, mon endroit préféré sera juste à côté de toi. ❤️",
    "Every sunrise is one day closer to our reunion. 🌅",
    "Chaque lever de soleil nous rapproche de nos retrouvailles. 🌅",
    "The miles between us disappear when I think of your smile. 😊",
    "Les kilomètres s'effacent quand je pense à ton sourire. 😊",
    "Our forever is just around the corner. ✨",
    "Notre 'pour toujours' est sur le point de commencer. ✨",
    "Ready for all the hugs I've been saving for you. 🤗",
    "Prête pour tous les câlins que j'ai gardés pour toi. 🤗",
    "Love knows no distance, especially not ours. 💖",
    "L'amour ne connaît aucune distance, surtout pas le nôtre. 💖",
    "Just a little longer until I'm in your arms. 🥰",
    "Plus que très peu de temps avant d'être dans tes bras. 🥰",
    "My heart travels to you every single day. ✈️",
    "Mon cœur voyage vers toi chaque jour. ✈️",
    "The countdown to our 'happily ever after' is on. 🏰",
    "Le compte à rebours de notre 'ils vécurent heureux' a commencé. 🏰",
    "Distance is just a test to see how far love can travel. 🌍",
    "La distance n'est qu'un test pour voir jusqu'où l'amour peut voyager. 🌍",
    "Can't wait to hold you in my arms. 🤗",
    "J'ai hâte de te serrer dans mes bras. 🤗",
    "Every second brings me closer to you. ⏱️",
    "Chaque seconde me rapproche de toi. ⏱️",
    "Soon, there will be no more goodbyes, only goodnights. 🌙",
    "Bientôt, il n'y aura plus d'au revoir, seulement des bonne nuits. 🌙"
];

const LoveNotes = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % notes.length);
        }, 5000); // Change note every 5 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-16 flex items-center justify-center mt-2 mb-4 md:text-center">
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-slate-400 text-center mt-2 mb-4 md:text-center"
                >
                    {notes[index]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

export default LoveNotes;