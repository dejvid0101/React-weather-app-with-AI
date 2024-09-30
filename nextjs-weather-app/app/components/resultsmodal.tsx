import React from 'react'
import { createPortal } from 'react-dom';
import Link from 'next/link';

//resultsmodal receives (object with) bool & array of objects & function ref from parent & string as toggle indicator & list of all cities & close fn & input value
export default function resultsmodal({ toggle, citiesObj, closeFn, input }: { toggle: boolean; citiesObj: any; closeFn: any; input: string }) {

    const targetUrl = "/details?";

    function returnFocus() {

        //unblur bg
        for (let i = 0; i < document.getElementsByClassName('content').length; i++) {
            (document.getElementsByClassName('content')[i] as HTMLElement).style.filter = 'none';

        };
        (document.getElementsByClassName('modalPlaceholder')[0] as HTMLElement).style.visibility = 'hidden';
        (document.getElementsByClassName('modalPlaceholder')[0] as HTMLElement).style.zIndex = '-10';

        //close modal by calling fn from parent component
        closeFn();

    }

    function renderMatchingCities() {
        let resultsCounter: number = 0;
        const matchingCts = citiesObj.filter((city: any) => city.name.toLowerCase().trim().startsWith(input.toLowerCase().trim()));

        if(matchingCts.length==0){
            return(
            <>
            <div className='h-12'>No results found.</div>
            <div className='text-xs'>Please try again.</div>
            </>
            )
        }

        if(matchingCts.length>1000){
            return(
            <>
            <div className='h-12'>Too many results.</div>
            <div className='text-xs'>Please try again.</div>
            </>
            )
        }

        return (
            <>
                {matchingCts.map((match: any) => {
                    resultsCounter++;
                    if (resultsCounter < 11) {
                        return <Link key={resultsCounter} href={targetUrl + "name=" + match.name + "&region=" + match.country} 
                        onClick={returnFocus} 
                        className='h-12 hover:text-violet-700 cursor-pointer'><div>{match.name}</div>
                            <div className='text-xs hover:text-violet-700'>{match.subcountry}, {match.country}</div></Link>
                    }
                })
                }
            </>
        );

    }

    // open modal if toggle is true
    if (toggle) {

        //blur bg before rendering
        for (let i = 0; i < document.getElementsByClassName('content').length; i++) {
            (document.getElementsByClassName('content')[i] as HTMLElement).style.filter = 'blur(5px)';

        };
        (document.getElementsByClassName('modalPlaceholder')[0] as HTMLElement).style.visibility = 'visible';
        (document.getElementsByClassName('modalPlaceholder')[0] as HTMLElement).style.zIndex = '10';

        return (
            // renders modal inside body instead of navbar
            createPortal(
                <div className='p-2 absolute w-96 h-[40rem] lg:w-[36rem] lg:h-[40rem] bg-indigo-50 border-indigo-900 border-solid border-8 rounded-xl right-2/4 top-2/4 -translate-y-2/4 translate-x-2/4'>
                    <div className='h-12 grid grid-cols-6'>
                        <div className='col-span-5'></div>
                        <div className='flex justify-end'><button onClick={returnFocus} className='h-fit text-3xl top-0 right-0 hover:text-red-600'>x</button></div>
                    </div>
                    <div className='h-12'><p className='w-2/4 text-violet-700'>Results for query "{input}":</p></div>

                    {/* render matching cities as li  */}
                    {renderMatchingCities()}

                </div>,
                document.getElementsByClassName('modalPlaceholder')[0]
            )
        )

    }
    else {
        return null;
    }
}
