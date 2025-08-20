import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  windows: [],
  zIndexCounter: 1,
};

const actions = {
  OPEN_WINDOW: (state, action) => {
    // Check if window already exists
    const existingWindow = state.windows.find(w => w.id === action.payload.id);

    if (existingWindow) {
      return {
        ...state,
        windows: state.windows.map(window =>
          window.id === action.payload.id
            ? { 
                ...window, 
                minimized: false,
                zIndex: state.zIndexCounter + 1 
              }
            : window
        ),
        zIndexCounter: state.zIndexCounter + 1
      };
    }

    return {
      ...state,
      windows: [
        ...state.windows,
        {
          id: action.payload.id,
          title: action.payload.title,
          readOnly: action.payload.readOnly || false,
          content: action.payload.content || null,
          icon: action.payload.icon || null,   // 👈 FIXED: icon always stored
          minimized: false,
          maximized: false,
          zIndex: state.zIndexCounter + 1,
        },
      ],
      zIndexCounter: state.zIndexCounter + 1,
    };
  },

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
    zIndexCounter: state.zIndexCounter + 1,
  }),

  TOGGLE_MINIMIZE: (state, action) => ({
    ...state,
    windows: state.windows.map((w) =>
      w.id === action.payload 
        ? { ...w, minimized: !w.minimized } 
        : w
    ),
  }),

  TOGGLE_MAXIMIZE: (state, action) => ({
    ...state,
    windows: state.windows.map((w) =>
      w.id === action.payload 
        ? { ...w, maximized: !w.maximized } 
        : w
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
