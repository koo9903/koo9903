//created separate accordion folder so that i can use this component in another component

import { useState } from "react";
import data from "./data";
import './styles.css'

//single selection

//multiple selection
export default function Accordion() {

    const [selected, setSelected] = useState(null);
    const [enableMultiSelect, setEnableMultiSelect] = useState(false);
    const [multiSelect, setMultiSelect] = useState([]);

    function handleSingleSelection(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId)
    }

    function handleMultiSelection(getCurrentId) {
        let cpyMultiSelect = [...multiSelect]; //this copies multiSelect array to cpyMultiSelect
        const findIndexOfCurrentId = cpyMultiSelect.indexOf(getCurrentId) //returns -1 if currentId is not in cpyMultiSelect. otherwise, returns the index of the item

        if (findIndexOfCurrentId === -1) { // if currentId does not exist, then add it to cpyMultiSelect
            cpyMultiSelect.push(getCurrentId)
        } else { // if currentId exists, remove it
            cpyMultiSelect.splice(findIndexOfCurrentId, 1) //find an item at index of findIndexOfCurrentId position, and remove 1 element
        }

        setMultiSelect(cpyMultiSelect)
    }
    console.log(selected, multiSelect)

    return <div className="wrapper">
        <button onClick={() => setEnableMultiSelect(!enableMultiSelect)}>Enable Multi-Selection</button>
        <div className="accordion">
            {data && data.length > 0 ?
                data.map((dataItem) => (
                    <div className="item">
                        <div
                            onClick={
                                enableMultiSelect
                                    ? () => handleMultiSelection(dataItem.id)
                                    : () => handleSingleSelection(dataItem.id)}
                            className="title"
                        >
                            <h3>{dataItem.question}</h3>
                            <span>+</span>
                        </div>
                        {enableMultiSelect
                            //the && is Conditional Rendering. if the condition before '&&' is true, then render. if not, don't render
                            ? multiSelect.indexOf(dataItem.id) !== -1 && (
                                <div className="content">{dataItem.answer}</div>
                            )
                            : selected === dataItem.id && (
                                <div className="content">{dataItem.answer}</div>
                            )
                        }

                    </div>
                ))

                : (<div>No data found </div>)
            }
        </div>
    </div>
}