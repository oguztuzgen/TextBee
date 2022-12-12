import React from "react"
import { useState } from "react"
import { OffcanvasBody } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"
import Badge from "react-bootstrap/Badge"
import "./HomePage.css"
import io from "socket.io-client"
import ChatPreviews from "./ChatPreviews"
import SpeechBubbleReceived from "../Components/SpeechBubbleOther"
import Cookies from "universal-cookie"

import ChatBarPrivate from "../Components/ChatBarPrivate"
import ChatBarGroup from "../Components/ChatBarGroup"
import ChatCardHeader from "../Components/ChatCardHeader"
import SpeechBubbleSent from "../Components/SpeechBubbleSent"
import { useEffect } from "react"
import { useRef } from "react"

const connection = io("http://localhost:3001")
const { username, token } = new Cookies().getAll()

connection.on("connect", (socket) => {
	console.log("Connected!")
})

function HomePage() {
	const messagesEndRef = useRef(null)
	const [offcanvasVisible, setOffcanvasVisible] = useState(false)
	const [messages, setMessages] = useState([])
	const [typingMessage, setTypingMessage] = useState("")

	useEffect(() => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	function onMessageSend(e) {
		e.preventDefault()
		// send message
		if (!typingMessage.trim()) return
		const data = { sentAt: Date.now(), sender: username, message: typingMessage }
		setMessages([...messages, data])
		connection.emit("messageSent", data)
		setTypingMessage("")
	}

	connection.on("userConnected", (socket) => {
		setMessages([...messages, { sentAt: Date.now(), sender: "server", message: "new connection" }])
	})

	// receive message
	connection.on("messageSent", (data) => {
		setMessages([...messages, data])
	})

	return (
		<div>
			<Button className="btn-show-chats" variant="primary" onClick={() => setOffcanvasVisible(true)}>
				Show Chats {""} <Badge bg="success">1</Badge>
			</Button>
			<hr />

			<ChatCardHeader></ChatCardHeader>
			<SpeechBubbleReceived />
			<SpeechBubbleSent />

			<Offcanvas show={offcanvasVisible} backdrop="false" onHide={() => setOffcanvasVisible(false)}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Disturd 💩</Offcanvas.Title>
				</Offcanvas.Header>
				<OffcanvasBody>
					<div style={{ display: "flex", gap: "10px" }}>
						<ChatBarPrivate /> <ChatBarGroup />
					</div>
					<hr />

					<div style={{ display: "flex" }}>
						<ChatPreviews></ChatPreviews>
					</div>
				</OffcanvasBody>
			</Offcanvas>
			<ul id="messages">
				{messages.map((message) => {
					if (message.sender === username) {
						<li> <SpeechBubbleSent name={message.sender} message={message.message}/> </li>

					}
					else {

					}
				}
					
				)}
				{messages.map((message) => (
					<li>{`${new Date(message.sentAt).toTimeString().split(' ')[0]} ${message.sender}: ${message.message}`}</li>
				))}
				<div ref={messagesEndRef}></div>
			</ul>
			<form id="form" action="" onSubmit={onMessageSend}>
				<input id="input" value={typingMessage} onChange={(e) => setTypingMessage(e.target.value)} autoComplete="off" />
				<button>Send</button>
			</form>
		</div>
	)
}

export default HomePage
