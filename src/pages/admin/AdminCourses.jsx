import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Trash2, Edit, Plus, X, Image as ImageIcon } from 'lucide-react';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  
  // Card & Basic Info Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('IT'); // 'IT', 'PG', 'UG'
  const [description, setDescription] = useState('');
  const [routeSlug, setRouteSlug] = useState(''); // e.g. /python-course
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  
  // Full Page Details Form State
  const [metaDescription, setMetaDescription] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [courseDetails, setCourseDetails] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [duration, setDuration] = useState('');
  const [universityInfo, setUniversityInfo] = useState('');
  const [faqs, setFaqs] = useState([]); // Array of { question, answer }
  
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'courses'), orderBy('category', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(list);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error in AdminCourses: ", error);
      alert("Failed to load courses. Please check Firestore Database rules and ensure it is created.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setTitle('');
    setCategory('IT');
    setDescription('');
    setRouteSlug('');
    setImage(null);
    setImageUrl('');
    setMetaDescription('');
    setHeroSubtitle('');
    setCourseDetails('');
    setEligibility('');
    setDuration('');
    setUniversityInfo('');
    setFaqs([]);
    setIsEditing(false);
    setCurrentCourseId(null);
  };

  const handleEdit = (course) => {
    setTitle(course.title || '');
    setCategory(course.category || 'IT');
    setDescription(course.description || '');
    setRouteSlug(course.to || '');
    setImageUrl(course.image || '');
    
    // Load full details if they exist
    setMetaDescription(course.metaDescription || '');
    setHeroSubtitle(course.heroSubtitle || '');
    setCourseDetails(course.courseDetails || '');
    setEligibility(course.eligibility || '');
    setDuration(course.duration || '');
    setUniversityInfo(course.universityInfo || '');
    setFaqs(course.faqs || []);
    
    setCurrentCourseId(course.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteDoc(doc(db, 'courses', id));
      } catch (error) {
        console.error("Error deleting course: ", error);
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0])); // preview
    }
  };

  const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
  const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));
  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      let finalImageUrl = imageUrl;
      
      // Upload new image if selected
      if (image) {
        const imageRef = ref(storage, `courses/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        finalImageUrl = await getDownloadURL(imageRef);
      }

      const cleanSlug = routeSlug.startsWith('/') ? routeSlug.substring(1) : routeSlug;

      const courseData = {
        title,
        category,
        description,
        to: routeSlug,
        slug: cleanSlug,
        image: finalImageUrl,
        metaDescription,
        heroSubtitle,
        courseDetails,
        eligibility,
        duration,
        universityInfo,
        faqs,
        updatedAt: serverTimestamp()
      };

      if (currentCourseId) {
        // Update existing
        await updateDoc(doc(db, 'courses', currentCourseId), courseData);
      } else {
        // Create new
        await addDoc(collection(db, 'courses'), {
          ...courseData,
          createdAt: serverTimestamp()
        });
      }
      
      resetForm();
    } catch (error) {
      console.error("Error saving course: ", error);
      alert("Failed to save course.");
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
        <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-primary-blue text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
          >
            <Plus size={20} /> Add New Course
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-primary-blue">{currentCourseId ? 'Edit Course' : 'Add New Course'}</h2>
            <button onClick={resetForm} className="text-gray-500 hover:text-red-500 bg-gray-100 p-2 rounded-full">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Card Info */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-lg font-bold text-primary-blue mb-4 flex items-center gap-2">
                <span className="bg-primary-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span> 
                Card Display Details (Home / Category Pages)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Category</label>
                  <select 
                    value={category} onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary-blue focus:border-primary-blue"
                  >
                    <option value="IT">IT Course</option>
                    <option value="UG">Undergraduate (UG)</option>
                    <option value="PG">Postgraduate (PG)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Determines which page this card appears on.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Path / URL Slug</label>
                  <input 
                    type="text" required placeholder="e.g. /python-course"
                    value={routeSlug} onChange={(e) => setRouteSlug(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary-blue focus:border-primary-blue"
                  />
                  <p className="text-xs text-gray-500 mt-1">Where the user goes when they click the card.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                  <input 
                    type="text" required
                    value={title} onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary-blue focus:border-primary-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image</label>
                  <div className="flex items-center gap-4">
                    {imageUrl && (
                      <img src={imageUrl} alt="Thumbnail Preview" className="h-12 w-12 object-cover rounded border" />
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                      <ImageIcon size={20} />
                      <span>{imageUrl ? 'Change Image' : 'Upload Image'}</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (Appears on Card)</label>
                <textarea 
                  required rows="2"
                  value={description} onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary-blue focus:border-primary-blue"
                ></textarea>
              </div>
            </div>

            {/* Section 2: Full Page Details */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span> 
                Full Page Content (Course Details Page)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                  <textarea 
                    rows="2" placeholder="e.g. Master the world's most popular programming language."
                    value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary-blue focus:border-primary-blue"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SEO Meta Description</label>
                  <textarea 
                    rows="2" placeholder="Appears in Google search results."
                    value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary-blue focus:border-primary-blue"
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input 
                    type="text" placeholder="e.g. 3 Months, 3 Years"
                    value={duration} onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary-blue focus:border-primary-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                  <input 
                    type="text" placeholder="e.g. 10+2 from recognized board"
                    value={eligibility} onChange={(e) => setEligibility(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary-blue focus:border-primary-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">University / Certification Info</label>
                  <input 
                    type="text" placeholder="e.g. UGC-DEB Recognized"
                    value={universityInfo} onChange={(e) => setUniversityInfo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary-blue focus:border-primary-blue"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Course Content</label>
                <div className="h-64 mb-12 bg-white">
                  <ReactQuill 
                    theme="snow" 
                    value={courseDetails} 
                    onChange={setCourseDetails} 
                    modules={modules}
                    className="h-full"
                  />
                </div>
              </div>

              {/* FAQs Section */}
              <div className="border-t border-gray-300 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-bold text-gray-800">Frequently Asked Questions (FAQs)</h4>
                  <button 
                    type="button" onClick={addFaq}
                    className="flex items-center gap-1 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                  >
                    <Plus size={16} /> Add FAQ
                  </button>
                </div>
                
                {faqs.map((faq, index) => (
                  <div key={index} className="flex gap-4 mb-4 bg-white p-4 rounded border">
                    <div className="flex-1 space-y-3">
                      <input 
                        type="text" placeholder="Question"
                        value={faq.question} onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                      <textarea 
                        rows="2" placeholder="Answer"
                        value={faq.answer} onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      ></textarea>
                    </div>
                    <button 
                      type="button" onClick={() => removeFaq(index)}
                      className="text-red-500 hover:text-red-700 p-2 h-fit"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
                {faqs.length === 0 && <p className="text-sm text-gray-500 italic">No FAQs added yet.</p>}
              </div>
            </div>

            <div className="flex justify-end gap-4 border-t pt-6">
              <button 
                type="button" onClick={resetForm}
                className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button 
                type="submit" disabled={saving}
                className="px-8 py-2 bg-primary-red text-white rounded hover:bg-red-700 disabled:opacity-50 font-bold"
              >
                {saving ? 'Saving...' : 'Save Complete Course'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No courses found. Add one!</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.image ? (
                        <img src={course.image} alt={course.title} className="h-10 w-10 object-cover rounded" />
                      ) : (
                        <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-400">No Img</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[200px]">{course.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {course.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.to}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(course)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-900">
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
