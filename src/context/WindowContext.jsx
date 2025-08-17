import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  windows: [],
};

const actions = {
  // agar window already open hai z index update karo
  OPEN_WINDOW: (state, payload) => {
    if (state.windows.some((win) => win.id === payload.id)) {
      return {
        ...state,
        windows: state.windows.map((win) =>
          win.id === payload.id
            ? {
                ...win,
                zIndex: Math.max(...state.windows.map((w) => w.zIndex)) + 1,
              }
            : win
        ),
      };
    }
    //agar window open nahi hai => new window add karo
    return {
      ...state,
      windows: [
        ...state.windows,
        { ...payload, zIndex: state.windows.length + 1 },
      ],
    };
  },

  CLOSE_WINDOW: (state, payload) => ({
    ...state,
    windows: state.windows.filter((win) => win.id !== payload),
  }),

  FOCUS_WINDOW: (state, payload) => ({
    ...state,
    windows: state.windows.map((win) =>
      win.id === payload
        ? {
            ...win,
            zIndex: Math.max(...state.windows.map((w) => w.zIndex)) + 1,
          }
        : win
    ),
  }),
};

function windowsReducer(state, action) {
  const handler = actions[action.type];
  if (!handler) return state;
  return handler(state, action.payload);
}

const WindowContext = createContext();

export function WindowProvider({ children }) {
  const [state, dispatch] = useReducer(windowsReducer, initialState);
  return (
    <WindowContext.Provider value={{ state, dispatch }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  return useContext(WindowContext);
}
