import mongoose from './db';

const logSchema = new mongoose.Schema({
  id: String,
  body: String,
  screen: String,
  useragent: String,
  version: Number,
  platform: String,
  bowser: String,
  type: String,
  date: Number
});

const logModel = mongoose.model('log', logSchema);

const Logs = {
  getAll(callback) {
    logModel.find({}, callback);
  },
  getRoomId(id, callback) {
    logModel
      .find({id: id}, callback);
  },
  /**
   * 创建
   * @param  {[type]}   data     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  create(data, callback) {
    const log = new logModel(data);

    log.save((err, person) => {
      if(err) {
        return callback(err);
      }

      callback(err, person);
    });
  }
}

export default Logs;

