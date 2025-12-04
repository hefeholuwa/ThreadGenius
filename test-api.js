// Test chat-gpt26 API
import https from 'https';

const data = JSON.stringify({
    model: 'GPT-5-mini',
    messages: [
        {
            role: 'user',
            content: 'Say "API is working!" if you can read this.'
        }
    ]
});

const options = {
    method: 'POST',
    hostname: 'chat-gpt26.p.rapidapi.com',
    port: null,
    path: '/',
    headers: {
        'x-rapidapi-key': '041f0d6189mshd8b4921c1792bffp19861djsnedaefb451306',
        'x-rapidapi-host': 'chat-gpt26.p.rapidapi.com',
        'Content-Type': 'application/json'
    }
};

console.log('🔍 Testing chat-gpt26 API...\n');

const req = https.request(options, function (res) {
    const chunks = [];

    console.log('📡 Response Status:', res.statusCode);

    res.on('data', function (chunk) {
        chunks.push(chunk);
    });

    res.on('end', function () {
        const body = Buffer.concat(chunks).toString();
        console.log('\n📦 Raw Response:');
        console.log(body);

        try {
            const parsed = JSON.parse(body);
            console.log('\n📦 Parsed JSON:');
            console.log(JSON.stringify(parsed, null, 2));

            // Check various possible response formats
            if (parsed.result) {
                console.log('\n✅ SUCCESS! API is working!');
                console.log('🤖 AI Response:', parsed.result);
            } else if (parsed.choices && parsed.choices[0]) {
                console.log('\n✅ SUCCESS! API is working!');
                console.log('🤖 AI Response:', parsed.choices[0].message?.content || parsed.choices[0].text);
            } else if (parsed.response) {
                console.log('\n✅ SUCCESS! API is working!');
                console.log('🤖 AI Response:', parsed.response);
            } else if (parsed.error) {
                console.log('\n❌ API Error:', parsed.error.message || parsed.error);
            } else if (parsed.message) {
                console.log('\n❌ Error:', parsed.message);
            } else {
                console.log('\n⚠️  Unknown response format');
            }
        } catch (e) {
            console.log('\n⚠️  Response is not JSON:', e.message);
        }
    });
});

req.on('error', function (error) {
    console.error('\n❌ Request Error:', error.message);
});

req.write(data);
req.end();
