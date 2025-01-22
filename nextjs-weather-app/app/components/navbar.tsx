"use client"
import React, {useState} from 'react'
import Hamburger from 'hamburger-react'
import SearchBar from './searchBar'
import Link from 'next/link'

export default function navbar({CitiesObj}:any) {

  return (

//cities list is passed further to searchbar component
    <div className='content grid grid-cols-12 h-12 fixed relative bg-purple-400 w-full rounded-b-lg'>
        <div className='self-center justify-self-center col-span-1'>
        <Link href="/home">
          <img className='h-11' src='data:image/jpeg;base64,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'/>
      
        </Link>
      </div>
      <div className='self-center lg:px-64 md:px-32 sm:px-4 col-span-10'>
        <SearchBar CitiesObj={CitiesObj}></SearchBar>
      </div>
      <div className='self-center justify-self-center col-span-1'>
      </div>
    </div>
  )
}
