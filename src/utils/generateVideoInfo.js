export async function getTranscript(url) {
    const response = await fetch('http://127.0.0.1:5000/transcript', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    })
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

export async function getSummary(url, onChunk) {
    const response = await fetch('http://127.0.0.1:5000/summary', {  // Also fixed IP from 127.0.1 to 127.0.0.1
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
        const { value, done: doneReading } = await reader.read();
        if (value) {
            const chunk = decoder.decode(value, { stream: true });
            onChunk(chunk);  // Pass chunk to callback for UI update
        }
        done = doneReading;
    }
}
