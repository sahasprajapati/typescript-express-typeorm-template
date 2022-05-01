import { createParamDecorator } from 'routing-controllers';

export const SocketIoClient = (options: { required?: boolean }) => {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: (action) => {
      if (action.request.app) {
        return action.request.io;
      }

      return undefined;
    }
  });
};
