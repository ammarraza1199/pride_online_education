import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import CourseLayout from '../components/CourseLayout';
import NotFound from './NotFound';
import { getDefaultCourseBySlug } from '../data/defaultCourses';

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const q = query(collection(db, 'courses'), where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          const fallback = getDefaultCourseBySlug(slug);
          if (fallback) {
            setCourse(fallback);
          } else {
            setError(true);
          }
        } else {
          setCourse({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
        }
      } catch (err) {
        console.warn("Error fetching course from Firestore, checking fallback:", err?.message || err);
        const fallback = getDefaultCourseBySlug(slug);
        if (fallback) {
          setCourse(fallback);
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-red rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !course) {
    return <NotFound />;
  }

  return <CourseLayout {...course} />;
};

export default CourseDetail;
