import express from 'express';
import socketio from 'socket.io';
import config from '../config/config';

const io = socketio(config.socketPort);

export default class Log {
  constructor(req, res) {
    this.arr = {};

    this.onsocket();
  }
  /**
   * onsocket
   * @return {[type]} [description]
   */
  onsocket() {

    io.on('connection', socket => {
      let id = 0;  

      socket.on('join', data => {
        id = data.id;
        this.arr[id] = {};
      });

      let number = 1;

      let timer = setInterval(() => {
        socket.emit('message', {
          id: '22',
          body: number,
          screen: '1920x1080',
          bowser: 'Chrome',
          platform: 'Mac',
          version: '50',
          date: '15:22:15'
        });

        number++;
      }, 1500)

      
    })
  }
}