import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch(`/api/generate?prompt=${userInput}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...");

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };


  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>TLDR</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write the name of a book and the author to get the most valuable points and lessons from it!</h2>
          </div>
        </div>

        <div className="prompt-container">
          <textarea 
            className="prompt-box" 
            placeholder="Atomic Habits by James Clear"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a 
              className={isGenerating ? "generate-button loading" : "generate-button" }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className='loader'></span> : <p>Generate</p>} 
              </div>
            </a>
          </div>
          {
            apiOutput && (
              <div className="output">
                <div className='output-header-container'>
                  <div className='output-header'>
                    <h3>Output</h3>
                  </div>
                </div>
                <div className='output-content'>
                  <p>{ apiOutput }</p>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            {/* <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p> */}
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
