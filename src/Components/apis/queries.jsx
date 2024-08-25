// import PocketBase from 'pocketbase';
async function getQueries() {
    // const db = new PocketBase('http://127.0.0.1:8090');
    // const result = await db.records.getList('promQueries');
    const res = await fetch('http://127.0.0.1:8090/api/collections/promQueries/records?page=1&perPage=30', { cache: 'no-store' });
    const data = await res.json();
    return data?.items
}

async function getQuery(queryId) {
    // const db = new PocketBase('http://127.0.0.1:8090');
    // await db.records.getOne('promQueries', {
    //   id: queryId
    // });
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/promQueries/records/${queryId}`, { cache: 'no-store' }
    );
    const data = await res.json();
    return data;
}

async function createQuery(payload) {
    // const db = new PocketBase('http://127.0.0.1:8090');
    // await db.records.create('notes', {
    // query,
    // description
    // });
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
    // const db = new PocketBase('http://127.0.0.1:8090');
    // await db.records.update('promQueries', {
    // id: queryId,
    // query,
    // description
    // });
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
    // const db = new PocketBase('http://127.0.0.1:8090');
    // await db.records.delete('promQueries', {
    //   id: queryId
    // });
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