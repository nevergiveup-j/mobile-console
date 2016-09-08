import mongoose from 'mongoose';

import config from './config';

mongoose.connect('mongodb://' + config.mongodb.host + config.mongodb.db);

export default mongoose;