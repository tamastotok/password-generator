import { useEffect, useState } from 'react';
import CheckBox from './components/CheckBox';
import Slider from './components/Slider';

const uppercase = {
  name: 'Uppercase',
  values: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

const lowercase = {
  name: 'Lowercase',
  values: 'abcdefghijklmnopqrstuvwxyz',
};

const numbers = {
  name: 'Numbers',
  values: '0123456789',
};

const symbols = {
  name: 'Symbols',
  values: `${"~`!@#$%^&*()_-+={[}]|:;'<,>.?/"}${'"'}`,
};

function App() {
  const [password, setPassword] = useState('');
  const [sliderValue, setSliderValue] = useState(4);
  const [pool, setPool] = useState([]);

  const changePoolItems = (charType, name, status) => {
    if (charType.name === name && status) {
      setPool((state) => [...state, charType.values]);
    }
    if (charType.name === name && !status) {
      setPool((state) => [...state].filter((item) => item !== charType.values));
    }
  };

  const getCheckboxStatus = (name, status) => {
    changePoolItems(uppercase, name, status);
    changePoolItems(lowercase, name, status);
    changePoolItems(numbers, name, status);
    changePoolItems(symbols, name, status);
  };

  const getSliderValue = (value) => {
    setSliderValue(parseInt(value));
  };

  const generatePassword = () => {
    const characters = pool.join('');
    const pw = Array(sliderValue)
      .fill(characters)
      .map((item) => {
        return item[Math.floor(Math.random() * item.length)];
      })
      .join('');
    setPassword(pw);
  };

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, sliderValue]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const getAnotherPassword = () => {
    generatePassword();
  };

  return (
    <>
      <h3>Generate password</h3>

      <div className="btn-container">
        <svg
          onClick={getAnotherPassword}
          className="refresh-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
        >
          <title>Generate</title>
          <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z" />
        </svg>

        <svg
          onClick={copyToClipboard}
          className="copy-icon"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Copy</title>
          <path
            d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V18M8 5C8 6.10457 8.89543 7 10 7H12C13.1046 7 14 6.10457 14 5M8 5C8 3.89543 8.89543 3 10 3H12C13.1046 3 14 3.89543 14 5M14 5H16C17.1046 5 18 5.89543 18 7V10M20 14H10M10 14L13 11M10 14L13 17"
            stroke="#4A5568"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="password">{password}</h2>
      <div className="options-container">
        <Slider getSliderValue={getSliderValue} />
        <div>
          <CheckBox name="Uppercase" getCheckboxStatus={getCheckboxStatus} />
          <CheckBox name="Lowercase" getCheckboxStatus={getCheckboxStatus} />
          <CheckBox name="Numbers" getCheckboxStatus={getCheckboxStatus} />
          <CheckBox name="Symbols" getCheckboxStatus={getCheckboxStatus} />
        </div>
      </div>
    </>
  );
}

export default App;
