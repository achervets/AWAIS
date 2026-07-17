import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/NewsPage.css';

function NewsPostCard({ post, formatDate, isLoggedIn, onRefresh, isExpanded, onToggleExpand }) {
    const [isEditing, setIsEditing] = useState(false);
    
    const [editTitle, setEditTitle] = useState(post.title);
    const [editSummary, setEditSummary] = useState(post.summary);
    const [editBody, setEditBody] = useState(post.body);
    const [editPicture, setEditPicture] = useState(post.picture || "");
    const [isSaving, setIsSaving] = useState(false);

    const handleDelete = async (e) => {
        e.stopPropagation();
        const confirmDelete = window.confirm(`Are you sure you want to permanently delete "${post.title}"?`);
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8000/api/news/${post.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Post successfully deleted.");
                onRefresh();
            } else {
                const errorData = await response.json();
                alert(`Error deleting post: ${errorData.detail || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Delete request failed:", error);
            alert("Network error. Failed to delete post.");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            alert("Invalid file format. Please upload only .jpg or .jpeg images.");
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setEditPicture(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSaving(true);

        const updatedPayload = {
            title: editTitle,
            summary: editSummary,
            body: editBody,
            picture: editPicture 
        };

        try {
            const response = await fetch(`http://localhost:8000/api/news/${post.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPayload)
            });

            if (response.ok) {
                alert("Post updated successfully!");
                setIsEditing(false);
                onRefresh();
            } else {
                const errorData = await response.json();
                alert(`Error updating post: ${errorData.detail || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Update request failed:", error);
            alert("Network error. Failed to save modifications.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isEditing) {
        return (
            <article className="news-post-card editing-mode">
                <form onSubmit={handleSaveEdit} className="edit-post-form">
                    <h3>Editing Post</h3>
                    
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={editTitle} 
                        onChange={(e) => setEditTitle(e.target.value)} 
                        required 
                    />

                    <label>Summary:</label>
                    <textarea 
                        rows="2" 
                        value={editSummary} 
                        onChange={(e) => setEditSummary(e.target.value)} 
                        required 
                    />

                    <label>Body Content:</label>
                    <textarea 
                        rows="6" 
                        value={editBody} 
                        onChange={(e) => setEditBody(e.target.value)} 
                        required 
                    />

                    <label>Post Image:</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                    />
                    
                    {editPicture && (
                        <div className="edit-image-preview-container">
                            <p>Image Preview:</p>
                            <img 
                                src={editPicture.startsWith('data:') ? editPicture : `data:image/jpeg;base64,${editPicture}`} 
                                alt="Preview" 
                                className="edit-image-preview" 
                            />
                            <button 
                                type="button" 
                                className="remove-img-btn"
                                onClick={() => setEditPicture("")}
                            >
                                Remove Image
                            </button>
                        </div>
                    )}

                    <div className="edit-form-actions">
                        <button type="submit" className="save-btn" disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </article>
        );
    }

    return (
        <article className={`news-post-card ${isExpanded ? 'focused-expanded' : ''}`}>
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
                onClick={onToggleExpand} 
                className="news-post-toggle-btn"
            >
                {isExpanded ? 'Read Less ▲' : 'Read More ▼'}
            </button>

            {isLoggedIn && localStorage.getItem('token') && (
                <div className="admin-inline-actions" style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                    <button onClick={() => setIsEditing(true)} className="edit-action-btn">
                        Edit ✏️
                    </button>
                    <button onClick={handleDelete} className="delete-action-btn">
                        Delete 🗑️
                    </button>
                </div>
            )}
        </article>
    );
}

export default function NewsPage() {
    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    
    const [expandedPostId, setExpandedPostId] = useState(null);

    const navigate = useNavigate();
    const LIMIT = 5;
    const isFetching = useRef(false);

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        setIsLoggedIn(!!token);
    }, []);

    const fetchNewsData = async (currentOffset, clearExisting = false) => {
        if (isFetching.current) return;
        isFetching.current = true;
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8000/api/news?limit=${LIMIT}&offset=${currentOffset}`);
            if (response.ok) {
                const data = await response.json();
                
                if (data && Array.isArray(data.posts)) {
                    setHasMore(data.posts.length === LIMIT);
                    
                    if (clearExisting) {
                        setPosts(data.posts);
                    } else {
                        setPosts(prevPosts => [...prevPosts, ...data.posts]);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching news items:", error);
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    };

    const handleRefreshFeed = () => {
        setExpandedPostId(null);
        setOffset(0);
        fetchNewsData(0, true);
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
                if (hasMore && !loading && !isFetching.current) {
                    setOffset(prevOffset => prevOffset + LIMIT);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loading]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString + 'Z');
        if (isNaN(date.getTime())) return 'Unknown Date';
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const handleToggleExpand = (postId) => {
        setExpandedPostId(prevId => (prevId === postId ? null : postId));
    };

    return (
        <div className="news-page-container">
            <div className="news-page-header">
                <h1 className="news-page-title">Latest News</h1>
                
                {isLoggedIn && localStorage.getItem('token') && (
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate('/admin');
                        }} 
                        className="create-post-btn"
                    >
                        Create Post +
                    </button>
                )}
            </div>
            
            <div className="news-feed-list">
                {posts.map((post) => (
                    <NewsPostCard 
                        key={post.id} 
                        post={post} 
                        formatDate={formatDate}
                        isLoggedIn={isLoggedIn}
                        onRefresh={handleRefreshFeed}
                        isExpanded={expandedPostId === post.id}
                        onToggleExpand={() => handleToggleExpand(post.id)}
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