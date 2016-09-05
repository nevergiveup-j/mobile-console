import express from 'express';
import bowser from '../models/bowser';


export default class Log {
  constructor(req, res) {
    this.query(req);
  }
  /**
   * 获取参数
   * @param  {[type]} req [description]
   * @return {[type]}     [description]
   */
  query(req) {
    let param = req.query,
      useragent = bowser(req.headers['user-agent']);

    console.log(req);

    param = Object.assign(param, {
      useragent: req.headers['user-agent'],
      bowser: useragent.name
    });

  }
}