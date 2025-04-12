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
                setEvents(response.data);
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

            // Check for tournament completion
            const remainingParticipants = participantsResponse.data.filter(
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Tournament Bracket Manager</h1>

            {/* Status Messages */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {success}
                </div>
            )}

            {/* Event Selection */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Select Event</h2>
                <div className="flex flex-wrap gap-2">
                    {events.map(event => (
                        <button
                            key={event.eventId}
                            onClick={() => {
                                setSelectedEvent(event);
                                setSelectedWeightCategory(null);
                                setCurrentMatch(null);
                            }}
                            className={`px-4 py-2 rounded ${selectedEvent?.eventId === event.eventId ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                            {event.title}
                        </button>
                    ))}
                </div>
            </div>

            {selectedEvent && (
                <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-xl font-semibold mb-3">Select Weight Category</h2>
                    <div className="flex flex-wrap gap-2">
                        {weightCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedWeightCategory(category)}
                                className={`px-4 py-2 rounded ${selectedWeightCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {selectedEvent && selectedWeightCategory && (
                <div className="space-y-6">
                    {/* Participants List */}
                    <div className="p-4 bg-white rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-3">
                            Participants
                            {getWinner() && (
                                <span className="ml-2 text-green-600">Winner: {getWinner().firstName} {getWinner().lastName}</span>
                            )}
                        </h2>

                        <div className="mb-4">
                            <h3 className="font-medium text-lg mb-2">Active Participants (NOT OUT)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {getParticipantsByWeightCategory()
                                    .filter(p => p.playerStatus === 'NOTOUT')
                                    .map(participant => (
                                        <div key={participant.id} className="p-3 border rounded-lg bg-green-50">
                                            <p className="font-medium">{participant.firstName} {participant.lastName}</p>
                                            <p className="text-sm text-gray-600">{participant.dojangName}</p>
                                            <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                                NOT OUT
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium text-lg mb-2">Eliminated Participants (OUT)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {getParticipantsByWeightCategory()
                                    .filter(p => p.playerStatus === 'OUT')
                                    .map(participant => (
                                        <div key={participant.id} className="p-3 border rounded-lg bg-gray-50">
                                            <p className="font-medium">{participant.firstName} {participant.lastName}</p>
                                            <p className="text-sm text-gray-600">{participant.dojangName}</p>
                                            <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                                                OUT
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* <div className="p-4 bg-white rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-3">Match Results</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winner</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loser</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {matchResults.map((match) => (
                                        <tr key={match.matchId}>
                                            <td className="px-6 py-4 whitespace-nowrap">{match.matchId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{match.roundNumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(match.matchDate).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${match.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                        match.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'}`}>
                                                    {match.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {match.winner ? (
                                                    <div>
                                                        <div className="font-medium">{match.winner.firstName} {match.winner.lastName}</div>
                                                        <div className="text-sm text-gray-500">Dojang: {match.winner.dojangName}</div>
                                                        <div className="text-sm text-gray-500">User: {match.winner.userFirstName || 'N/A'} {match.winner.userLastName || ''}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">Not determined</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {match.loser ? (
                                                    <div>
                                                        <div className="font-medium">{match.loser.firstName} {match.loser.lastName}</div>
                                                        <div className="text-sm text-gray-500">Dojang: {match.loser.dojangName}</div>
                                                        <div className="text-sm text-gray-500">User: {match.loser.userFirstName || 'N/A'} {match.loser.userLastName || ''}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">Not determined</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div> */}
                    {currentMatchResult.length > 0 && (
                        <div className="p-4 bg-white rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-3">Detailed Match Results</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winner Details</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loser Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentMatchResult.map((match) => (

                                            <tr key={match.matchId}>
                                                <td className="px-6 py-4 whitespace-nowrap">{match.roundNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {new Date(match.matchDate).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${match.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                            match.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'}`}>
                                                        {match.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {match.winner ? (
                                                        <div>
                                                            <div className="font-medium">{match.winner.firstName} {match.winner.lastName}</div>
                                                            <div className="text-sm text-gray-500">Dojang: {match.winner.dojangName}</div>
                                                            <div className="text-sm text-gray-500">User ID: {match.winner.userId}</div>
                                                            <div className="text-sm text-gray-500">Username: {match.winner.username || 'N/A'}</div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">Not determined</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {match.loser ? (
                                                        <div>
                                                            <div className="font-medium">{match.loser.firstName} {match.loser.lastName}</   div>
                                                            <div className="text-sm text-gray-500">Dojang: {match.loser.dojangName}</div>
                                                            <div className="text-sm text-gray-500">User ID: {match.loser.userId}</div>
                                                            <div className="text-sm text-gray-500">Username: {match.loser.username || 'N/A'}</div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">Not determined</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Match Controls */}
                    <div className="p-4 bg-white rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-3">Match Controls</h2>
                        <div className="flex flex-wrap gap-4 items-center">
                            <button
                                onClick={createNewMatch}
                                disabled={isLoading || currentMatch || getWinner()}
                                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                            >
                                {isLoading ? 'Processing...' : 'Create New Match'}
                            </button>

                            <button
                                onClick={resetTournament}
                                disabled={isLoading}
                                className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
                            >
                                {isLoading ? 'Processing...' : 'Reset Tournament'}
                            </button>
                        </div>
                    </div>

                    {/* Current Match */}
                    {currentMatch && (
                        <div className="p-4 bg-white rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-3">Current Match</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-4 border rounded-lg text-center">
                                    <h3 className="font-medium text-lg">
                                        {currentMatch.player1.firstName} {currentMatch.player1.lastName}
                                    </h3>
                                    <p className="text-sm text-gray-600">{currentMatch.player1.dojangName}</p>
                                    <button
                                        onClick={() => recordMatchResult(currentMatch.player1, currentMatch.player2)}
                                        disabled={isLoading}
                                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                                    >
                                        {isLoading ? 'Processing...' : 'Winner'}
                                    </button>
                                </div>

                                <div className="p-4 border rounded-lg text-center">
                                    <h3 className="font-medium text-lg">
                                        {currentMatch.player2.firstName} {currentMatch.player2.lastName}
                                    </h3>
                                    <p className="text-sm text-gray-600">{currentMatch.player2.dojangName}</p>
                                    <button
                                        onClick={() => recordMatchResult(currentMatch.player2, currentMatch.player1)}
                                        disabled={isLoading}
                                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                                    >
                                        {isLoading ? 'Processing...' : 'Winner'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tournament Results */}
                    {results.length > 0 && (
                        <div className="p-4 bg-white rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-3">Match Results</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winner</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loser</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {results.map(result => (
                                            <tr key={result.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">Match {result.match.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {result.winner.firstName} {result.winner.lastName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {result.loser.firstName} {result.loser.lastName}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}


                </div>
            )}
        </div>
    );
};

export default TournamentManager;