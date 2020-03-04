import NEString from './NEString';
import Timestamp from './Timestamp';

export default {
  declarations: [
    NEString.declaration,
    Timestamp.declaration,
  ],
  resolvers: {
    ...NEString.type,
    ...Timestamp.type,
  }
};

