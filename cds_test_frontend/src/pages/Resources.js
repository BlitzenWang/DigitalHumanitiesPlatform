/**
 * Resources
 * CSS by Boostrap 5.0
 * Author: Ruize Li
 */

// resources
//      id: { itemName: xx, link: xx, desc: xx}
const resrc = {
    0 : {
        itemName : "MARKUS (Communication and Empire: Chinese Empires in Comparative Perspective) ",
        link : 'https://dh.chinese-empires.eu/markus/beta/',
        desc : 'a short description'
    },
    1 : {
        itemName : 'DocuSky Collaboration Platform 数位人文学术研究平台 (National Taiwan University)',
        link : 'http://docusky.org.tw/DocuSky/ds-01.home.html#',
        desc : 'Provide digital tools for DH researchers to build personal databases of her own research materials'
    },
    2 : {
        itemName : 'MADSpace (Mapping ADvertising Space)',
        link : 'https://madspace.org/',
        desc : 'The digital companion to a PhD project devoted to the spatial history of advertising in modern Shanghai (1905-1949)'
    },
    3 : {
        itemName : '九歌 - 人工智能诗歌写作系统 (清华大学) ',
        link : 'http://jiuge.thunlp.org/',
        desc : ''
    },
    4 : {
        itemName : 'The Ten Thousand Rooms Project 廣廈千萬間項目 (Yale University)',
        link : 'https://tenthousandrooms.yale.edu/',
        desc : 'A collaborative workspace for pre-modern textual studies being developed at Yale University'
    },
    5 : {
        itemName : 'IIIF- International Image Interoperability Framework',
        link : 'https://iiif.io/',
        desc : 'Enabling richer access to the world’s images: community focused; defined APIs and plug ‘n’ play software'
    },
    6 : {
        itemName : 'COMPARATIVUS',
        link : 'https://dh.chinese-empires.eu/comparativus/',
        desc : 'a text comparison tool linked to MARKUS'
    },
    7 : {
        itemName : 'Tools for Buddhist Studies',
        link : 'https://mbingenheimer.net/tools/indexTools.html',
        desc : 'Marcus Bingenheimer’s index tools '
    },
    8 : {
        itemName : 'Bibliopedia (Stanford University Libraries) ',
        link : 'http://sul-cidr.github.io/Bibliopedia/',
        desc : 'A platform for organizing, visualizing, sharing, and searching archives'
    },
    9 : {
        itemName : 'Gephi',
        link : 'https://gephi.org/',
        desc : 'A leading visualization and exploration software for all kinds of graphs and networks. Gephi is open-source and free.'
    },
    10 : {
        itemName : 'Omeak',
        link : 'https://omeka.org/',
        desc : 'An open source web-publishing platform for the display of library, museum, archives, and scholarly collections and exhibitions'
    },
    11 : {
        itemName : 'Drupal',
        link : 'https://www.drupal.org/',
        desc : 'An open source content management system for supporting resources like blogs and web sites'
    },
    12 : {
        itemName : 'Voyant',
        link : 'https://voyant-tools.org/',
        desc : 'a free web-based text-analysis tool (visualization tool)'
    },
    13 : {
        itemName : 'TAPoR',
        link : 'http://tapor.ca/home',
        desc : 'A gateway to free online tools for sophisticated text analysis and retrieval, along with representative texts for experimentation'
    },
    14 : {
        itemName : 'WordSeer',
        link : 'https://wordseer.berkeley.edu/',
        desc : 'a text analysis environment for humanities scholars '
    },
    15 : {
        itemName : 'http://worldmap.harvard.edu/',
        link : 'http://worldmap.harvard.edu/',
        desc : 'build your own maps'
    },
    16 : {
        itemName : 'StoryMaps',
        link : 'https://storymaps.arcgis.com/',
        desc : 'create inspiring, immersive stories by combining text, interactive maps, and other multimedia content '
    },
    17 : {
        itemName : 'Time Mapper',
        link : 'http://timemapper.okfnlabs.org/',
        desc : 'quickly create a timeline from a spreadsheet '
    },
    18 : {
        itemName : 'From the Page',
        link : 'https://www.fromthepage.com/',
        desc : 'for transcribing documents and collaborating on transcriptions with others'
    },
    19 : {
        itemName : 'LibGuide on DH Tools',
        link : 'https://libguides.library.arizona.edu/dighumantools/',
        desc : '(University of Arizona)'
    }
}


 
    function Item(props) {
        const itemName = props.itemName;
        const link = props.itemLink;
        const desc = props.desc;
        return (
            <div className="row justify-content-around">
                    <div className="col-5">
                        <a target="_blank" rel="noopener noreferrer" href={ link }> <h6>{ itemName }</h6> </a>
                    </div>
                    <div className="col-5">
                        { desc }
                    </div>
                    <br />
                    <br />
            </div>
        )
    }



 const Resources = () => {
    // sort
    // resrc.sort((a,b) => a.itemName - b.itemName)



    const listOfItems = Object.keys(resrc).map((val, i) => (
        <Item   key = {val}
                itemName = {resrc[val].itemName}
                itemLink = {resrc[val].link}
                desc = {resrc[val].desc}
        ></Item>
    ))
    // console.log(listOfItems)
    return(
        <div className="container">
            <h3>External Resources</h3>
            <div style = {{minHeight: '40px'}}></div>
            
            { listOfItems && listOfItems }
        </div>
    );
 }
 
 
 export default Resources;