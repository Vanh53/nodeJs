import { EventEmitter } from 'node:events';

type UserCreatedPayload = {
  id: string;
  email: string;
};

class UserEvents extends EventEmitter {
  emitUserCreated(payload: UserCreatedPayload): boolean {
    return this.emit('user.created', payload);
  }

  onUserCreated(listener: (payload: UserCreatedPayload) => void): this {
    return this.on('user.created', listener);
  }
}

const events = new UserEvents();

events.onUserCreated((payload) => {
  console.log('send welcome email:', payload.email);
});

events.onUserCreated((payload) => {
  console.log('write audit log:', payload.id);
});

events.emitUserCreated({ id: 'u1', email: 'lan@example.com' });
