import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaCalendarAlt, FaSignOutAlt, FaChalkboardTeacher, FaCog } from "react-icons/fa";









// import { Chart } from 'chart.js/auto';

// // export function Dashboard() {
// //     const [chartData, setChartData] = useState(null);
// //     const [pieChartData, setPieChartData] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const [stats, setStats] = useState({
// //         totalStudents: 0,
// //         activeCourses: 0,
// //         upcomingEvents: 0,
// //         runningEvents: 0
// //     });
// //     const [events, setEvents] = useState([]);
// //     const [recentParticipants, setRecentParticipants] = useState([]);
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [eventsPerPage] = useState(5);
// //     const [barChartInstance, setBarChartInstance] = useState(null);
// //     const [pieChartInstance, setPieChartInstance] = useState(null);

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const token = localStorage.getItem('jwt');

// //                 // Fetch all dashboard data in parallel
// //                 const [
// //                     participantsRes,
// //                     upcomingCountRes,
// //                     runningCountRes,
// //                     eventsStatusRes
// //                 ] = await Promise.all([
// //                     fetch('http://localhost:9696/instructor/participants-by-weight', {
// //                         headers: { 'Authorization': `Bearer ${token}` }
// //                     }),
// //                     fetch('http://localhost:9696/instructor/upcoming-count', {
// //                         headers: { 'Authorization': `Bearer ${token}` }
// //                     }),
// //                     fetch('http://localhost:9696/instructor/running-count', {
// //                         headers: { 'Authorization': `Bearer ${token}` }
// //                     }),
// //                     fetch('http://localhost:9696/instructor/status', {
// //                         headers: { 'Authorization': `Bearer ${token}` }
// //                     })
// //                 ]);

// //                 // Check all responses
// //                 if (!participantsRes.ok || !upcomingCountRes.ok ||
// //                     !runningCountRes.ok || !eventsStatusRes.ok) {
// //                     throw new Error('Failed to fetch dashboard data');
// //                 }

// //                 // Parse responses
// //                 const participantsData = await participantsRes.json();
// //                 const upcomingCount = await upcomingCountRes.json();
// //                 const runningCount = await runningCountRes.json();
// //                 const eventsWithStatus = await eventsStatusRes.json();

// //                 // Process chart data
// //                 const weightCategories = ['BELOW54', 'BELOW58', 'BELOW63', 'BELOW68'];
// //                 const labels = weightCategories.map(cat => {
// //                     switch (cat) {
// //                         case 'BELOW54': return 'Below 54kg';
// //                         case 'BELOW58': return '54-58kg';
// //                         case 'BELOW63': return '58-63kg';
// //                         case 'BELOW68': return '63-68kg';
// //                         default: return cat;
// //                     }
// //                 });

// //                 const datasets = participantsData
// //                     .filter(event => Object.values(event.participantsByWeight).some(count => count > 0))
// //                     .map(event => {
// //                         const color = `rgba(${Math.floor(Math.random() * 155 + 100)}, 
// //                           ${Math.floor(Math.random() * 155 + 100)}, 
// //                           ${Math.floor(Math.random() * 155 + 100)}, 0.7)`;

// //                         return {
// //                             label: event.eventTitle,
// //                             data: weightCategories.map(cat => event.participantsByWeight[cat] || 0),
// //                             backgroundColor: color,
// //                         };
// //                     });

// //                 // Set bar chart data
// //                 setChartData({
// //                     labels,
// //                     datasets,
// //                 });

// //                 // Calculate totals for pie chart
// //                 const weightTotals = weightCategories.map(category => {
// //                     return participantsData.reduce((sum, event) => {
// //                         return sum + (event.participantsByWeight[category] || 0);
// //                     }, 0);
// //                 });

// //                 // Set pie chart data
// //                 setPieChartData({
// //                     labels: labels,
// //                     datasets: [{
// //                         data: weightTotals,
// //                         backgroundColor: [
// //                             'rgba(255, 99, 132, 0.7)',
// //                             'rgba(54, 162, 235, 0.7)',
// //                             'rgba(255, 206, 86, 0.7)',
// //                             'rgba(75, 192, 192, 0.7)'
// //                         ],
// //                         borderColor: [
// //                             'rgba(255, 99, 132, 1)',
// //                             'rgba(54, 162, 235, 1)',
// //                             'rgba(255, 206, 86, 1)',
// //                             'rgba(75, 192, 192, 1)'
// //                         ],
// //                         borderWidth: 1
// //                     }]
// //                 });

// //                 // Update stats
// //                 setStats({
// //                     totalStudents: 142,
// //                     activeCourses: 8,
// //                     upcomingEvents: upcomingCount,
// //                     runningEvents: runningCount
// //                 });

// //                 // Process events data for the table - sort by eventDate
// //                 const formattedEvents = eventsWithStatus
// //                     .map(eventStatus => ({
// //                         id: eventStatus.event.eventId,
// //                         title: eventStatus.event.title,
// //                         description: eventStatus.event.description,
// //                         startDate: new Date(eventStatus.event.eventDate),
// //                         endDate: eventStatus.event.endDate ?
// //                             new Date(eventStatus.event.endDate) : null,
// //                         location: eventStatus.event.location || 'Not specified',
// //                         participants: eventStatus.event.registrations?.length || 0,
// //                         status: eventStatus.status,
// //                         winners: eventStatus.event.registrations?.filter(p => p.winnerResults?.length > 0).length || 0
// //                     }))
// //                     .sort((a, b) => a.startDate - b.startDate);

// //                 setEvents(formattedEvents);

// //                 // Extract recent participants from events data
// //                 const participantsFromEvents = eventsWithStatus
// //                     .flatMap(eventStatus =>
// //                         eventStatus.event.registrations?.map(reg => ({
// //                             id: reg.id,
// //                             name: `${reg.firstName} ${reg.lastName}`,
// //                             dojang: reg.dojangName,
// //                             weightCategory: reg.weightCategory,
// //                             status: reg.playerStatus
// //                         })) || []
// //                     )
// //                     .slice(0, 4);

// //                 setRecentParticipants(participantsFromEvents);

// //             } catch (err) {
// //                 setError(err.message);
// //                 console.error('Error fetching dashboard data:', err);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchData();
// //     }, []);

// //     // Initialize charts when data is available
// //     useEffect(() => {
// //         if (chartData && !barChartInstance) {
// //             const barCtx = document.getElementById('barChart');
// //             if (barCtx) {
// //                 const newBarChart = new Chart(barCtx, {
// //                     type: 'bar',
// //                     data: chartData,
// //                     options: {
// //                         responsive: true,
// //                         plugins: {
// //                             legend: {
// //                                 position: 'top',
// //                             },
// //                             title: {
// //                                 display: true,
// //                                 text: 'Players by Event and Weight Category',
// //                             },
// //                         },
// //                         scales: {
// //                             x: {
// //                                 stacked: false,
// //                                 title: {
// //                                     display: true,
// //                                     text: 'Weight Categories'
// //                                 }
// //                             },
// //                             y: {
// //                                 stacked: false,
// //                                 beginAtZero: true,
// //                                 title: {
// //                                     display: true,
// //                                     text: 'Number of Participants'
// //                                 }
// //                             },
// //                         },
// //                     }
// //                 });
// //                 setBarChartInstance(newBarChart);
// //             }
// //         }

// //         if (pieChartData && !pieChartInstance) {
// //             const pieCtx = document.getElementById('pieChart');
// //             if (pieCtx) {
// //                 const newPieChart = new Chart(pieCtx, {
// //                     type: 'pie',
// //                     data: pieChartData,
// //                     options: {
// //                         responsive: true,
// //                         plugins: {
// //                             legend: {
// //                                 position: 'top',
// //                             },
// //                             title: {
// //                                 display: true,
// //                                 text: 'Total Participants by Weight Category',
// //                             },
// //                         }
// //                     }
// //                 });
// //                 setPieChartInstance(newPieChart);
// //             }
// //         }

// //         // Cleanup function to destroy charts when component unmounts
// //         return () => {
// //             if (barChartInstance) {
// //                 barChartInstance.destroy();
// //             }
// //             if (pieChartInstance) {
// //                 pieChartInstance.destroy();
// //             }
// //         };
// //     }, [chartData, pieChartData, barChartInstance, pieChartInstance]);

// //     // Pagination logic for events
// //     const indexOfLastEvent = currentPage * eventsPerPage;
// //     const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
// //     const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
// //     const totalPages = Math.ceil(events.length / eventsPerPage);

// //     const paginate = (pageNumber) => setCurrentPage(pageNumber);

// //     if (loading) {
// //         return (
// //             <div className="flex justify-center items-center h-64">
// //                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
// //             </div>
// //         );
// //     }

// //     if (error) {
// //         return (
// //             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
// //                 <strong className="font-bold">Error!</strong>
// //                 <span className="block sm:inline"> {error}</span>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="space-y-6">
// //             <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>

// //             {/* Stats Cards */}
// //             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //                 <div className="bg-white p-6 rounded-lg shadow-sm">
// //                     <h3 className="font-semibold text-lg mb-2">Upcoming Events</h3>
// //                     <p className="text-3xl font-bold text-indigo-600">{stats.upcomingEvents}</p>
// //                 </div>
// //                 <div className="bg-white p-6 rounded-lg shadow-sm">
// //                     <h3 className="font-semibold text-lg mb-2">Running Events</h3>
// //                     <p className="text-3xl font-bold text-indigo-600">{stats.runningEvents}</p>
// //                 </div>
// //             </div>

// //             {/* Charts Section */}
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                 {/* Bar Chart */}
// //                 <div className="bg-white p-6 rounded-lg shadow-sm">
// //                     <h3 className="font-semibold text-lg mb-4">Participants by Weight Category</h3>
// //                     <div className="h-96">
// //                         {chartData && chartData.datasets.length > 0 ? (
// //                             <canvas id="barChart"></canvas>
// //                         ) : (
// //                             <div className="flex justify-center items-center h-full text-gray-500">
// //                                 No participant data available
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>

// //                 {/* Pie Chart */}
// //                 <div className="bg-white p-6 rounded-lg shadow-sm">
// //                     <h3 className="font-semibold text-lg mb-4">Total Participants Distribution</h3>
// //                     <div className="h-96">
// //                         {pieChartData ? (
// //                             <canvas id="pieChart"></canvas>
// //                         ) : (
// //                             <div className="flex justify-center items-center h-full text-gray-500">
// //                                 No participant data available
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* Events Table */}
// //             <div className="bg-white p-6 rounded-lg shadow-sm">
// //                 <h3 className="font-semibold text-lg mb-4">Upcoming & Running Events</h3>
// //                 <div className="overflow-x-auto">
// //                     <table className="min-w-full divide-y divide-gray-200">
// //                         <thead className="bg-gray-50">
// //                             <tr>
// //                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
// //                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
// //                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
// //                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
// //                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
// //                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody className="bg-white divide-y divide-gray-200">
// //                             {currentEvents.length > 0 ? (
// //                                 currentEvents.map((event) => (
// //                                     <tr key={event.id}>
// //                                         <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
// //                                         <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">{event.description}</td>
// //                                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
// //                                             <div>{event.startDate.toLocaleDateString()}</div>
// //                                             {event.endDate && (
// //                                                 <div className="text-xs text-gray-400">to {event.endDate.toLocaleDateString()}</div>
// //                                             )}
// //                                         </td>
// //                                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
// //                                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{event.participants}</td>
// //                                         <td className="px-4 py-3 whitespace-nowrap">
// //                                             <span className={`px-2 py-1 text-xs rounded-full ${event.status === 'RUNNING'
// //                                                 ? 'bg-green-100 text-green-800'
// //                                                 : 'bg-blue-100 text-blue-800'
// //                                                 }`}>
// //                                                 {event.status}
// //                                             </span>
// //                                         </td>
// //                                     </tr>
// //                                 ))
// //                             ) : (
// //                                 <tr>
// //                                     <td colSpan="7" className="px-4 py-3 text-center text-sm text-gray-500">
// //                                         No events found
// //                                     </td>
// //                                 </tr>
// //                             )}
// //                         </tbody>
// //                     </table>
// //                 </div>

// //                 {/* Pagination */}
// //                 {events.length > eventsPerPage && (
// //                     <div className="flex items-center justify-between mt-4">
// //                         <div className="text-sm text-gray-500">
// //                             Showing {indexOfFirstEvent + 1} to {Math.min(indexOfLastEvent, events.length)} of {events.length} events
// //                         </div>
// //                         <div className="flex space-x-2">
// //                             <button
// //                                 onClick={() => paginate(currentPage - 1)}
// //                                 disabled={currentPage === 1}
// //                                 className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-100 hover:bg-indigo-200'}`}
// //                             >
// //                                 Previous
// //                             </button>
// //                             {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
// //                                 <button
// //                                     key={number}
// //                                     onClick={() => paginate(number)}
// //                                     className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-indigo-100 hover:bg-indigo-200'}`}
// //                                 >
// //                                     {number}
// //                                 </button>
// //                             ))}
// //                             <button
// //                                 onClick={() => paginate(currentPage + 1)}
// //                                 disabled={currentPage === totalPages}
// //                                 className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-100 hover:bg-indigo-200'}`}
// //                             >
// //                                 Next
// //                             </button>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }
// import { useState, useEffect, useRef } from 'react';

// export function Dashboard() {
//     const [chartData, setChartData] = useState(null);
//     const [pieChartData, setPieChartData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [stats, setStats] = useState({
//         totalStudents: 0,
//         activeCourses: 0,
//         upcomingEvents: 0,
//         runningEvents: 0
//     });
//     const [events, setEvents] = useState([]);
//     const [recentParticipants, setRecentParticipants] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [eventsPerPage] = useState(5);
//     const barChartRef = useRef(null);
//     const pieChartRef = useRef(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem('jwt');

//                 // Fetch all dashboard data in parallel
//                 const [
//                     participantsRes,
//                     upcomingCountRes,
//                     runningCountRes,
//                     eventsStatusRes
//                 ] = await Promise.all([
//                     fetch('http://localhost:9696/instructor/participants-by-weight', {
//                         headers: { 'Authorization': `Bearer ${token}` }
//                     }),
//                     fetch('http://localhost:9696/instructor/upcoming-count', {
//                         headers: { 'Authorization': `Bearer ${token}` }
//                     }),
//                     fetch('http://localhost:9696/instructor/running-count', {
//                         headers: { 'Authorization': `Bearer ${token}` }
//                     }),
//                     fetch('http://localhost:9696/instructor/status', {
//                         headers: { 'Authorization': `Bearer ${token}` }
//                     })
//                 ]);

//                 // Check all responses
//                 if (!participantsRes.ok || !upcomingCountRes.ok ||
//                     !runningCountRes.ok || !eventsStatusRes.ok) {
//                     throw new Error('Failed to fetch dashboard data');
//                 }

//                 // Parse responses
//                 const participantsData = await participantsRes.json();
//                 const upcomingCount = await upcomingCountRes.json();
//                 const runningCount = await runningCountRes.json();
//                 const eventsWithStatus = await eventsStatusRes.json();

//                 // Process chart data
//                 const weightCategories = ['BELOW54', 'BELOW58', 'BELOW63', 'BELOW68'];
//                 const labels = weightCategories.map(cat => {
//                     switch (cat) {
//                         case 'BELOW54': return 'Below 54kg';
//                         case 'BELOW58': return '54-58kg';
//                         case 'BELOW63': return '58-63kg';
//                         case 'BELOW68': return '63-68kg';
//                         default: return cat;
//                     }
//                 });

//                 const datasets = participantsData
//                     .filter(event => Object.values(event.participantsByWeight).some(count => count > 0))
//                     .map(event => {
//                         const color = `rgba(${Math.floor(Math.random() * 155 + 100)}, 
//                           ${Math.floor(Math.random() * 155 + 100)}, 
//                           ${Math.floor(Math.random() * 155 + 100)}, 0.7)`;

//                         return {
//                             label: event.eventTitle,
//                             data: weightCategories.map(cat => event.participantsByWeight[cat] || 0),
//                             backgroundColor: color,
//                         };
//                     });

//                 // Set bar chart data
//                 setChartData({
//                     labels,
//                     datasets,
//                 });

//                 // Calculate totals for pie chart
//                 const weightTotals = weightCategories.map(category => {
//                     return participantsData.reduce((sum, event) => {
//                         return sum + (event.participantsByWeight[category] || 0);
//                     }, 0);
//                 });

//                 // Set pie chart data
//                 setPieChartData({
//                     labels: labels,
//                     datasets: [{
//                         data: weightTotals,
//                         backgroundColor: [
//                             'rgba(255, 99, 132, 0.7)',
//                             'rgba(54, 162, 235, 0.7)',
//                             'rgba(255, 206, 86, 0.7)',
//                             'rgba(75, 192, 192, 0.7)'
//                         ],
//                         borderColor: [
//                             'rgba(255, 99, 132, 1)',
//                             'rgba(54, 162, 235, 1)',
//                             'rgba(255, 206, 86, 1)',
//                             'rgba(75, 192, 192, 1)'
//                         ],
//                         borderWidth: 1
//                     }]
//                 });

//                 // Update stats
//                 setStats({
//                     totalStudents: 142,
//                     activeCourses: 8,
//                     upcomingEvents: upcomingCount,
//                     runningEvents: runningCount
//                 });

//                 // Process events data for the table - sort by eventDate
//                 const formattedEvents = eventsWithStatus
//                     .map(eventStatus => ({
//                         id: eventStatus.event.eventId,
//                         title: eventStatus.event.title,
//                         description: eventStatus.event.description,
//                         startDate: new Date(eventStatus.event.eventDate),
//                         endDate: eventStatus.event.endDate ?
//                             new Date(eventStatus.event.endDate) : null,
//                         location: eventStatus.event.location || 'Not specified',
//                         participants: eventStatus.event.registrations?.length || 0,
//                         status: eventStatus.status,
//                         winners: eventStatus.event.registrations?.filter(p => p.winnerResults?.length > 0).length || 0
//                     }))
//                     .sort((a, b) => a.startDate - b.startDate);

//                 setEvents(formattedEvents);

//                 // Extract recent participants from events data
//                 const participantsFromEvents = eventsWithStatus
//                     .flatMap(eventStatus =>
//                         eventStatus.event.registrations?.map(reg => ({
//                             id: reg.id,
//                             name: `${reg.firstName} ${reg.lastName}`,
//                             dojang: reg.dojangName,
//                             weightCategory: reg.weightCategory,
//                             status: reg.playerStatus
//                         })) || []
//                     )
//                     .slice(0, 4);

//                 setRecentParticipants(participantsFromEvents);

//             } catch (err) {
//                 setError(err.message);
//                 console.error('Error fetching dashboard data:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     // Initialize charts when data is available and canvas refs are set
//     useEffect(() => {
//         if (!chartData || !pieChartData || !barChartRef.current || !pieChartRef.current) return;

//         // Destroy existing charts if they exist
//         if (barChartRef.current.chart) {
//             barChartRef.current.chart.destroy();
//         }
//         if (pieChartRef.current.chart) {
//             pieChartRef.current.chart.destroy();
//         }

//         // Create new bar chart
//         const barCtx = barChartRef.current.getContext('2d');
//         barChartRef.current.chart = new Chart(barCtx, {
//             type: 'bar',
//             data: chartData,
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: {
//                         position: 'top',
//                     },
//                     title: {
//                         display: true,
//                         text: 'Players by Event and Weight Category',
//                     },
//                 },
//                 scales: {
//                     x: {
//                         stacked: false,
//                         title: {
//                             display: true,
//                             text: 'Weight Categories'
//                         }
//                     },
//                     y: {
//                         stacked: false,
//                         beginAtZero: true,
//                         title: {
//                             display: true,
//                             text: 'Number of Participants'
//                         }
//                     },
//                 },
//             }
//         });

//         // Create new pie chart
//         const pieCtx = pieChartRef.current.getContext('2d');
//         pieChartRef.current.chart = new Chart(pieCtx, {
//             type: 'pie',
//             data: pieChartData,
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: {
//                         position: 'top',
//                     },
//                     title: {
//                         display: true,
//                         text: 'Total Participants by Weight Category',
//                     },
//                 }
//             }
//         });

//         // Cleanup function to destroy charts when component unmounts
//         return () => {
//             if (barChartRef.current?.chart) {
//                 barChartRef.current.chart.destroy();
//             }
//             if (pieChartRef.current?.chart) {
//                 pieChartRef.current.chart.destroy();
//             }
//         };
//     }, [chartData, pieChartData]);

//     // Pagination logic for events
//     const indexOfLastEvent = currentPage * eventsPerPage;
//     const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
//     const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
//     const totalPages = Math.ceil(events.length / eventsPerPage);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//                 <strong className="font-bold">Error!</strong>
//                 <span className="block sm:inline"> {error}</span>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                 <div className="bg-white p-6 rounded-lg shadow-sm">
//                     <h3 className="font-semibold text-lg mb-2">Upcoming Events</h3>
//                     <p className="text-3xl font-bold text-indigo-600">{stats.upcomingEvents}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow-sm">
//                     <h3 className="font-semibold text-lg mb-2">Running Events</h3>
//                     <p className="text-3xl font-bold text-indigo-600">{stats.runningEvents}</p>
//                 </div>
//             </div>

//             {/* Charts Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Bar Chart */}
//                 <div className="bg-white p-6 rounded-lg shadow-sm">
//                     <h3 className="font-semibold text-lg mb-4">Participants by Weight Category</h3>
//                     <div className="h-96 relative">
//                         {chartData && chartData.datasets.length > 0 ? (
//                             <canvas ref={barChartRef}></canvas>
//                         ) : (
//                             <div className="flex justify-center items-center h-full text-gray-500">
//                                 No participant data available
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Pie Chart */}
//                 <div className="bg-white p-6 rounded-lg shadow-sm">
//                     <h3 className="font-semibold text-lg mb-4">Total Participants Distribution</h3>
//                     <div className="h-96 relative">
//                         {pieChartData ? (
//                             <canvas ref={pieChartRef}></canvas>
//                         ) : (
//                             <div className="flex justify-center items-center h-full text-gray-500">
//                                 No participant data available
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Events Table */}
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <h3 className="font-semibold text-lg mb-4">Upcoming & Running Events</h3>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {currentEvents.length > 0 ? (
//                                 currentEvents.map((event) => (
//                                     <tr key={event.id}>
//                                         <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
//                                         <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">{event.description}</td>
//                                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
//                                             <div>{event.startDate.toLocaleDateString()}</div>
//                                             {event.endDate && (
//                                                 <div className="text-xs text-gray-400">to {event.endDate.toLocaleDateString()}</div>
//                                             )}
//                                         </td>
//                                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
//                                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{event.participants}</td>
//                                         <td className="px-4 py-3 whitespace-nowrap">
//                                             <span className={`px-2 py-1 text-xs rounded-full ${event.status === 'RUNNING'
//                                                 ? 'bg-green-100 text-green-800'
//                                                 : 'bg-blue-100 text-blue-800'
//                                                 }`}>
//                                                 {event.status}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="7" className="px-4 py-3 text-center text-sm text-gray-500">
//                                         No events found
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 {events.length > eventsPerPage && (
//                     <div className="flex items-center justify-between mt-4">
//                         <div className="text-sm text-gray-500">
//                             Showing {indexOfFirstEvent + 1} to {Math.min(indexOfLastEvent, events.length)} of {events.length} events
//                         </div>
//                         <div className="flex space-x-2">
//                             <button
//                                 onClick={() => paginate(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-100 hover:bg-indigo-200'}`}
//                             >
//                                 Previous
//                             </button>
//                             {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
//                                 <button
//                                     key={number}
//                                     onClick={() => paginate(number)}
//                                     className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-indigo-100 hover:bg-indigo-200'}`}
//                                 >
//                                     {number}
//                                 </button>
//                             ))}
//                             <button
//                                 onClick={() => paginate(currentPage + 1)}
//                                 disabled={currentPage === totalPages}
//                                 className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-100 hover:bg-indigo-200'}`}
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
import { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export function Dashboard() {
    const [chartData, setChartData] = useState(null);
    const [pieChartData, setPieChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalStudents: 0,
        activeCourses: 0,
        upcomingEvents: 0,
        runningEvents: 0
    });
    const [events, setEvents] = useState([]);
    const [recentParticipants, setRecentParticipants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(5);
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt');

                // Fetch all dashboard data in parallel
                const [
                    participantsRes,
                    upcomingCountRes,
                    runningCountRes,
                    eventsStatusRes
                ] = await Promise.all([
                    fetch('http://localhost:9696/instructor/participants-by-weight', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('http://localhost:9696/instructor/upcoming-count', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('http://localhost:9696/instructor/running-count', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('http://localhost:9696/instructor/status', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);

                // Check all responses
                if (!participantsRes.ok || !upcomingCountRes.ok ||
                    !runningCountRes.ok || !eventsStatusRes.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }

                // Parse responses
                const participantsData = await participantsRes.json();
                const upcomingCount = await upcomingCountRes.json();
                const runningCount = await runningCountRes.json();
                const eventsWithStatus = await eventsStatusRes.json();

                // Process chart data
                const weightCategories = ['BELOW54', 'BELOW58', 'BELOW63', 'BELOW68'];
                const labels = weightCategories.map(cat => {
                    switch (cat) {
                        case 'BELOW54': return 'Below 54kg';
                        case 'BELOW58': return '54-58kg';
                        case 'BELOW63': return '58-63kg';
                        case 'BELOW68': return '63-68kg';
                        default: return cat;
                    }
                });

                const datasets = participantsData
                    .filter(event => Object.values(event.participantsByWeight).some(count => count > 0))
                    .map(event => {
                        const color = `rgba(${Math.floor(Math.random() * 155 + 100)}, 
                          ${Math.floor(Math.random() * 155 + 100)}, 
                          ${Math.floor(Math.random() * 155 + 100)}, 0.7)`;

                        return {
                            label: event.eventTitle,
                            data: weightCategories.map(cat => event.participantsByWeight[cat] || 0),
                            backgroundColor: color,
                        };
                    });

                // Set bar chart data
                setChartData({
                    labels,
                    datasets,
                });

                // Calculate totals for pie chart
                const weightTotals = weightCategories.map(category => {
                    return participantsData.reduce((sum, event) => {
                        return sum + (event.participantsByWeight[category] || 0);
                    }, 0);
                });

                // Set pie chart data
                setPieChartData({
                    labels: labels,
                    datasets: [{
                        data: weightTotals,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
                });

                // Update stats
                setStats({
                    totalStudents: 142,
                    activeCourses: 8,
                    upcomingEvents: upcomingCount,
                    runningEvents: runningCount
                });

                // Process events data for the table - sort by eventDate
                const formattedEvents = eventsWithStatus
                    .map(eventStatus => ({
                        id: eventStatus.event.eventId,
                        title: eventStatus.event.title,
                        description: eventStatus.event.description,
                        startDate: new Date(eventStatus.event.eventDate),
                        endDate: eventStatus.event.endDate ?
                            new Date(eventStatus.event.endDate) : null,
                        location: eventStatus.event.location || 'Not specified',
                        participants: eventStatus.event.registrations?.length || 0,
                        status: eventStatus.status,
                        winners: eventStatus.event.registrations?.filter(p => p.winnerResults?.length > 0).length || 0
                    }))
                    .sort((a, b) => a.startDate - b.startDate);

                setEvents(formattedEvents);

                // Extract recent participants from events data
                const participantsFromEvents = eventsWithStatus
                    .flatMap(eventStatus =>
                        eventStatus.event.registrations?.map(reg => ({
                            id: reg.id,
                            name: `${reg.firstName} ${reg.lastName}`,
                            dojang: reg.dojangName,
                            weightCategory: reg.weightCategory,
                            status: reg.playerStatus
                        })) || []
                    )
                    .slice(0, 4);

                setRecentParticipants(participantsFromEvents);

            } catch (err) {
                setError(err.message);
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Initialize charts when data is available and canvas refs are set
    useEffect(() => {
        if (!chartData || !pieChartData || !barChartRef.current || !pieChartRef.current) return;

        // Destroy existing charts if they exist
        if (barChartRef.current.chart) {
            barChartRef.current.chart.destroy();
        }
        if (pieChartRef.current.chart) {
            pieChartRef.current.chart.destroy();
        }

        // Create new bar chart
        const barCtx = barChartRef.current.getContext('2d');
        barChartRef.current.chart = new Chart(barCtx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Players by Event and Weight Category',
                    },
                },
                scales: {
                    x: {
                        stacked: false,
                        title: {
                            display: true,
                            text: 'Weight Categories'
                        }
                    },
                    y: {
                        stacked: false,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Participants'
                        }
                    },
                },
            }
        });

        // Create new pie chart
        const pieCtx = pieChartRef.current.getContext('2d');
        pieChartRef.current.chart = new Chart(pieCtx, {
            type: 'pie',
            data: pieChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Total Participants by Weight Category',
                    },
                }
            }
        });

        // Cleanup function to destroy charts when component unmounts
        return () => {
            if (barChartRef.current?.chart) {
                barChartRef.current.chart.destroy();
            }
            if (pieChartRef.current?.chart) {
                pieChartRef.current.chart.destroy();
            }
        };
    }, [chartData, pieChartData]);

    // Pagination logic for events
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(events.length / eventsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Upcoming Events</h3>
                    <p className="text-3xl font-bold text-indigo-600">{stats.upcomingEvents}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Running Events</h3>
                    <p className="text-3xl font-bold text-indigo-600">{stats.runningEvents}</p>
                </div>
            </div>

            {/* Bar Chart - Full width */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Participants by Weight Category</h3>
                <div className="h-[500px] w-full relative">
                    {chartData && chartData.datasets.length > 0 ? (
                        <canvas ref={barChartRef}></canvas>
                    ) : (
                        <div className="flex justify-center items-center h-full text-gray-500">
                            No participant data available
                        </div>
                    )}
                </div>
            </div>

            {/* Pie Chart - Below the bar chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Total Participants Distribution</h3>
                <div className="h-[400px] w-full relative">
                    {pieChartData ? (
                        <canvas ref={pieChartRef}></canvas>
                    ) : (
                        <div className="flex justify-center items-center h-full text-gray-500">
                            No participant data available
                        </div>
                    )}
                </div>
            </div>

            {/* Events Table */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Upcoming & Running Events</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentEvents.length > 0 ? (
                                currentEvents.map((event) => (
                                    <tr key={event.id}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
                                        <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">{event.description}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            <div>{event.startDate.toLocaleDateString()}</div>
                                            {event.endDate && (
                                                <div className="text-xs text-gray-400">to {event.endDate.toLocaleDateString()}</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{event.participants}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${event.status === 'RUNNING'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {event.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-4 py-3 text-center text-sm text-gray-500">
                                        No events found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {events.length > eventsPerPage && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-500">
                            Showing {indexOfFirstEvent + 1} to {Math.min(indexOfLastEvent, events.length)} of {events.length} events
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-100 hover:bg-indigo-200'}`}
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-indigo-100 hover:bg-indigo-200'}`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-100 hover:bg-indigo-200'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export function Players() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Player Management</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i}>
                                <td className="px-6 py-4 whitespace-nowrap">Player {i}</td>
                                <td className="px-6 py-4 whitespace-nowrap">player{i}@example.com</td>
                                <td className="px-6 py-4 whitespace-nowrap">{i * 20}% Completed</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


// Courses Component


// Settings Component
export function Settings() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Settings</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                <div>
                    <h3 className="font-semibold mb-3">Profile Information</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="p-2 border rounded-lg"
                                defaultValue="John"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="p-2 border rounded-lg"
                                defaultValue="Doe"
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 border rounded-lg"
                            defaultValue="john@example.com"
                        />
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Security</h3>
                    <button className="w-full p-3 text-left bg-indigo-50 rounded-lg hover:bg-indigo-100">
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
}

// Original Instructor Layout Component (unchanged)
function InstructorLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt')
        window.location.href = '/login'
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white shadow-lg">
                <div className="flex items-center justify-center h-16 px-4 border-b border-indigo-600">
                    <h1 className="text-xl font-bold">Instructor Dashboard</h1>
                </div>

                <div className="flex flex-col flex-grow px-4 py-6 overflow-y-auto">
                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-2">
                        <Link
                            to="/instructor"
                            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                            <FaHome className="mr-3 text-lg" />
                            Dashboard
                        </Link>

                        <Link
                            to="/instructor/players"
                            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                            <FaUsers className="mr-3 text-lg" />
                            Players
                        </Link>

                        <Link
                            to="/instructor/events"
                            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                            <FaCalendarAlt className="mr-3 text-lg" />
                            Events
                        </Link>

                        <Link
                            to="/instructor/game"
                            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                            <FaCog className="mr-3 text-lg" />
                            Tournament Manager
                        </Link>
                    </nav>

                    {/* Bottom Section - Logout */}
                    <div className="mt-auto pt-6">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                            <FaSignOutAlt className="mr-3 text-lg" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile sidebar toggle (hidden on desktop) */}
            <div className="md:hidden fixed bottom-4 right-4 z-50">
                <button className="p-3 bg-indigo-600 rounded-full shadow-lg text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {/* Mobile sidebar toggle */}
            <div className="md:hidden fixed bottom-4 right-4 z-50">
                <button className="p-3 bg-indigo-600 rounded-full shadow-lg text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default InstructorLayout;