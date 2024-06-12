const axios = require('axios');

const serverUrl = 'http://localhost:3000';

const subscribe = async (topicId, subscriberId) => {
    try {
        const response = await axios.post(`${serverUrl}/subscribe`, { topicId, subscriberId });
        console.log(response.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
};

const notify = async (topicId) => {
    try {
        const response = await axios.post(`${serverUrl}/notify`, { topicId });
        console.log(response.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
};

const unsubscribe = async (topicId, subscriberId) => {
    try {
        const response = await axios.post(`${serverUrl}/unsubscribe`, { topicId, subscriberId });
        console.log(response.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
};

const driver = async () => {
    console.log('Starting Publisher-Subscriber Notification System...');

    const topicId = 'topic1';
    const subscriberId1 = 'subscriber1';
    const subscriberId2 = 'subscriber2';

    console.log('\n--- Subscribe ---');
    await subscribe(topicId, subscriberId1);
    await subscribe(topicId, subscriberId2);

    console.log('\n--- Notify ---');
    await notify(topicId);

    console.log('\n--- Unsubscribe ---');
    await unsubscribe(topicId, subscriberId1);

    console.log('\n--- Notify After Unsubscription ---');
    await notify(topicId);
};

driver();
