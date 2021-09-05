import React, { useRef, useEffect} from "react";
import $ from "jquery";

/**
 * Modified Version of Turn-js for React JS
 * This instance is one magazine view
 *  
 */


const Turn = props => {

  
  let fadeClass = useRef("");

  useEffect(() => {
    if (fadeClass) {
    	console.log( $(fadeClass).turn   )
      $(fadeClass).turn(Object.assign({}, props.options));
    }
    // 	//   document.addEventListener("keydown", handleKeyDown, false);
  }, [props.options]);

  return (
    <div
      className={props.className}
      style={Object.assign({}, props.style)}
      ref={el => {
        fadeClass = el;
      }}
    >
      {props.children}
    </div>
  );
};

export default Turn;