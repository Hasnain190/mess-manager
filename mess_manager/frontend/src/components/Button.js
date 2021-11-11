import React , {useState , useEffect} from 'react'

// a button component that changes the color of the button when clicked and
//set mark the button as clicked


function Button() {
   
    const [count , setCount] = useState(0)

   
    const [text, setText] = useState('Present')
  
    const [backgroundColor, setBackgroundColor] = useState('#056fb5')


function handleClick(){
    
    setCount(count + 1)
    
}

useEffect(() => {
    console.log(count)
    if (count % 3 === 0) {
    setText('0 Absent')
    setBackgroundColor('#FF0000')
}else if (count % 3 === 1) {
    setText('1 Present')
    setBackgroundColor('#0000FF')
}else if (count % 3 === 2) {
    setText('2 Double Attendance')
    setBackgroundColor('#009111')
} 

} , [count])

    return (
        <div>
            <button className="btn" style = {{backgroundColor , "color":"white"}} onClick = {() => handleClick()}>
                
              
                {text}
                
            </button>
        </div>
    )
   
}


export default Button
