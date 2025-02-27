import { userQueue } from '../lib/queue';
import axios from 'axios';

userQueue.process(async (job) => {
  const { userData } = job.data;

  try {
    const response = await axios.post('https://api.example.com/users', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(`User ${userData.email} processed successfully`);
    return response.data;
  } catch (error) {
    console.error(`Error processing user ${userData.email}:`, error.message);
    throw error;
  }
});

userQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

userQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed: ${err.message}`);
});