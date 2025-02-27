Create a new file in your editor (e.g., Notepad, VS Code) and paste the following:
markdown

# Next.js CSV Processing

This is a Next.js application that allows users to upload CSV files containing user data, processes them in the background, and adds users via an external API.

## Setup

1. Clone the repository (or set up manually if not using Git):
   - If using Git: `git clone <repository-url>`
   - Otherwise, ensure all files are in `C:\Users\YourUsername\nextjs-csv-processing`.

2. Install dependencies:
   ```cmd
   cd C:\Users\YourUsername\nextjs-csv-processing
   npm install

Install Redis on Windows:
Download redis-x64-3.2.100.zip from https://github.com/microsoftarchive/redis/releases.

Extract to C:\Redis:
Right-click the ZIP, select "Extract All," choose C:\Redis.

Test it:
cmd

cd C:\Redis
redis-server.exe

You should see "Server started, Redis version 3.2.100" and port 6379 active.

Run the application:
Open three Command Prompt windows:
Window 1: Start Redis
cmd

C:\Redis\redis-server.exe

Window 2: Start the worker
cmd

cd C:\Users\YourUsername\nextjs-csv-processing
node workers\userProcessor.js

Window 3: Start the Next.js server
cmd

cd C:\Users\YourUsername\nextjs-csv-processing
npm run dev




