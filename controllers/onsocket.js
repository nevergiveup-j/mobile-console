import express from 'express';
import socketio from 'socket.io';
import config from '../config/config';
import logs from '../config/log';

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

      logs.getRoomId(id, (err, data) => {
        // if(err) {
        //   return;
        // }

        // socket.emit('message', data);

        console.log(err);
        console.log(data);
      });

      // let timer = setInterval(() => {
        

      //   number++;
      // }, 1500)

      
    })
  }
}