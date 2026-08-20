import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Trash2, CheckCircle, Clock, Search, Filter, Calendar } from 'lucide-react';

export default function AdminQueries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering & Sorting state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'contact', 'enquiry'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc', 'asc'

  useEffect(() => {
    // We listen to the 'queries' collection in real-time, fetching everything
    const q = query(collection(db, 'queries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const queryList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQueries(queryList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching queries: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const queryRef = doc(db, 'queries', id);
      await updateDoc(queryRef, {
        status: currentStatus === 'unread' ? 'read' : 'unread'
      });
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const deleteQuery = async (id) => {
    if (window.confirm('Are you sure you want to delete this query?')) {
      try {
        await deleteDoc(doc(db, 'queries', id));
      } catch (error) {
        console.error("Error deleting query: ", error);
      }
    }
  };

  // Filter and sort the queries
  const processedQueries = queries.filter(q => {
    const isContact = q.course === 'General Contact' || !q.course;
    
    // Status Filter
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    
    // Type Filter
    const matchesType = typeFilter === 'all' 
      || (typeFilter === 'contact' && isContact)
      || (typeFilter === 'enquiry' && !isContact);
      
    // Search Term
    const searchString = `${q.name} ${q.email} ${q.phone} ${q.course || ''} ${q.message || ''}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  }).sort((a, b) => {
    // Sort by Date
    const dateA = a.createdAt?.toMillis() || 0;
    const dateB = b.createdAt?.toMillis() || 0;
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div>
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Student Queries</h1>
        
        {/* Filters Section */}
        <div className="flex flex-wrap gap-3 w-full xl:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-48 text-sm"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={16} className="text-gray-400" />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="pl-9 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-sm"
            >
              <option value="all">All Types</option>
              <option value="enquiry">Course Enquiry</option>
              <option value="contact">Contact Us</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={16} className="text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-sm"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={16} className="text-gray-400" />
            </div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="pl-9 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-sm"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading queries...</div>
      ) : queries.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No queries found yet.
        </div>
      ) : processedQueries.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No queries match your current filters.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type & Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processedQueries.map((q) => {
                const isContact = q.course === 'General Contact' || !q.course;
                
                return (
                  <tr key={q.id} className={q.status === 'unread' ? 'bg-blue-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {q.createdAt?.toDate().toLocaleDateString() || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {q.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <p>{q.email}</p>
                      <p>{q.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mb-1 ${isContact ? 'bg-purple-100 text-purple-800' : 'bg-indigo-100 text-indigo-800'}`}>
                        {isContact ? 'Contact Us' : 'Course Enquiry'}
                      </span>
                      {!isContact && (
                        <p className="text-gray-700 font-medium text-xs mt-1 truncate max-w-[150px]">{q.course}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      <p className="line-clamp-2" title={q.message}>{q.message || '-'}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          q.status === 'unread' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {q.status === 'unread' ? 'Unread' : 'Read'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => toggleStatus(q.id, q.status)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        title={q.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                      >
                        {q.status === 'unread' ? <CheckCircle size={18} /> : <Clock size={18} />}
                      </button>
                      <button 
                        onClick={() => deleteQuery(q.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Query"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
