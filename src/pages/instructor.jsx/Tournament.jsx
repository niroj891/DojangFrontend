import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TournamentManager = () => {
    // State management
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedWeightCategory, setSelectedWeightCategory] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [matches, setMatches] = useState([]);
    const [results, setResults] = useState([]);
    const [matchResults, setMatchResults] = useState([]);
    const [currentMatch, setCurrentMatch] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [currentMatchResult, setCurrentMatchResult] = useState([]);

    const weightCategories = ['BELOW54', 'BELOW58', 'BELOW63', 'BELOW68'];


    // Fetch events on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9696/instructor/event', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
                });

                // Sort events by creation date (newest first)
                const sortedEvents = [...response.data].sort((a, b) => {
                    const dateA = new Date(a.eventDate || a.startDate || a.date || Date.now());
                    const dateB = new Date(b.eventDate || b.startDate || b.date || Date.now());
                    return dateB - dateA;
                });

                setEvents(sortedEvents);
            } catch (err) {
                setError('Failed to load events');
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []);


    // Fetch participants when event AND weight category are selected
    useEffect(() => {
        if (!selectedEvent || !selectedWeightCategory) return;

        const fetchParticipants = async () => {
            setIsLoading(true);
            try {
                const [participantsRes, matchResultsRes] = await Promise.all([
                    axios.get(
                        `http://localhost:9696/instructor/events/${selectedEvent.eventId}/participants?weightCategory=${selectedWeightCategory}`,
                        { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
                    ),
                    axios.get(
                        `http://localhost:9696/instructor/events/${selectedEvent.eventId}/match-results?weightCategory=${selectedWeightCategory}`,
                        { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
                    )
                ]);
                setParticipants(participantsRes.data);
                setCurrentMatchResult(matchResultsRes.data);
            } catch (err) {
                setError('Failed to load participants');
            } finally {
                setIsLoading(false);
            }
        };
        fetchParticipants();
    }, [selectedEvent, selectedWeightCategory]); // Now triggers on weight category change

    // Fetch matches and results when weight category is selected
    useEffect(() => {
        if (!selectedEvent || !selectedWeightCategory) return;

        const fetchTournamentData = async () => {
            setIsLoading(true);
            try {
                const [matchesResponse, resultsResponse, matchResultsResponse] = await Promise.all([
                    axios.get(
                        `http://localhost:9696/instructor/matches?eventId=${selectedEvent.eventId}&weightCategory=${selectedWeightCategory}`,
                        { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
                    ),
                    axios.get(
                        `http://localhost:9696/instructor/results?eventId=${selectedEvent.eventId}&weightCategory=${selectedWeightCategory}`,
                        { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
                    ),
                    axios.get(
                        `http://localhost:9696/instructor/events/${selectedEvent.eventId}/match-results?weightCategory=${selectedWeightCategory}`,
                        { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
                    )
                ]);

                setMatches(matchesResponse.data);
                setResults(resultsResponse.data);
                setMatchResults(matchResultsResponse.data);
                const current = matchesResponse.data.find(
                    m => m.status === 'IN_PROGRESS' || m.status === 'SCHEDULED'
                );
                setCurrentMatch(current);
            } catch (err) {
                setError('Failed to load tournament data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchTournamentData();
    }, [selectedEvent, selectedWeightCategory]);

    // Create a new match
    const createNewMatch = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `http://localhost:9696/instructor/matches/create?eventId=${selectedEvent.eventId}&weightCategory=${selectedWeightCategory}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            );
            setCurrentMatch(response.data);
            setMatches([...matches, response.data]);
            setSuccess('New match created successfully');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create match');
        } finally {
            setIsLoading(false);
        }
    };

    // Record match result
    const recordMatchResult = async (winner, loser) => {
        setIsLoading(true);
        setError(null);
        try {
            await axios.post(
                `http://localhost:9696/instructor/match/result?matchId=${currentMatch.id}&winnerId=${winner.id}&loserId=${loser.id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            );


            const [participantsRes, matchResultsRes] = await Promise.all([
                axios.get(
                    `http://localhost:9696/instructor/events/${selectedEvent.eventId}/participants?weightCategory=${selectedWeightCategory}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
                ),
                axios.get(
                    `http://localhost:9696/instructor/events/${selectedEvent.eventId}/match-results?weightCategory=${selectedWeightCategory}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
                )
            ]);
            setParticipants(participantsRes.data);
            setCurrentMatchResult(matchResultsRes.data);


            setCurrentMatch(null);

            // Check for tournament completion
            const remainingParticipants = participantsRes.data.filter(
                p => p.weightCategory === selectedWeightCategory && p.playerStatus === 'NOTOUT'
            );
            if (remainingParticipants.length === 1) {
                setSuccess(`Tournament complete! Winner: ${remainingParticipants[0].firstName} ${remainingParticipants[0].lastName}`);
            } else {
                setSuccess('Match result recorded successfully');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to record match result');
        } finally {
            setIsLoading(false);
        }
    };

    // Reset tournament
    const resetTournament = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await axios.post(
                `http://localhost:9696/instructor/tournaments/reset?eventId=${selectedEvent.eventId}&weightCategory=${selectedWeightCategory}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            );

            // Refresh data
            const [participantsResponse, matchesResponse, resultsResponse, matchResultsResponse] = await Promise.all([
                axios.get(
                    `http://localhost:9696/instructor/events/${selectedEvent.eventId}/participants`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt')}`
                        }
                    }
                ),
                axios.get(
                    `http://localhost:9696/instructor/matches?eventId=${selectedEvent.eventId}&weightCategory=${selectedWeightCategory}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt')}`
                        }
                    }
                ),
                axios.get(
                    `http://localhost:9696/instructor/results?eventId=${selectedEvent.eventId}&weightCategory=${selectedWeightCategory}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt')}`
                        }
                    }
                ),
                axios.get(
                    `http://localhost:9696/instructor/events/${selectedEvent.eventId}/match-results?weightCategory=${selectedWeightCategory}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt')}`
                        }
                    }
                )
            ]);

            setParticipants(participantsResponse.data);
            setMatches(matchesResponse.data);
            setResults(resultsResponse.data);
            setMatchResults(matchResultsResponse.data);
            setCurrentMatch(null);
            setSuccess('Tournament reset successfully');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset tournament');
        } finally {
            setIsLoading(false);
        }
    };

    // Filter participants by weight category
    const getParticipantsByWeightCategory = () => {
        if (!selectedEvent || !selectedWeightCategory) return [];
        return participants.filter(p => p.weightCategory === selectedWeightCategory);
    };

    // Get winner if tournament is complete
    const getWinner = () => {
        const remaining = participants.filter(
            p => p.weightCategory === selectedWeightCategory && p.playerStatus === 'NOTOUT'
        );
        return remaining.length === 1 ? remaining[0] : null;
    };

    // Handle back button click
    const handleBackToEvents = () => {
        setSelectedEvent(null);
        setSelectedWeightCategory(null);
        setCurrentMatch(null);
        setError(null);
        setSuccess(null);
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Tournament Sparring Manager</h1>
                    {selectedEvent && (
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleBackToEvents}
                                className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                </svg>
                                Back to Events
                            </button>
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-600 mr-2">Selected Event:</span>
                                <span className="text-base font-semibold text-blue-600">{selectedEvent.title}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Status Messages */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md shadow-sm">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md shadow-sm">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">{success}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Event Selection */}
                {!selectedEvent ? (
                    <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Select Tournament Event</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map(event => (
                                <div
                                    key={event.eventId}
                                    className="group cursor-pointer"
                                    onClick={() => {
                                        setSelectedEvent(event);
                                        setSelectedWeightCategory(null);
                                        setCurrentMatch(null);
                                    }}
                                >
                                    <div className="relative rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 h-full flex flex-col">
                                        <div className="h-48 bg-gray-200 overflow-hidden relative">
                                            <img
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                src={`http://localhost:9696/files/images/event/${event.imageUrl}`}
                                                alt={event.title}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://via.placeholder.com/300x200?text=Event+Image";
                                                }}
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                                <h3 className="text-xl font-bold text-white">{event.title}</h3>
                                            </div>
                                        </div>
                                        <div className="p-5 bg-white flex-grow flex flex-col">
                                            <div className="mb-4">
                                                <p className="text-gray-600 line-clamp-2">{event.description || 'No description available'}</p>
                                            </div>
                                            <div className="mt-auto">
                                                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                                    <span>
                                                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                        </svg>
                                                        {new Date(event.eventDate).toLocaleDateString()}
                                                    </span>
                                                    <span>
                                                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                                        </svg>
                                                        {event.registrations.length || 0} participants
                                                    </span>
                                                </div>
                                                <button
                                                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                                                >
                                                    <span>Select Event</span>
                                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Weight Category Selection */}
                        <div className="p-6 bg-white rounded-xl shadow-lg">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Select Weight Category</h2>
                            <div className="flex flex-wrap gap-3">
                                {weightCategories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedWeightCategory(category)}
                                        className={`px-5 py-2.5 rounded-lg transition-all duration-200 font-medium ${selectedWeightCategory === category
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedWeightCategory && (
                            <>
                                {/* Tournament Controls */}
                                <div className="p-6 bg-white rounded-xl shadow-lg">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">Tournament Controls</h2>

                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                onClick={createNewMatch}
                                                disabled={isLoading || currentMatch || getWinner()}
                                                className={`flex items-center px-4 py-2 rounded-lg font-medium text-white ${isLoading || currentMatch || getWinner()
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-green-600 hover:bg-green-700'
                                                    } transition-colors duration-200`}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                        </svg>
                                                        Create New Match
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                onClick={resetTournament}
                                                disabled={isLoading}
                                                className={`flex items-center px-4 py-2 rounded-lg font-medium text-white ${isLoading
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-red-600 hover:bg-red-700'
                                                    } transition-colors duration-200`}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                                        </svg>
                                                        Reset Tournament
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {getWinner() && (
                                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <div className="flex items-center">
                                                <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                                </svg>
                                                <span className="text-lg font-bold text-green-800">
                                                    Tournament Winner: {getWinner().firstName} {getWinner().lastName} ({getWinner().dojangName})
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Current Match */}
                                {currentMatch && (
                                    <div className="p-6 bg-white rounded-xl shadow-lg">
                                        <h2 className="text-xl font-bold mb-4 text-gray-800">Current Match</h2>
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm">
                                                <div className="text-center mb-4">
                                                    <h3 className="text-lg font-bold text-gray-800">
                                                        {currentMatch.player1.firstName} {currentMatch.player1.lastName}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">{currentMatch.player1.dojangName}</p>
                                                </div>
                                                <button
                                                    onClick={() => recordMatchResult(currentMatch.player1, currentMatch.player2)}
                                                    disabled={isLoading}
                                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
                                                >
                                                    {isLoading ? 'Processing...' : 'Declare Winner'}
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-center">
                                                <div className="text-xl font-bold text-gray-400">VS</div>
                                            </div>

                                            <div className="flex-1 bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-sm">
                                                <div className="text-center mb-4">
                                                    <h3 className="text-lg font-bold text-gray-800">
                                                        {currentMatch.player2.firstName} {currentMatch.player2.lastName}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">{currentMatch.player2.dojangName}</p>
                                                </div>
                                                <button
                                                    onClick={() => recordMatchResult(currentMatch.player2, currentMatch.player1)}
                                                    disabled={isLoading}
                                                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
                                                >
                                                    {isLoading ? 'Processing...' : 'Declare Winner'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Participants List */}
                                <div className="p-6 bg-white rounded-xl shadow-lg">
                                    <h2 className="text-xl font-bold mb-6 text-gray-800">Participants</h2>

                                    <div className="mb-8">
                                        <div className="flex items-center mb-4">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                            <h3 className="text-lg font-medium text-gray-800">Active Participants</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {getParticipantsByWeightCategory()
                                                .filter(p => p.playerStatus === 'NOTOUT')
                                                .map(participant => (
                                                    <div
                                                        key={participant.id}
                                                        className="p-4 border border-green-200 bg-green-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                                                    >
                                                        <p className="font-bold text-gray-800">{participant.firstName} {participant.lastName}</p>
                                                        <p className="text-sm text-gray-600 mt-1">{participant.dojangName}</p>
                                                        <div className="mt-2 flex items-center">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                                                </svg>
                                                                ACTIVE
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center mb-4">
                                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                                            <h3 className="text-lg font-medium text-gray-800">Eliminated Participants</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {getParticipantsByWeightCategory()
                                                .filter(p => p.playerStatus === 'OUT')
                                                .map(participant => (
                                                    <div
                                                        key={participant.id}
                                                        className="p-4 border border-gray-200 bg-gray-50 rounded-lg shadow-sm"
                                                    >
                                                        <p className="font-bold text-gray-600">{participant.firstName} {participant.lastName}</p>
                                                        <p className="text-sm text-gray-500 mt-1">{participant.dojangName}</p>
                                                        <div className="mt-2 flex items-center">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                                                                </svg>
                                                                ELIMINATED
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Match Results */}
                                {currentMatchResult.length > 0 && (
                                    <div className="p-6 bg-white rounded-xl shadow-lg overflow-hidden">
                                        <h2 className="text-xl font-bold mb-4 text-gray-800">Match History</h2>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead>
                                                    <tr>

                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round</th>
                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Date</th>
                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winner</th>
                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loser</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {currentMatchResult.map((match) => (
                                                        <tr key={match.matchId} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{match.roundNumber}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                                {new Date(match.matchDate).toLocaleString()}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                                    ${match.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                                        match.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                                                                            'bg-blue-100 text-blue-800'}`}>
                                                                    {match.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {match.winner ? (
                                                                    <div className="flex items-center">
                                                                        <div className="w-8 h-8 flex-shrink-0 mr-3 bg-green-100 rounded-full flex items-center justify-center">
                                                                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                        <div>
                                                                            <div className="text-sm font-medium text-gray-800">{match.winner.firstName} {match.winner.lastName}</div>
                                                                            <div className="text-xs text-gray-500">{match.winner.dojangName}</div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-sm text-gray-400">Not determined</span>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {match.loser ? (
                                                                    <div className="flex items-center">
                                                                        <div className="w-8 h-8 flex-shrink-0 mr-3 bg-gray-100 rounded-full flex items-center justify-center">
                                                                            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                                                                            </svg>
                                                                        </div>
                                                                        <div>
                                                                            <div className="text-sm font-medium text-gray-800">{match.loser.firstName} {match.loser.lastName}</div>
                                                                            <div className="text-xs text-gray-500">{match.loser.dojangName}</div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-sm text-gray-400">Not determined</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Tournament Results */}
                                {results.length > 0 && (
                                    <div className="p-6 bg-white rounded-xl shadow-lg">
                                        <h2 className="text-xl font-bold mb-4 text-gray-800">Tournament Results</h2>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winner</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loser</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {results.map(result => (
                                                        <tr key={result.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Match {result.match.id}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                                                        <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                                        </svg>
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <div className="text-sm font-medium text-gray-800">{result.winner.firstName} {result.winner.lastName}</div>
                                                                        <div className="text-xs text-gray-500">{result.winner.dojangName}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                                        <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                                        </svg>
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <div className="text-sm font-medium text-gray-800">{result.loser.firstName} {result.loser.lastName}</div>
                                                                        <div className="text-xs text-gray-500">{result.loser.dojangName}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}

                {/* Loading overlay */}
                {isLoading && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                            <svg className="animate-spin h-6 w-6 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-gray-700 font-medium">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TournamentManager;