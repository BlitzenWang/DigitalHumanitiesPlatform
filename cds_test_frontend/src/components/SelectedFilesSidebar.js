import { useContext, useEffect, useState } from "react";
import { ListContext } from "./ListProvider";
import { ChevronDown, Trash } from 'react-feather';


const MagazineDropdown = ({magazineName, selectedFiles, deleteFile})=>{
	const [open, setOpen] = useState(false);
	const magazineNameMap = {
        "default": "Magazine",
        "RMHB": "人民画报",
        "JFJHB": "解放军画报",
        "MZHB": "民族画报"
    }
	return (
		<div className="selected-documents-sub-container">
			<div className="selected-document-magazine-dropdown" onClick={() => setOpen(!open)}>
				<div className="selected-document-magazine-dropdown-text">{magazineNameMap[magazineName]}</div>
				<ChevronDown className={`selected-document-chevron ${open ? "open":""}`}/>
			</div>
			{<div className={`selected-document-content-container ${open? "open":""}`} style={{display: "flex", flexDirection: "row"}}>
				<div className="selected-documents-side-indent"/>
				<div className={`selected-document-item-container ${open? "open":""}` }>
					<div className="selected-documents-side-indent"/>
					{selectedFiles.map(file => (
						<div className="selected-document-item" key={file.page_name}>
							{file.year} · {file.issue} · {file.page}
							<Trash className="selected-document-delete-icon" onClick={() => {deleteFile(file.page_name)}}/>
						</div>
					))}
				</div>
			</div>}
			

		</div>
	);

}

function SelectedFilesSidebar({select, setSelect, selectAvailable=true}){
	const { list, setList }  = useContext(ListContext);   
	let MZHBArray = list.filter(item => item.name === 'MZHB');
	let RMHBArray = list.filter(item => item.name === 'RMHB');
	let JFJHBArray = list.filter(item => item.name === 'JFJHB');
	console.log(RMHBArray);
	//useEffect(()=>{console.log(list)},[list]);
	const deleteFile = (pageName) => {
        // Filter the selected magazine's array to exclude the selected file
        let updatedList = list.filter(item => !(item.page_name === pageName));

        // Update the context with the new array
        setList(updatedList);
    }
	return (
		<div className="selected-documents-sidebar-container">
			{selectAvailable && setSelect !== null && <button className="selected-documents-header" onClick={() => setSelect(!select)}>
			{select ? "Finish  Selecting" : "Select Magazines"}
			</button>}
			<div className="selected-documents-divider"/>
			<div className="selected-documents-top-container">
				{RMHBArray.length>0 &&  <MagazineDropdown magazineName={"RMHB"} selectedFiles={RMHBArray} deleteFile={deleteFile}/>}
				{MZHBArray.length>0 &&  <MagazineDropdown magazineName={"MZHB"} selectedFiles={MZHBArray} deleteFile={deleteFile}/>}
				{JFJHBArray.length>0 &&  <MagazineDropdown magazineName={"JFJHB"} selectedFiles={JFJHBArray} deleteFile={deleteFile}/>}
			</div>
		</div>
	)
}

export default SelectedFilesSidebar;