const API_BASE = 'http://localhost:3001/api';

/**
 * Thin fetch wrapper — centralises base URL, JSON parsing, and error handling.
 * Usage:
 *   const data = await api.get('/dashboard/job-metrics');
 *   const created = await api.post('/jobs', { company: 'Acme', role: 'SWE' });
 */
const api = {
    async get(path) {
        const res = await fetch(`${API_BASE}${path}`);
        if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
        return res.json();
    },

    async post(path, body) {
        const res = await fetch(`${API_BASE}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
        return res.json();
    },

    async put(path, body) {
        const res = await fetch(`${API_BASE}${path}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`PUT ${path} failed: ${res.status}`);
        return res.json();
    },

    async del(path) {
        const res = await fetch(`${API_BASE}${path}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
        return res.json();
    },
};

export default api;
