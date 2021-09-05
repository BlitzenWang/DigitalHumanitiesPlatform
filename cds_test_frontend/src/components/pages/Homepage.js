/**
 * Homepage
 * CSS by Boostrap 5.0
 * Author: Ruize Li
 */
 import $ from "jquery";
 import Turn from "../Turn";
 import './turn.js';


// @todo: 
//         use thumbnails for magazine-like display
//         on click event: switch to load original / high res page
const DemoMagazine = () => {
    const options = {
        width: 1600,
        height: 1200,
        autoCenter: true,
        display: "double",
        acceleration: true,
        elevation: 50,
        gradients: !$.isTouch,
        when: {
          turned: function(e, page) {
            console.log("Current view: ", $(this).turn("view"));
          }
        }
      };
      
      const pages = [
        'https://raw.githubusercontent.com/ruize-li/colby_digital_studies_storage/master/images/shanghaisketch_48/001.jpg',
        'https://raw.githubusercontent.com/ruize-li/colby_digital_studies_storage/master/images/shanghaisketch_48/002.jpg',
        'https://raw.githubusercontent.com/ruize-li/colby_digital_studies_storage/master/images/shanghaisketch_48/003.jpg',
        'https://raw.githubusercontent.com/ruize-li/colby_digital_studies_storage/master/images/shanghaisketch_48/004.jpg',
        'https://raw.githubusercontent.com/ruize-li/colby_digital_studies_storage/master/images/shanghaisketch_48/005.jpg',
        'https://raw.githubusercontent.com/ruize-li/colby_digital_studies_storage/master/images/shanghaisketch_48/006.jpg',
        'https://raw.githubusercontent.com/ruize-li/colby_digital_studies_storage/master/images/shanghaisketch_48/007.jpg',
        'https://raw.githubusercontent.com/ruize-li/colby_digital_studies_storage/master/images/shanghaisketch_48/008.jpg'
      ];


    return (
             <Turn options={options} className="magazine">
            {pages.map((page, index) => (
                <div key={index} className="page">
                <img src={page} alt="" />
                </div>
            ))}
            </Turn>
    )
}



const Homepage = () => {
    
    function handleDemoClick(e) {
        window.open("004.pdf", "_blank")
    }

    return(
        <div className="container">
            <h4>Welcome to Colby Digital Studies!</h4>
            <h4>Example: 上海漫画第48期</h4>
            <button type="button" class="btn btn-info" onClick = {handleDemoClick}>示范：搜索</button>
            <a href='https://www.google.com' target='_blank' rel='noopener noreferrer'>EXAMPLE</a>
            <DemoMagazine />
        </div>
    );
}



export default Homepage;