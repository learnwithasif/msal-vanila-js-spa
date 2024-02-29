// Mock token request configuration (replace with your actual configuration)
const tokenRequestConfig = {
    clientId: 'Paste_Your_Application_ID_Here',
    redirectUri: 'http://localhost:5500/index.html',
    scope: ['openid', 'profile', 'offline_access'],
};


// Mock UI update function (replace with your actual implementation)
function updateUI(response, endpoint) {
    console.log('Response from ' + endpoint + ':', response);
}

// Helper function to perform HTTP GET request
async function makeHttpRequest(endpoint, accessToken) {
    const headers = new Headers({
        'Authorization': `Bearer ${accessToken}`,
    });

    const options = {
        method: 'GET',
        headers: headers,
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();
    return data;
}

// Function to get access token using a mock authentication flow
async function getAccessToken() {
    // Mock authentication flow (replace with your actual implementation)
    const authCode = prompt('Enter authentication code:');

    // Mock token request
    const tokenEndpoint = 'https://graph.microsoft.com/v1.0/me'; // Replace with your actual token endpoint
    const tokenRequestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `code=${authCode}&client_id=${tokenRequestConfig.clientId}&redirect_uri=${tokenRequestConfig.redirectUri}&grant_type=authorization_code`,
    };

    const tokenResponse = await fetch(tokenEndpoint, tokenRequestOptions);
    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
}

// Function to perform profile or mail API call
async function callGraphApi(endpoint) {
    try {
        const accessToken = await getAccessToken();
        const responseData = await makeHttpRequest(endpoint, accessToken);
        updateUI(responseData, endpoint);
    } catch (error) {
        console.error('Error:', error);
    }
}

