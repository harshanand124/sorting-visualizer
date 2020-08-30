import React, { useState, useEffect } from 'react';
import './App.css';
import { bubbleSortAlgo } from './algorithms/BubbleSort';
import InputModal from './InputModal'
import MarkNumber from './MarkNumber'

const App = () => {
    const [numberArray, setNumberArray] = useState([])
    const [range, setRange] = useState(50)
    const [sortSpeed, setSortSpeed] = useState(5)
    const [sorting, setSorting] = useState(false)
    const [generateBtnState, setGenerateBtnState] = useState(false)
    const [modalView, setModalView] = useState(false)
    const [isOpenAlgoContainer, setViewAlgoContainer] = useState(false)
    const [inputArrayOn, setInputArrayOn] = useState(false)

    const min = 10
    const max = 100
    
    useEffect(() => generateArray(), [])

    // making the array with random numbers
    const generateArray = () => {
        setSorting(false)
        setInputArrayOn(false)
        // generate-numbers 
        let numbers = []
        for (let i = 0; i < 100; i++)
            numbers.push(randomNumber())
        setNumberArray(numbers)
    }

    // generating random numbers between 10 and 100
    const randomNumber = () => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    // setting only the positive speed for the array shuffling
    const setInegerSortSpeed = e => {
        const val = e.target.value

        if (e.target.validity.valid && e.target.value)
            setSortSpeed(e.target.value)
        
        else if (val === '' || val === '-')
            setSortSpeed(1)
    }

    // get the array for sorting with range number of elements
    const getArrayInRange = () => {
        let numbers = numberArray
        numbers = numbers.slice(0, range)
        return numbers
    }

    // bubble sort
    const bubbleSort = () => {
        setSorting(true)
        setGenerateBtnState(true)
        setViewAlgoContainer(false)
        let numbers = numberArray
        if (!inputArrayOn)
            numbers = getArrayInRange()
        const delay = bubbleSortAlgo(numbers, sortSpeed)
        setTimeout(() => setGenerateBtnState(false), delay)
    }

    // close the modal
    const closeInputModal = () => setModalView(false)

    // set the array as the input array
    const setArrayAsInput = inputArray => {
        setInputArrayOn(true)
        setModalView(false)
        setSorting(false)
        setNumberArray(inputArray)
        console.log(inputArray)
    }

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <div style={flexContainer}>
                <div style={{ flex: '1' }}>
                    {/* range element */}
                    <input 
                        type="range" 
                        min="5" 
                        max="100" 
                        value={range} 
                        className="slider" 
                        onChange={e => setRange(e.target.value)}
                        disabled={sorting || inputArrayOn}
                    />{' '}
                    <label style={{ fontSize: '12px' }}>{range} Elements</label> {' '}
                    
                    {/* timer element */}
                    <input 
                        type='tel'
                        style={inputTime}
                        value={sortSpeed}
                        onChange={setInegerSortSpeed}
                        pattern="^-?[0-9]\d*\.?\d*$"
                        disabled={generateBtnState}
                    /> {' '}
                    <label style={{ fontSize: '12px' }}>ms(Sorting Speed)</label>
                </div>
                <div style={{ flex: '1' }}>

                    {/* select the algorithm */}
                    <button
                        style={btnStyle}
                        disabled={sorting}
                        onClick={() => setViewAlgoContainer(prevState => !prevState)}
                    >Select Algorithm</button>

                    {/* algorithm button container */}
                    {
                        isOpenAlgoContainer &&
                        <div style={btnContainerStyle}>
                            {/* bubble sort */}
                            <button
                                style={algorithmButtonStyle}
                                onClick={() => bubbleSort()}
                                disabled={sorting}
                            >Bubble Sort</button>
                            
                            {/* selection sort */}
                            <button
                                style={algorithmButtonStyle}
                                disabled={sorting}
                            >Selection Sort</button>
                        </div>
                    }
                    
                    {/* generating new array */}
                    <button
                        style={btnStyle}
                        onClick={() => { generateArray(); setViewAlgoContainer(false)}}
                        disabled={generateBtnState}
                    >Generate New Array</button>

                    {/* button for input */}
                    <button 
                        style={btnStyle}
                        onClick={() => setModalView(true)}
                        disabled={generateBtnState}
                    >Input Elements</button>
                </div>
            </div>
            <div className='bar_container'>
                {
                    numberArray.map((number, index) => 
                    inputArrayOn || index < range ?
                            <div 
                                key={index}
                                className='number-bar'
                                style={{ 'width': `${number}%`, background: !sorting ? 'var(--barColor)' : null }}
                            >{ range <= 50 ? number : null }
                            </div> : 
                            null
                    )
                }
            </div>
            <MarkNumber customStyle={flexContainer} />
            <InputModal 
                view={modalView} 
                closeModal={closeInputModal}
                arrayAsInput={setArrayAsInput}
            />
        </div>
    );
}

const flexContainer = {
    display: 'flex'
}

const btnStyle = {
    margin: '0 10px',
    border: 'none',
    background: 'none',
    borderBottom: '1px #ccc solid'
}

const inputTime = {
    border: '1px solid #ccc',
    width: '30px',
    padding: '2px 5px',
    fontSize: '10px', 
    borderRadius: '5px',
    marginLeft: '20px'
} 

const btnContainerStyle = {
    position: 'fixed',
    width: '130px',
    background: '#fff',
    top: '25px',
    borderRadius: '5px',
    boxShadow: '0 0 4px rgba(0,0,0,0.5)'
}

const algorithmButtonStyle = {
    width: '100%',
    border: 'none',
    background: 'none',
    borderBottom: '1px solid #ccc',
    borderRadius: '5px',
}

export default App;
