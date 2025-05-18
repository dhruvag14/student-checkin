import { useState, useEffect } from 'react';

export default function Home() {
    const [form, setForm] = useState({ name: '', usn: '', email: '', event: '' });
    const [submitted, setSubmitted] = useState(false);
    const [events, setEvents] = useState<string[]>([]); // Event list fetched from backend

    useEffect(() => {
        // Fetch events from API (you'll build this route later)
        const fetchEvents = async () => {
            const res = await fetch('/api/events');
            const data = await res.json();
            setEvents(data.events || []);
        };
        fetchEvents();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) setSubmitted(true);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded p-6 w-full max-w-md">
                {!submitted ? (
                    <>
                        <h1 className="text-2xl font-bold mb-4 text-center">Student Check-In</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                name="name"
                                placeholder="Name"
                                required
                                className="w-full p-2 border rounded"
                                onChange={handleChange}
                            />
                            <input
                                name="usn"
                                placeholder="USN"
                                required
                                className="w-full p-2 border rounded"
                                onChange={handleChange}
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                required
                                className="w-full p-2 border rounded"
                                onChange={handleChange}
                            />
                            <select
                                name="event"
                                required
                                className="w-full p-2 border rounded"
                                onChange={handleChange}
                                value={form.event}
                            >
                                <option value="">Select Event</option>
                                {events.map((event, idx) => (
                                    <option key={idx} value={event}>
                                        {event}
                                    </option>
                                ))}
                            </select>
                            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                Register
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <h2 className="text-green-600 text-xl font-bold mb-2">Registration Successful!</h2>
                        <p><strong>Name:</strong> {form.name}</p>
                        <p><strong>USN:</strong> {form.usn}</p>
                        <p><strong>Email:</strong> {form.email}</p>
                        <p><strong>Event:</strong> {form.event}</p>
                    </div>
                )}
            </div>
        </main>
    );
}
