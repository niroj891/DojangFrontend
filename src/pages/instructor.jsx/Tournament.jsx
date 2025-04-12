import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TournamentManager = () => {
    // State management
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedWeightCategory, setSelectedWeightCategory] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [matches, setMatches] = useState([]);
    const [rounds, setRounds] = useState([]);
    const [currentMatch, setCurrentMatch] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Weight categories from enum
    const weightCategories = ['BELOW54', 'BELOW58', 'BELOW63', 'BELOW68'];

    // Fetch events on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9696/instructor/event', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
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

    // Fetch participants when event is selected
    useEffect(() => {
        if (!selectedEvent) return;

        const fetchParticipants = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:9696/instructor/events/${selectedEvent.eventId}/participants`,
                    {
                        headers:
                        {
                            Authorization: `Bearer ${localStorage.getItem('jwt')}`
                        }
                    }
                );
                console.log(response.data)
                setParticipants(response.data);
            } catch (err) {
                setError('Failed to load participants');
            } finally {
                setIsLoading(false);
            }
        };
        fetchParticipants();
    }, [selectedEvent]);

    // Fetch tournament progress when weight category is selected
    useEffect(() => {
        if (!selectedEvent || !selectedWeightCategory) return;

        const fetchTournamentProgress = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:9696/instructor/tournaments/progress?eventId=${selectedEvent.eventId}&weightCategory=${selectedWeightCategory}`
                    , {
                        headers:
                        {
                            Authorization: `Bearer ${localStorage.getItem('jwt')}`
                        }
                    }
                );
                setMatches(response.data.matches);
                setRounds(response.data.rounds);

                // Set current match if there's an incomplete one
                const incompleteMatch = response.data.matches.find(
                    m => m.status === 'SCHEDULED' || m.status === 'IN_PROGRESS'
                );
                setCurrentMatch(incompleteMatch);
            } catch (err) {
                setError('Failed to load tournament progress');
            } finally {
                setIsLoading(false);
            }
        };
        fetchTournamentProgress();
    }, [selectedEvent, selectedWeightCategory]);

    // Create a new match
    const createNewMatch = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `http://localhost:9696/instructor/matches/create?eventId=${selectedEvent.eventId}&weightCategory=${selectedWeightCategory}
                `, {}, {
                headers:
                {
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

    // Record round result
    const recordRoundResult = async (winner, loser) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `http://localhost:9696/instructor/match/result?matchId=${currentMatch.id}&winnerId=${winner.id}&loserId=${loser.id}`, {},
                {
                    headers:
                    {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            );

            // Update state
            setRounds([...rounds, response.data]);
            setCurrentMatch(null);
            setSuccess('Round result recorded successfully');

            // Refresh participants
            const participantsResponse = await axios.get(
                `http://localhost:9696/instructor/events/${selectedEvent.eventId}/participants?weightCategory=${selectedWeightCategory}`, {
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
            );
            setParticipants(participantsResponse.data);

            // Check for tournament completion
            if (participantsResponse.data.filter(p => p.playerStatus === 'NOTOUT').length === 1) {
                setSuccess(`Tournament complete! Winner: ${participantsResponse.data.find(p => p.playerStatus === 'NOTOUT').firstName}`);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to record round result');
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
                `http://localhost:9696/instructor/tournaments/reset?eventId=${selectedEvent.eventId}&weightCategory=${selectedWeightCategory}`, {}, {
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
            );

            // Refresh data
            const [participantsResponse, progressResponse] = await Promise.all([
                axios.get(`http://localhost:9696/instructor/events/${selectedEvent.eventId}/participants?weightCategory=${selectedWeightCategory}`, {
                    headers:
                    {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }),
                axios.get(`http://localhost:9696/instructor/tournaments/progress?eventId=${selectedEvent.eventId}&weightCategory=${selectedWeightCategory}`, {
                    headers:
                    {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
            ]);

            setParticipants(participantsResponse.data);
            setMatches(progressResponse.data.matches);
            setRounds(progressResponse.data.rounds);
            setCurrentMatch(null);
            setSuccess('Tournament reset successfully');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset tournament');
        } finally {
            setIsLoading(false);
        }
    };
    // Filter participants by status and weight category
    const getFilteredParticipants = () => {
        if (!selectedEvent || !selectedWeightCategory) return [];
        return participants.filter(
            p => p.weightCategory === selectedWeightCategory && p.playerStatus === 'NOTOUT'
        );
    };

    // Get winner if tournament is complete
    const getWinner = () => {
        const remaining = getFilteredParticipants();
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
                            Participants ({getFilteredParticipants().length} remaining)
                            {getWinner() && (
                                <span className="ml-2 text-green-600">Winner: {getWinner().firstName} {getWinner().lastName}</span>
                            )}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {getFilteredParticipants().map(participant => (
                                <div key={participant.id} className="p-3 border rounded-lg">
                                    <p className="font-medium">{participant.firstName} {participant.lastName}</p>
                                    <p className="text-sm text-gray-600">{participant.dojangName}</p>
                                </div>
                            ))}
                        </div>
                    </div>

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
                                        onClick={() => recordRoundResult(currentMatch.player1, currentMatch.player2)}
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
                                        onClick={() => recordRoundResult(currentMatch.player2, currentMatch.player1)}
                                        disabled={isLoading}
                                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                                    >
                                        {isLoading ? 'Processing...' : 'Winner'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tournament Progress */}
                    {(matches.length > 0 || rounds.length > 0) && (
                        <div className="p-4 bg-white rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-3">Tournament Progress</h2>

                            {/* Matches */}
                            <h3 className="font-medium mb-2">Matches</h3>
                            <div className="overflow-x-auto mb-4">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player 1</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player 2</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {matches.map(match => (
                                            <tr key={match.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{match.roundNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {match.player1.firstName} {match.player1.lastName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {match.player2.firstName} {match.player2.lastName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{match.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Rounds */}
                            <h3 className="font-medium mb-2">Rounds</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winner</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loser</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {rounds.map(round => (
                                            <tr key={round.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">Match {round.match.roundNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{round.roundNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {round.winner.firstName} {round.winner.lastName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {round.loser.firstName} {round.loser.lastName}
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