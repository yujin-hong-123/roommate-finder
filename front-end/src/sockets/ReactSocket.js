import { io } from 'socket.io-client'

export const socket = io('http://{$process.env.host}:3002');