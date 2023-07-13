import { useEffect, useRef, useCallback } from 'react';
import ContentEditable from 'react-contenteditable';
import './style.css';

const PromptInput = ({ prompt, onSubmit, updatePrompt }) => {
  const checkKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.ctrlKey || e.shiftKey) {
        const contentEditable = contentEditableRef.current;
        if (contentEditable) {
          const selection = window.getSelection();
          const range = selection?.getRangeAt(0);
          if (range) {
            const br = document.createElement('br');
            range.insertNode(br);
            range.collapse(false);
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        }
      } else {
        onSubmit();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt, onSubmit]);


  const contentEditableRef = useRef(null);

  useEffect(() => {
    window.addEventListener("keydown", checkKeyPress);
    return () => {
      window.removeEventListener("keydown", checkKeyPress);
    };
  }, [checkKeyPress]);

  return (
    <ContentEditable
      innerRef={contentEditableRef}
      html={prompt}
      disabled={false}
      id="prompt-input"
      className="prompt-input"
      onChange={(event) => updatePrompt(event.target.value)}
    />
  );
};

export default PromptInput;
