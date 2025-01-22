import React, { useState, useRef } from 'react'
import { Autocomplete } from './autocomplete'
import ResultsModal from './resultsmodal'

interface AutocompleteHandle {
    handleKeyboard: (event: any) => void;
  }  

export default function searchBar({ CitiesObj }: any) {
    const [toggleResultsModal, setTRM] = useState(false);
    const [autoComplete, setAutoComplete] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const autocompleteCompRef = useRef<AutocompleteHandle | null>();

    function onSearch(){
        setTRM(true);
    }

    //function passed to SearchModal
    const closeModal =()=>{
        setTRM(false);
    }

    //call & pass keyboard event to function on autocomplete component (autocomplete keyboard interactivity)
    function passKeyboardEvent(event: any) {

        if (autocompleteCompRef.current != undefined) {
            autocompleteCompRef.current.handleKeyboard(event);
        }

    }


    function clearAutocompleteSuggestions() {
        setTimeout(() => { setAutoComplete([]) }, 300);
    }

    function loadRecent() {
        let recentArray: any = [];

        const JSONCities = localStorage.getItem('cities');
        if (JSONCities != null) {

            //if cities exist, save most recent to array & set state thus rendering autocomplete with recent cities
            //objects are used to ensure standard autocomplete component functionality (props are expected to have name, country and clearInput attributes)
            const lastArr = JSON.parse(JSONCities);
            for (let i = lastArr.length - 3; i < lastArr.length; i++) {
                if (lastArr[i] != undefined) {
                    recentArray.push(lastArr[i]);
                }

            }
            recentArray[0].clearInput = clearAutocomplete;
            setAutoComplete(recentArray);

        } else {

        }

    }

    // called on input value change
    function changeStates(e: any) {
        // pass data to autocomplete
        handleAutocomplete(e);
        //pass current field value to state so clearAutocomplete func can clear input field
        setInputValue(e.target.value);
    }

    //function used by autocomplete component
    const clearAutocomplete = () => {
        setAutoComplete([]);
        setInputValue("");
    }

    // when typed into input field, return matching cities array and set to state (which is later passed to Autocomplete component)
    function handleAutocomplete(event: any) {

        if (event.target.value.toLowerCase().trim() === "") {
            setAutoComplete([]);
            return;
        }

        const results = CitiesObj.filter((city: any) => {
            return city.name.toLowerCase().trim().startsWith(event.target.value.toLowerCase().trim());
        });


        if (results[0] != undefined) {
            //append clearAutocomplete function to first element inside matching cities list
            results[0].clearInput = clearAutocomplete;
        }



        setAutoComplete(results);

    };


    return (

        //input value onchange changes autocomplete state to render autocomplete component AND is hooked to input value state so autocomplete component can clear the input field on click through the passed function
        <div className="flex h-full w-full items-center">
            <div className="flex w-full border border-purple-200 rounded">
                <input
                    onKeyDown={passKeyboardEvent}
                    onFocus={loadRecent}
                    onBlur={clearAutocompleteSuggestions}
                    onChange={changeStates}
                    type="text"
                    value={inputValue}
                    className="w-full px-4 py-2 bg-purple-100 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search location"
                />


                <Autocomplete ref={autocompleteCompRef} AutocompleteProps={autoComplete}></Autocomplete>
                <button onClick={onSearch} className="transition hover:text-white hover:bg-purple-800 px-4 text-violet-800 bg-white border-l rounded ">
                    Search
                </button>
                {/* modal launched when toggleResultsModal state is true */}
                <ResultsModal closeFn={closeModal} toggle={toggleResultsModal} citiesObj={CitiesObj} input={inputValue}></ResultsModal>

            </div>

        </div>

    )
}
