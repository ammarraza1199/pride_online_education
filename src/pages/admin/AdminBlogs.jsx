import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Trash2, Edit, Plus, X, Image as ImageIcon } from 'lucide-react';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogList);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error in AdminBlogs: ", error);
      alert("Failed to load blogs. Please check Firestore Database rules and ensure it is created.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setContent('');
    setExcerpt('');
    setImage(null);
    setImageUrl('');
    setIsEditing(false);
    setCurrentBlogId(null);
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setSlug(blog.slug);
    setContent(blog.content);
    setExcerpt(blog.excerpt);
    setImageUrl(blog.imageUrl || '');
    setCurrentBlogId(blog.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteDoc(doc(db, 'blogs', id));
      } catch (error) {
        console.error("Error deleting blog: ", error);
      }
    }
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (!currentBlogId) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0])); // preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      let finalImageUrl = imageUrl;
      
      // Upload new image if selected
      if (image) {
        const imageRef = ref(storage, `blogs/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        finalImageUrl = await getDownloadURL(imageRef);
      }

      const blogData = {
        title,
        slug,
        content,
        excerpt,
        imageUrl: finalImageUrl,
        updatedAt: serverTimestamp()
      };

      if (currentBlogId) {
        // Update existing
        await updateDoc(doc(db, 'blogs', currentBlogId), blogData);
      } else {
        // Create new
        await addDoc(collection(db, 'blogs'), {
          ...blogData,
          createdAt: serverTimestamp()
        });
      }
      
      resetForm();
    } catch (error) {
      console.error("Error saving blog: ", error);
      alert("Failed to save blog post.");
    }
    
    setSaving(false);
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-primary-blue text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
          >
            <Plus size={20} /> Create New Post
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{currentBlogId ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
            <button onClick={resetForm} className="text-gray-500 hover:text-red-500">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                <input 
                  type="text" required
                  value={title} onChange={handleTitleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary-blue focus:border-primary-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                <input 
                  type="text" required
                  value={slug} onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary-blue focus:border-primary-blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Excerpt (Meta Description)</label>
              <textarea 
                required rows="2"
                value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary-blue focus:border-primary-blue"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
              <div className="flex items-center gap-4">
                {imageUrl && (
                  <img src={imageUrl} alt="Cover Preview" className="h-20 w-32 object-cover rounded border" />
                )}
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:bg-gray-200">
                  <ImageIcon size={20} />
                  <span>{imageUrl ? 'Change Image' : 'Upload Image'}</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <div className="h-96 mb-12">
                <ReactQuill 
                  theme="snow" 
                  value={content} 
                  onChange={setContent} 
                  modules={modules}
                  className="h-full"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 border-t pt-4">
              <button 
                type="button" onClick={resetForm}
                className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit" disabled={saving}
                className="px-6 py-2 bg-primary-red text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Publish Post'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No blog posts found. Create one!</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title & Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {blog.imageUrl ? (
                        <img src={blog.imageUrl} alt={blog.title} className="h-12 w-20 object-cover rounded" />
                      ) : (
                        <div className="h-12 w-20 bg-gray-200 rounded flex items-center justify-center text-gray-400">No Img</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-sm">{blog.title}</div>
                      <div className="text-sm text-gray-500">/{blog.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.createdAt?.toDate().toLocaleDateString() || 'Draft'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(blog)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(blog.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
