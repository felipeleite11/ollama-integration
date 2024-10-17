## Ollama NodeJS Integration
(with official SDK)

### How it works?

Ollama is an AI engine that you can run locally. It's customizable and no network connection is required.

By installing Ollama, a local rest client is started on ```http://localhost:11434```.

You need to install any model. In this project, we'll use the ```llama3.1```. To install it, run on terminal ```ollama pull llama3.1``` and wait for download.

After this, you can run ```ollama run llama3.1``` to interact with this model, asking anything.

To test the API, you can call ```POST http://localhost:11434/api/generate``` from a rest client, passing the body below:

```
body {
	"model": "llama3.1",
	"stream": false,
	"prompt": "Your question here..."
}
```

The response includes the ```response``` property, containing your answer.

### Configuration

1. Download Ollama from [ollama.com](https://ollama.com/download).
2. Execute Ollama locally.
3. Pull the model: ```ollama pull llama3.1```.
4. Run the Node App by ```npm run dev``` or ```yarn dev```.
5. Call ```http://localhost:3333/list_models``` to test it.

### Endpoints

##### ```GET /list_models```

List all intalled models.

##### ```POST /reply```

Reply a question from a prompt.

```
body {
	input: "My question here..."
}
```

Reponse format

```
response: "The answer here..."
```

##### ```POST /chat```

Have a conversation with AI. The context duration is 5 minutes.

```
body {
	input: "My message here..."
}
```

Reponse format

```
response: "The answer here..."
```