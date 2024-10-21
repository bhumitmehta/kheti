import React, { useEffect, useState } from 'react';

const ChatbotPage = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Handle message submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userInput) return alert('Please enter a question');

        // Add user message to chat
        const userMessage = { type: 'user', text: userInput };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        setLoading(true);

        try {
            // Call the Flask API
            const response = await fetch('http://localhost:5000/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: userInput }),
            });

            const data = await response.json();
            if (response.ok) {
                // Add bot response to chat
                const botMessage = { type: 'bot', text: data.response };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } else {
                throw new Error(data.error || 'Error fetching response');
            }
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = { type: 'bot', text: 'Error: Unable to get response' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }

        setUserInput('');
        setLoading(false);
    };

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <h1 className='text-3xl font-bold mb-6'>Chatbot</h1>

            {/* Chat messages display */}
            <div className='mb-4 border rounded-lg p-4 h-80 overflow-y-auto'>
                {messages.map((message, index) => (
                    <div key={index} className={`mb-2 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <p className={`inline-block px-3 py-2 rounded-md ${message.type === 'user' ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'}`}>
                            {message.text}
                        </p>
                    </div>
                ))}
            </div>

            {/* Input form for user queries */}
            <form onSubmit={handleSubmit} className='flex'>
                <input
                    type='text'
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className='flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                    placeholder='Type your question...'
                />
                <button
                    type='submit'
                    className={`px-4 py-2 font-semibold text-white bg-green-600 rounded-r-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    );
};

export default ChatbotPage;
