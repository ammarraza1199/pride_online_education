import React, { useState, useEffect } from 'react';
import { Users, FileText, BookOpen, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { collection, getCountFromServer, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [courseCount, setCourseCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [queryCount, setQueryCount] = useState(0);
  const [recentQueries, setRecentQueries] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const coursesSnap = await getCountFromServer(collection(db, 'courses'));
        setCourseCount(coursesSnap.data().count);
        
        const blogsSnap = await getCountFromServer(collection(db, 'blogs'));
        setBlogCount(blogsSnap.data().count);
        
        const queriesQuery = query(collection(db, 'queries'), where('status', '==', 'unread'));
        const queriesSnap = await getCountFromServer(queriesQuery);
        setQueryCount(queriesSnap.data().count);
        
        // Fetch 5 most recent queries
        const recentQQuery = query(collection(db, 'queries'), orderBy('createdAt', 'desc'), limit(5));
        const recentQSnap = await getDocs(recentQQuery);
        setRecentQueries(recentQSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { title: 'Total Courses', value: courseCount, icon: <BookOpen className="text-blue-500" size={32} /> },
    { title: 'Published Blogs', value: blogCount, icon: <FileText className="text-green-500" size={32} /> },
    { title: 'Unread Queries', value: queryCount, icon: <MessageSquare className="text-red-500" size={32} /> },
    { title: 'Active Students', value: '0', icon: <Users className="text-purple-500" size={32} /> },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-full">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Student Queries</h3>
            <Link to="/admin/queries" className="text-sm text-indigo-600 hover:text-indigo-900 font-medium">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentQueries.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No recent queries found.</td>
                  </tr>
                ) : (
                  recentQueries.map((q) => (
                    <tr key={q.id} className={q.status === 'unread' ? 'bg-blue-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{q.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[150px]">{q.course}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{q.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {q.status === 'unread' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            Unread
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Read
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome to Pride Online Admin Panel</h2>
          <p className="text-gray-600">
            This dashboard allows you to manage the dynamic content of your website.
            Use the sidebar navigation to create blogs, update course details, or review student queries.
            Dashboard statistics are now live and reflecting your actual database!
          </p>
        </div>
      </div>
    </div>
  );
}
