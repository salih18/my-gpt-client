
## Introduction

This Node.js application interacts with an external API to send user prompts and receive generated text responses. It utilizes session management to maintain a unique session for each user, allowing for persistent interactions with the API across multiple commands.

## Requirements

- Node.js (version 12 or later)
- NPM (Node Package Manager)

## Installation

First, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

Then, install the necessary dependencies:

```bash
npm install
```

## Usage

To run the application, use the following command structure:

```bash
node app.js [-n] '<prompt>'
```

- `-n`: Optional flag to generate a new session ID. If omitted, the application will use the existing session ID if available.
- `'<prompt>'`: Required. The user prompt to send to the external API.

Examples:

1. To run the application with a new session and send a prompt:

```bash
node app.js -n 'Your prompt here'
```

2. To run the application with an existing session ID and send a prompt:

```bash
node app.js 'Your prompt here'
```

## Description

Upon execution, the application checks for the presence of a session ID. If the `-n` flag is provided or no session ID exists, a new session ID is generated and stored locally. The provided prompt is then sent to the configured external API using the session ID. The application receives and displays the generated text response from the API.
