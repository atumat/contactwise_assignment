
import Queue from 'bull';
import fs from 'fs';
import csv from 'csv-parser';
import { redisConfig } from '.\redis';




const userQueue = new Queue('user-processing', { redis: redisConfig });

export async function processCSV(filePath) {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        if (data.name && data.email) {
          results.push({
            name: data.name,
            email: data.email
          });
        }
      })
      .on('end', async () => {
        try {
          await Promise.all(
            results.map(user => 
              userQueue.add({
                userData: user
              })
            )
          );
          fs.unlinkSync(filePath);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
}

export { userQueue };