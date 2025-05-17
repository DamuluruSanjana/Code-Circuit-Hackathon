const { useState, useEffect } = React;

    // Predefined card sets
const PREDEFINED_SETS = {
    Java: [
        { front: "What is JVM?", back: "Java Virtual Machine - runs Java bytecode", difficulty: "Easy" },
        { front: "What is inheritance?", back: "A mechanism that allows a class to inherit properties from another class", difficulty: "Easy" },
        { front: "What is polymorphism?", back: "The ability of an object to take many forms", difficulty: "Intermediate" },
        { front: "Explain Java garbage collection", back: "Automatic memory management process that removes unused objects", difficulty: "Hard" },
        { front: "What is method overloading?", back: "Multiple methods with same name but different parameters", difficulty: "Easy" },
        { front: "What is a Java interface?", back: "A contract that specifies what a class must do", difficulty: "Intermediate" },
        { front: "What is the difference between == and .equals()?", back: "== compares references, .equals() compares contents", difficulty: "Intermediate" },
        { front: "What is a Java package?", back: "A namespace that organizes related classes and interfaces", difficulty: "Easy" },
        { front: "What is multithreading?", back: "Executing multiple threads simultaneously", difficulty: "Hard" },
        { front: "What is exception handling?", back: "Mechanism to handle runtime errors using try-catch blocks", difficulty: "Intermediate" }
    ],
    Python: [
        { front: "What is PEP 8?", back: "Style guide for Python code", difficulty: "Easy" },
        { front: "What is a lambda function?", back: "Anonymous function defined using lambda keyword", difficulty: "Intermediate" },
        { front: "What is GIL?", back: "Global Interpreter Lock - allows only one thread to execute Python bytecode", difficulty: "Hard" },
        { front: "What is a decorator?", back: "A function that modifies another function", difficulty: "Intermediate" },
        { front: "What is list comprehension?", back: "Concise way to create lists based on existing lists", difficulty: "Easy" },
        { front: "What is the difference between tuple and list?", back: "Tuples are immutable, lists are mutable", difficulty: "Easy" },
        { front: "What is __init__?", back: "Constructor method in Python classes", difficulty: "Easy" },
        { front: "What are generators?", back: "Functions that return an iterator using yield", difficulty: "Hard" },
        { front: "What is duck typing?", back: "Type checking based on object capabilities rather than type", difficulty: "Intermediate" },
        { front: "What is virtualenv?", back: "Tool to create isolated Python environments", difficulty: "Intermediate" }
    ],
    JavaScript: [
        { front: "What is closure?", back: "Function that has access to variables in outer scope", difficulty: "Intermediate" },
        { front: "What is hoisting?", back: "Default behavior of moving declarations to the top", difficulty: "Easy" },
        { front: "What is Promise?", back: "Object representing eventual completion of async operation", difficulty: "Hard" },
        { front: "What is event bubbling?", back: "Event propagation from child to parent elements", difficulty: "Intermediate" },
        { front: "What is the difference between let and var?", back: "let has block scope, var has function scope", difficulty: "Easy" },
        { front: "What is destructuring?", back: "Expression to unpack values from arrays/objects", difficulty: "Easy" },
        { front: "What is async/await?", back: "Syntax to handle promises more elegantly", difficulty: "Hard" },
        { front: "What is the event loop?", back: "Mechanism to handle async operations in JavaScript", difficulty: "Hard" },
        { front: "What is prototype inheritance?", back: "Objects inheriting properties and methods from other objects", difficulty: "Intermediate" },
        { front: "What is the this keyword?", back: "Reference to the current execution context", difficulty: "Intermediate" }
    ],
    HTML: [
        { front: "What is DOCTYPE?", back: "Declaration defining document type and version of HTML", difficulty: "Easy" },
        { front: "What is semantic HTML?", back: "HTML that gives meaning to the content structure", difficulty: "Intermediate" },
        { front: "What is localStorage?", back: "Web storage that persists until explicitly cleared", difficulty: "Easy" },
        { front: "What are data attributes?", back: "Custom attributes prefixed with 'data-'", difficulty: "Easy" },
        { front: "What is the difference between div and span?", back: "div is block-level, span is inline", difficulty: "Easy" },
        { front: "What is the purpose of meta tags?", back: "Provide metadata about HTML document", difficulty: "Intermediate" },
        { front: "What is the difference between GET and POST?", back: "GET requests data, POST submits data", difficulty: "Intermediate" },
        { front: "What is the purpose of alt attribute?", back: "Provides alternative text for images", difficulty: "Easy" },
        { front: "What is the Canvas element?", back: "Element used for drawing graphics via JavaScript", difficulty: "Hard" },
        { front: "What is WebSocket?", back: "Protocol for full-duplex communication channels", difficulty: "Hard" }
    ],
    CSS: [
        { front: "What is Box Model?", back: "Content, padding, border, and margin of elements", difficulty: "Easy" },
        { front: "What is flexbox?", back: "One-dimensional layout model for arranging items", difficulty: "Intermediate" },
        { front: "What is CSS Grid?", back: "Two-dimensional layout system for web", difficulty: "Intermediate" },
        { front: "What is the difference between padding and margin?", back: "Padding is inside element, margin is outside", difficulty: "Easy" },
        { front: "What is z-index?", back: "Property that specifies stack order of elements", difficulty: "Easy" },
        { front: "What are pseudo-classes?", back: "Keywords that specify element state (:hover, :active)", difficulty: "Intermediate" },
        { front: "What is the difference between display: none and visibility: hidden?", back: "display: none removes from layout, visibility: hidden keeps space", difficulty: "Intermediate" },
        { front: "What is CSS specificity?", back: "Rules determining which styles are applied to elements", difficulty: "Hard" },
        { front: "What are media queries?", back: "Conditional CSS rules based on device characteristics", difficulty: "Intermediate" },
        { front: "What is CSS preprocessing?", back: "Extended syntax that compiles into regular CSS", difficulty: "Hard" }
    ]
};

// Predefined card sets organized by categories
const CATEGORIES = {
    Languages: {
        Spanish: {
            emoji: "🇪🇸",
            cards: [
                { front: "¿Cómo estás?", back: "How are you?", difficulty: "Easy" },
                { front: "Buenos días", back: "Good morning", difficulty: "Easy" },
                { front: "Gracias", back: "Thank you", difficulty: "Easy" },
                { front: "Por favor", back: "Please", difficulty: "Easy" },
                { front: "¿Dónde está?", back: "Where is it?", difficulty: "Intermediate" },
                { front: "¿Qué hora es?", back: "What time is it?", difficulty: "Easy" },
                { front: "Mucho gusto", back: "Nice to meet you", difficulty: "Easy" },
                { front: "¿Hablas inglés?", back: "Do you speak English?", difficulty: "Intermediate" },
                { front: "No entiendo", back: "I don't understand", difficulty: "Easy" },
                { front: "Hasta luego", back: "See you later", difficulty: "Easy" }
            ]
        },
        French: {
            emoji: "🇫🇷",
            cards: [
                { front: "Bonjour", back: "Hello", difficulty: "Easy" },
                { front: "Au revoir", back: "Goodbye", difficulty: "Easy" },
                { front: "S'il vous plaît", back: "Please", difficulty: "Easy" },
                { front: "Merci", back: "Thank you", difficulty: "Easy" },
                { front: "Comment allez-vous?", back: "How are you?", difficulty: "Intermediate" },
                { front: "Je m'appelle", back: "My name is", difficulty: "Easy" },
                { front: "Enchanté(e)", back: "Nice to meet you", difficulty: "Intermediate" },
                { front: "Parlez-vous anglais?", back: "Do you speak English?", difficulty: "Intermediate" },
                { front: "Je ne comprends pas", back: "I don't understand", difficulty: "Easy" },
                { front: "À bientôt", back: "See you soon", difficulty: "Easy" }
            ]
        },
        Japanese: {
            emoji: "🇯🇵",
            cards: [
                { front: "こんにちは (Konnichiwa)", back: "Hello", difficulty: "Easy" },
                { front: "さようなら (Sayounara)", back: "Goodbye", difficulty: "Easy" },
                { front: "ありがとう (Arigatou)", back: "Thank you", difficulty: "Easy" },
                { front: "お願いします (Onegaishimasu)", back: "Please", difficulty: "Intermediate" },
                { front: "はい (Hai)", back: "Yes", difficulty: "Easy" },
                { front: "いいえ (Iie)", back: "No", difficulty: "Easy" },
                { front: "おはよう (Ohayou)", back: "Good morning", difficulty: "Easy" },
                { front: "こんばんは (Konbanwa)", back: "Good evening", difficulty: "Easy" },
                { front: "すみません (Sumimasen)", back: "Excuse me/Sorry", difficulty: "Intermediate" },
                { front: "分かりません (Wakarimasen)", back: "I don't understand", difficulty: "Intermediate" }
            ]
        }
    },
    Academic: {
        Mathematics: {
            emoji: "📐",
            cards: [
                { front: "What is a prime number?", back: "A number that has exactly two factors: 1 and itself", difficulty: "Easy" },
                { front: "What is the Pythagorean theorem?", back: "a² + b² = c² in a right triangle", difficulty: "Intermediate" },
                { front: "What is a derivative?", back: "Rate of change of a function with respect to a variable", difficulty: "Hard" },
                { front: "What is integration?", back: "The process of finding the integral of a function", difficulty: "Hard" },
                { front: "What is a function?", back: "A relation between inputs where each input has exactly one output", difficulty: "Easy" },
                { front: "What is a matrix?", back: "A rectangular array of numbers arranged in rows and columns", difficulty: "Intermediate" },
                { front: "What is a vector?", back: "A quantity with both magnitude and direction", difficulty: "Intermediate" },
                { front: "What is probability?", back: "The likelihood of an event occurring", difficulty: "Easy" },
                { front: "What is a logarithm?", back: "The power to which a base must be raised to yield a number", difficulty: "Hard" },
                { front: "What is factoring?", back: "Breaking down an expression into a product of simpler expressions", difficulty: "Intermediate" }
            ]
        },
        Biology: {
            emoji: "🧬",
            cards: [
                { front: "What is photosynthesis?", back: "Process by which plants convert light energy into chemical energy", difficulty: "Easy" },
                { front: "What is mitosis?", back: "Cell division resulting in two identical daughter cells", difficulty: "Intermediate" },
                { front: "What is DNA?", back: "Deoxyribonucleic acid - carries genetic information", difficulty: "Easy" },
                { front: "What is cellular respiration?", back: "Process of breaking down glucose to release energy", difficulty: "Intermediate" },
                { front: "What is natural selection?", back: "Process where organisms better adapted to their environment survive", difficulty: "Intermediate" },
                { front: "What is a protein?", back: "Large molecule made up of amino acids", difficulty: "Easy" },
                { front: "What is an ecosystem?", back: "Community of living organisms and their environment", difficulty: "Easy" },
                { front: "What is homeostasis?", back: "Maintenance of stable internal conditions", difficulty: "Hard" },
                { front: "What is meiosis?", back: "Cell division resulting in gametes with half the chromosomes", difficulty: "Hard" },
                { front: "What is a gene?", back: "Basic unit of heredity made of DNA", difficulty: "Easy" }
            ]
        },
        Chemistry: {
            emoji: "⚗️",
            cards: [
                { front: "What is an atom?", back: "The basic unit of matter consisting of protons, neutrons, and electrons", difficulty: "Easy" },
                { front: "What is pH?", back: "Measure of hydrogen ion concentration in a solution", difficulty: "Intermediate" },
                { front: "What is a catalyst?", back: "Substance that increases reaction rate without being consumed", difficulty: "Intermediate" },
                { front: "What is a molecule?", back: "Group of atoms bonded together", difficulty: "Easy" },
                { front: "What is an isotope?", back: "Atoms with same number of protons but different numbers of neutrons", difficulty: "Intermediate" },
                { front: "What is a chemical bond?", back: "Force that holds atoms together in a molecule", difficulty: "Easy" },
                { front: "What is entropy?", back: "Measure of disorder in a system", difficulty: "Hard" },
                { front: "What is oxidation?", back: "Loss of electrons in a chemical reaction", difficulty: "Intermediate" },
                { front: "What is reduction?", back: "Gain of electrons in a chemical reaction", difficulty: "Intermediate" },
                { front: "What is a mole?", back: "6.022 × 10²³ particles of a substance", difficulty: "Hard" }
            ]
        }
    },
    Technology: {
        JavaScript: {
            emoji: "🟨",
            cards: PREDEFINED_SETS.JavaScript
        },
        Python: {
            emoji: "🐍",
            cards: PREDEFINED_SETS.Python
        },
        Java: {
            emoji: "☕",
            cards: PREDEFINED_SETS.Java
        },
        HTML: {
            emoji: "🌐",
            cards: PREDEFINED_SETS.HTML
        },
        CSS: {
            emoji: "🎨",
            cards: PREDEFINED_SETS.CSS
        }
    },
    Professional: {
        Business: {
            emoji: "💼",
            cards: [
                { front: "What is ROI?", back: "Return on Investment - measures profitability of an investment", difficulty: "Easy" },
                { front: "What is SWOT analysis?", back: "Analysis of Strengths, Weaknesses, Opportunities, and Threats", difficulty: "Intermediate" },
                { front: "What is market segmentation?", back: "Division of market into distinct groups of buyers", difficulty: "Intermediate" },
                { front: "What is a business model?", back: "Plan for successful operation of a business", difficulty: "Easy" },
                { front: "What is cash flow?", back: "Net amount of cash moving in and out of a business", difficulty: "Easy" },
                { front: "What is a balance sheet?", back: "Financial statement showing assets, liabilities, and equity", difficulty: "Intermediate" },
                { front: "What is depreciation?", back: "Reduction in value of an asset over time", difficulty: "Intermediate" },
                { front: "What is a stakeholder?", back: "Person or group with interest in a business", difficulty: "Easy" },
                { front: "What is a merger?", back: "Combination of two companies into one", difficulty: "Hard" },
                { front: "What is corporate governance?", back: "System of rules and practices by which a company is directed", difficulty: "Hard" }
            ]
        },
        Economics: {
            emoji: "📈",
            cards: [
                { front: "What is supply and demand?", back: "Economic model of price determination in a market", difficulty: "Easy" },
                { front: "What is inflation?", back: "General increase in prices and fall in purchasing value of money", difficulty: "Easy" },
                { front: "What is GDP?", back: "Gross Domestic Product - total value of goods produced in a country", difficulty: "Intermediate" },
                { front: "What is fiscal policy?", back: "Government's use of spending and taxation to influence the economy", difficulty: "Hard" },
                { front: "What is monetary policy?", back: "Central bank's actions to control money supply", difficulty: "Hard" },
                { front: "What is elasticity?", back: "Measure of responsiveness of demand to changes in price", difficulty: "Intermediate" },
                { front: "What is opportunity cost?", back: "Cost of next best alternative foregone", difficulty: "Easy" },
                { front: "What is a recession?", back: "Period of temporary economic decline", difficulty: "Intermediate" },
                { front: "What is market equilibrium?", back: "Point where supply equals demand", difficulty: "Easy" },
                { front: "What is comparative advantage?", back: "Ability to produce goods at a lower opportunity cost", difficulty: "Hard" }
            ]
        }
    }
};

function Navbar({ darkMode, setDarkMode, currentView, setCurrentView, autoAdvanceTimer, setAutoAdvanceTimer }) {
    const [showSettings, setShowSettings] = useState(false);
    const [sortOrder, setSortOrder] = useState('recent');
    const [studyReminders, setStudyReminders] = useState(() => {
        const saved = localStorage.getItem('studyReminders');
        return saved === 'true';
    });

    // Save settings to localStorage when they change
    useEffect(() => {
        localStorage.setItem('autoAdvanceTimer', autoAdvanceTimer);
        localStorage.setItem('studyReminders', studyReminders);
    }, [autoAdvanceTimer, studyReminders]);

    // Handle study reminders
    useEffect(() => {
        if (studyReminders) {
            // Request notification permission
            if (Notification.permission !== 'granted') {
                Notification.requestPermission();
            }

            // Set up daily reminder at 9 AM
            const now = new Date();
            const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
            if (now > reminderTime) {
                reminderTime.setDate(reminderTime.getDate() + 1);
            }
            
            const timeUntilReminder = reminderTime - now;
            const reminderTimeout = setTimeout(() => {
                if (Notification.permission === 'granted') {
                    new Notification('FlashMaster Reminder', {
                        body: 'Time for your daily review session!',
                        icon: '/favicon.ico'
                    });
                }
            }, timeUntilReminder);

            return () => clearTimeout(reminderTimeout);
        }
    }, [studyReminders]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center" onClick={() => setCurrentView('dashboard')} style={{cursor: 'pointer'}}>
                        {/* <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg> */}
                        <span className={`ml-2 font-bold text-4xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        👾FlashMaster
                        </span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            {darkMode ? (
                                <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                        
                        <div className="relative">
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${darkMode ? 'text-white' : 'text-gray-800'}`}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            
                            {showSettings && (
                                <div className={`absolute right-0 mt-2 w-64 rounded-md shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                                    <div className="py-1">
                                        {/* Sort Order Setting */}
                                        <div className="px-4 py-2">
                                            <label className={`block text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>Sort Deck</label>
                                            <select 
                                                value={sortOrder}
                                                onChange={(e) => setSortOrder(e.target.value)}
                                                className={`mt-1 block w-full rounded-md border-gray-300 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
                                            >
                                                <option value="recent">Recently Used</option>
                                                <option value="oldest">Oldest First</option>
                                                <option value="newest">Newest First</option>
                                            </select>
                                        </div>

                                        {/* Auto-advance Timer Setting */}
                                        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-600">
                                            <label className={`block text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>Auto-advance Timer</label>
                                            <select 
                                                value={autoAdvanceTimer}
                                                onChange={(e) => setAutoAdvanceTimer(e.target.value)}
                                                className={`mt-1 block w-full rounded-md border-gray-300 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
                                            >
                                                <option value="0">Off</option>
                                                <option value="3">3 seconds</option>
                                                <option value="5">5 seconds</option>
                                                <option value="10">10 seconds</option>
                                            </select>
                                        </div>

                                        {/* Study Reminders Toggle */}
                                        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-600">
                                            <label className={`flex items-center text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={studyReminders}
                                                    onChange={(e) => setStudyReminders(e.target.checked)}
                                                    className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300"
                                                />
                                                Enable Daily Reminders (9 AM)
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function App() {
    const [cards, setCards] = useState(() => {
        const savedCards = localStorage.getItem('flashcards');
        return savedCards ? JSON.parse(savedCards) : [];
    });
    const [currentView, setCurrentView] = useState('dashboard');
    const [darkMode, setDarkMode] = useState(false);
    const [currentFilter, setCurrentFilter] = useState('all');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [lastDeletedCard, setLastDeletedCard] = useState(null);
    const [showUndoDelete, setShowUndoDelete] = useState(false);
    const [autoAdvanceTimer, setAutoAdvanceTimer] = useState(() => {
        const saved = localStorage.getItem('autoAdvanceTimer');
        return saved || '0';
    });
    // Add review session statistics state
    const [reviewStats, setReviewStats] = useState({
        totalCorrect: 0,
        totalIncorrect: 0
    });

    useEffect(() => {
        localStorage.setItem('flashcards', JSON.stringify(cards));
    }, [cards]);

    // Utility function for spaced repetition algorithm (SuperMemo 2)
    const calculateNextReview = (difficulty) => {
        const now = new Date();
        let days;
        let newLevel;
        
        switch(difficulty) {
            case 1: // Hard
                days = 1;
                newLevel = 'Hard';
                break;
            case 2: // Medium
                days = 3;
                newLevel = 'Intermediate';
                break;
            case 3: // Easy
                days = 5;
                newLevel = 'Easy';
                break;
            default:
                days = 1;
                newLevel = 'Hard';
        }
        
        now.setDate(now.getDate() + days);
        return { nextDate: now, level: newLevel };
    };

    const addCard = (topic, front, back) => {
        const newCard = {
            id: Date.now(),
            topic,
            front,
            back,
            lastReviewed: null,
            nextReviewDate: new Date(),
            difficulty: 1,
            reviewCount: 0,
            level: 'Easy'
        };
        setCards([...cards, newCard]);
    };

    const updateCardDifficulty = (cardId, difficulty) => {
        const { nextDate, level } = calculateNextReview(difficulty);
        setCards(prevCards => prevCards.map(card => {
            if (card.id === cardId) {
                return {
                    ...card,
                    difficulty,
                    level,
                    lastReviewed: new Date(),
                    nextReviewDate: nextDate,
                    reviewCount: card.reviewCount + 1
                };
            }
            return card;
        }));
    };

    // Add more predefined cards to each set
    const addPredefinedCards = () => {
        Object.entries(PREDEFINED_SETS).forEach(([topic, cardSet]) => {
            cardSet.forEach(card => {
                const newCard = {
                    id: Date.now() + Math.random(),
                    topic,
                    front: card.front,
                    back: card.back,
                    lastReviewed: null,
                    nextReviewDate: new Date(),
                    difficulty: 1,
                    reviewCount: 0,
                    level: card.difficulty
                };
                setCards(prevCards => [...prevCards, newCard]);
            });
        });
    };

    const getFilteredCards = () => {
        let filtered = [...cards];
        
        if (selectedTopic) {
            filtered = filtered.filter(card => card.topic === selectedTopic);
        }
        
        if (currentFilter !== 'all') {
            filtered = filtered.filter(card => card.level === currentFilter);
        }
        
        return filtered;
    };

    const getDueCards = () => {
        const now = new Date();
        return getFilteredCards().filter(card => new Date(card.nextReviewDate) <= now);
    };

    const deleteCard = (cardId) => {
        const cardToDelete = cards.find(card => card.id === cardId);
        setCards(prevCards => prevCards.filter(card => card.id !== cardId));
        setLastDeletedCard(cardToDelete);
        setShowUndoDelete(true);
        
        // Hide undo message after 5 seconds
        setTimeout(() => {
            setShowUndoDelete(false);
            setLastDeletedCard(null);
        }, 5000);
    };

    const undoDelete = () => {
        if (lastDeletedCard) {
            setCards(prevCards => [...prevCards, lastDeletedCard]);
            setLastDeletedCard(null);
            setShowUndoDelete(false);
        }
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
                <Navbar 
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    autoAdvanceTimer={autoAdvanceTimer}
                    setAutoAdvanceTimer={setAutoAdvanceTimer}
                />
                
                {/* Hero Section - Only shown on dashboard */}
                {currentView === 'dashboard' && (
                    <div className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="container mx-auto px-4 max-w-3xl">
                            <div className="max-w-2xl mx-auto text-center">
                                <h1 className={`text-2xl font-bold mb-3 mt-5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Recall Master with Smart Flashcards
                                </h1>
                                <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Enhance your learning with spaced repetition and intelligent card tracking
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="pt-20 container mx-auto px-4 py-8">
                    {/* Undo Delete Message */}
                    {showUndoDelete && (
                        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4 z-50">
                            <span>Card deleted</span>
                            <button
                                onClick={undoDelete}
                                className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                                Undo
                            </button>
                        </div>
                    )}

                    <nav className="mb-8">
                        <ul className="flex space-x-4">
                            <li>
                                <button 
                                    onClick={() => {
                                        setCurrentView('dashboard');
                                        setCurrentFilter('all');
                                        setSelectedTopic(null);
                                    }}
                                    className={`px-4 py-2 rounded ${currentView === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                                >
                                    Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => setCurrentView('create')}
                                    className={`px-4 py-2 rounded ${currentView === 'create' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                                >
                                    Create Card
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => setCurrentView('review')}
                                    className={`px-4 py-2 rounded ${currentView === 'review' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700'}`}
                                >
                                    Review ({getDueCards().length})
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => setCurrentView('stats')}
                                    className={`px-4 py-2 rounded ${currentView === 'stats' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700'}`}
                                >
                                    Stats
                                </button>
                            </li>
                        </ul>
                    </nav>

                    <main className="fade-in">
                        {currentView === 'dashboard' && (
                            <Dashboard 
                                cards={cards}
                                setCards={setCards}
                                predefinedSets={PREDEFINED_SETS}
                                setSelectedTopic={setSelectedTopic}
                                currentFilter={currentFilter}
                                setCurrentFilter={setCurrentFilter}
                                onDeleteCard={deleteCard}
                                selectedTopic={selectedTopic}
                                darkMode={darkMode}
                            />
                        )}
                        {currentView === 'create' && <CreateCard onAdd={addCard} darkMode={darkMode} />}
                        {currentView === 'review' && (
                            <ReviewCards 
                                cards={getDueCards()} 
                                onUpdateDifficulty={updateCardDifficulty}
                                onDeleteCard={deleteCard}
                                reviewStats={reviewStats}
                                onUpdateReviewStats={(stats) => setReviewStats(stats)}
                                onFinish={() => {
                                    setCurrentView('dashboard');
                                    setCurrentFilter('all');
                                }}
                                darkMode={darkMode}
                                autoAdvanceTimer={parseInt(autoAdvanceTimer)}
                            />
                        )}
                        {currentView === 'stats' && <Stats cards={cards} darkMode={darkMode} />}
                    </main>
                </div>
            </div>
        </div>
    );
}

function SearchBar({ onSearch, onFilterChange, currentFilter, darkMode }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (value) => {
        setSearchTerm(value);
        onSearch(value, [], selectedDifficulties);
    };

    const handleDifficultyChange = (difficulty) => {
        const newDifficulties = selectedDifficulties.includes(difficulty)
            ? selectedDifficulties.filter(d => d !== difficulty)
            : [...selectedDifficulties, difficulty];
        setSelectedDifficulties(newDifficulties);
        onSearch(searchTerm, [], newDifficulties);
    };

    return (
        <div className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search cards..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border ${
                            darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                    />
                    <svg
                        className={`absolute right-3 top-2.5 h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                        darkMode
                            ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                    </svg>
                    Filters
                    {selectedDifficulties.length > 0 && (
                        <span className={`px-2 py-0.5 text-sm rounded-full ${
                            darkMode ? 'bg-blue-500' : 'bg-blue-100 text-blue-800'
                        }`}>
                            {selectedDifficulties.length}
                        </span>
                    )}
                </button>
            </div>

            {showFilters && (
                <div className={`p-4 rounded-lg mb-4 ${
                    darkMode ? 'bg-gray-700' : 'bg-white'
                } shadow-lg`}>
                    <div>
                        <h3 className="font-bold mb-2">Difficulty</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Easy', 'Intermediate', 'Hard'].map(difficulty => (
                                <button
                                    key={difficulty}
                                    onClick={() => handleDifficultyChange(difficulty)}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        selectedDifficulties.includes(difficulty)
                                            ? difficulty === 'Easy'
                                                ? 'bg-green-500 text-white'
                                                : difficulty === 'Intermediate'
                                                    ? 'bg-yellow-500 text-white'
                                                    : 'bg-red-500 text-white'
                                            : darkMode
                                                ? 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {difficulty}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ImportExport({ cards, setCards, darkMode }) {
    const handleExport = () => {
        const exportData = {
            cards,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `flashcards_export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importData = JSON.parse(e.target.result);
                    if (importData.cards && Array.isArray(importData.cards)) {
                        // Validate each card
                        const validCards = importData.cards.filter(card => 
                            card.front && card.back && card.topic &&
                            ['Easy', 'Intermediate', 'Hard'].includes(card.level)
                        );
                        
                        // Add unique IDs to imported cards
                        const importedCards = validCards.map(card => ({
                            ...card,
                            id: Date.now() + Math.random()
                        }));

                        setCards(prevCards => [...prevCards, ...importedCards]);
                        alert(`Successfully imported ${importedCards.length} cards`);
                    } else {
                        alert('Invalid file format. Please check your JSON file.');
                    }
                } catch (error) {
                    alert('Error importing cards. Please check your file format.');
                    console.error('Import error:', error);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg mb-8`}>
            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Import/Export Cards
            </h2>
            <div className="flex flex-wrap gap-4">
                <div>
                    <button
                        onClick={handleExport}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                            darkMode
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white transition-colors`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Export Cards
                    </button>
                    <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Download all cards as JSON
                    </p>
                </div>
                <div>
                    <label className={`px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                        darkMode
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-green-500 hover:bg-green-600'
                        } text-white transition-colors`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l4-4m0 0l-4-4m4 4H8" />
                        </svg>
                        Import Cards
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            className="hidden"
                        />
                    </label>
                    <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Import cards from JSON file
                    </p>
                </div>
            </div>
        </div>
    );
}

function AlertCard({ message, onConfirm, onCancel, darkMode }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl`}>
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className={`mt-4 text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Remove Set</h3>
                    <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{message}</p>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className={`px-4 py-2 rounded-md ${
                            darkMode 
                                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

function Dashboard({ cards, setCards, predefinedSets, setSelectedTopic, currentFilter, setCurrentFilter, onDeleteCard, selectedTopic, darkMode }) {
    const [importedTopics, setImportedTopics] = useState(() => {
        const saved = localStorage.getItem('importedTopics');
        return saved ? JSON.parse(saved) : [];
    });
    const [favoriteTopics, setFavoriteTopics] = useState(() => {
        const saved = localStorage.getItem('favoriteTopics');
        return saved ? JSON.parse(saved) : [];
    });
    const [carouselPositions, setCarouselPositions] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [topicToRemove, setTopicToRemove] = useState(null);

    // Save favorites to localStorage when they change
    useEffect(() => {
        localStorage.setItem('favoriteTopics', JSON.stringify(favoriteTopics));
    }, [favoriteTopics]);

    const toggleFavorite = (topic) => {
        setFavoriteTopics(prev => {
            if (prev.includes(topic)) {
                return prev.filter(t => t !== topic);
            } else {
                return [...prev, topic];
            }
        });
    };

    // Group cards by topic and apply filters
    const groupedCards = cards.reduce((acc, card) => {
        // Apply search filter
        if (searchTerm && !card.front.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !card.back.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !card.topic.toLowerCase().includes(searchTerm.toLowerCase())) {
            return acc;
        }

        // Apply category filter
        if (selectedCategories.length > 0) {
            const cardCategory = Object.keys(CATEGORIES).find(category =>
                Object.keys(CATEGORIES[category]).some(topic => card.topic === topic)
            );
            if (!selectedCategories.includes(cardCategory)) {
                return acc;
            }
        }

        // Apply difficulty filter
        if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(card.level)) {
            return acc;
        }

        // Apply current filter (if not overridden by advanced filters)
        if (currentFilter !== 'all' && selectedDifficulties.length === 0 && card.level !== currentFilter) {
            return acc;
        }
        
        if (!acc[card.topic]) {
            acc[card.topic] = [];
        }
        acc[card.topic].push(card);
        return acc;
    }, {});

    const handleImportSet = (topic, category) => {
        if (!importedTopics.includes(topic)) {
            const topicData = Object.values(CATEGORIES)
                .flatMap(categoryData => Object.entries(categoryData))
                .find(([name]) => name === topic);

            if (topicData && topicData[1]) {
                const newCards = topicData[1].cards.map(card => ({
                    id: Date.now() + Math.random(),
                    topic,
                    front: card.front,
                    back: card.back,
                    lastReviewed: null,
                    nextReviewDate: new Date(),
                    difficulty: 1,
                    reviewCount: 0,
                    level: card.difficulty
                }));
                setCards(prevCards => [...prevCards, ...newCards]);
                setImportedTopics(prev => [...prev, topic]);
                localStorage.setItem('importedTopics', JSON.stringify([...importedTopics, topic]));
            }
        }
    };

    const handleExportSet = (topic) => {
        setTopicToRemove(topic);
        setShowAlert(true);
    };

    const confirmRemoveSet = () => {
        if (topicToRemove) {
            setCards(prevCards => prevCards.filter(card => card.topic !== topicToRemove));
            setImportedTopics(prev => prev.filter(t => t !== topicToRemove));
            localStorage.setItem('importedTopics', JSON.stringify(importedTopics.filter(t => t !== topicToRemove)));
            setShowAlert(false);
            setTopicToRemove(null);
        }
    };

    const handleCarouselMove = (topic, direction) => {
        const totalCards = groupedCards[topic].length;
        const maxPosition = Math.max(0, totalCards - 3);
        
        setCarouselPositions(prev => ({
            ...prev,
            [topic]: Math.max(0, Math.min(maxPosition, (prev[topic] || 0) + direction))
        }));
    };

    const handleSearch = (term, categories, difficulties) => {
        setSearchTerm(term);
        setSelectedCategories(categories);
        setSelectedDifficulties(difficulties);
    };

    return (
        <div className="space-y-8">
            {/* SearchBar component */}
            <SearchBar
                onSearch={handleSearch}
                onFilterChange={setCurrentFilter}
                currentFilter={currentFilter}
                darkMode={darkMode}
            />
            
            {/* Filter Section */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Cards</h2>
                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={() => setCurrentFilter('all')}
                        className={`px-4 py-2 rounded transition-colors ${
                            currentFilter === 'all' 
                                ? 'bg-blue-500 text-white' 
                                : darkMode 
                                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setCurrentFilter('Easy')}
                        className={`px-4 py-2 rounded transition-colors ${
                            currentFilter === 'Easy'
                                ? darkMode ? 'bg-[#253928] text-green-200' : 'bg-green-500 text-white'
                                : darkMode
                                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Easy
                    </button>
                    <button
                        onClick={() => setCurrentFilter('Intermediate')}
                        className={`px-4 py-2 rounded transition-colors ${
                            currentFilter === 'Intermediate'
                                ? darkMode ? 'bg-[#1d3449] text-blue-200' : 'bg-yellow-500 text-white'
                                : darkMode
                                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Intermediate
                    </button>
                    <button
                        onClick={() => setCurrentFilter('Hard')}
                        className={`px-4 py-2 rounded transition-colors ${
                            currentFilter === 'Hard'
                                ? darkMode ? 'bg-[#351e3b] text-red-200' : 'bg-red-500 text-white'
                                : darkMode
                                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Hard
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${
                        darkMode 
                            ? 'bg-gray-700 border border-gray-600' 
                            : 'bg-white border border-gray-200'
                    }`}>
                        <h3 className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            Total Cards
                        </h3>
                        <p className={`text-2xl font-bold ${
                            darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            {currentFilter === 'all' 
                                ? cards.length 
                                : cards.filter(card => card.level === currentFilter).length}
                        </p>
                    </div>
                    <div className={`p-4 rounded-lg ${
                        darkMode 
                            ? 'bg-gray-700 border border-gray-600' 
                            : 'bg-white border border-gray-200'
                    }`}>
                        <h3 className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            Total Topics
                        </h3>
                        <p className={`text-2xl font-bold ${
                            darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            {Object.keys(groupedCards).length}
                        </p>
                    </div>
                </div>
            </div>

            {/* My Cards Section - Grouped by Topic with Carousel */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Cards</h2>
                {Object.entries(groupedCards).map(([topic, topicCards]) => {
                    const startIdx = carouselPositions[topic] || 0;
                    const visibleCards = topicCards.slice(startIdx, startIdx + 3);
                    
                    return (
                        <div key={topic} className={`mb-8 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-2">
                                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {topic} ({topicCards.length} cards)
                                    </h3>
                                    <button
                                        onClick={() => toggleFavorite(topic)}
                                        className="focus:outline-none"
                                    >
                                        {favoriteTopics.includes(topic) ? '❤️' : '🤍'}
                                    </button>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {topicCards.length > 3 && (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleCarouselMove(topic, -1)}
                                                className={`p-2 rounded-full ${
                                                    darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                } ${startIdx === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={startIdx === 0}
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleCarouselMove(topic, 1)}
                                                className={`p-2 rounded-full ${
                                                    darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                } ${startIdx >= topicCards.length - 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={startIdx >= topicCards.length - 3}
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    {importedTopics.includes(topic) && (
                                        <button
                                            onClick={() => handleExportSet(topic)}
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                darkMode ? 'bg-red-900 text-red-100 hover:bg-red-800' : 'bg-red-100 text-red-600 hover:bg-red-200'
                                            }`}
                                        >
                                            Remove Set
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {visibleCards.map(card => (
                                    <div key={card.id} className={`p-4 border rounded-lg hover:shadow-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className={`px-2 py-1 text-sm rounded ${darkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'}`}>
                                                    {card.topic}
                                                </span>
                                                <span className={`ml-2 px-2 py-1 text-sm rounded ${
                                                    card.level === 'Easy' ? 
                                                        darkMode ? 'bg-[#253928] text-green-200' : 'bg-green-100 text-green-800' :
                                                    card.level === 'Intermediate' ? 
                                                        darkMode ? 'bg-[#1d3449] text-blue-200' : 'bg-yellow-100 text-yellow-800' :
                                                        darkMode ? 'bg-[#351e3b] text-red-200' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {card.level}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => onDeleteCard(card.id)}
                                                className="text-red-500 hover:text-red-700"
                                                title="Delete card"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className={`mt-2 line-clamp-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{card.front}</p>
                                        <div className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Next review: {new Date(card.nextReviewDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Browse Sets Section with Categories */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Browse Sets</h2>
                
                {/* Category Navigation */}
                <div className="mb-6">
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                                selectedCategory === 'all'
                                    ? 'bg-blue-500 text-white'
                                    : darkMode
                                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            All Categories
                        </button>
                        {Object.keys(CATEGORIES).map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-blue-500 text-white'
                                        : darkMode
                                            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(CATEGORIES).map(([category, topics]) => {
                        if (selectedCategory !== 'all' && selectedCategory !== category) return null;
                        
                        return Object.entries(topics).map(([topic, data]) => (
                            <div 
                                key={`${category}-${topic}`}
                                className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
                                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                                }`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center space-x-2">
                                        <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {data.emoji} {topic}
                                        </h3>
                                        <button
                                            onClick={() => toggleFavorite(topic)}
                                            className="focus:outline-none"
                                        >
                                            {favoriteTopics.includes(topic) ? '❤️' : '🤍'}
                                        </button>
                                    </div>
                                    {!importedTopics.includes(topic) ? (
                                        <button
                                            onClick={() => handleImportSet(topic, category)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600"
                                        >
                                            Add Set
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleExportSet(topic)}
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                darkMode ? 'bg-red-900 text-red-100 hover:bg-red-800' : 'bg-red-100 text-red-600 hover:bg-red-200'
                                            }`}
                                        >
                                            Remove Set
                                        </button>
                                    )}
                                </div>
                                <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {data.cards.length} cards
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Easy', 'Intermediate', 'Hard'].map(difficulty => {
                                        const count = data.cards.filter(card => card.difficulty === difficulty).length;
                                        if (count === 0) return null;
                                        return (
                                            <span 
                                                key={difficulty}
                                                className={`text-xs px-2 py-1 rounded ${
                                                    difficulty === 'Easy' ? 
                                                        darkMode ? 'bg-[#253928] text-green-200' : 'bg-green-100 text-green-800' :
                                                    difficulty === 'Intermediate' ? 
                                                        darkMode ? 'bg-[#1d3449] text-blue-200' : 'bg-yellow-100 text-yellow-800' :
                                                        darkMode ? 'bg-[#351e3b] text-red-200' : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {difficulty}: {count}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        ));
                    })}
                </div>
            </div>

            {showAlert && (
                <AlertCard
                    message={`Are you sure you want to remove all cards from "${topicToRemove}"? This action cannot be undone.`}
                    onConfirm={confirmRemoveSet}
                    onCancel={() => {
                        setShowAlert(false);
                        setTopicToRemove(null);
                    }}
                    darkMode={darkMode}
                />
            )}
        </div>
    );
}

function CreateCard({ onAdd, darkMode }) {
    const [topic, setTopic] = useState('');
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (topic && front && back) {
            onAdd(topic, front, back);
            setTopic('');
            setFront('');
            setBack('');
        }
    };

    return (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create New Card</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Topic:</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                            darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        required
                        placeholder="e.g., JavaScript, Python, React"
                    />
                </div>
                <div>
                    <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Front:</label>
                    <textarea
                        value={front}
                        onChange={(e) => setFront(e.target.value)}
                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                            darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        rows="3"
                        required
                    />
                </div>
                <div>
                    <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Back:</label>
                    <textarea
                        value={back}
                        onChange={(e) => setBack(e.target.value)}
                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                            darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        rows="3"
                        required
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                    Create Card
                </button>
            </form>
        </div>
    );
}

function ReviewCards({ cards: initialCards, onUpdateDifficulty, onDeleteCard, onFinish, reviewStats, onUpdateReviewStats, darkMode, autoAdvanceTimer }) {
    const [cards, setCards] = useState(initialCards);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [reviewedCards, setReviewedCards] = useState(new Set());
    const [isFinished, setIsFinished] = useState(false);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [hasUpdatedStats, setHasUpdatedStats] = useState(false);

    // Auto-advance timer effect
    useEffect(() => {
        let timer;
        if (isFlipped && autoAdvanceTimer > 0 && !isFinished) {
            timer = setTimeout(() => {
                if (currentIndex < cards.length - 1) {
                    handleAnswer(true);
                }
            }, autoAdvanceTimer * 1000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isFlipped, currentIndex, autoAdvanceTimer, isFinished]);

    useEffect(() => {
        setCards(initialCards);
        setCurrentIndex(0);
        setIsFlipped(false);
        setReviewedCards(new Set());
        setIsFinished(false);
        setWrongAnswers([]);
        setCorrectCount(0);
        setIncorrectCount(0);
        setHasUpdatedStats(false);
    }, [initialCards]);

    // Handle review stats update when session is finished
    useEffect(() => {
        if (isFinished && !hasUpdatedStats) {
            onUpdateReviewStats({
                totalCorrect: reviewStats.totalCorrect + correctCount,
                totalIncorrect: reviewStats.totalIncorrect + incorrectCount
            });
            setHasUpdatedStats(true);
        }
    }, [isFinished, hasUpdatedStats, correctCount, incorrectCount, reviewStats, onUpdateReviewStats]);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
        } else {
            setIncorrectCount(prev => prev + 1);
            setWrongAnswers(prev => [...prev, currentCard]);
        }

        // Update card review status
        setReviewedCards(prev => new Set([...prev, currentCard.id]));
        onUpdateDifficulty(currentCard.id, isCorrect ? 3 : 1);

        // Check if this is the last card
        if (currentIndex === cards.length - 1) {
            setIsFinished(true);
        } else {
            // Move to next card
            setCurrentIndex(prevIndex => prevIndex + 1);
            setIsFlipped(false);
        }
    };

    const handleFinishReview = () => {
        // Only navigate to dashboard if we're actually finished
        if (isFinished) {
            onFinish();
        }
    };

    if (cards.length === 0) {
        return (
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg text-center`}>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>No Cards Due</h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>All caught up! Check back later for more reviews.</p>
                <button
                    onClick={handleFinishReview}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    if (isFinished) {
        const finalCorrect = correctCount;
        const finalIncorrect = incorrectCount;
        const totalAnswered = finalCorrect + finalIncorrect;
        const successRate = totalAnswered > 0 ? Math.round((finalCorrect / totalAnswered) * 100) : 0;

        return (
            <div className="review-complete">
                <h2 className="text-2xl font-bold text-center mb-6">Review Complete!</h2>
                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-value text-green-500">{finalCorrect}</div>
                        <div className="stat-label">Correct</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value text-red-500">{finalIncorrect}</div>
                        <div className="stat-label">Incorrect</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value text-blue-500">{successRate}%</div>
                        <div className="stat-label">Success Rate</div>
                    </div>
                </div>

                {wrongAnswers.length > 0 && (
                    <div className="incorrect-cards mt-8">
                        <h3 className="text-xl font-semibold mb-4">Cards to Review Again:</h3>
                        <div className="space-y-4">
                            {wrongAnswers.map((card, index) => (
                                <div key={card.id} className="incorrect-card-item">
                                    <div className="font-medium text-red-800">Question {index + 1}:</div>
                                    <div className="mt-2">{card.front}</div>
                                    <div className="mt-2 text-gray-600">Answer: {card.back}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {wrongAnswers.length > 0 && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => {
                                setCards(wrongAnswers);
                                setCurrentIndex(0);
                                setIsFlipped(false);
                                setReviewedCards(new Set());
                                setIsFinished(false);
                                setWrongAnswers([]);
                                setCorrectCount(0);
                                setIncorrectCount(0);
                                setHasUpdatedStats(false);
                            }}
                            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Review Incorrect Cards ({wrongAnswers.length})
                        </button>
                    </div>
                )}
            </div>
        );
    }

    const currentCard = cards[currentIndex];
    const progress = Math.round((currentIndex / cards.length) * 100);

    return (
        <div className="max-w-4xl mx-auto">
            {/* Card */}
            <div className="card-container mb-8">
                <div 
                    className={`card ${isFlipped ? 'flipped' : ''}`}
                    onClick={() => !isFlipped && setIsFlipped(true)}
                >
                    <div className="card-inner">
                        <div className="card-front">
                            <div className="card-content">
                                {currentCard.front}
                                {!isFlipped && (
                                    <div className="flip-indicator">
                                        <span>Click to flip</span>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="card-back">
                            <div className="card-content">
                                {currentCard.back}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Answer Buttons */}
            {isFlipped && (
                <div className="flex justify-center space-x-6 fade-in">
                    <button
                        onClick={() => handleAnswer(false)}
                        className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors transform hover:scale-105"
                        title="Incorrect"
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button
                        onClick={() => handleAnswer(true)}
                        className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors transform hover:scale-105"
                        title="Correct"
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Card Counter */}
            <div className="text-center mt-6 text-gray-600">
                Card {currentIndex + 1} of {cards.length}
            </div>
        </div>
    );
}

function ProgressTracker({ cards, darkMode }) {
    const calculateStreak = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const reviewDates = cards
            .map(card => card.lastReviewed)
            .filter(date => date)
            .map(date => new Date(date))
            .sort((a, b) => b - a);
            
        if (reviewDates.length === 0) return 0;
        
        let streak = 0;
        let currentDate = today;
        
        while (true) {
            const hasReviewOnDate = reviewDates.some(date => {
                const reviewDate = new Date(date);
                return reviewDate.getFullYear() === currentDate.getFullYear() &&
                       reviewDate.getMonth() === currentDate.getMonth() &&
                       reviewDate.getDate() === currentDate.getDate();
            });
            
            if (!hasReviewOnDate) break;
            
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        }
        
        return streak;
    };

    const calculateCategoryProgress = () => {
        const progress = {};
        Object.keys(CATEGORIES).forEach(category => {
            const categoryCards = cards.filter(card => 
                Object.keys(CATEGORIES[category]).some(topic => card.topic === topic)
            );
            
            if (categoryCards.length > 0) {
                const reviewedCards = categoryCards.filter(card => card.reviewCount > 0);
                progress[category] = {
                    total: categoryCards.length,
                    reviewed: reviewedCards.length,
                    percentage: Math.round((reviewedCards.length / categoryCards.length) * 100)
                };
            }
        });
        return progress;
    };

    const streak = calculateStreak();
    const categoryProgress = calculateCategoryProgress();

    return (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Streak Card */}
            <div className="stats-card">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-700">Current Streak</h3>
                    <span className="text-yellow-500">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                    </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{streak} days</p>
            </div>

            {/* Category Progress */}
            <div className="stats-card">
                <h3 className="font-bold text-gray-700 mb-4">Category Progress</h3>
                <div className="space-y-3">
                    {Object.entries(categoryProgress).map(([category, data]) => (
                        <div key={category}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className={darkMode ? 'text-gray-700' : 'text-gray-700'}>{category}</span>
                                <span className={darkMode ? 'text-gray-700' : 'text-gray-700'}>{data.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                                    style={{ width: `${data.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Stats({ cards, darkMode }) {
    useEffect(() => {
        if (cards.length === 0) return;

        const ctx = document.getElementById('reviewChart').getContext('2d');
        const reviewData = cards.reduce((acc, card) => {
            const date = card.lastReviewed ? new Date(card.lastReviewed).toLocaleDateString() : null;
            if (date) {
                acc[date] = (acc[date] || 0) + 1;
            }
            return acc;
        }, {});

        const sortedDates = Object.keys(reviewData).sort((a, b) => new Date(a) - new Date(b));
        const last7Dates = sortedDates.slice(-7);
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Dates,
                datasets: [{
                    label: 'Reviews per Day',
                    data: last7Dates.map(date => reviewData[date]),
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }, [cards]);

    const calculateStats = () => {
        const totalReviews = cards.reduce((sum, card) => sum + card.reviewCount, 0);
        const averageReviews = (totalReviews / cards.length || 0).toFixed(1);
        const masteredCards = cards.filter(card => card.level === 'Easy').length;
        const masteredPercentage = Math.round((masteredCards / cards.length) * 100) || 0;

        return {
            totalReviews,
            averageReviews,
            masteredCards,
            masteredPercentage
        };
    };

    const stats = calculateStats();

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-900' : 'text-gray-900'}`}>Learning Analytics</h2>
            
            {/* Progress Tracker */}
            <ProgressTracker cards={cards} darkMode={darkMode} />
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="stats-card">
                    <h3 className="font-bold text-gray-700">Total Reviews</h3>
                    <p className={`text-2xl ${darkMode ? 'text-gray-900' : 'text-gray-900'}`}>{stats.totalReviews}</p>
                </div>
                <div className="stats-card">
                    <h3 className="font-bold text-gray-700">Avg Reviews/Card</h3>
                    <p className={`text-2xl ${darkMode ? 'text-gray-900' : 'text-gray-900'}`}>{stats.averageReviews}</p>
                </div>
                <div className="stats-card">
                    <h3 className="font-bold text-gray-700">Mastered Cards</h3>
                    <p className={`text-2xl ${darkMode ? 'text-gray-900' : 'text-gray-900'}`}>{stats.masteredCards}</p>
                </div>
                <div className="stats-card">
                    <h3 className="font-bold text-gray-700">Mastery Rate</h3>
                    <p className={`text-2xl ${darkMode ? 'text-gray-900' : 'text-gray-900'}`}>{stats.masteredPercentage}%</p>
                </div>
            </div>

            {/* Chart container */}
            <div className="chart-container">
                <h3 className="font-bold text-gray-700 mb-4">Review History (Last 7 Days)</h3>
                <canvas id="reviewChart"></canvas>
            </div>
        </div>
    );
}

// Update the render method at the bottom of the file
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); 