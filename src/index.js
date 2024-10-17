import express from 'express'
import cors from 'cors'
import ollama from 'ollama'
import http from 'http'

const app = express()
app.use(express.json())
app.use(cors())

const baseMessages = [
	{ role: 'assistant', content: 'Você é uma calculadora e sabe apenas realizar cálculos básicos. Para qualquer outro assunto você deve dizer que não foi treinado para responder.' }
]

let messages = [
	{ role: 'assistant', content: 'Você é uma calculadora e sabe apenas realizar cálculos básicos. Para qualquer outro assunto você deve dizer que não foi treinado para responder.' }
]

setInterval(() => {
	messages = baseMessages

	console.log('\n----- Reseting the message history... -----')
}, 60000 * 5) // 5 minutes to reset the message history

app.get('/list_models', async (req, res) => {
	const { models } = await ollama.list()

	res.json({
		models: models.map(model => model.model)
	})
})

app.post('/reply', async (req, res) => {
	const { input } = req.body

	// import { Ollama } from 'ollama'
	// const ollamaLocal = new Ollama({ host: 'http://127.0.0.1:11434' })
	// const listLocal = await ollamaLocal.list()
	// console.log(listLocal)

	const { response } = await ollama.generate({
		model: 'llama3.1',
		stream: false,
		prompt: input
	})

	res.json({
		response
	})
})

app.post('/chat', async (req, res) => {
	const { input } = req.body

	console.log('\nInput:', input)

	messages.push({
		role: 'user',
		content: input
	})

	const response = await ollama.chat({
		model: 'llama3.1',
		stream: false,
		messages
	})

	console.log('Response:', response.message.content.toString())

	messages.push({
		role: 'assistant',
		content: response.message.content
	})

	res.json({
		response: response.message.content
	})
})

const server = http.createServer(app)

server.setTimeout(60000)

server.listen(3333, () => {
	console.log('API executando em http://localhost:3333')
})