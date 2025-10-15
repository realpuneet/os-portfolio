// WindowContext.jsx - Window ka state manage karta hai, jaise position, size, aur z-index
// Yeh context windows ko random positions mein kholne aur drag/resize karne ki facility deta hai
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

    // Naye windows ke liye screen ke andar random position generate karo
    // Taskbar ki height approximately 40px maan ke
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const taskbarHeight = 40;
    const defaultWidth = 500;
    const defaultHeight = 300;
    const randomX = Math.random() * (screenWidth - defaultWidth);
    const randomY = Math.random() * (screenHeight - defaultHeight - taskbarHeight);

    return {
      ...state,
      windows: [
        ...state.windows,
        {
          id: action.payload.id,
          title: action.payload.title,
          readOnly: action.payload.readOnly || false,
          content: action.payload.content || null,
          icon: action.payload.icon || null,
          minimized: false,
          maximized: false,
          zIndex: state.zIndexCounter + 1,
          // Draggable/resizable windows ke liye position aur size properties add karo
          x: action.payload.x !== undefined ? action.payload.x : randomX,
          y: action.payload.y !== undefined ? action.payload.y : randomY,
          width: action.payload.width !== undefined ? action.payload.width : defaultWidth,
          height: action.payload.height !== undefined ? action.payload.height : defaultHeight,
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

  // Naya action - drag karne ke baad window ki position update karo
  UPDATE_POSITION: (state, action) => ({
    ...state,
    windows: state.windows.map((w) =>
      w.id === action.payload.id
        ? { ...w, x: action.payload.x, y: action.payload.y }
        : w
    ),
  }),

  // Naya action - resize karne ke baad window ka size update karo
  UPDATE_SIZE: (state, action) => ({
    ...state,
    windows: state.windows.map((w) =>
      w.id === action.payload.id
        ? {
            ...w,
            width: action.payload.width,
            height: action.payload.height,
            x: action.payload.x,
            y: action.payload.y
          }
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
