async function getQueries() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/promQueries/records?page=1&perPage=30', { cache: 'no-store' });
    const data = await res.json();
    return data?.items
}

async function getQuery(queryId) {
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/promQueries/records/${queryId}`, { cache: 'no-store' }
    );
    const data = await res.json();
    return data;
}

async function createQuery(payload) {
    const { query, description } = payload
    await fetch('http://127.0.0.1:8090/api/collections/promQueries/records', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            description
        }),
    });
}

async function editQuery(payload) {
    const { queryId, query, description } = payload
    await fetch(`http://127.0.0.1:8090/api/collections/promQueries/records/${queryId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            description
        }),
    })
}

async function deleteQuery(queryId) {
    await fetch(`http://127.0.0.1:8090/api/collections/promQueries/records/${queryId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}
export {
    getQueries,
    getQuery,
    createQuery,
    editQuery,
    deleteQuery
}