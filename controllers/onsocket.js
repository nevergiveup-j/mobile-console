import express from 'express';
import socket from 'socket.io';
import config from '../config/config';

const io = socket(config.socketPort);

export default class Log {
  constructor(req, res) {
    this.onsocket();
  }
  /**
   * onsocket
   * @return {[type]} [description]
   */
  onsocket() {
    console.log('onsocket');

    io.on('connection', socket => {
      // console.log(sockets);
      socket.on('join', data => {
        console.log(data);
      })

      socket.emit('message', {
        id: 111,
        content: '11111'
      });
    })

    io.on('join', data => {
      console.log(data);
    })
  }
}