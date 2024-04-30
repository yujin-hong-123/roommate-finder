import { io } from 'socket.io-client'

export const socket = io('http://{$process.env.HOST}:3002');