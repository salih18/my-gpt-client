const axios = require("axios");
const base64 = require("base-64");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const sessionIdFilePath = path.resolve("./session_id.txt");

// Custom Instructions - Modify as needed
const customInstructions = "you are a joke teller when i give you a word you include that word in the joke";

// Session management utilities
const sessionManager = {
  getSessionId: function () {
    try {
      return fs.readFileSync(sessionIdFilePath, "utf8");
    } catch (err) {
      console.log("No existing session ID found, generating a new one.");
      return this.generateNewSessionId();
    }
  },

  generateNewSessionId: function () {
    const newSessionId = uuidv4();
    fs.writeFileSync(sessionIdFilePath, newSessionId);
    console.log("New session ID generated.");
    return newSessionId;
  },
};

// API communication handler
const apiHandler = {
  baseUrl: "https://gpt.salihsert.com/generate-text",
  username: "admin", // Replace with actual username
  password: "password", // Replace with actual password

  sendPromptToServer: async function (prompt, sessionId) {
    const url = this.baseUrl;
    const body = {
      prompt: prompt,
      sessionId: sessionId,
      instructions: customInstructions
    };
    const credentials = base64.encode(`${this.username}:${this.password}`);

    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.data.choices) {
        response.data.choices.forEach((choice) => {
          console.log(choice.message.content);
        });
      } else {
        console.log("Response:", response.data);
      }
    } catch (error) {
      console.error(
        "Error when calling the server:",
        error.response ? error.response.data : error.message
      );
    }
  },
};

// Main logic to handle command line arguments and send prompt to server
(async () => {
  const args = process.argv.slice(2);
  const shouldGenerateNewSession = args.includes("-n");
  const sessionId = shouldGenerateNewSession
    ? sessionManager.generateNewSessionId()
    : sessionManager.getSessionId();

  // Adjusting index for prompt based on whether a new session ID is generated
  const userPromptIndex = shouldGenerateNewSession ? 1 : 0;

  if (args.length <= userPromptIndex) {
    console.log("Usage: node app.js [-n] '<prompt>'");
    process.exit(1);
  }

  const userPrompt = args.slice(userPromptIndex).join(" ");
  await apiHandler.sendPromptToServer(userPrompt, sessionId);
})();

