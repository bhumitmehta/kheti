import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Ensure Firebase is initialized in your project
import { collection, addDoc, getDocs } from 'firebase/firestore';



const BlogPostPage = () => {
    const [articleTitle, setArticleTitle] = useState('');
    const [articleContent, setArticleContent] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    //new
   
    //new

    
    // Fetch articles from Firebase Firestore on component mount
    useEffect(() => {
        const fetchArticles = async () => {
            const articlesCollection = collection(db, 'articles');
            const articlesSnapshot = await getDocs(articlesCollection);
            const articlesList = articlesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setArticles(articlesList);
        };
        fetchArticles();
    }, []);

    // Add new article to Firebase Firestore
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!articleTitle || !articleContent) return alert('Please fill in both fields');
        setLoading(true);

        try {

            const response = await fetch('http://localhost:5000/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: articleTitle+":"+articleContent })
            });



            // Append the string to the file
            await addDoc(collection(db, 'articles'), {
                title: articleTitle,
                content: articleContent,
                createdAt: new Date(),
            });
            setArticleTitle('');
            setArticleContent('');
            alert('Article posted successfully!');
        } catch (error) {
            console.error('Error posting article:', error);
            alert('Error posting article');
        }
        setLoading(false);
    };

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <h1 className='text-3xl font-bold mb-6'>Post a Blog Article</h1>

            {/* Form to submit a new article */}
            <form onSubmit={handleSubmit} className='mb-10'>
                <div className='mb-4'>
                    <label htmlFor='title' className='block text-xl font-medium text-gray-700'>Title</label>
                    <input
                        type='text'
                        id='title'
                        value={articleTitle}
                        onChange={(e) => setArticleTitle(e.target.value)}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                        placeholder='Enter article title'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='content' className='block text-xl font-medium text-gray-700'>Content</label>
                    <textarea
                        id='content'
                        value={articleContent}
                        onChange={(e) => setArticleContent(e.target.value)}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                        placeholder='Write your article...'
                        rows='5'
                    ></textarea>
                </div>
                <button
                    type='submit'
                    className={`px-4 py-2 font-semibold text-white bg-green-600 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                    disabled={loading}
                >
                    {loading ? 'Posting...' : 'Post Article'}
                </button>
            </form>

            {/* Displaying articles */}
            <h2 className='text-2xl font-bold mb-4'>Posted Articles</h2>
            {articles.length > 0 ? (
                <div>
                    {articles.map(article => (
                        <div key={article.id} className='mb-8 p-4 border rounded-lg shadow-sm'>
                            <h3 className='text-xl font-semibold'>{article.title}</h3>
                            <p className='text-gray-700 mt-2'>{article.content}</p>
                            <p className='text-gray-500 text-sm mt-2'>Posted on {new Date(article.createdAt.seconds * 1000).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No articles posted yet. Be the first to post!</p>
            )}
        </div>
    );
};

export default BlogPostPage;
