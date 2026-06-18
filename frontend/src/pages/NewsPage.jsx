import { useState, useEffect, useRef } from 'react';
import '@/styles/NewsPage.css';

function NewsPostCard({ post, formatDate }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <article className="news-post-card">
            {post.picture && (
                <img 
                    src={post.picture.startsWith('data:') ? post.picture : `data:image/jpeg;base64,${post.picture}`} 
                    alt={post.title} 
                    className="news-post-image" 
                />
            )}
            <h2 className="news-post-title">{post.title}</h2>
            <small className="news-post-date">
                Published: {formatDate(post.created_at)}
            </small>
            
            <p className="news-post-summary">
                {post.summary}
            </p>
            
            {isExpanded && (
                <p className="news-post-body">
                    {post.body}
                </p>
            )}

            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="news-post-toggle-btn"
            >
                {isExpanded ? 'Read Less ▲' : 'Read More ▼'}
            </button>
        </article>
    );
}

export default function NewsPage() {
    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const LIMIT = 5;

    const isFetching = useRef(false);

    const fetchNewsData = async (currentOffset) => {
        if (isFetching.current || !hasMore) return;
        isFetching.current = true;
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8000/api/news?limit=${LIMIT}&offset=${currentOffset}`);
            if (response.ok) {
                const data = await response.json();
                
                if (data && Array.isArray(data.posts)) {
                    if (data.posts.length < LIMIT) {
                        setHasMore(false);
                    }
                    setPosts(prevPosts => [...prevPosts, ...data.posts]);
                }
            }
        } catch (error) {
            console.error("Error fetching news items:", error);
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    };

    useEffect(() => {
        fetchNewsData(offset);
    }, [offset]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            if (docHeight - (scrollTop + windowHeight) < 100) {
                if (hasMore && !isFetching.current) {
                    setOffset(prevOffset => prevOffset + LIMIT);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString + 'Z');
        if (isNaN(date.getTime())) return 'Unknown Date';
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="news-page-container">
            <h1 className="news-page-title">Latest News</h1>
            
            <div className="news-feed-list">
                {posts.map((post) => (
                    <NewsPostCard 
                        key={post.id} 
                        post={post} 
                        formatDate={formatDate} 
                    />
                ))}
            </div>

            <div className="news-feed-status">
                {loading && <p>Loading older entries...</p>}
                {!hasMore && posts.length > 0 && <p>You have caught up with all the news!</p>}
                {!loading && posts.length === 0 && <p>No news posts available at this time.</p>}
            </div>
        </div>
    );
}