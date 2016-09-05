import express from 'express';
import socket from 'socket.io';

import bowser from '../models/bowser';

const io = socket(config.socketPort).of('/log');

export default class Log {
  constructor(req, res) {
    this.query(req);
    this.onsocket();
  }
  /**
   * 获取参数
   * @param  {[type]} req [description]
   * @return {[type]}     [description]
   */
  query(req) {
    let param = req.query,
      useragent = bowser(req.headers['user-agent']);

    param = Object.assign(param, {
      useragent: req.headers['user-agent'],
      bowser: useragent.name
    });

  }
  /**
   * onsocket
   * @return {[type]} [description]
   */
  onsocket() {

    io.on('connection', socket => {
      socket.on('join', data => {
        console.log(data);
      })
    })

  }
}