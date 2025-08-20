import LinkedIn from "../assets/linkedIn.png";
import Spotify from "../assets/spotify.png";
import Mail from "../assets/mail.png";
import ControlPanel from "../assets/controlpanel.png";
import Calculator from "../assets/calculator.png";
import Notepad from "../assets/notepad.png";
import Whatsapp from "../assets/whatsapp.png";
import Youtube from "../assets/yt.png";
import ThisPC from "../assets/thispc.png";
import Chrome from "../assets/chrome.png";
import Paint from "../assets/paint.png";

export const apps = [
    {
        id: 'pc',
        title: "This PC",
        icon: ThisPC,
        readOnly: true,
        content: <div>📂 Loading Files...</div>
    },
    {
        id: "whatsapp",
        title: "WhatsApp",
        icon: Whatsapp,
        readOnly: true,
        content: <div>💬 WhatsApp</div>
    },
    {
        id: "controlPanel",
        title: "Control Panel",
        icon: ControlPanel,
        readOnly: true,
        content: <div>⚙️ Control Panel</div>
    },
    {
        id: "calculator",
        title: "Calculator",
        icon: Calculator,
        readOnly: false,
        content: <div>🧮 Calculator App</div>
    },
    {
        id: "linkedin",
        title: "LinkedIn",
        icon: LinkedIn,
        readOnly: false,
        content: <div>💼 LinkedIn</div>
    },
    {
        id: "spotify",
        title: "Spotify",
        icon: Spotify,
        readOnly: false,
        content: <div>🎵 Spotify</div>
    },
    {
        id: "mail",
        title: "Mail",
        icon: Mail,
        readOnly: false,
        content: <div>📧 Mail</div>
    },
    {
        id: "chrome",
        title: "Chrome",
        icon: Chrome,
        readOnly: false,
        content: <div>🌐 Chrome</div>
    },
    {
        id: "paint",
        title: "Paint",
        icon: Paint,
        readOnly: false,
        content: <div>🎨 Paint</div>
    },
    {
        id: "portfolio",
        title: "My Portfolio",
        icon: "https://www.pngmart.com/files/7/Portfolio-Transparent-Background.png",
        readOnly: true,
        content: <div>📂 Portfolio Content Here...</div>
    },
    {
        id: "game",
        title: "Mini Game",
        icon: "https://img.freepik.com/premium-psd/3d-plastic-design-hightech-gaming-controller-with-sleek-lines-vibrant-led-lights_996812-10854.jpg?semt=ais_hybrid&w=740&q=80",
        readOnly: false,
        content: <div>🎮 Game Placeholder</div>
    },
    {
        id: "youtube",
        title: "YouTube",
        icon: Youtube,
        readOnly: false,
        content: <div>📺 YouTube</div>
    },
    {
        id: "notepad",
        title: "Notepad",
        icon: Notepad,
        readOnly: false,
        content: <div>📝 Notepad</div>
    },
    
];