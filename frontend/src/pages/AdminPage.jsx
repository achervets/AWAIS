import { useState } from 'react';
import { Link } from 'react-router-dom';
import { publishNewsPost } from '@/components/adminHelper';

export default function AdminPage() {
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        body: '',
        picture: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setStatus({ type: '', message: '' });

        const allowedTypes = ['image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            setStatus({ type: 'error', message: 'Invalid file format. Image must be a .jpg or .jpeg file.' });
            e.target.value = '';
            setFormData(prev => ({ ...prev, picture: '' }));
            return;
        }

        const maxBytes = 10 * 1024 * 1024;
        if (file.size > maxBytes) {
            setStatus({ type: 'error', message: 'File is too large. Image size cannot exceed 10 MB.' });
            e.target.value = '';
            setFormData(prev => ({ ...prev, picture: '' }));
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                picture: reader.result
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        if (!formData.title || !formData.summary || !formData.body) {
            setStatus({ type: 'error', message: 'Please fill out all text fields.' });
            return;
        }

        try {
            await publishNewsPost(formData);
            setIsSubmitted(true);
            setFormData({ title: '', summary: '', body: '', picture: '' });
        } catch (err) {
            setStatus({ 
                type: 'error', 
                message: err.message 
            });
        }
    };

    const handleResetForm = () => {
        setIsSubmitted(false);
        setStatus({ type: '', message: '' });
    };

    if (isSubmitted) {
        return (
            <div className="form-container">
                <div className="success-view">
                    <h2>Post Published Successfully!</h2>
                    <p>Your news snippet has been saved and is live on the website.</p>
                    <div className="success-buttons">
                        <button onClick={handleResetForm}>Create Another Post</button>
                        <Link to="/news">Go to News Page</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h2>Create News Post</h2>
            <form className="base-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title" style={{ fontWeight: '600', display: 'block', marginBottom: '5px' }}>
                        Post Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-input"
                        placeholder="Enter the article headline"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="picture" style={{ fontWeight: '600', display: 'block', marginBottom: '5px' }}>
                        Header Image File
                    </label>
                    <input
                        type="file"
                        id="picture"
                        accept=".jpg,.jpeg"
                        className="form-input"
                        style={{ background: 'white' }}
                        onChange={handleFileChange}
                    />
                </div>

                <div>
                    <label htmlFor="summary" style={{ fontWeight: '600', display: 'block', marginBottom: '5px' }}>
                        Short Summary
                    </label>
                    <textarea
                        id="summary"
                        name="summary"
                        rows="3"
                        className="form-textarea"
                        placeholder="Provide a brief introductory preview snippet for the dashboard grid"
                        value={formData.summary}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="body" style={{ fontWeight: '600', display: 'block', marginBottom: '5px' }}>
                        Full Article Body
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        rows="10"
                        className="form-textarea"
                        placeholder="Type or paste the complete news story contents here"
                        value={formData.body}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="form-submit-btn">
                    Publish Post
                </button>

                {status.message && (
                    <div className={`form-status ${status.type === 'success' ? 'status-success' : 'status-error'}`}>
                        {status.message}
                    </div>
                )}
            </form>
        </div>
    );
}