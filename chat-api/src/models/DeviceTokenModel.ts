import * as mongoose from 'mongoose';

export interface DeviceTokenDocument extends mongoose.Document {
  user_id: string;
  token: string;
  devicePlatform?: string;
  deviceYear?: string;
  systemVersion?: string;
}

const schema = new mongoose.Schema<DeviceTokenDocument>(
  {
    user_id: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    devicePlatform: {
      type: String
    },
    deviceName: {
      type: String
    },
    deviceYear: {
      type: String
    },
    systemVersion: {
      type: String
    }
  },
  { versionKey: false }
);

schema.index({ user_id: 1 });

export default mongoose.model<DeviceTokenDocument>('DeviceToken', schema);
