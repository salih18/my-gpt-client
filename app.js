const axios = require("axios");
const base64 = require("base-64");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const sessionIdFilePath = path.resolve("./session_id.txt");

// Default configuration - Can be modified as needed
const config = {
  baseUrl: "https://gpt.salihsert.com/generate-text", // Server URL
  username: "admin", // Basic Auth Username
  password: "password", // Basic Auth Password
  model: "gpt-3.5-turbo-16k-0613",
  customInstructions: "you are helpful assistant.", // Custom instructions
};

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

// Enhanced API communication handler for flexibility
const apiHandler = {
  sendPromptToServer: async function ({
    prompt,
    sessionId,
    model = config.model,
    maxTokens = 150,
  }) {
    const body = {
      prompt,
      sessionId,
      instructions: config.customInstructions,
      model,
      maxTokens,
    };
    const credentials = base64.encode(`${config.username}:${config.password}`);

    try {
      const response = await axios.post(config.baseUrl, body, {
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

  const userPromptIndex = shouldGenerateNewSession ? 1 : 0;

  if (args.length <= userPromptIndex) {
    console.log("Usage: node app.js [-n] '<prompt>'");
    process.exit(1);
  }

  const userPrompt = args.slice(userPromptIndex).join(" ");
  await apiHandler.sendPromptToServer({ prompt: userPrompt, sessionId });
})();
