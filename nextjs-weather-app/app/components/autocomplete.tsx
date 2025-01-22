import React, { forwardRef, useState, useImperativeHandle, useRef } from 'react'
import Link from 'next/link'

let keyPressCounter = 0;

//autocomplete suggestions
//forwardref to expose handlekeyboard function so its callable by input in searchBar
export const Autocomplete = forwardRef(({ AutocompleteProps }: any, ref) => {
  const targetUrl = "details?";

  //state for keyboard selection 
  const [HighlightedSuggestion, setHighlightedSuggestion] = useState('');

  const Link1 = useRef<HTMLAnchorElement | null>(null);
  const Link2 = useRef<HTMLAnchorElement | null>(null);
  const Link3 = useRef<HTMLAnchorElement | null>(null);

  //exposing function
  useImperativeHandle(ref, () => ({

    //function called by searchBar
    handleKeyboard(event: any) {

      highlightSelected();
      chooseSelected();

      function chooseSelected() {
        //if key pressed is enter, click selected suggestion and update state used to highlight suggestion
        if ((event.keyCode == 13) && (keyPressCounter > 0) && (keyPressCounter < 4)) {

          switch (keyPressCounter) {
            case 1: {
              keyPressCounter = 0;
              setHighlightedSuggestion(keyPressCounter.toString());
              if (Link1.current != null) {
                Link1.current.click();
              }

              break;
            }
            case 2: {
              keyPressCounter = 0;
              setHighlightedSuggestion(keyPressCounter.toString());
              if (Link2.current != null) {
              Link2.current.click();
              }

              break;
            }
            case 3: {
              keyPressCounter = 0;
              setHighlightedSuggestion(keyPressCounter.toString());
              if (Link3.current != null) {
              Link3.current.click();
              }

              break;
            }
            default: {
              break;
            }
          }
        }
      }

      function highlightSelected() {
        //on down arrow pressed
        if ((event.keyCode == 40) && (keyPressCounter >= 0) && (keyPressCounter < 5)) {
          if (keyPressCounter < 4) {
//count the number of times down arrow pressed, limit at 4 because three suggestions are rendered max
            keyPressCounter++;
          }

          setHighlightedSuggestion(keyPressCounter.toString());
        };

        //on up arrow pressed
        if ((event.keyCode == 38) && (keyPressCounter >= 0) && (keyPressCounter < 5)) {
          if (keyPressCounter > 0) {
            keyPressCounter--;
          }
          setHighlightedSuggestion(keyPressCounter.toString());
        };
      }
    }
  }));

  function saveCityToStorage(pos: number) {
    let citiesArr = [];
    const JSONCities = localStorage.getItem('cities');
    
    if (JSONCities != null) {
      // Parse the existing cities from local storage
      const lastArr = JSON.parse(JSONCities);
  
      // Check if the city already exists in storage
      const cityExists = lastArr.some(
        (city: any) =>
          city.name === AutocompleteProps[pos].name &&
          city.country === AutocompleteProps[pos].country &&
          city.subcountry === AutocompleteProps[pos].subcountry
      );
  
      if (!cityExists) {
        // Remove the oldest city if the array has more than 4 cities
        if (lastArr.length > 4) {
          lastArr.shift();
        }
  
        // Add the new city
        lastArr.push({
          name: AutocompleteProps[pos].name,
          country: AutocompleteProps[pos].country,
          subcountry: AutocompleteProps[pos].subcountry,
        });
      }
  
      citiesArr = lastArr;
    } else {
      // Add the first city if no cities are stored yet
      citiesArr.push({
        name: AutocompleteProps[pos].name,
        country: AutocompleteProps[pos].country,
        subcountry: AutocompleteProps[pos].subcountry,
      });
    }
  
    // Save the updated array to local storage
    localStorage.setItem('cities', JSON.stringify(citiesArr));
    console.log(localStorage.getItem('cities'));
  }
  

  if (AutocompleteProps.length > 2) {
    return (
      //onclick calls parent function referenced in the first element of AutocompleteProps
      <div onClick={AutocompleteProps[0].clearInput} className='w-1/2 absolute mt-12 border-violet-100 border-2 rounded-md'>
        <Link ref={Link1} onClick={()=>saveCityToStorage(0)} href={targetUrl + "name=" + AutocompleteProps[0].name + "&region=" + AutocompleteProps[0].country}>
          <div className={`h-12 ${HighlightedSuggestion == '1' ? "bg-violet-100" : "bg-white"} hover:bg-violet-100`}>
            <span className='px-1 py-1 text-violet-800'>{AutocompleteProps[0].name}</span>
            <br />
            <span className='px-1 py-1 text-violet-800 text-xs'>{AutocompleteProps[0].country}, {AutocompleteProps[0].subcountry}</span>
          </div>
        </Link>

        <Link ref={Link2} onClick={()=>saveCityToStorage(1)} href={targetUrl + "name=" + AutocompleteProps[1].name + "&region=" + AutocompleteProps[1].country}>
          <div className={`h-12 ${HighlightedSuggestion == '2' ? "bg-violet-100" : "bg-white"} hover:bg-violet-100`}>
            <span className='px-1 py-1 text-violet-800'>{AutocompleteProps[1].name}</span>
            <br />
            <span className='px-1 py-1 text-violet-800 text-xs'>{AutocompleteProps[1].country}, {AutocompleteProps[1].subcountry}</span>
          </div>
        </Link>

        <Link ref={Link3} onClick={()=>saveCityToStorage(2)} href={targetUrl + "name=" + AutocompleteProps[2].name + "&region=" + AutocompleteProps[2].country}>
          <div className={`h-12 ${HighlightedSuggestion == '3' ? "bg-violet-100" : "bg-white"} hover:bg-violet-100`}>
            <span className='px-1 py-1 text-violet-800'>{AutocompleteProps[2].name}</span>
            <br />
            <span className='px-1 py-1 text-xs text-violet-800'>{AutocompleteProps[2].country}, {AutocompleteProps[2].subcountry}</span>
          </div>
        </Link>

      </div>
    )
  } else if ((AutocompleteProps.length >= 1) && (AutocompleteProps.length <= 2)) {
    return (

      <div onClick={AutocompleteProps[0].clearInput} className='w-1/2 absolute mt-12'>
        <Link ref={Link1} onClick={()=>saveCityToStorage(0)} href={targetUrl + "name=" + AutocompleteProps[0].name + "&region=" + AutocompleteProps[0].country}>
          <div className={`h-12 ${HighlightedSuggestion == '1' ? "bg-violet-100" : "bg-white"} hover:bg-violet-100`}>
            <span className='px-1 py-1 text-violet-800'>{AutocompleteProps[0].name}</span>
            <br />
            <span className='px-1 py-1 text-xs text-violet-800'>{AutocompleteProps[0].country}, {AutocompleteProps[0].subcountry}</span>
          </div>
        </Link>
      </div>

    )
  } else {
    return <div></div>;
  }
})
