import { useState, useEffect } from "react";
import './style.css';
import { ZoomIn, ZoomOut } from "react-feather";
import { useParams } from "react-router-dom";

function Display() {
    const [zoomLevel, setZoomLevel] = useState(0);
    const [filePath, setFilePath] = useState(null);
    const {magazineName, year, issue, page} = useParams();
    const pageName = `${magazineName}_${year}_${issue}_${page}`;
	console.log(pageName);

    useEffect(() => {
        const fetchFilePath = async () => {
            const response = await fetch(`http://localhost:5000/database/getPage?pageName=${pageName}`);
            const data = await response.json();
			console.log(data);
            setFilePath(data);

        };
        
        fetchFilePath();
    }, [pageName]);

    const zoomin = () => {
        if (zoomLevel < 2){
            setZoomLevel(zoomLevel+1);
        }
    }

    const zoomout = () => {
        if (zoomLevel > 0){
            setZoomLevel(zoomLevel-1);
        }
    }
	
	return(
	<div style = {{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
		<div className="page-display-frame">
			{filePath && <img src={`http://localhost:5000/fetch_file/${filePath}`} style={{maxWidth: `${750 + zoomLevel * 400}px`, maxHeight: `${1050 + zoomLevel * 560}px`}} />}
		</div>
		<div className="zoom-button-frame">
		<ZoomOut className={`page-zoom-out-button ${zoomLevel === 0 ? 'disabled' : ''}`} onClick={zoomLevel > 0 ? zoomout : null} />
		<ZoomIn className={`page-zoom-in-button ${zoomLevel === 2 ? 'disabled' : ''}`} onClick={zoomLevel < 2 ? zoomin : null} />
		</div>
	</div>
	);
}

export default Display;
