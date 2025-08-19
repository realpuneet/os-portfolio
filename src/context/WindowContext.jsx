import React, { createContext, useReducer, useContext, act } from "react";

const initialState = {
  windows: [],
  zIndexCounter: 1,
};

const actions = {
  // agar window already open hai z index update karo
  OPEN_WINDOW: (state, action) => ({
    ...state,
    windows: [
      ...state.windows,
      {
        id: action.payload.id,
        title: action.payload.title,
        readOnly: action.payload.readOnly || false,
        content: action.payload.content,
        icon: action.payload.icon,
        minimized: false,
        maximized: false,
        zIndex: state.zIndexCounter + 1,
      },
    ],
    zIndexCounter: state.zIndexCounter + 1,
  }),

  CLOSE_WINDOW: (state, action) => ({
    ...state,
    windows: state.windows.filter((win) => win.id !== action.payload),
  }),

  FOCUS_WINDOW: (state, action) => ({
    ...state,
    windows: state.windows.map((win) =>
      win.id === action.payload
        ? {
            ...win,
            zIndex: state.zIndexCounter + 1,
          }
        : win
    ),
  }),

  TOGGLE_MINIMIZE: (state, action) => ({
    ...state,
    windows: state.windows.map((w) =>
      w.id === action.payload ? { ...w, minimized: !w.minimized } : w
    ),
  }),

  TOGGLE_MAXIMIZE: (state, action) => ({
    ...state,
    windows: state.windows.map((w) =>
      w.id === action.payload ? { ...w, maximized: !w.maximized } : w
    ),
  }),
};

function windowsReducer(state, action) {
  const handler = actions[action.type];
  return handler ? handler(state, action) : state;
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
