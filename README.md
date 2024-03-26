
# Node.js Application consuming gpt4free

This Node.js application allows users to interact with an external API for generating text based on user prompts and a set of predefined custom instructions. It's designed for scenarios where specific guidance is required for the generated content, such as joke generation, story creation, or any customized text output.

## Key Features

- **Session Management**: Ensures a continuous and coherent interaction within each session by managing session IDs.
- **Customizable Instructions**: Allows the definition of custom instructions to guide the API's text generation process.
- **API Integration**: Facilitated communication with external APIs for flexible and dynamic text generation.

## Requirements

- Node.js (version 12 or newer)
- NPM (Node Package Manager)

## Installation

To get started, follow these steps:

1. **Clone the Project**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

## Configuration

Before using the application, make sure to configure the following elements:

- **API Endpoint and Authentication**: Set `apiHandler.baseUrl`, `apiHandler.username`, and `apiHandler.password` to your specific API endpoint and authentication details.
- **Custom Instructions**: Modify the `customInstructions` variable to tailor how the API processes your prompts. This feature is crucial for directing the nature and tone of the API's text responses.

## How to Use

Execute the application with the following command, adding `-n` to initiate a new session, followed by your prompt:

```bash
node app.js [-n] '<prompt>'
```

### Command Options

- `-n`: Optional. Initiates a new session, useful for starting a new conversation thread or context.
- `<prompt>`: Required. Your input for the API, which will be processed in accordance with the custom instructions.

### Custom Instructions

The `customInstructions` variable plays a vital role in shaping the output. For instance, setting it to "you are a joke teller when I give you a word you include that word in the joke" instructs the API to generate jokes involving the provided word. Adjust this variable in the script to match your desired application.

### Examples

1. **Start with a New Session and Specific Prompt**:

   ```bash
   node app.js -n 'Tell me a joke about elephants'
   ```

2. **Continue with an Existing Session**:

   ```bash
   node app.js 'What about a joke on computers?'
   ```

## Troubleshooting

- **Persistent Session IDs**: If you're experiencing issues with session continuity, ensure `session_id.txt` is readable and writable.
- **API Communication**: Confirm that the API URL and credentials are correctly configured and that the API service is available.

