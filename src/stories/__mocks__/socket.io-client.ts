export const io = () => ({
  on: () => {},
  emit: () => {},
  off: () => {},
  disconnect: () => {},
  connected: false,
  timeout: () => ({
    emitWithAck: () => Promise.reject("socket.io-client mock"),
  }),
});

export type Socket = ReturnType<typeof io>;
