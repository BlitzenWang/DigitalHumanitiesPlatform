import { useState } from 'react';
import PromptInput from "../components/PromptInput";
import './style.css';
import PromptResponseList from "../components/PromptResponseList";

const ChatBot = () => {
  const [responseList, setResponseList] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [promptToRetry, setPromptToRetry] = useState(null);
  const [uniqueIdToRetry, setUniqueIdToRetry] = useState(null);
  const [modelValue, setModelValue] = useState('gpt');
  const [isLoading, setIsLoading] = useState(false);
  let loadInterval;

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  }

  const htmlToText = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent;
  }

  const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const addLoader = (uid) => {
    const element = document.getElementById(uid);
    element.textContent = '';

    loadInterval = setInterval(() => {
      element.textContent += '.';
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  }

  const addResponse = (selfFlag, response) => {
    const uid = generateUniqueId();
    setResponseList(prevResponses => [
      ...prevResponses,
      {
        id: uid,
        response,
        selfFlag
      },
    ]);
    return uid;
  }

  const updateResponse = (uid, updatedObject) => {
    setResponseList(prevResponses => {
      const updatedList = [...prevResponses];
      const index = prevResponses.findIndex((response) => response.id === uid);
      if (index > -1) {
        updatedList[index] = {
          ...updatedList[index],
          ...updatedObject
        }
      }
      return updatedList;
    });
  }

  const regenerateResponse = async () => {
    await getGPTResult(promptToRetry, uniqueIdToRetry);
  }

  const getGPTResult = async (_promptToRetry, _uniqueIdToRetry) => {
    const _prompt = _promptToRetry ?? htmlToText(prompt);

    if (isLoading || !_prompt) {
      return;
    }

    setIsLoading(true);

    setPrompt('');

    let uniqueId;
    if (_uniqueIdToRetry) {
      uniqueId = _uniqueIdToRetry;
    } else {
      addResponse(true, _prompt);
      uniqueId = addResponse(false);
      await delay(50);
      addLoader(uniqueId);
    }

    try {
		console.log(`prompt is ${_prompt}`);
		const response = await fetch('http://localhost:5000/chatbot/get-prompt-result', {
			method: 'POST', // Specify the HTTP method as POST
			headers: {
				'Content-Type': 'application/json', // Set the appropriate Content-Type header
			},
			body: JSON.stringify({ prompt: _prompt, model: modelValue }), // Convert the request data to JSON string
			});
		const data = await response.json();
		document.getElementById(uniqueId).textContent = '';
		updateResponse(uniqueId, {
			response: data.chatgpt_response,
		});


      setPromptToRetry(null);
      setUniqueIdToRetry(null);
    } catch (err) {
      setPromptToRetry(_prompt);
      setUniqueIdToRetry(uniqueId);
      updateResponse(uniqueId, {
        response: `Error: ${err.message}`,
        error: true
      });
    } finally {
      clearInterval(loadInterval);
      setIsLoading(false);
    }
  }

  return (
    <div className="chatbot-page">
      <div id="response-list">
        <PromptResponseList responseList={responseList} key="response-list"/>
      </div>
      {uniqueIdToRetry && (
        <div id="regenerate-button-container">
          <button id="regenerate-response-button" className={isLoading ? 'loading' : ''} onClick={() => regenerateResponse()}>
            Regenerate Response
          </button>
        </div>
      )}
      <div id="model-select-container">
        <label htmlFor="model-select">Select model:</label>
        <select id="model-select" value={modelValue} onChange={(event) => setModelValue(event.target.value)}>
          <option value="gpt-3.5">GPT-3.5 (Fast response for simpler tasks)</option>
          <option value="gpt-4">GPT-4 (Use this to burn through our funds in no time)</option>
          
        </select>
      </div>
      <div id="input-container">
        <PromptInput
          prompt={prompt}
          onSubmit={() => getGPTResult()}
          key="prompt-input"
          updatePrompt={(prompt) => setPrompt(prompt)}
        />
        <button id="submit-button" className={isLoading ? 'loading' : ''} onClick={() => getGPTResult()}></button>
      </div>
    </div>
  );
}

export default ChatBot;
