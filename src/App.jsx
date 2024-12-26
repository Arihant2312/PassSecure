import { useCallback, useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [char, setchar] = useState(false);
  const [password, setpasswords] = useState('');
  const passref = useRef(null);

  const passgenerator = useCallback(() => {
    let pass = '';
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (number) {
      string += '0123456789';
    }
    if (char) {
      string += '!@#$%^&*()';
    }
    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * string.length);
      pass += string.charAt(char);
    }
    setpasswords(pass);
  }, [length, number, char]);

  useEffect(() => {
    passgenerator();
  }, [length, number, char, passgenerator]);

  const copypasstoclip = useCallback(() => {
    passref.current?.select();
    window.navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  }, [password]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-xl p-6 text-white">
        <h1 className="text-center text-3xl font-bold mb-6">Password Generator</h1>
        <div className="flex items-center mb-4 gap-2">
          <input
            type="text"
            value={password}
            className="flex-grow p-2 text-lg bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400"
            placeholder="Generated Password"
            ref={passref}
            readOnly
          />
          <button
            type="button"
            className="px-5 py-2 text-sm font-medium bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 active:bg-green-500 transition-all"
            onClick={copypasstoclip}
          >
            Copy
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Password Length</label>
            <span className="text-sm font-semibold">{length}</span>
          </div>
          <input
            type="range"
            className="w-full cursor-pointer"
            value={length}
            min={6}
            max={100}
            onChange={(e) => setlength(parseInt(e.target.value))}
          />
          <div className="flex justify-between gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={number}
                onChange={() => setnumber((prev) => !prev)}
                className="cursor-pointer"
              />
              Include Numbers
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={char}
                onChange={() => setchar((prev) => !prev)}
                className="cursor-pointer"
              />
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
