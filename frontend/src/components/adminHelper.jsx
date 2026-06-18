export async function publishNewsPost(postData) {
    try {
        const response = await fetch('http://localhost:8000/api/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            return { success: true };
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to publish the post.');
        }
    } catch (err) {
        throw new Error(err.message || 'Could not connect to the backend server.');
    }
}