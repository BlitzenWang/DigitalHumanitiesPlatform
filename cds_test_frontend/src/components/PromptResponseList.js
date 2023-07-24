import React, { useEffect, useRef } from 'react';
import ChatGptImg from './icons/chatgpt.png';
import MyImg from './icons/me.png';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import './style.css';

const PromptResponseList = ({ responseList }) => {
  const responseListRef = useRef(null);

  useEffect(() => {
    hljs.highlightAll();
  });

  useEffect(() => {
    hljs.highlightAll();
    console.log(responseList);
  }, [responseList]);

  return (
    <div className="prompt-response-list" ref={responseListRef}>
      {responseList.map((responseData) => (
        <div className={"response-container " + (responseData.selfFlag ? 'my-question' : 'chatgpt-response')} key={responseData.id}>
          <img className="avatar-image" src={responseData.selfFlag ? MyImg : ChatGptImg} alt="avatar" />
          <div className={(responseData.error ? 'error-response ' : '') + "prompt-content"} id={responseData.id}>
            {responseData.response && (
              <ReactMarkdown
                children={responseData.response ?? ''}
                components={{
                  code({ className, children }) {
                    return (
                      <code className={className}>
                        {children}
                      </code>
                    )
                  }
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromptResponseList;
