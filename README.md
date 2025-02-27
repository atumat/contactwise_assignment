# Next.js CSV Processing

This is a Next.js application designed to upload CSV files containing user data (name and email), process them in the background using a queue system, and interact with an external API to add users. 
Developed on Windows, it showcs file handling, background job processing, API integration,  error management.

---

## Setup

### Prerequisites
- **Node.js**: Version 22.14.0 or later (download from [nodejs.org](https://nodejs.org/)).
- **Redis**: Windows port, e.g., `redis-x64-3.2.100.zip` (available at [Microsoft Archive](https://github.com/microsoftarchive/redis/releases)).
- **Windows OS**: Tested with Command Prompt on Windows.
- **Disk Space**: At least 20 MB free on `C:` drive for Redis and uploads.

### Installation Steps

1. **Initialize the Project**  
   Set up the Next.js project using `create-next-app`:
   ```cmd
   cd C:\Users\aarti
   npx create-next-app nextjs-csv-processing
   cd nextjs-csv-processing

This creates the base project structure, including pages and package.json.

2. **Install Dependencies**
Add required libraries for file handling, CSV parsing, queuing, and API requests:
    ```cmd

    npm install multer csv-parser bull axios redis

Ensures multer, csv-parser, bull, axios, and redis are available.

3. **Install Redis on Windows**
Redis is used for background job queuing:
Download redis-x64-3.2.100.zip from GitHub.

Extract to C:\Redis:
Right-click the ZIP file in Downloads.

Select "Extract All," set destination to C:\Redis, and click "Extract."

4. **Test Redis:**
     ```cmd

        cd C:\Redis
redis-server.exe

Expected output: "Server started, Redis version 3.2.100" and "ready to accept connections on port 6379."

Press Ctrl+C to stop for now.

5. **Set Up Directory Structure**
Create directories for the project components:
    ```cmd

    cd C:\Users\aarti\nextjs-csv-processing
    mkdir lib workers pages\api uploads

lib: Utility modules.

workers: Background job processor.

pages\api: API routes.

uploads: Temporary storage for uploaded CSVs.

Enable ES Modules
Modify package.json to support ES6 import syntax:
Open C:\Users\aarti\nextjs-csv-processing\package.json in an editor.
     ```

     {
      "name": "nextjs-csv-processing",
      "type": "module",
      "version": "0.1.0",
      "private": true,
     ...
      }

6. **Save the file.**

Add Project Files
Populate the directories with source code (see full code in the GitHub repository):
pages\api\upload.js: API route for CSV uploads.

lib\queue.js: Queue management with bull.

lib\redis.js: Redis configuration.

workers\userProcessor.js: Background job processor.

pages\index.js: Frontend upload form.

7. **Running the Application**
Start Redis
Open a Command Prompt (Terminal 1):
     ``` cmd

    C:\Redis\redis-server.exe

Keep this running to handle the job queue.

Start the Worker
Open a second Command Prompt (Terminal 2):
     ```cmd

       cd C:\Users\aarti\nextjs-csv-processing
         node workers\userProcessor.js

Processes queued jobs from CSV uploads.

8. **Start the Next.js Server**
Open a third Command Prompt (Terminal 3):
        ```cmd

         cd C:\Users\aarti\nextjs-csv-processing
         npm run dev

Runs the app at http://localhost:3000.

**Usage**
Prepare a CSV File
Create a file named users.csv:

name,email

Save it to C:\Users\aarti\nextjs-csv-processing.

**Upload the CSV**  
Open a browser and go to http://localhost:3000.

Click "Choose File," select users.csv, and click "Upload CSV."

See status messages (e.g., "File uploaded successfully and processing started").



**Features**
File Upload Handling: Uses multer to accept CSV files, with validation for .csv extension.

Background Processing: Implements bull with Redis to queue and process CSV data asynchronously.

API Interaction: Sends user data to an external API via axios (placeholder URL: https://api.example.com/users).

Error Handling:
Validates CSV for required fields (name, email).

Returns HTTP errors for upload failures.

Logs API errors in the worker.





